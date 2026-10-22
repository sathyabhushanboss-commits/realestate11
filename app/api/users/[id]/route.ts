import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { Enquiry, User } from '@/lib/models'
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

  await connectDB()
  const user = await User.findByIdAndUpdate(id, parsed.data, { returnDocument: 'after' }).select('name email phone role').lean()
  return user ? NextResponse.json({ ...user, _id: String(user._id) }) : notFound()
}

export async function DELETE(_request: NextRequest, ctx: RouteContext<'/api/users/[id]'>) {
  const { session, error } = await requireApiSession('admin')
  if (error) return error

  const { id } = await ctx.params
  if (!isId(id)) return notFound()
  if (id === session.sub) {
    return NextResponse.json({ error: 'You cannot delete your own account here' }, { status: 400 })
  }

  await connectDB()
  const user = await User.findByIdAndDelete(id)
  if (!user) return notFound()
  // Enquiries are business records, so keep them but detach the deleted account
  await Enquiry.updateMany({ user: id }, { $set: { user: null } })
  return NextResponse.json({ ok: true })
}
