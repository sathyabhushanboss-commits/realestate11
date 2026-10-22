import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { hashPassword, requireApiSession, startSession, verifyPassword } from '@/lib/auth'

export async function GET() {
  const { session, error } = await requireApiSession()
  if (error) return error

  await connectDB()
  const user = await User.findById(session.sub).select('name email phone role createdAt').lean()
  if (!user) return NextResponse.json({ error: 'Account not found' }, { status: 404 })
  return NextResponse.json({ ...user, _id: String(user._id) })
}

const schema = z
  .object({
    name: z.string().trim().min(2, 'Name is required').max(80),
    phone: z.string().trim().max(20).default(''),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8, 'New password must be at least 8 characters').max(100).optional(),
  })
  .refine((d) => !d.newPassword || d.currentPassword, {
    message: 'Enter your current password to set a new one',
  })

export async function PATCH(request: NextRequest) {
  const { session, error } = await requireApiSession()
  if (error) return error

  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  await connectDB()
  const user = await User.findById(session.sub).select('+passwordHash')
  if (!user) return NextResponse.json({ error: 'Account not found' }, { status: 404 })

  const { name, phone, currentPassword, newPassword } = parsed.data
  if (newPassword) {
    if (!(await verifyPassword(currentPassword ?? '', user.passwordHash))) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
    }
    user.passwordHash = await hashPassword(newPassword)
  }
  user.name = name
  user.phone = phone
  await user.save()

  // Re-issue the token so the new name shows everywhere straight away
  await startSession(user)
  return NextResponse.json({ ok: true })
}
