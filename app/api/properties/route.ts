import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Property } from '@/lib/models'
import { getSession, requireApiSession } from '@/lib/auth'
import { ensurePropertiesSeeded, propertyInput, toPropertyJSON } from '@/lib/properties'

// GET /api/properties?q=koramangala&type=Villa&status=all
export async function GET(request: NextRequest) {
  await ensurePropertiesSeeded()
  const params = request.nextUrl.searchParams
  const session = await getSession()

  const filter: Record<string, unknown> = {}
  // Visitors only ever see published and sold listings; admins can ask for everything
  const status = params.get('status')
  if (session?.role === 'admin' && status) {
    if (status !== 'all') filter.status = status
  } else {
    filter.status = { $ne: 'draft' }
  }

  const q = params.get('q')?.trim()
  if (q) {
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    filter.$or = [{ title: rx }, { location: rx }, { description: rx }]
  }
  const type = params.get('type')
  if (type) filter.propertyType = type

  const docs = await Property.find(filter).sort({ featured: -1, createdAt: -1 }).lean()
  return NextResponse.json(docs.map(toPropertyJSON))
}

export async function POST(request: NextRequest) {
  const { error } = await requireApiSession('admin')
  if (error) return error

  const parsed = propertyInput.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
  }

  await connectDB()
  const doc = await Property.create(parsed.data)
  return NextResponse.json(toPropertyJSON(doc.toObject()), { status: 201 })
}
