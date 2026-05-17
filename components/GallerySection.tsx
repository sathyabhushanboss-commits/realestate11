'use client'

import Image from 'next/image'

const gallery = [
  '/property1.jpg',
  '/property2.jpg',
  '/property3.jpg',
  '/property1.jpg',
  '/property2.jpg',
  '/property3.jpg',
]

export default function GallerySection() {

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
              Luxury Gallery
            </p>

          </div>

          <h2 className="mt-8 text-5xl md:text-7xl font-black text-[#9B1C1C] leading-tight">

            Spaces Designed
            <br />

            <span className="text-[#D4A017]">
              For Modern Living
            </span>

          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg md:text-2xl text-[#4A1F12]/70 leading-relaxed">

            Explore premium architectural designs,
            luxury interiors,
            elegant living spaces,
            and modern developments.

          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">

          {gallery.map((image, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-[40px] animate-[float_6s_ease-in-out_infinite]"
              style={{
                animationDelay: `${index * 0.3}s`,
              }}
            >

              {/* GLOW */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#9B1C1C]/10 via-[#D4A017]/10 to-[#B76E79]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

              {/* IMAGE CARD */}
              <div className="relative h-[320px] md:h-[420px] overflow-hidden rounded-[40px] bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_25px_80px_rgba(0,0,0,0.08)] hover:-translate-y-5 hover:shadow-[0_35px_120px_rgba(155,28,28,0.18)] transition-all duration-700">

                {/* IMAGE */}
                <Image
                  src={image}
                  alt="Luxury Property"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[2500ms]"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                {/* CONTENT */}
                <div className="absolute bottom-6 left-6 right-6">

                  <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[24px] p-5">

                    <p className="uppercase tracking-[4px] text-[#D4A017] text-xs">

                      Premium Living

                    </p>

                    <h3 className="mt-3 text-2xl font-black text-white">

                      Luxury Spaces

                    </h3>

                  </div>

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