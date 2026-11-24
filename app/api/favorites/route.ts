import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { requireApiSession } from '@/lib/auth'
import { isId, toPropertyJSON } from '@/lib/properties'

export async function GET() {
  const { session, error } = await requireApiSession()
  if (error) return error

  const sql = await db()
  const rows = await sql`
    SELECT p.* FROM favorites f JOIN properties p ON p.id = f.property_id
    WHERE f.user_id = ${session.sub} AND p.status <> 'draft'
    ORDER BY f.created_at DESC`
  return NextResponse.json(rows.map(toPropertyJSON))
}

// Toggles a property in the user's saved list
export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession()
  if (error) return error

  const parsed = z
    .object({ propertyId: z.string().refine(isId) })
    .safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid property' }, { status: 400 })

  const sql = await db()
  const { propertyId } = parsed.data
  const [property] = await sql`SELECT id FROM properties WHERE id = ${propertyId}`
  if (!property) return NextResponse.json({ error: 'Property not found' }, { status: 404 })
  const [user] = await sql`SELECT id FROM users WHERE id = ${session.sub}`
  if (!user) return NextResponse.json({ error: 'Account not found' }, { status: 404 })

  const removed = await sql`
    DELETE FROM favorites WHERE user_id = ${session.sub} AND property_id = ${propertyId} RETURNING property_id`
  if (removed.length > 0) return NextResponse.json({ saved: false })

  await sql`
    INSERT INTO favorites (user_id, property_id) VALUES (${session.sub}, ${propertyId}) ON CONFLICT DO NOTHING`
  return NextResponse.json({ saved: true })
}
