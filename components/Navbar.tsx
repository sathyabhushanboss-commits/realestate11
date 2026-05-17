'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {

  const [open, setOpen] = useState(false)

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

            <h1 className="text-2xl md:text-3xl font-bold text-[#9B1C1C] leading-none">
              Sri Megha Lakshmi
            </h1>

            <p className="text-[#D4A017] text-sm mt-1 italic">
              Premium Real Estate
            </p>

          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-10">

          <nav className="flex items-center gap-8 text-[#4A1F12] font-medium text-lg">

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

          {/* CTA BUTTON */}
          <Link
            href="/appointment"
            className="bg-[#9B1C1C] hover:bg-[#8B1E1E] text-white px-6 py-3 rounded-xl transition-all font-medium"
          >
            Book Appointment
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1"
        >

          <span className="w-7 h-[3px] bg-[#9B1C1C] rounded-full"></span>

          <span className="w-7 h-[3px] bg-[#9B1C1C] rounded-full"></span>

          <span className="w-7 h-[3px] bg-[#9B1C1C] rounded-full"></span>

        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (

        <div className="lg:hidden bg-white border-t border-[#D4A017]/10 px-6 py-6">

          <nav className="flex flex-col gap-5 text-[#4A1F12] font-medium text-lg">

            <Link href="/">
              Home
            </Link>

            <Link href="/about">
              About
            </Link>

            <Link href="/properties">
              Properties
            </Link>

            <Link href="/blog">
              Blog
            </Link>

            <Link href="/contact">
              Contact
            </Link>

            {/* CTA */}
            <Link
              href="/appointment"
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