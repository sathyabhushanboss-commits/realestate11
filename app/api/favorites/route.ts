import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { Property, User } from '@/lib/models'
import { requireApiSession } from '@/lib/auth'
import { isId, toPropertyJSON } from '@/lib/properties'

export async function GET() {
  const { session, error } = await requireApiSession()
  if (error) return error

  await connectDB()
  const user = await User.findById(session.sub).select('favorites').lean()
  const docs = await Property.find({ _id: { $in: user?.favorites ?? [] }, status: { $ne: 'draft' } }).lean()
  return NextResponse.json(docs.map(toPropertyJSON))
}

// Toggles a property in the user's saved list
export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession()
  if (error) return error

  const parsed = z
    .object({ propertyId: z.string().refine(isId) })
    .safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid property' }, { status: 400 })

  await connectDB()
  const { propertyId } = parsed.data
  if (!(await Property.exists({ _id: propertyId }))) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 })
  }

  const user = await User.findById(session.sub).select('favorites')
  if (!user) return NextResponse.json({ error: 'Account not found' }, { status: 404 })

  const saved = user.favorites.some((f) => String(f) === propertyId)
  await User.updateOne(
    { _id: session.sub },
    saved ? { $pull: { favorites: propertyId } } : { $addToSet: { favorites: propertyId } }
  )
  return NextResponse.json({ saved: !saved })
}
