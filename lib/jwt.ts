import jwt from 'jsonwebtoken'

// Kept free of next/headers and the database so proxy.ts can import it too

export const AUTH_COOKIE = 'sml_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export type Role = 'admin' | 'user'
export interface SessionPayload {
  sub: string // user id
  role: Role
  name: string
  email: string
}

function secret() {
  const value = process.env.JWT_SECRET
  if (!value) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET must be set in production')
    }
    return 'dev-only-secret-change-me'
  }
  return value
}

export function signSession(payload: SessionPayload) {
  return jwt.sign(payload, secret(), { expiresIn: SESSION_MAX_AGE })
}

export function verifySession(token: string | undefined): SessionPayload | null {
  if (!token) return null
  try {
    const decoded = jwt.verify(token, secret()) as SessionPayload
    return decoded.sub && (decoded.role === 'admin' || decoded.role === 'user') ? decoded : null
  } catch {
    return null
  }
}
