import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { User } from '@/lib/models'
import { hashPassword, requireApiSession } from '@/lib/auth'

export async function GET() {
  const { error } = await requireApiSession('admin')
  if (error) return error

  await connectDB()
  const users = await User.find().sort({ createdAt: -1 }).select('name email phone role createdAt favorites').lean()
  return NextResponse.json(users.map((u) => ({ ...u, _id: String(u._id), favorites: u.favorites.length })))
}

const createSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(80),
  email: z.email('Enter a valid email').trim().toLowerCase(),
  phone: z.string().trim().max(20).default(''),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
  role: z.enum(['admin', 'user']).default('user'),
})

// Admins can create accounts directly, e.g. another admin
export async function POST(request: NextRequest) {
  const { error } = await requireApiSession('admin')
  if (error) return error

  const parsed = createSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  await connectDB()
  const { password, ...rest } = parsed.data
  if (await User.exists({ email: rest.email })) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
  }
  const user = await User.create({ ...rest, passwordHash: await hashPassword(password) })
  return NextResponse.json(
    { _id: String(user._id), name: user.name, email: user.email, role: user.role },
    { status: 201 }
  )
}
