import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db, iso } from '@/lib/db'
import { findUserById, hashPassword, requireApiSession, startSession, verifyPassword } from '@/lib/auth'

export async function GET() {
  const { session, error } = await requireApiSession()
  if (error) return error

  const user = await findUserById(session.sub)
  if (!user) return NextResponse.json({ error: 'Account not found' }, { status: 404 })
  return NextResponse.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: iso(user.created_at),
  })
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

  const user = await findUserById(session.sub)
  if (!user) return NextResponse.json({ error: 'Account not found' }, { status: 404 })

  const { name, phone, currentPassword, newPassword } = parsed.data
  let passwordHash = user.password_hash
  if (newPassword) {
    if (!(await verifyPassword(currentPassword ?? '', user.password_hash))) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
    }
    passwordHash = await hashPassword(newPassword)
  }
  const sql = await db()
  await sql`
    UPDATE users SET name = ${name}, phone = ${phone}, password_hash = ${passwordHash}, updated_at = now()
    WHERE id = ${user.id}`

  // Re-issue the token so the new name shows everywhere straight away
  await startSession({ ...user, name })
  return NextResponse.json({ ok: true })
}
