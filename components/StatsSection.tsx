'use client'

const stats = [
  {
    number: '250+',
    label: 'Luxury Properties',
  },

  {
    number: '15+',
    label: 'Years Experience',
  },

  {
    number: '500+',
    label: 'Happy Clients',
  },

  {
    number: '98%',
    label: 'Client Satisfaction',
  },
]

export default function StatsSection() {

  return (

    <section className="relative py-24 px-4 md:px-6 overflow-hidden bg-[#F8F6F2]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        {/* RUBY GLOW */}
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[#9B1C1C]/10 blur-3xl"></div>

        {/* GOLD GLOW */}
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-[#D4A017]/10 blur-3xl"></div>

      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* TOP */}
        <div className="text-center">

          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-5 py-3 shadow-xl">

            <div className="w-3 h-3 rounded-full bg-[#D4A017] animate-pulse"></div>

            <p className="uppercase tracking-[5px] text-[#9B1C1C] text-xs md:text-sm font-semibold">
              Trusted Luxury Brand
            </p>

          </div>

          <h2 className="mt-8 text-5xl md:text-7xl font-black text-[#9B1C1C] leading-tight">

            Building Luxury
            <br />

            <span className="text-[#D4A017]">
              Since 1997
            </span>

          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg md:text-2xl text-[#4A1F12]/70 leading-relaxed">

            Delivering premium homes,
            modern architecture,
            and trusted luxury real estate
            experiences across Bengaluru.

          </p>

        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-20">

          {stats.map((item, index) => (

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
              <div className="relative overflow-hidden rounded-[40px] bg-white/70 backdrop-blur-2xl border border-white/50 p-8 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.08)] hover:-translate-y-5 hover:shadow-[0_35px_120px_rgba(155,28,28,0.18)] transition-all duration-700 text-center">

                {/* NUMBER */}
                <h3 className="text-5xl md:text-6xl font-black bg-gradient-to-br from-[#9B1C1C] via-[#B76E79] to-[#D4A017] bg-clip-text text-transparent">

                  {item.number}

                </h3>

                {/* LABEL */}
                <p className="mt-5 text-[#4A1F12]/70 text-lg font-medium">

                  {item.label}

                </p>

                {/* BORDER */}
                <div className="absolute inset-0 rounded-[40px] border border-white/30 pointer-events-none"></div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}