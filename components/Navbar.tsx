'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Mail, Phone, UserRound } from 'lucide-react'
import { COMPANY_LINKS, NAV_LINKS, SITE } from '@/lib/site'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<{ name: string; role: 'admin' | 'user' } | null>(null)

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const companyActive = COMPANY_LINKS.some((c) => pathname.startsWith(c.href))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Who is signed in (re-checked on navigation so login/logout show up straight away)
  useEffect(() => {
    let cancelled = false
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => !cancelled && setUser(d.user))
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [pathname])
  const accountHref = user?.role === 'admin' ? '/admin/dashboard' : '/account'

  // Close the drawer whenever the route changes
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  // Lock page scroll and allow Escape while the drawer is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Admin and account screens have their own chrome
  if (pathname.startsWith('/admin') || pathname.startsWith('/account')) return null

  return (
    <>
      {/* UTILITY BAR */}
      <div className="hidden lg:block bg-ink text-white/70 text-xs">
        <div className="container-x flex items-center justify-between h-10">
          <p className="tracking-[0.2em] uppercase text-[10px] text-gold-soft">
            Developers · Constructions · Real Estate
          </p>
          <div className="flex items-center gap-6">
            <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-gold" /> {SITE.phones[0]}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white transition">
              <Mail className="w-3.5 h-3.5 text-gold" /> {SITE.email}
            </a>
            <span>{SITE.hours}</span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ivory/90 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(30,12,7,0.25)]'
            : 'bg-ivory'
        }`}
      >
        <div className="container-x flex items-center justify-between h-[72px] lg:h-[84px]">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 min-w-0" aria-label="Sri Megha Lakshmi Group home">
            <div className="relative w-12 h-12 lg:w-14 lg:h-14 shrink-0">
              <Image src="/logo.jpeg" alt="" fill priority sizes="56px" className="object-contain mix-blend-multiply" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-[1.45rem] lg:text-[1.7rem] font-semibold text-ruby leading-none truncate">
                Sri Megha Lakshmi
              </p>
              <p className="text-[9px] lg:text-[10px] tracking-[0.32em] uppercase text-gold-deep mt-1.5 font-semibold">
                Group of Companies
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1 text-[15px] font-medium text-bronze">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <NavItem key={link.href} href={link.href} active={isActive(link.href)}>
                {link.label}
              </NavItem>
            ))}

            {/* COMPANIES DROPDOWN */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-full transition-colors ${
                  companyActive ? 'text-ruby' : 'hover:text-ruby'
                }`}
                aria-haspopup="true"
              >
                Our Companies
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300">
                <div className="card p-2 w-[340px]">
                  {COMPANY_LINKS.map((c, i) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="flex items-start gap-4 rounded-xl px-4 py-3.5 hover:bg-ivory transition-colors"
                    >
                      <span className="font-display text-2xl text-gold leading-none mt-0.5">0{i + 1}</span>
                      <span>
                        <span className="block text-[15px] font-semibold text-bronze">{c.label}</span>
                        <span className="block text-xs text-bronze/60 mt-0.5">{c.note}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {NAV_LINKS.slice(2).map((link) => (
              <NavItem key={link.href} href={link.href} active={isActive(link.href)}>
                {link.label}
              </NavItem>
            ))}

            <Link
              href={user ? accountHref : '/login'}
              className="ml-3 flex items-center gap-2 px-4 py-2 rounded-full hover:text-ruby transition-colors"
            >
              <UserRound className="w-4 h-4" />
              {user ? (user.role === 'admin' ? 'Admin' : 'My Account') : 'Sign in'}
            </Link>

            <Link href="/appointment" className="btn btn-primary ml-1 !min-h-0 !py-3 !px-6 text-sm">
              Book a Visit
            </Link>
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden relative w-11 h-11 -mr-2 flex items-center justify-center"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`absolute h-[2px] w-6 bg-ruby rounded transition-all duration-300 ${open ? 'rotate-45' : '-translate-y-[7px]'}`} />
            <span className={`absolute h-[2px] w-6 bg-ruby rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute h-[2px] w-6 bg-ruby rounded transition-all duration-300 ${open ? '-rotate-45' : 'translate-y-[7px]'}`} />
          </button>
        </div>
        <div className="hairline" />
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setOpen(false)} />

        <aside
          className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-ivory shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 h-[72px] border-b border-bronze/10">
            <p className="font-display text-xl text-ruby font-semibold">Menu</p>
            <button
              onClick={() => setOpen(false)}
              className="w-11 h-11 -mr-2 flex items-center justify-center text-bronze text-3xl leading-none"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-3 font-display text-[1.75rem] leading-tight ${
                      isActive(link.href) ? 'text-ruby' : 'text-bronze'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-8">Our Companies</p>
            <ul className="mt-4 space-y-2">
              {COMPANY_LINKS.map((c, i) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className={`flex items-center gap-4 rounded-xl px-4 py-3 border transition-colors ${
                      isActive(c.href) ? 'border-ruby/30 bg-white' : 'border-bronze/10 bg-white/60'
                    }`}
                  >
                    <span className="font-display text-xl text-gold">0{i + 1}</span>
                    <span>
                      <span className="block text-[15px] font-semibold text-bronze">{c.short}</span>
                      <span className="block text-xs text-bronze/60">{c.note}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-6 border-t border-bronze/10 space-y-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <Link href={user ? accountHref : '/login'} className="btn btn-outline w-full">
              <UserRound className="w-4 h-4" />
              {user ? (user.role === 'admin' ? 'Admin Panel' : 'My Account') : 'Sign in / Register'}
            </Link>
            <Link href="/appointment" className="btn btn-primary w-full">
              Book a Site Visit
            </Link>
            <a href={SITE.phoneHref} className="btn btn-outline w-full">
              <Phone className="w-4 h-4" /> {SITE.phones[0]}
            </a>
          </div>
        </aside>
      </div>
    </>
  )
}

function NavItem({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-full transition-colors ${active ? 'text-ruby' : 'hover:text-ruby'}`}
    >
      {children}
      <span
        className={`absolute left-4 right-4 -bottom-0.5 h-px bg-gold transition-transform duration-300 origin-left ${
          active ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </Link>
  )
}
