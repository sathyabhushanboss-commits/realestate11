'use client'

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Villa Owner',
    text: 'Sri Megha Lakshmi delivered an exceptional luxury living experience with premium quality construction and vastu-perfect layouts.',
  },

  {
    name: 'Priya Reddy',
    role: 'Apartment Buyer',
    text: 'The spacious layouts, modern amenities, and premium support made our home-buying journey seamless and luxurious.',
  },

  {
    name: 'Arjun Mehta',
    role: 'Investor',
    text: 'One of the best luxury real estate investments in Bangalore. Excellent appreciation value and premium craftsmanship.',
  },
]

export default function Testimonials() {

  return (

    <section className="relative py-32 px-4 md:px-6 overflow-hidden bg-[#F8F6F2]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-[#D4A017]/10 blur-3xl"></div>

        <div className="absolute bottom-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-[#9B1C1C]/10 blur-3xl"></div>

      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center">

          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-5 py-3 shadow-xl">

            <div className="w-3 h-3 rounded-full bg-[#D4A017] animate-pulse"></div>

            <p className="uppercase tracking-[5px] text-[#9B1C1C] text-xs md:text-sm font-semibold">
              Client Testimonials
            </p>

          </div>

          <h2 className="mt-8 text-5xl md:text-7xl font-black text-[#9B1C1C] leading-tight">

            Trusted By
            <br />

            <span className="text-[#D4A017]">
              Luxury Homeowners
            </span>

          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg md:text-2xl text-[#4A1F12]/70 leading-relaxed">

            Hear what our clients say about their premium
            real estate journey with Sri Megha Lakshmi.

          </p>

        </div>

        {/* TESTIMONIAL GRID */}
        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item, index) => (

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
              <div className="relative min-h-[320px] overflow-hidden rounded-[40px] bg-white/70 backdrop-blur-2xl border border-white/50 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)] hover:-translate-y-5 hover:shadow-[0_35px_120px_rgba(155,28,28,0.18)] transition-all duration-700">

                {/* QUOTE */}
                <div className="text-7xl text-[#D4A017]/20 font-black">
                  “
                </div>

                {/* TEXT */}
                <p className="mt-4 text-lg text-[#4A1F12]/75 leading-relaxed">

                  {item.text}

                </p>

                {/* USER */}
                <div className="mt-10">

                  <h3 className="text-2xl font-black text-[#9B1C1C]">

                    {item.name}

                  </h3>

                  <p className="mt-2 text-[#D4A017] uppercase tracking-[4px] text-sm">

                    {item.role}

                  </p>

                </div>

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