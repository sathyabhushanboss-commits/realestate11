import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { getSession, requireApiSession } from '@/lib/auth'
import { isId } from '@/lib/properties'
import { ENQUIRY_SELECT, toEnquiryJSON } from '@/lib/enquiries'

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
  const sql = await db()
  const e = parsed.data
  // An account or property that no longer exists is stored as null rather than failing the enquiry
  const [doc] = await sql`
    INSERT INTO enquiries (user_id, property_id, name, email, phone, message, type, preferred_date)
    VALUES (
      (SELECT id FROM users WHERE id = ${session?.sub ?? null}),
      (SELECT id FROM properties WHERE id = ${e.property ?? null}),
      ${e.name}, ${e.email}, ${e.phone}, ${e.message}, ${e.type}, ${e.preferredDate}
    )
    RETURNING id`
  return NextResponse.json({ ok: true, id: String(doc.id) }, { status: 201 })
}

// Admins see every enquiry; users see only their own
export async function GET(request: NextRequest) {
  const { session, error } = await requireApiSession()
  if (error) return error

  const sql = await db()
  const where: string[] = []
  const params: unknown[] = []
  if (session.role !== 'admin') {
    params.push(session.sub)
    where.push(`e.user_id = $${params.length}`)
  }
  const status = request.nextUrl.searchParams.get('status')
  if (status) {
    params.push(status)
    where.push(`e.status = $${params.length}`)
  }

  const rows = await sql.query(
    `${ENQUIRY_SELECT} ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY e.created_at DESC`,
    params
  )
  return NextResponse.json(rows.map(toEnquiryJSON))
}
