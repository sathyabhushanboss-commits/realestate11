'use client'

const brands = [
  'Luxury Living',
  'Premium Villas',
  'Modern Architecture',
  'Smart Homes',
  'Vastu Design',
  'Luxury Apartments',
  'Elite Communities',
  'Future Living',
]

export default function TrustedSection() {

  return (

    <section className="relative py-20 overflow-hidden bg-[#4A1F12]">

      {/* TOP GRADIENT */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent"></div>

      {/* TITLE */}
      <div className="text-center mb-12 px-4">

        <p className="uppercase tracking-[6px] text-[#D4A017] text-xs md:text-sm font-semibold">
          Trusted Luxury Brand
        </p>

      </div>

      {/* MARQUEE */}
      <div className="relative overflow-hidden">

        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">

          {[...brands, ...brands].map((brand, index) => (

            <div
              key={index}
              className="flex items-center gap-6 mx-10"
            >

              {/* DOT */}
              <div className="w-3 h-3 rounded-full bg-[#D4A017] shadow-[0_0_20px_rgba(212,160,23,1)]"></div>

              {/* TEXT */}
              <h3 className="text-3xl md:text-5xl font-black text-white/90">

                {brand}

              </h3>

            </div>

          ))}

        </div>

      </div>

      {/* BOTTOM GRADIENT */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent"></div>

    </section>
  )
}