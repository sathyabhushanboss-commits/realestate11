import Link from 'next/link'

export default function Footer() {

  return (

    <footer className="relative overflow-hidden bg-[#4A1F12] text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        {/* RUBY GLOW */}
        <div className="absolute top-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-[#9B1C1C]/30 blur-3xl"></div>

        {/* GOLD GLOW */}
        <div className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] rounded-full bg-[#D4A017]/20 blur-3xl"></div>

      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20">

        {/* TOP */}
        <div className="grid lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>

            <div className="inline-flex items-center gap-3">

              <div className="w-4 h-4 rounded-full bg-[#D4A017] animate-pulse"></div>

              <h2 className="text-3xl font-black">
                Sri Megha Lakshmi
              </h2>

            </div>

            <p className="mt-6 text-white/70 leading-relaxed text-lg">

              Premium luxury real estate,
              vastu-compliant homes,
              modern developments,
              and high-value investments in Bengaluru.

            </p>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-2xl font-bold text-[#D4A017]">
              Quick Links
            </h3>

            <div className="mt-6 flex flex-col gap-4">

              <Link
                href="/"
                className="text-white/70 hover:text-white transition-all duration-300"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="text-white/70 hover:text-white transition-all duration-300"
              >
                About
              </Link>

              <Link
                href="/properties"
                className="text-white/70 hover:text-white transition-all duration-300"
              >
                Properties
              </Link>

              <Link
                href="/blog"
                className="text-white/70 hover:text-white transition-all duration-300"
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className="text-white/70 hover:text-white transition-all duration-300"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* SERVICES */}
          <div>

            <h3 className="text-2xl font-bold text-[#D4A017]">
              Services
            </h3>

            <div className="mt-6 flex flex-col gap-4">

              <p className="text-white/70">
                Luxury Apartments
              </p>

              <p className="text-white/70">
                Premium Villas
              </p>

              <p className="text-white/70">
                Commercial Spaces
              </p>

              <p className="text-white/70">
                Property Investment
              </p>

              <p className="text-white/70">
                Construction Services
              </p>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-2xl font-bold text-[#D4A017]">
              Contact
            </h3>

            <div className="mt-6 space-y-5">

              <p className="text-white/70 leading-relaxed">

                Shop No. 902,
                <br />
                Koramangala,
                <br />
                Bengaluru - 560034

              </p>

              <p className="text-white/70">
                +91 9741021116
              </p>

              <p className="text-white/70">
                hello@srimeghalakshmi.in
              </p>

            </div>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="h-[1px] w-full bg-white/10 my-12"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-white/60 text-center md:text-left">

            © 2025 Sri Megha Lakshmi.
            All rights reserved.

          </p>

          <div className="flex items-center gap-6">

            <p className="text-white/60">
              Luxury Real Estate Bangalore
            </p>

          </div>

        </div>

      </div>

    </footer>
  )
}