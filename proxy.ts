import { NextResponse, type NextRequest } from 'next/server'
import { AUTH_COOKIE, verifySession } from '@/lib/jwt'

// Quick redirects before protected pages render. Every page and API route
// still checks the session itself; this only avoids flashing protected UI.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = verifySession(request.cookies.get(AUTH_COOKIE)?.value)

  if (!session) {
    const url = new URL('/login', request.url)
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  if (pathname.startsWith('/admin') && session.role !== 'admin') {
    return NextResponse.redirect(new URL('/account', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // /admin/login is just a redirect to /login, so it must stay reachable
  matcher: ['/admin', '/admin/((?!login).*)', '/account', '/account/:path*'],
}
