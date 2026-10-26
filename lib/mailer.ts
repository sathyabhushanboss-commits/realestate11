import nodemailer from 'nodemailer'
import type { OtpPurpose } from './models'

// Gmail SMTP with an App Password (free up to ~500 emails a day)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export function isMailConfigured() {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS)
}

const PURPOSE_TEXT: Record<OtpPurpose, { subject: string; intro: string }> = {
  login: { subject: 'Your sign-in code', intro: 'Use this code to sign in to your Sri Megha Lakshmi account.' },
  register: { subject: 'Verify your email', intro: 'Use this code to verify your email and finish creating your account.' },
  reset: { subject: 'Reset your password', intro: 'Use this code to reset your Sri Megha Lakshmi account password.' },
}

export async function sendOtpEmail(to: string, code: string, purpose: OtpPurpose, minutesValid: number) {
  const { subject, intro } = PURPOSE_TEXT[purpose]

  // Without SMTP credentials in development, print the code instead of failing
  if (!isMailConfigured() && process.env.NODE_ENV !== 'production') {
    console.log(`[otp] ${purpose} code for ${to}: ${code}`)
    return
  }

  await transporter.sendMail({
    from: `"Sri Megha Lakshmi Group" <${process.env.EMAIL_USER}>`,
    to,
    subject: `${code} is your ${subject.toLowerCase()} code`,
    text: `${intro}\n\nYour code: ${code}\n\nIt expires in ${minutesValid} minutes. If you did not request this, you can ignore this email.`,
    html: `
      <div style="background:#F8F6F2;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">
        <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #EFE7DA">
          <div style="background:#9B1C1C;padding:24px;text-align:center">
            <p style="margin:0;color:#E9C866;font-size:12px;letter-spacing:3px;text-transform:uppercase">Sri Megha Lakshmi Group</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px">${subject}</h1>
          </div>
          <div style="padding:32px 28px;color:#4A1F12">
            <p style="margin:0 0 24px;font-size:15px;line-height:1.6">${intro}</p>
            <p style="margin:0 auto 24px;width:max-content;padding:14px 28px;background:#F8F6F2;border:1px dashed #D4A017;border-radius:12px;font-size:32px;font-weight:bold;letter-spacing:10px;color:#9B1C1C">${code}</p>
            <p style="margin:0;font-size:13px;line-height:1.6;color:#7A5A4F">
              This code expires in ${minutesValid} minutes. Never share it with anyone, including our staff.
              If you did not request it, you can safely ignore this email.
            </p>
          </div>
        </div>
      </div>`,
  })
}
