import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { hashPassword, startSession } from '@/lib/auth'
import { consumeOtp } from '@/lib/otp'

const schema = z.object({
  email: z.string().trim().toLowerCase(),
  code: z.string().trim().regex(/^\d{6}$/, 'Enter the 6-digit code'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
})

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
  }
  const { email, code, password } = parsed.data

  if (!(await consumeOtp(email, 'reset', code))) {
    return NextResponse.json({ error: 'Invalid or expired code' }, { status: 401 })
  }

  await connectDB()
  const user = await User.findOneAndUpdate(
    { email },
    { passwordHash: await hashPassword(password) },
    { returnDocument: 'after' }
  )
  if (!user) return NextResponse.json({ error: 'Invalid or expired code' }, { status: 401 })

  await startSession(user)
  return NextResponse.json({ ok: true, role: user.role })
}
