'use client'

const stats = [
  {
    number: '250+',
    label: 'Luxury Homes',
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
    label: 'Satisfaction',
  },
]

export default function FloatingStats() {

  return (

    <section className="relative py-12 px-4 md:px-6 bg-[#F8F6F2] overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-[#9B1C1C]/10 blur-3xl"></div>

        <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full bg-[#D4A017]/10 blur-3xl"></div>

      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* FLOATING BAR */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, index) => (

            <div
              key={index}
              className="group relative animate-[float_6s_ease-in-out_infinite]"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >

              {/* GLOW */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#9B1C1C]/10 via-[#D4A017]/10 to-[#B76E79]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

              {/* CARD */}
              <div className="relative overflow-hidden rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/50 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)] hover:-translate-y-4 hover:shadow-[0_35px_120px_rgba(155,28,28,0.18)] transition-all duration-700 text-center">

                {/* NUMBER */}
                <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-br from-[#9B1C1C] via-[#B76E79] to-[#D4A017] bg-clip-text text-transparent">

                  {item.number}

                </h3>

                {/* LABEL */}
                <p className="mt-4 text-[#4A1F12]/70 text-base md:text-lg font-medium">

                  {item.label}

                </p>

                {/* PREMIUM BORDER */}
                <div className="absolute inset-0 rounded-[32px] border border-white/30 pointer-events-none"></div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}