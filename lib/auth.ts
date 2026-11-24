import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from './db'
import { AUTH_COOKIE, SESSION_MAX_AGE, signSession, verifySession, type Role, type SessionPayload } from './jwt'

export type { Role, SessionPayload }

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export interface UserRecord {
  id: string
  name: string
  email: string
  phone: string
  role: Role
  password_hash: string
  created_at: Date
}

export async function findUserByEmail(email: string) {
  const sql = await db()
  const rows = await sql`SELECT * FROM users WHERE email = ${email.toLowerCase()}`
  return rows[0] as UserRecord | undefined
}

export async function findUserById(id: string) {
  const sql = await db()
  const rows = await sql`SELECT * FROM users WHERE id = ${id}`
  return rows[0] as UserRecord | undefined
}

export async function createUser(data: { name: string; email: string; phone?: string; password: string; role: Role }) {
  const sql = await db()
  const passwordHash = await hashPassword(data.password)
  const rows = await sql`
    INSERT INTO users (name, email, phone, password_hash, role)
    VALUES (${data.name}, ${data.email.toLowerCase()}, ${data.phone ?? ''}, ${passwordHash}, ${data.role})
    RETURNING *`
  return rows[0] as UserRecord
}

export async function startSession(user: { id: string; role: Role; name: string; email: string }) {
  const token = signSession({ sub: user.id, role: user.role, name: user.name, email: user.email })
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

  const sql = await db()
  const admins = await sql`SELECT 1 FROM users WHERE role = 'admin' LIMIT 1`
  if (admins.length > 0) return
  const passwordHash = await hashPassword(password)
  await sql`
    INSERT INTO users (name, email, password_hash, role)
    VALUES ('Administrator', ${email}, ${passwordHash}, 'admin')
    ON CONFLICT (email) DO NOTHING`
}
