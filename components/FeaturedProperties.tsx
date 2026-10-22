import Image from 'next/image'
import Link from 'next/link'
import { connection } from 'next/server'
import { ArrowRight, MapPin } from 'lucide-react'
import { connectDB } from '@/lib/db'
import { Property } from '@/lib/models'
import { ensurePropertiesSeeded, toPropertyJSON } from '@/lib/properties'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default async function FeaturedProperties() {
  // Listings change from the admin panel, so read them per request
  await connection()
  await ensurePropertiesSeeded()
  await connectDB()
  const properties = (
    await Property.find({ status: 'published' }).sort({ featured: -1, createdAt: -1 }).limit(3).lean()
  ).map(toPropertyJSON)

  if (properties.length === 0) return null

  return (
    <section className="section bg-ivory">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Featured Properties"
            title={
              <>
                Addresses worth <em className="text-gold-deep">owning</em>
              </>
            }
          />
          <Reveal>
            <Link href="/properties" className="btn btn-outline">
              View all properties <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        {/* Horizontal swipe on phones, grid on larger screens */}
        <div className="mt-12 -mx-5 px-5 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-2 [scrollbar-width:none]">
          {properties.map((p, i) => (
            <Reveal key={p._id} delay={i * 120} as="article" className="snap-start shrink-0 w-[82%] sm:w-auto">
              <Link href={`/properties/${p._id}`} className="group block">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-sand">
                  {p.images[0] && (
                    <Image
                      src={p.images[0]}
                      alt={p.title}
                      fill
                      unoptimized={p.images[0].startsWith('/api/')}
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <span className="absolute top-4 left-4 bg-ivory/90 backdrop-blur text-bronze text-[11px] font-semibold px-3 py-1 rounded-full">
                    {p.propertyType || p.bedrooms || 'Property'}
                  </span>
                  <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                    <p className="flex items-center gap-1.5 text-xs text-white/75">
                      <MapPin className="w-3.5 h-3.5" /> {p.location}
                    </p>
                    <h3 className="mt-2 font-display text-[1.7rem] leading-tight">{p.title}</h3>
                    <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-sm">
                      <span className="text-gold-soft font-semibold">{p.price}</span>
                      <span className="text-white/80">{p.measurement}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
