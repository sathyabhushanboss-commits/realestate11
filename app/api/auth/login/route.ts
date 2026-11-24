import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { ensureAdminSeeded, findUserByEmail, startSession, verifyPassword } from '@/lib/auth'

const schema = z.object({
  email: z.string().trim().toLowerCase(),
  password: z.string(),
})

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  await ensureAdminSeeded()
  const user = await findUserByEmail(parsed.data.email)

  // Same message either way so attackers can't probe which emails exist
  if (!user || !(await verifyPassword(parsed.data.password, user.password_hash))) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  await startSession(user)
  return NextResponse.json({ ok: true, role: user.role })
}
