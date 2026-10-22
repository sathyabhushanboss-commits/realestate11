import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from './db'
import { User } from './models'
import { AUTH_COOKIE, SESSION_MAX_AGE, signSession, verifySession, type Role, type SessionPayload } from './jwt'

export type { Role, SessionPayload }

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export async function startSession(user: { _id: unknown; role: Role; name: string; email: string }) {
  const token = signSession({ sub: String(user._id), role: user.role, name: user.name, email: user.email })
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
}

export async function endSession() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE)
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  return verifySession(cookieStore.get(AUTH_COOKIE)?.value)
}

// ---------- For pages (redirect on failure) ----------

export async function requirePageSession(role?: Role) {
  const session = await getSession()
  if (!session) redirect('/login')
  if (role === 'admin' && session.role !== 'admin') redirect('/account')
  return session
}

// ---------- For API routes (JSON error on failure) ----------

type Guard = { session: SessionPayload; error?: never } | { session?: never; error: NextResponse }

export async function requireApiSession(role?: Role): Promise<Guard> {
  const session = await getSession()
  if (!session) {
    return { error: NextResponse.json({ error: 'Please log in' }, { status: 401 }) }
  }
  if (role === 'admin' && session.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Admins only' }, { status: 403 }) }
  }
  return { session }
}

// Creates the first admin from ADMIN_EMAIL / ADMIN_PASSWORD if no admin exists yet
export async function ensureAdminSeeded() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) return

  await connectDB()
  if (await User.exists({ role: 'admin' })) return
  await User.create({
    name: 'Administrator',
    email,
    passwordHash: await hashPassword(password),
    role: 'admin',
  })
}
