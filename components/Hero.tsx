'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F6F2] pt-0">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* GOLD GRADIENT */}
        <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-[#D4A017]/20 blur-3xl animate-pulse"></div>
        {/* RUBY RED GRADIENT */}
        <div className="absolute bottom-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-[#9B1C1C]/10 blur-3xl"></div>
        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:70px_70px]"></div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-20 md:pb-28 lg:pb-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT CONTENT */}
        <div>
          {/* TAG */}
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-4 md:px-5 py-2 md:py-3 shadow-lg mb-6 md:mb-8 hover:scale-105 transition-all duration-500">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#D4A017] animate-pulse"></div>
            <p className="uppercase tracking-[3px] md:tracking-[5px] text-[#9B1C1C] text-xs md:text-sm font-semibold">
              Premium Luxury Real Estate
            </p>
          </div>

          {/* HEADING */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] md:leading-[0.95] text-[#9B1C1C]">
            Spacious
            <br />
            <span className="relative inline-block">
              Homes
              <div className="absolute bottom-1 left-0 w-full h-2 md:h-4 bg-[#D4A017]/30 -z-10 rounded-full"></div>
            </span>
            <br />
            Tailored
            <br />
            <span className="text-[#D4A017]">For You</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 md:mt-10 text-lg md:text-xl lg:text-2xl text-[#4A1F12]/75 leading-relaxed max-w-2xl">
            Discover thoughtfully designed luxury homes at
            <span className="font-bold text-[#9B1C1C]"> Sri Megha Lakshmi</span>,
            where every residence is crafted for space,
            comfort, vastu harmony, and modern living
            in Bengaluru.
          </p>

          {/* PROPERTY TYPES */}
          <div className="grid grid-cols-3 gap-3 md:gap-5 mt-8 md:mt-12">
            {[
              {
                type: '2 BHK',
                size: '1149 - 1283 SQFT',
              },
              {
                type: '3 BHK',
                size: '1512 - 2049 SQFT',
              },
              {
                type: '4 BHK',
                size: '2721 - 2735 SQFT',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl md:rounded-[28px] p-4 md:p-6 shadow-xl hover:-translate-y-2 md:hover:-translate-y-4 hover:shadow-2xl transition-all duration-700"
              >
                <h3 className="text-xl md:text-3xl font-black text-[#9B1C1C]">
                  {item.type}
                </h3>
                <p className="mt-2 md:mt-4 text-[#4A1F12]/70 text-xs md:text-sm leading-relaxed">
                  {item.size}
                </p>
              </div>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 md:gap-5 mt-10 md:mt-14">
            <Link
              href="/properties"
              className="group relative overflow-hidden bg-[#9B1C1C] hover:bg-[#7E1717] text-white px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl text-base md:text-lg font-semibold shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <span className="relative z-10">View Properties</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4A017]/0 via-white/20 to-[#D4A017]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </Link>

            <Link
              href="/appointment"
              className="bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 hover:bg-white text-[#4A1F12] px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl text-base md:text-lg font-semibold shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              Book Appointment
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 mt-12 md:mt-20">
            {[
              {
                value: '250+',
                label: 'Luxury Properties',
              },
              {
                value: '15+',
                label: 'Years Experience',
              },
              {
                value: '500+',
                label: 'Happy Clients',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl md:rounded-[30px] p-4 md:p-6 shadow-xl hover:-translate-y-2 md:hover:-translate-y-3 transition-all duration-700"
              >
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#9B1C1C]">
                  {item.value}
                </h3>
                <p className="mt-2 md:mt-3 text-[#4A1F12]/70 text-sm md:text-base">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center items-center mt-10 lg:mt-0">
          {/* GLOW */}
          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px] rounded-full bg-[#D4A017]/20 blur-3xl animate-pulse"></div>

          {/* FLOATING CARD */}
          <div className="absolute top-0 md:top-10 right-0 bg-white/80 backdrop-blur-2xl border border-white/50 rounded-2xl md:rounded-[28px] p-3 md:p-6 shadow-2xl z-20 animate-bounce">
            <p className="uppercase tracking-[2px] md:tracking-[4px] text-[#D4A017] text-[10px] md:text-xs">
              Premium Living
            </p>
            <h3 className="text-sm md:text-2xl font-bold text-[#9B1C1C] mt-1 md:mt-3">
              Bangalore's Finest
            </h3>
          </div>

          {/* IMAGE CONTAINER */}
          <div className="relative group w-full">
            {/* GLASS FRAME */}
            <div className="absolute inset-0 rounded-[30px] md:rounded-[50px] bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-xl border border-white/40 shadow-2xl"></div>

            {/* IMAGE */}
            <div className="relative rounded-[30px] md:rounded-[50px] overflow-hidden shadow-[0_30px_100px_rgba(74,31,18,0.25)] border border-white/40">
              <Image
                src="/logo.jpeg"
                alt="Sri Megha Lakshmi Luxury Real Estate Bangalore - Premium homes with spacious layouts and modern amenities"
                width={650}
                height={650}
                priority
                className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-[3000ms]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            name: 'Sri Megha Lakshmi',
            description: 'Premium luxury real estate developer in Bangalore offering spacious 2BHK, 3BHK, and 4BHK homes with vastu compliance and modern amenities.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Bangalore',
              addressRegion: 'Karnataka',
              addressCountry: 'India',
            },
            areaServed: 'Bangalore',
            knowsAbout: ['Luxury Apartments', 'Vastu Friendly Homes', 'Premium Real Estate', 'Bangalore Properties'],
            offers: {
              '@type': 'Offer',
              description: 'Luxury homes with spacious layouts, natural ventilation, and premium amenities',
              itemOffered: {
                '@type': 'Product',
                name: 'Luxury Apartments in Bangalore',
                category: 'Real Estate',
              },
            },
          }),
        }}
      />
    </section>
  )
}