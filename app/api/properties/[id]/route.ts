import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Enquiry, Property, User } from '@/lib/models'
import { getSession, requireApiSession } from '@/lib/auth'
import { ensurePropertiesSeeded, isId, propertyInput, toPropertyJSON } from '@/lib/properties'

const notFound = () => NextResponse.json({ error: 'Property not found' }, { status: 404 })

export async function GET(_request: NextRequest, ctx: RouteContext<'/api/properties/[id]'>) {
  const { id } = await ctx.params
  if (!isId(id)) return notFound()

  await ensurePropertiesSeeded()
  const doc = await Property.findById(id).lean()
  const session = await getSession()
  // Drafts are only visible to admins
  if (!doc || (doc.status === 'draft' && session?.role !== 'admin')) return notFound()
  return NextResponse.json(toPropertyJSON(doc))
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

  await connectDB()
  const doc = await Property.findByIdAndUpdate(id, parsed.data, { returnDocument: 'after', runValidators: true }).lean()
  if (!doc) return notFound()
  return NextResponse.json(toPropertyJSON(doc))
}

export async function DELETE(_request: NextRequest, ctx: RouteContext<'/api/properties/[id]'>) {
  const { error } = await requireApiSession('admin')
  if (error) return error

  const { id } = await ctx.params
  if (!isId(id)) return notFound()

  await connectDB()
  const doc = await Property.findByIdAndDelete(id)
  if (!doc) return notFound()

  // Clean up references so saved lists and enquiries don't point at nothing
  await Promise.all([
    User.updateMany({ favorites: id }, { $pull: { favorites: id } }),
    Enquiry.updateMany({ property: id }, { $set: { property: null } }),
  ])
  return NextResponse.json({ ok: true })
}
