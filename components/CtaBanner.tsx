'use client'

import Link from 'next/link'

export default function CtaBanner() {

  return (

    <section className="relative w-full overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#A60F14] via-[#9B1C1C] to-[#C98692]" />

      {/* WHITE GRID */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* GLOW */}
      <div className="absolute top-[-300px] left-[-300px] w-[900px] h-[900px] rounded-full bg-[#D4A017]/10 blur-3xl"></div>

      <div className="absolute bottom-[-300px] right-[-300px] w-[900px] h-[900px] rounded-full bg-white/10 blur-3xl"></div>

      {/* CONTENT */}
      <div className="relative z-10 px-6 py-24 md:py-28">

        <div className="max-w-5xl mx-auto text-center">

          {/* TAG */}
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-xl rounded-full px-8 py-4">

            <div className="w-3 h-3 rounded-full bg-[#D4A017]" />

            <p className="uppercase tracking-[7px] text-[#F4C542] text-xs md:text-sm font-bold">

              FIND YOUR DREAM PROPERTY

            </p>

          </div>

          {/* TITLE */}
          <h2 className="mt-12 text-6xl md:text-8xl font-black leading-[0.95] text-white">

            Ready To Invest In
            <br />

            Luxury Living?

          </h2>

          {/* DESCRIPTION */}
          <p className="max-w-4xl mx-auto mt-10 text-xl md:text-3xl text-white/85 leading-relaxed">

            Connect with Sri Megha Lakshmi Real Estate and discover premium apartments,
            villas, and investment opportunities across Bangalore.

          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap justify-center gap-6 mt-14">

            <Link
              href="/properties"
              className="bg-white hover:bg-[#F8F6F2] text-[#9B1C1C] px-12 py-5 rounded-[20px] text-xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              View Properties
            </Link>

            <Link
              href="/appointment"
              className="bg-[#D4A017] hover:bg-[#E8B92B] text-[#4A1F12] px-12 py-5 rounded-[20px] text-xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Book Appointment
            </Link>

          </div>

        </div>

      </div>

    </section>
  )
}