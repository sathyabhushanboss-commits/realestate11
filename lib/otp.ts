import crypto from 'crypto'
import { connectDB } from './db'
import { Otp, type OtpPurpose } from './models'
import { sendOtpEmail } from './mailer'

export const OTP_TTL_MINUTES = 10
const RESEND_COOLDOWN_MS = 60 * 1000
const MAX_ATTEMPTS = 5

// Codes are stored only as a keyed hash, never in plain text
function hashCode(email: string, purpose: OtpPurpose, code: string) {
  const key = process.env.JWT_SECRET || 'dev-only-secret-change-me'
  return crypto.createHmac('sha256', key).update(`${purpose}:${email}:${code}`).digest('hex')
}

export type IssueResult = { ok: true } | { ok: false; error: string; status: number }

export async function issueOtp(email: string, purpose: OtpPurpose): Promise<IssueResult> {
  await connectDB()

  const existing = await Otp.findOne({ email, purpose })
  if (existing?.updatedAt && Date.now() - existing.updatedAt.getTime() < RESEND_COOLDOWN_MS) {
    return { ok: false, error: 'Please wait a minute before requesting another code', status: 429 }
  }

  const code = crypto.randomInt(0, 1_000_000).toString().padStart(6, '0')
  // Replacing the document resets attempts and the resend timer
  await Otp.findOneAndReplace(
    { email, purpose },
    {
      email,
      purpose,
      codeHash: hashCode(email, purpose, code),
      attempts: 0,
      expiresAt: new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000),
    },
    { upsert: true }
  )

  try {
    await sendOtpEmail(email, code, purpose, OTP_TTL_MINUTES)
  } catch (error) {
    console.error('Failed to send OTP email:', error)
    await Otp.deleteOne({ email, purpose })
    return { ok: false, error: 'Could not send the email. Please try again later.', status: 502 }
  }
  return { ok: true }
}

// Returns true once for a correct, unexpired code, then the code is used up
export async function consumeOtp(email: string, purpose: OtpPurpose, code: string) {
  await connectDB()
  const otp = await Otp.findOne({ email, purpose })
  if (!otp || otp.expiresAt.getTime() < Date.now() || otp.attempts >= MAX_ATTEMPTS) return false

  const expected = Buffer.from(otp.codeHash, 'hex')
  const actual = Buffer.from(hashCode(email, purpose, code.trim()), 'hex')
  if (!crypto.timingSafeEqual(expected, actual)) {
    await Otp.updateOne({ _id: otp._id }, { $inc: { attempts: 1 } })
    return false
  }

  await Otp.deleteOne({ _id: otp._id })
  return true
}
