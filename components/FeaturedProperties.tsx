import Image from 'next/image'
import Link from 'next/link'
import { connection } from 'next/server'
import { connectDB } from '@/lib/db'
import { Property } from '@/lib/models'
import { ensurePropertiesSeeded, toPropertyJSON } from '@/lib/properties'

// Latest / featured listings from the admin panel, in the site's card style
export default async function FeaturedProperties() {
  await connection()
  await ensurePropertiesSeeded()
  await connectDB()
  const properties = (
    await Property.find({ status: 'published' }).sort({ featured: -1, createdAt: -1 }).limit(3).lean()
  ).map(toPropertyJSON)

  if (properties.length === 0) return null

  return (
    <section className="relative py-20 md:py-28 px-4 md:px-6 overflow-hidden bg-[#F8F6F2]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-[#D4A017]/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-5 py-3 shadow-xl">
            <div className="w-3 h-3 rounded-full bg-[#D4A017] animate-pulse"></div>
            <p className="uppercase tracking-[3px] md:tracking-[5px] text-[#9B1C1C] text-xs md:text-sm font-semibold">
              Featured Properties
            </p>
          </div>

          <h2 className="mt-8 text-4xl md:text-6xl font-black text-[#9B1C1C] leading-tight">
            Handpicked
            <br />
            <span className="text-[#D4A017]">Properties For You</span>
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-14 md:mt-16">
          {properties.map((p) => (
            <Link
              key={p._id}
              href={`/properties/${p._id}`}
              className="group block overflow-hidden rounded-3xl md:rounded-[40px] bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_25px_80px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-700"
            >
              <div className="relative h-[260px] md:h-[300px] overflow-hidden bg-gray-200">
                {p.images[0] && (
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    unoptimized={p.images[0].startsWith('/api/')}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/85 backdrop-blur-xl rounded-full px-4 py-1.5 max-w-[85%]">
                  <p className="uppercase tracking-[2px] text-[#9B1C1C] text-[10px] md:text-xs font-semibold truncate">{p.location}</p>
                </div>
              </div>

              <div className="p-5 md:p-7">
                <h3 className="text-xl md:text-2xl font-black text-[#9B1C1C] leading-tight">{p.title}</h3>
                <div className="grid grid-cols-2 gap-3 mt-4 p-3 bg-[#F8F6F2] rounded-xl">
                  <div className="min-w-0">
                    <p className="text-[#4A1F12]/50 text-xs">Area</p>
                    <p className="text-[#9B1C1C] font-bold text-sm truncate">{p.measurement || '—'}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#4A1F12]/50 text-xs">Configuration</p>
                    <p className="text-[#9B1C1C] font-bold text-sm truncate">{p.bedrooms || '—'}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-xl font-black text-[#D4A017]">{p.price}</p>
                  <span className="text-sm font-semibold text-[#9B1C1C] group-hover:translate-x-1 transition-transform">View Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-[#9B1C1C] hover:bg-[#7E1717] text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-500 hover:scale-105"
          >
            View All Properties →
          </Link>
        </div>
      </div>
    </section>
  )
}
