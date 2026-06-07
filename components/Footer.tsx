import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#4A1F12] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* RUBY GLOW */}
        <div className="absolute top-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-[#9B1C1C]/30 blur-3xl"></div>

        {/* GOLD GLOW */}
        <div className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] rounded-full bg-[#D4A017]/20 blur-3xl"></div>

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20">
        {/* TOP */}
        <div className="grid lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-16">
          {/* BRAND */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* LOGO + TITLE */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* LOGO */}
              <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-[36px] overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-[#D4A017]/20 flex-shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Sri Megha Lakshmi Logo"
                  fill
                  sizes="(max-width: 768px) 128px, 144px"
                  className="object-cover"
                />
              </div>

              {/* TITLE */}
              <div className="text-center sm:text-left">
                <h2 className="text-4xl md:text-5xl font-black leading-none text-white">
                  Sri Megha
                </h2>

                <h2 className="mt-2 text-4xl md:text-5xl font-black leading-none text-[#D4A017]">
                  Lakshmi
                </h2>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-10 text-white/75 leading-[1.9] text-lg max-w-md text-center lg:text-left">
              Premium luxury real estate,
              vastu-compliant homes,
              modern developments,
              luxury construction,
              and high-value investments
              across Bengaluru.
            </p>

            {/* BUTTON */}
            <div className="mt-10">
              <Link
                href="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  bg-gradient-to-r
                  from-[#9B1C1C]
                  to-[#C62828]
                  hover:scale-105
                  px-8
                  py-4
                  rounded-2xl
                  text-lg
                  font-bold
                  shadow-[0_20px_50px_rgba(155,28,28,0.4)]
                  transition-all
                  duration-500
                "
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <h3 className="text-3xl font-black text-[#D4A017]">
              Quick Links
            </h3>

            <div className="mt-8 flex flex-col gap-5 items-center lg:items-start">
              {[
                'Home',
                'About Us',
                'Properties',
                'Projects',
                'Blog',
                'Contact',
              ].map((item, index) => (
                <Link
                  key={index}
                  href="/"
                  className="
                    text-white/75
                    hover:text-[#D4A017]
                    hover:translate-x-2
                    transition-all
                    duration-300
                    text-lg
                  "
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <h3 className="text-3xl font-black text-[#D4A017]">
              Services
            </h3>

            <div className="mt-8 flex flex-col gap-5 items-center lg:items-start">
              {[
                'Luxury Apartments',
                'Premium Villas',
                'Commercial Spaces',
                'Real Estate Development',
                'Construction Services',
                'Property Investment',
              ].map((item, index) => (
                <p
                  key={index}
                  className="
                    text-white/75
                    hover:text-white
                    transition-all
                    duration-300
                    text-lg
                  "
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <h3 className="text-3xl font-black text-[#D4A017]">
              Contact
            </h3>

            <div className="mt-8 space-y-8">
              {/* ADDRESS */}
              <div>
                <p className="text-white/40 uppercase tracking-[4px] text-xs">
                  Address
                </p>

                <p className="mt-3 text-white/80 leading-relaxed text-lg">
                  Shop No. 902,
                  <br />
                  Koramangala,
                  <br />
                  Bengaluru - 560034
                </p>
              </div>

              {/* PHONE */}
              <div>
                <p className="text-white/40 uppercase tracking-[4px] text-xs">
                  Phone
                </p>

                <div className="mt-3 space-y-2">
                  <p className="text-white/80 text-lg">
                    +91 9741021116
                  </p>

                  <p className="text-white/80 text-lg">
                    +91 9845735652
                  </p>

                  <p className="text-white/80 text-lg">
                    +91 8147175225
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <p className="text-white/40 uppercase tracking-[4px] text-xs">
                  Email
                </p>

                <p className="mt-3 text-white/80 text-lg break-words">
                  hello@srimeghalakshmi.in
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="relative my-16">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center">
          {/* COPYRIGHT */}
          <p className="text-white/60 text-base">
            © 2025 Sri Megha Lakshmi.
            All rights reserved.
          </p>

          {/* TAGLINE */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#D4A017] animate-pulse shadow-[0_0_20px_#D4A017]"></div>

            <p className="text-white/60 text-base">
              Luxury Real Estate &
              Construction Company Bangalore
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}