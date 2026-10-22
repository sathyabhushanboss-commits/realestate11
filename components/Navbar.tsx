'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const COMPANIES = [
  { href: '/developers', label: 'Sri Megha Lakshmi Developers' },
  { href: '/constructions', label: 'Sri Megha Lakshmi Constructions' },
  { href: '/real-estate', label: 'Sri Megha Lakshmi Real Estate' },
]

export default function Navbar() {

  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [user, setUser] = useState<{ role: 'admin' | 'user' } | null>(null)

  // Who is signed in (re-checked on navigation so login/logout show straight away)
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

  const accountHref = user ? (user.role === 'admin' ? '/admin/dashboard' : '/account') : '/login'
  const accountLabel = user ? (user.role === 'admin' ? 'Admin' : 'My Account') : 'Sign in'

  return (

    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#D4A017]/10">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LEFT LOGO */}
        <Link
          href="/"
          className="flex items-center gap-4"
        >

          {/* LOGO */}
          <div className="relative w-[70px] h-[70px] shrink-0">

            <Image
              src="/logo.jpeg"
              alt="Sri Megha Lakshmi"
              fill
              priority
              className="object-contain"
            />

          </div>

          {/* BRAND */}
          <div>

            <h1 className="text-2xl md:text-3xl font-bold text-[#9B1C1C] leading-none whitespace-nowrap">
              Sri Megha Lakshmi
            </h1>

            <p className="text-[#D4A017] text-sm mt-1 italic">
              Premium Real Estate
            </p>

          </div>

        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden xl:flex items-center gap-6 2xl:gap-10">

          <nav className="flex items-center gap-5 2xl:gap-8 text-[#4A1F12] font-medium text-base 2xl:text-lg whitespace-nowrap">

            <Link
              href="/"
              className="hover:text-[#9B1C1C] transition-colors"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="hover:text-[#9B1C1C] transition-colors"
            >
              About
            </Link>

            {/* COMPANIES DROPDOWN */}
            <div className="relative group">
              <button className="hover:text-[#9B1C1C] transition-colors flex items-center gap-1">
                Companies
                <span className="text-xs">▾</span>
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all">
                <div className="bg-white rounded-xl shadow-xl border border-[#D4A017]/20 py-2 w-80">
                  {COMPANIES.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block px-5 py-3 text-base hover:bg-[#F8F6F2] hover:text-[#9B1C1C] transition-colors"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/properties"
              className="hover:text-[#9B1C1C] transition-colors"
            >
              Properties
            </Link>

            <Link
              href="/blog"
              className="hover:text-[#9B1C1C] transition-colors"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className="hover:text-[#9B1C1C] transition-colors"
            >
              Contact
            </Link>

          </nav>

          {/* ACCOUNT */}
          <Link
            href={accountHref}
            className="text-[#4A1F12] font-medium text-base 2xl:text-lg hover:text-[#9B1C1C] transition-colors whitespace-nowrap"
          >
            {accountLabel}
          </Link>

          {/* CTA BUTTON */}
          <Link
            href="/appointment"
            className="bg-[#9B1C1C] hover:bg-[#8B1E1E] text-white px-6 py-3 rounded-xl transition-all font-medium whitespace-nowrap"
          >
            Book Appointment
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden flex flex-col gap-1"
        >

          <span className="w-7 h-[3px] bg-[#9B1C1C] rounded-full"></span>

          <span className="w-7 h-[3px] bg-[#9B1C1C] rounded-full"></span>

          <span className="w-7 h-[3px] bg-[#9B1C1C] rounded-full"></span>

        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (

        <div className="xl:hidden bg-white border-t border-[#D4A017]/10 px-6 py-6">

          <nav className="flex flex-col gap-5 text-[#4A1F12] font-medium text-lg">

            <Link
              href="/"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setOpen(false)}
            >
              About
            </Link>

            {COMPANIES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={() => setOpen(false)}
              >
                {c.label}
              </Link>
            ))}

            <Link
              href="/properties"
              onClick={() => setOpen(false)}
            >
              Properties
            </Link>

            <Link
              href="/blog"
              onClick={() => setOpen(false)}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>

            <Link
              href={accountHref}
              onClick={() => setOpen(false)}
            >
              {accountLabel}
            </Link>

            {/* CTA */}
            <Link
              href="/appointment"
              onClick={() => setOpen(false)}
              className="bg-[#9B1C1C] text-white text-center py-3 rounded-xl mt-3"
            >
              Book Appointment
            </Link>

          </nav>

        </div>

      )}

    </header>
  )
}