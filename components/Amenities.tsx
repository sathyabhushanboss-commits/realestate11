'use client'

import {
  Building2,
  ShieldCheck,
  Trees,
  Dumbbell,
  Waves,
  Car,
} from 'lucide-react'

const amenities = [
  {
    icon: Building2,
    title: 'Clubhouse',
    desc: 'Luxury clubhouse spaces crafted for modern community living.',
  },

  {
    icon: ShieldCheck,
    title: '24/7 Security',
    desc: 'Advanced security systems and gated community protection.',
  },

  {
    icon: Trees,
    title: 'Green Spaces',
    desc: 'Beautiful landscaped gardens and peaceful outdoor environments.',
  },

  {
    icon: Dumbbell,
    title: 'Fitness Center',
    desc: 'Premium gym and wellness spaces for healthy lifestyles.',
  },

  {
    icon: Waves,
    title: 'Swimming Pool',
    desc: 'Luxury pool areas designed for relaxation and recreation.',
  },

  {
    icon: Car,
    title: 'Smart Parking',
    desc: 'Spacious and secure parking with modern access systems.',
  },
]

export default function Amenities() {

  return (

    <section className="relative py-32 px-4 md:px-6 overflow-hidden bg-[#F8F6F2]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-[#9B1C1C]/10 blur-3xl"></div>

        <div className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] rounded-full bg-[#D4A017]/10 blur-3xl"></div>

      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center">

          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-5 py-3 shadow-xl">

            <div className="w-3 h-3 rounded-full bg-[#D4A017] animate-pulse"></div>

            <p className="uppercase tracking-[5px] text-[#9B1C1C] text-xs md:text-sm font-semibold">
              Premium Amenities
            </p>

          </div>

          <h2 className="mt-8 text-5xl md:text-7xl font-black text-[#9B1C1C] leading-tight">

            Lifestyle Designed
            <br />

            <span className="text-[#D4A017]">
              For Luxury Living
            </span>

          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg md:text-2xl text-[#4A1F12]/70 leading-relaxed">

            Experience world-class amenities crafted
            to elevate comfort, wellness,
            security, and modern luxury lifestyles.

          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">

          {amenities.map((item, index) => {

            const Icon = item.icon

            return (

              <div
                key={index}
                className="group relative animate-[float_6s_ease-in-out_infinite]"
                style={{
                  animationDelay: `${index * 0.3}s`,
                }}
              >

                {/* GLOW */}
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#9B1C1C]/10 via-[#D4A017]/10 to-[#B76E79]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                {/* CARD */}
                <div className="relative min-h-[320px] overflow-hidden rounded-[40px] bg-white/70 backdrop-blur-2xl border border-white/50 p-10 shadow-[0_25px_80px_rgba(0,0,0,0.08)] hover:-translate-y-5 hover:shadow-[0_35px_120px_rgba(155,28,28,0.18)] transition-all duration-700">

                  {/* ICON */}
                  <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-[#9B1C1C] via-[#B76E79] to-[#D4A017] flex items-center justify-center shadow-2xl">

                    <Icon className="w-10 h-10 text-white" />

                  </div>

                  {/* TITLE */}
                  <h3 className="mt-10 text-3xl font-black text-[#9B1C1C]">

                    {item.title}

                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-6 text-lg text-[#4A1F12]/70 leading-relaxed">

                    {item.desc}

                  </p>

                  {/* BORDER */}
                  <div className="absolute inset-0 rounded-[40px] border border-white/30 pointer-events-none"></div>

                </div>

              </div>

            )
          })}

        </div>

      </div>

    </section>
  )
}