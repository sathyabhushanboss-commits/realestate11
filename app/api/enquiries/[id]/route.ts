import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { requireApiSession } from '@/lib/auth'
import { isId } from '@/lib/properties'
import { ENQUIRY_SELECT, toEnquiryJSON } from '@/lib/enquiries'

const notFound = () => NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })

export async function PATCH(request: NextRequest, ctx: RouteContext<'/api/enquiries/[id]'>) {
  const { error } = await requireApiSession('admin')
  if (error) return error

  const { id } = await ctx.params
  if (!isId(id)) return notFound()

  const parsed = z
    .object({ status: z.enum(['new', 'contacted', 'closed']) })
    .safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid status' }, { status: 400 })

  const sql = await db()
  const updated = await sql`
    UPDATE enquiries SET status = ${parsed.data.status}, updated_at = now() WHERE id = ${id} RETURNING id`
  if (updated.length === 0) return notFound()
  const [row] = await sql.query(`${ENQUIRY_SELECT} WHERE e.id = $1`, [id])
  return NextResponse.json(toEnquiryJSON(row))
}

export async function DELETE(_request: NextRequest, ctx: RouteContext<'/api/enquiries/[id]'>) {
  const { session, error } = await requireApiSession()
  if (error) return error

  const { id } = await ctx.params
  if (!isId(id)) return notFound()

  const sql = await db()
  // Users may withdraw their own enquiries; admins may delete any
  const removed =
    session.role === 'admin'
      ? await sql`DELETE FROM enquiries WHERE id = ${id} RETURNING id`
      : await sql`DELETE FROM enquiries WHERE id = ${id} AND user_id = ${session.sub} RETURNING id`
  return removed.length > 0 ? NextResponse.json({ ok: true }) : notFound()
}
