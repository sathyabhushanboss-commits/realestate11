import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession, requireApiSession } from '@/lib/auth'
import { ensurePropertiesSeeded, findProperty, isId, propertyInput, toPropertyJSON, updateProperty } from '@/lib/properties'

const notFound = () => NextResponse.json({ error: 'Property not found' }, { status: 404 })

export async function GET(_request: NextRequest, ctx: RouteContext<'/api/properties/[id]'>) {
  const { id } = await ctx.params
  if (!isId(id)) return notFound()

  await ensurePropertiesSeeded()
  const row = await findProperty(id)
  const session = await getSession()
  // Drafts are only visible to admins
  if (!row || (row.status === 'draft' && session?.role !== 'admin')) return notFound()
  return NextResponse.json(toPropertyJSON(row))
}

export async function PUT(request: NextRequest, ctx: RouteContext<'/api/properties/[id]'>) {
  const { error } = await requireApiSession('admin')
  if (error) return error

  const { id } = await ctx.params
  if (!isId(id)) return notFound()

  const parsed = propertyInput.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
  }

  const row = await updateProperty(id, parsed.data)
  if (!row) return notFound()
  return NextResponse.json(toPropertyJSON(row))
}

export async function DELETE(_request: NextRequest, ctx: RouteContext<'/api/properties/[id]'>) {
  const { error } = await requireApiSession('admin')
  if (error) return error

  const { id } = await ctx.params
  if (!isId(id)) return notFound()

  const sql = await db()
  // Foreign keys remove it from saved lists and detach it from enquiries
  const removed = await sql`DELETE FROM properties WHERE id = ${id} RETURNING id`
  if (removed.length === 0) return notFound()
  return NextResponse.json({ ok: true })
}
