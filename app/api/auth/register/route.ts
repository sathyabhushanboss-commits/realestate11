import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { hashPassword, startSession } from '@/lib/auth'
import { consumeOtp } from '@/lib/otp'

const schema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(80),
  email: z.email('Enter a valid email').trim().toLowerCase(),
  phone: z.string().trim().regex(/^[0-9+\s-]{10,15}$/, 'Enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
  code: z.string({ error: 'Enter the 6-digit code sent to your email' }).trim().regex(/^\d{6}$/, 'Enter the 6-digit code sent to your email'),
})

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
  }

  await connectDB()
  const { name, email, phone, password, code } = parsed.data
  if (await User.exists({ email })) {
    return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
  }
  // The emailed code proves the person owns this address
  if (!(await consumeOtp(email, 'register', code))) {
    return NextResponse.json({ error: 'Invalid or expired code' }, { status: 401 })
  }

  // Public sign-ups are always regular users; admins are promoted from the admin panel
  const user = await User.create({ name, email, phone, passwordHash: await hashPassword(password), role: 'user' })
  await startSession(user)
  return NextResponse.json({ ok: true, role: user.role }, { status: 201 })
}
