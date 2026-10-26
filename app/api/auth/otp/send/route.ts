import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { ensureAdminSeeded } from '@/lib/auth'
import { issueOtp } from '@/lib/otp'

const schema = z.object({
  email: z.email('Enter a valid email').trim().toLowerCase(),
  purpose: z.enum(['login', 'register', 'reset']),
})

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
  }
  const { email, purpose } = parsed.data

  await ensureAdminSeeded()
  await connectDB()
  const exists = await User.exists({ email })

  if (purpose === 'register' && exists) {
    return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
  }
  // For sign-in and reset, answer the same way whether or not the account exists
  if (purpose !== 'register' && !exists) {
    return NextResponse.json({ ok: true })
  }

  const result = await issueOtp(email, purpose)
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status })
  return NextResponse.json({ ok: true })
}
