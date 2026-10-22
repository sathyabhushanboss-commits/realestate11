'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function VideoShowcase() {

  const [playing, setPlaying] = useState(false)

  // Close the video with Escape
  useEffect(() => {
    if (!playing) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPlaying(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playing])

  return (

    <section className="relative py-32 px-4 md:px-6 overflow-hidden bg-[#F8F6F2]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        {/* RUBY GLOW */}
        <div className="absolute top-[-250px] right-[-250px] w-[700px] h-[700px] rounded-full bg-[#9B1C1C]/10 blur-3xl"></div>

        {/* GOLD GLOW */}
        <div className="absolute bottom-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-[#D4A017]/10 blur-3xl"></div>

      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* VIDEO CARD */}
        <div className="group relative overflow-hidden rounded-[32px] md:rounded-[50px] shadow-[0_40px_140px_rgba(0,0,0,0.18)]">

          {/* BACKGROUND IMAGE */}
          <div
            className="relative min-h-[560px] md:h-[700px] flex bg-cover bg-center"
            style={{
              backgroundImage: "url('/properties/set3.1.jpeg')",
            }}
          >

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"></div>

            {/* CONTENT */}
            <div className="relative w-full flex flex-col items-center justify-center text-center px-6 py-14">

              {/* PLAY BUTTON */}
              <button
                onClick={() => setPlaying(true)}
                aria-label="Play property video"
                className="group/play relative w-24 h-24 md:w-36 md:h-36 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center shadow-[0_20px_80px_rgba(255,255,255,0.15)] hover:scale-110 transition-all duration-700">

                {/* INNER */}
                <div className="absolute inset-0 rounded-full bg-white/10 animate-ping"></div>

                {/* ICON */}
                <div className="relative ml-2 w-0 h-0 border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent border-l-[28px] border-l-white"></div>

              </button>

              {/* TAG */}
              <div className="mt-8 md:mt-10 inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 md:px-6 py-2.5 md:py-3 shadow-xl">

                <div className="w-3 h-3 rounded-full bg-[#D4A017] animate-pulse"></div>

                <p className="uppercase tracking-[3px] md:tracking-[5px] text-white text-xs md:text-sm font-semibold">
                  Property Video Tour
                </p>

              </div>

              {/* TITLE */}
              <h2 className="mt-6 md:mt-8 text-4xl md:text-7xl font-black text-white leading-tight">

                Experience
                <br />

                <span className="text-[#D4A017]">
                  Modern Luxury
                </span>

              </h2>

              {/* DESCRIPTION */}
              <p className="max-w-3xl mx-auto mt-6 md:mt-8 text-base md:text-2xl text-white/80 leading-relaxed">

                Discover premium architecture,
                spacious interiors,
                luxury amenities,
                and thoughtfully crafted living spaces.

              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-3 sm:gap-5 mt-10 md:mt-12">

                <Link
                  href="/properties"
                  className="group/button relative overflow-hidden text-center bg-[#D4A017] hover:bg-[#E8B92B] text-[#4A1F12] px-8 md:px-12 py-4 md:py-5 rounded-2xl text-base md:text-lg font-bold shadow-2xl transition-all duration-500 hover:scale-105"
                >

                  <span className="relative z-10">
                    Explore Properties
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-1000"></div>

                </Link>

                <Link
                  href="/appointment"
                  className="text-center bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl text-base md:text-lg font-semibold shadow-xl hover:-translate-y-1 transition-all duration-500"
                >

                  Book Site Visit

                </Link>

              </div>

            </div>

          </div>

          {/* BORDER */}
          <div className="absolute inset-0 rounded-[32px] md:rounded-[50px] border border-white/20 pointer-events-none"></div>

        </div>

      </div>

      {/* VIDEO PLAYER */}
      {playing && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Property video"
          onClick={() => setPlaying(false)}
        >
          <button
            onClick={() => setPlaying(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl leading-none"
            aria-label="Close video"
          >
            ×
          </button>
          <video
            src="/properties/realestate_esteem_property.mp4"
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-2xl bg-black shadow-2xl"
          />
        </div>
      )}

    </section>
  )
}