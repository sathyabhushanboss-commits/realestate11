import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { requireApiSession } from '@/lib/auth'
import { isId } from '@/lib/properties'

const notFound = () => NextResponse.json({ error: 'User not found' }, { status: 404 })

const updateSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  phone: z.string().trim().max(20).optional(),
  role: z.enum(['admin', 'user']).optional(),
})

export async function PATCH(request: NextRequest, ctx: RouteContext<'/api/users/[id]'>) {
  const { session, error } = await requireApiSession('admin')
  if (error) return error

  const { id } = await ctx.params
  if (!isId(id)) return notFound()

  const parsed = updateSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  if (id === session.sub && parsed.data.role === 'user') {
    return NextResponse.json({ error: 'You cannot remove your own admin access' }, { status: 400 })
  }

  const { name = null, phone = null, role = null } = parsed.data
  const sql = await db()
  const [user] = await sql`
    UPDATE users SET name = COALESCE(${name}, name), phone = COALESCE(${phone}, phone),
      role = COALESCE(${role}, role), updated_at = now()
    WHERE id = ${id}
    RETURNING id, name, email, phone, role`
  return user ? NextResponse.json({ ...user, _id: user.id }) : notFound()
}

export async function DELETE(_request: NextRequest, ctx: RouteContext<'/api/users/[id]'>) {
  const { session, error } = await requireApiSession('admin')
  if (error) return error

  const { id } = await ctx.params
  if (!isId(id)) return notFound()
  if (id === session.sub) {
    return NextResponse.json({ error: 'You cannot delete your own account here' }, { status: 400 })
  }

  const sql = await db()
  // Foreign keys keep enquiries (business records) but detach them from the deleted account
  const removed = await sql`DELETE FROM users WHERE id = ${id} RETURNING id`
  return removed.length > 0 ? NextResponse.json({ ok: true }) : notFound()
}
