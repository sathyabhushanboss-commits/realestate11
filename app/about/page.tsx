'use client'

import Image from 'next/image'

const features = [
  {
    title: 'Smart Design',
    desc: 'Optimized layouts crafted for spacious living and modern lifestyles.',
  },
  {
    title: 'Vaastu Friendly',
    desc: 'Every residence designed with harmony, balance, and positive energy.',
  },
  {
    title: 'Ventilated Homes',
    desc: 'Natural airflow and abundant sunlight for healthier living.',
  },
  {
    title: 'Balcony Spaces',
    desc: 'Private and semi-private outdoor experiences with scenic views.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Explore Projects',
  },
  {
    number: '02',
    title: 'Schedule Site Visit',
  },
  {
    number: '03',
    title: 'Book Your Home',
  },
  {
    number: '04',
    title: 'Construction Updates',
  },
  {
    number: '05',
    title: 'Handover',
  },
  {
    number: '06',
    title: 'After-Sales Support',
  },
]

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F6F2]">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden">
        {/* RUBY GLOW */}
        <div className="absolute top-[-250px] left-[-200px] w-[700px] h-[700px] rounded-full bg-[#9B1C1C]/10 blur-3xl"></div>
        {/* GOLD GLOW */}
        <div className="absolute bottom-[-250px] right-[-200px] w-[700px] h-[700px] rounded-full bg-[#D4A017]/10 blur-3xl"></div>
        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      {/* HERO - No top padding, starts immediately */}
      <section className="relative pt-0 pb-20 md:pb-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT */}
          <div>
            {/* TAG */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-xl">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#D4A017] animate-pulse"></div>
              <p className="uppercase tracking-[4px] md:tracking-[6px] text-[#9B1C1C] text-xs md:text-sm font-semibold">
                Luxury Real Estate
              </p>
            </div>

            {/* TITLE */}
            <h1 className="mt-6 md:mt-8 text-5xl md:text-6xl lg:text-8xl font-black leading-[0.95] text-[#9B1C1C]">
              Spacious Homes
              <br />
              <span className="text-[#D4A017]">Tailored</span>
              <br />
              For You
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 md:mt-8 text-lg md:text-xl text-[#4A1F12]/70 leading-relaxed max-w-2xl">
              Discover thoughtfully designed luxury homes in Bengaluru,
              crafted for comfort, elegance, vastu harmony,
              and premium modern living experiences.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-8 md:mt-10">
              <button className="group relative overflow-hidden bg-gradient-to-r from-[#9B1C1C] to-[#B76E79] hover:scale-105 transition-all duration-500 text-white px-7 md:px-10 py-4 md:py-5 rounded-2xl font-semibold shadow-[0_20px_60px_rgba(155,28,28,0.35)]">
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
              <button className="bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 hover:bg-white transition-all duration-500 text-[#9B1C1C] px-7 md:px-10 py-4 md:py-5 rounded-2xl font-semibold shadow-xl">
                Book Site Visit
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16">
              {['2 BHK', '3 BHK', '4 BHK', 'Luxury'].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl md:rounded-[28px] p-5 md:p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-700"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-[#9B1C1C]">
                    {item}
                  </h3>
                  <p className="mt-2 text-[#D4A017] uppercase tracking-[3px] text-xs md:text-sm">
                    Premium Living
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#9B1C1C]/10 to-[#D4A017]/10 blur-3xl rounded-[40px]"></div>

            {/* IMAGE CARD */}
            <div className="relative h-[420px] md:h-[550px] lg:h-[720px] rounded-[40px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.18)] border border-white/40 bg-white/40 backdrop-blur-xl">
              <Image
                src="/property1.jpg"
                alt="Luxury Homes Bangalore"
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-[2500ms]"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

              {/* INFO CARD */}
              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[30px] p-5 md:p-8">
                <p className="uppercase tracking-[4px] text-[#D4A017] text-xs md:text-sm">
                  Premium Living
                </p>
                <h3 className="mt-3 text-2xl md:text-4xl font-black text-white">
                  Homes That Breathe
                </h3>
                <p className="mt-3 text-white/80 text-sm md:text-lg leading-relaxed">
                  Crafted with luxury, vastu harmony,
                  spacious layouts, and future-ready comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - 4 items grid */}
      <section className="relative py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADING */}
          <div className="text-center">
            <p className="uppercase tracking-[6px] md:tracking-[8px] text-[#D4A017] text-sm md:text-base">Modern Living</p>
            <h2 className="mt-4 md:mt-6 text-4xl md:text-5xl lg:text-7xl font-black text-[#9B1C1C]">
              Thoughtfully Planned Homes
            </h2>
            <p className="max-w-3xl mx-auto mt-6 md:mt-8 text-lg md:text-xl text-[#4A1F12]/70 leading-relaxed px-4">
              Experience premium homes designed for modern lifestyles,
              natural ventilation, spacious living,
              and elegant architectural experiences.
            </p>
          </div>

          {/* GRID - 4 items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl md:rounded-[36px] p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-3 md:hover:-translate-y-5 hover:shadow-[0_30px_80px_rgba(155,28,28,0.15)] transition-all duration-700"
              >
                <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-[#D4A017]/10 rounded-full blur-3xl"></div>
                <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#9B1C1C] to-[#D4A017] mb-5 md:mb-8 group-hover:rotate-6 transition-transform duration-500"></div>
                <h3 className="relative text-2xl md:text-3xl font-black text-[#9B1C1C]">
                  {feature.title}
                </h3>
                <p className="relative mt-4 md:mt-6 text-[#4A1F12]/70 leading-relaxed text-sm md:text-base">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION - 3+3 Grid for Desktop */}
      <section className="relative py-20 md:py-32 px-4 md:px-6 overflow-hidden bg-[#F8F6F2]">
        {/* BACKGROUND EFFECTS */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-[#9B1C1C]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-[#B76E79]/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* HEADING */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 md:gap-3 bg-white/70 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-xl">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#D4A017] animate-pulse"></div>
              <p className="uppercase tracking-[4px] md:tracking-[6px] text-[#9B1C1C] text-xs md:text-sm font-semibold">
                Our Luxury Process
              </p>
            </div>
            <h2 className="mt-6 md:mt-8 text-4xl md:text-5xl lg:text-7xl font-black text-[#9B1C1C] leading-tight">
              Your Journey To
              <br />
              <span className="text-[#B76E79]">Your Dream Home</span>
            </h2>
            <p className="max-w-3xl mx-auto mt-6 md:mt-8 text-lg md:text-xl text-[#4A1F12]/70 leading-relaxed px-4">
              Experience a seamless luxury property journey
              designed with elegance, transparency,
              and premium personalized support.
            </p>
          </div>

          {/* PROCESS GRID - 3+3 Grouped Layout */}
          <div className="mt-12 md:mt-20">
            {/* First Row - 3 items */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
              {processSteps.slice(0, 3).map((item, index) => (
                <ProcessCard key={index} item={item} index={index} />
              ))}
            </div>
            
            {/* Second Row - 3 items */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {processSteps.slice(3, 6).map((item, index) => (
                <ProcessCard key={index + 3} item={item} index={index + 3} />
              ))}
            </div>
          </div>

          {/* BOTTOM INDICATOR */}
          <div className="flex justify-center mt-12 md:mt-24">
            <div className="flex items-center gap-3 md:gap-4 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full px-6 md:px-10 py-3 md:py-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-[#9B1C1C] animate-ping"></div>
              <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-[#D4A017] animate-pulse"></div>
              <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-[#B76E79] animate-bounce"></div>
              <p className="uppercase tracking-[3px] md:tracking-[5px] text-[#9B1C1C] text-xs md:text-sm font-semibold">
                Luxury Experience Journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM ANIMATIONS STYLESHEET */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }
          
          @keyframes slide {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0%);
            }
          }
        `}
      </style>
    </main>
  )
}

// Process Card Component
function ProcessCard({ item, index }: { item: { number: string; title: string }; index: number }) {
  return (
    <div className="group relative">
      {/* FLOATING ANIMATION */}
      <div
        className="transition-all duration-700"
        style={{
          animation: `float ${6 + index * 0.5}s ease-in-out infinite`,
        }}
      >
        {/* OUTER GLOW */}
        <div className="absolute inset-0 rounded-2xl md:rounded-[40px] bg-gradient-to-br from-[#9B1C1C]/10 via-[#D4A017]/10 to-[#B76E79]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

        {/* CARD */}
        <div className="relative min-h-[280px] md:min-h-[360px] overflow-hidden rounded-2xl md:rounded-[40px] bg-white/70 backdrop-blur-2xl border border-white/50 p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)] hover:-translate-y-3 md:hover:-translate-y-5 hover:shadow-[0_35px_120px_rgba(155,28,28,0.18)] transition-all duration-700 flex flex-col justify-between">
          {/* INNER GLOW */}
          <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-[#B76E79]/10 rounded-full blur-3xl"></div>

          {/* NUMBER */}
          <div className="relative">
            <div className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#9B1C1C] via-[#D4A017] to-[#B76E79]">
              {item.number}
            </div>
            {/* ANIMATED DOT */}
            <div className="mt-4 md:mt-6 flex items-center gap-2 md:gap-3">
              <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#D4A017] shadow-[0_0_30px_rgba(212,160,23,1)] animate-pulse"></div>
              <div className="h-[2px] w-12 md:w-16 bg-gradient-to-r from-[#D4A017] to-transparent"></div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative mt-8 md:mt-10">
            <h3 className="text-2xl md:text-3xl font-black text-[#9B1C1C] leading-tight">
              {item.title}
            </h3>
            <p className="mt-4 md:mt-6 text-[#4A1F12]/70 leading-relaxed text-sm md:text-lg">
              Experience a smooth, transparent,
              and premium luxury property journey
              with complete professional guidance.
            </p>
          </div>

          {/* LOOP ANIMATION BAR */}
          <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden rounded-full">
            <div className="h-full w-[200%] bg-gradient-to-r from-[#9B1C1C] via-[#D4A017] to-[#B76E79] animate-[slide_3s_linear_infinite]"></div>
          </div>

          {/* PREMIUM BORDER */}
          <div className="absolute inset-0 rounded-2xl md:rounded-[40px] border border-white/30 pointer-events-none"></div>
        </div>
      </div>
    </div>
  )
}