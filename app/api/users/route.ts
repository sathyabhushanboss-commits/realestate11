import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db, iso } from '@/lib/db'
import { createUser, findUserByEmail, requireApiSession } from '@/lib/auth'

export async function GET() {
  const { error } = await requireApiSession('admin')
  if (error) return error

  const sql = await db()
  const rows = await sql`
    SELECT u.id, u.name, u.email, u.phone, u.role, u.created_at,
           (SELECT count(*)::int FROM favorites f WHERE f.user_id = u.id) AS favorites
    FROM users u ORDER BY u.created_at DESC`
  return NextResponse.json(
    rows.map((u) => ({
      _id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      createdAt: iso(u.created_at),
      favorites: u.favorites,
    }))
  )
}

const createSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(80),
  email: z.email('Enter a valid email').trim().toLowerCase(),
  phone: z.string().trim().max(20).default(''),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
  role: z.enum(['admin', 'user']).default('user'),
})

// Admins can create accounts directly, e.g. another admin
export async function POST(request: NextRequest) {
  const { error } = await requireApiSession('admin')
  if (error) return error

  const parsed = createSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  if (await findUserByEmail(parsed.data.email)) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
  }
  const user = await createUser(parsed.data)
  return NextResponse.json({ _id: user.id, name: user.name, email: user.email, role: user.role }, { status: 201 })
}
