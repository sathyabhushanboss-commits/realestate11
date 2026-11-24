import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession, requireApiSession } from '@/lib/auth'
import { ensurePropertiesSeeded, insertProperty, propertyInput, toPropertyJSON } from '@/lib/properties'

// GET /api/properties?q=koramangala&type=Villa&status=all
export async function GET(request: NextRequest) {
  await ensurePropertiesSeeded()
  const params = request.nextUrl.searchParams
  const session = await getSession()

  const where: string[] = []
  const values: unknown[] = []
  const add = (clause: (n: string) => string, value: unknown) => {
    values.push(value)
    where.push(clause(`$${values.length}`))
  }

  // Visitors only ever see published and sold listings; admins can ask for everything
  const status = params.get('status')
  if (session?.role === 'admin' && status) {
    if (status !== 'all') add((n) => `status = ${n}`, status)
  } else {
    where.push(`status <> 'draft'`)
  }

  const q = params.get('q')?.trim()
  if (q) {
    const pattern = `%${q.replace(/[\\%_]/g, '\\$&')}%`
    add((n) => `(title ILIKE ${n} OR location ILIKE ${n} OR description ILIKE ${n})`, pattern)
  }
  const type = params.get('type')
  if (type) add((n) => `property_type = ${n}`, type)

  const sql = await db()
  const rows = await sql.query(
    `SELECT * FROM properties ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY featured DESC, created_at DESC`,
    values
  )
  return NextResponse.json(rows.map(toPropertyJSON))
}

export async function POST(request: NextRequest) {
  const { error } = await requireApiSession('admin')
  if (error) return error

  const parsed = propertyInput.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
  }

  const row = await insertProperty(parsed.data)
  return NextResponse.json(toPropertyJSON(row), { status: 201 })
}
