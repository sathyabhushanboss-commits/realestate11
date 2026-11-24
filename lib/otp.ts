import crypto from 'crypto'
import { db } from './db'
import { sendOtpEmail } from './mailer'

export type OtpPurpose = 'login' | 'register' | 'reset'

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
  const sql = await db()

  // Clear out any expired codes while we're here
  await sql`DELETE FROM otps WHERE expires_at < now()`

  const [existing] = await sql`SELECT updated_at FROM otps WHERE email = ${email} AND purpose = ${purpose}`
  if (existing && Date.now() - new Date(existing.updated_at).getTime() < RESEND_COOLDOWN_MS) {
    return { ok: false, error: 'Please wait a minute before requesting another code', status: 429 }
  }

  const code = crypto.randomInt(0, 1_000_000).toString().padStart(6, '0')
  const codeHash = hashCode(email, purpose, code)
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000)
  // Replacing the row resets attempts and the resend timer
  await sql`
    INSERT INTO otps (email, purpose, code_hash, attempts, expires_at, updated_at)
    VALUES (${email}, ${purpose}, ${codeHash}, 0, ${expiresAt}, now())
    ON CONFLICT (email, purpose) DO UPDATE SET
      code_hash = EXCLUDED.code_hash, attempts = 0, expires_at = EXCLUDED.expires_at, updated_at = now()`

  try {
    await sendOtpEmail(email, code, purpose, OTP_TTL_MINUTES)
  } catch (error) {
    console.error('Failed to send OTP email:', error)
    await sql`DELETE FROM otps WHERE email = ${email} AND purpose = ${purpose}`
    return { ok: false, error: 'Could not send the email. Please try again later.', status: 502 }
  }
  return { ok: true }
}

// Returns true once for a correct, unexpired code, then the code is used up
export async function consumeOtp(email: string, purpose: OtpPurpose, code: string) {
  const sql = await db()
  const [otp] = await sql`SELECT * FROM otps WHERE email = ${email} AND purpose = ${purpose}`
  if (!otp || new Date(otp.expires_at).getTime() < Date.now() || otp.attempts >= MAX_ATTEMPTS) return false

  const expected = Buffer.from(otp.code_hash, 'hex')
  const actual = Buffer.from(hashCode(email, purpose, code.trim()), 'hex')
  if (!crypto.timingSafeEqual(expected, actual)) {
    await sql`UPDATE otps SET attempts = attempts + 1 WHERE email = ${email} AND purpose = ${purpose}`
    return false
  }

  // Delete and check in one step so the same code can't be used twice in parallel
  const deleted = await sql`
    DELETE FROM otps WHERE email = ${email} AND purpose = ${purpose} AND code_hash = ${otp.code_hash} RETURNING email`
  return deleted.length > 0
}
