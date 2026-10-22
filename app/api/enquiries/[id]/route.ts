import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { Enquiry } from '@/lib/models'
import { requireApiSession } from '@/lib/auth'
import { isId } from '@/lib/properties'

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

  await connectDB()
  const doc = await Enquiry.findByIdAndUpdate(id, parsed.data, { returnDocument: 'after' }).lean()
  return doc ? NextResponse.json(doc) : notFound()
}

export async function DELETE(_request: NextRequest, ctx: RouteContext<'/api/enquiries/[id]'>) {
  const { session, error } = await requireApiSession()
  if (error) return error

  const { id } = await ctx.params
  if (!isId(id)) return notFound()

  await connectDB()
  // Users may withdraw their own enquiries; admins may delete any
  const filter = session.role === 'admin' ? { _id: id } : { _id: id, user: session.sub }
  const doc = await Enquiry.findOneAndDelete(filter)
  return doc ? NextResponse.json({ ok: true }) : notFound()
}
