import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { Enquiry } from '@/lib/models'
import { getSession, requireApiSession } from '@/lib/auth'
import { isId } from '@/lib/properties'

const schema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(80),
  phone: z.string().trim().regex(/^[0-9+\s-]{10,15}$/, 'Enter a valid phone number'),
  email: z.union([z.email('Enter a valid email'), z.literal('')]).default(''),
  message: z.string().trim().max(2000).default(''),
  type: z.enum(['enquiry', 'site-visit', 'contact']).default('enquiry'),
  preferredDate: z.string().trim().max(40).default(''),
  property: z.string().refine(isId, 'Invalid property').optional(),
})

// Anyone can send an enquiry; logged-in users get it linked to their account
export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
  }

  const session = await getSession()
  await connectDB()
  const doc = await Enquiry.create({ ...parsed.data, user: session?.sub ?? null })
  return NextResponse.json({ ok: true, id: String(doc._id) }, { status: 201 })
}

// Admins see every enquiry; users see only their own
export async function GET(request: NextRequest) {
  const { session, error } = await requireApiSession()
  if (error) return error

  await connectDB()
  const filter: Record<string, unknown> = session.role === 'admin' ? {} : { user: session.sub }
  const status = request.nextUrl.searchParams.get('status')
  if (status) filter.status = status

  const docs = await Enquiry.find(filter)
    .sort({ createdAt: -1 })
    .populate('property', 'title location')
    .populate('user', 'name email')
    .lean()
  return NextResponse.json(docs)
}
