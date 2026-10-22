import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Search } from 'lucide-react'
import { connectDB } from '@/lib/db'
import { Property } from '@/lib/models'
import { ensurePropertiesSeeded, toPropertyJSON } from '@/lib/properties'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Properties',
  description: 'Residential plots, apartments, villas and commercial properties for sale and rent across Bengaluru.',
}

const TYPES = ['Residential Plot', 'Apartment for Sale', 'Apartment for Rent', 'Independent House', 'Villa', 'Commercial Property']

export default async function PropertiesPage({ searchParams }: PageProps<'/properties'>) {
  const sp = await searchParams
  const q = typeof sp.q === 'string' ? sp.q.trim() : ''
  const type = typeof sp.type === 'string' ? sp.type : ''

  await ensurePropertiesSeeded()
  await connectDB()

  const filter: Record<string, unknown> = { status: { $ne: 'draft' } }
  if (q) {
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    filter.$or = [{ title: rx }, { location: rx }, { description: rx }]
  }
  if (type) filter.propertyType = type

  const properties = (await Property.find(filter).sort({ featured: -1, createdAt: -1 }).lean()).map(toPropertyJSON)

  return (
    <main className="bg-ivory">
      {/* HEADER */}
      <section className="container-x pt-12 md:pt-20 pb-8 md:pb-12">
        <p className="eyebrow">Our Portfolio</p>
        <h1 className="heading-xl mt-5 max-w-4xl">
          Properties across <em className="text-gold-deep">Bengaluru</em>
        </h1>
        <p className="lead mt-5 max-w-2xl">
          Verified plots, homes and commercial spaces — every listing backed by clear titles and complete documentation.
        </p>

        {/* FILTERS (plain GET form, works without JavaScript) */}
        <form className="mt-10 flex flex-col sm:flex-row gap-3" action="/properties">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-bronze/40" />
            <input name="q" defaultValue={q} placeholder="Search by area or project" className="field !pl-11" />
          </div>
          <select name="type" defaultValue={type} className="field sm:!w-60">
            <option value="">All property types</option>
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <button className="btn btn-primary">Search</button>
        </form>
      </section>

      {/* GRID */}
      <section className="container-x pb-20 md:pb-28">
        <p className="text-sm text-bronze/60 mb-6">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'}
          {(q || type) && (
            <>
              {' '}
              ·{' '}
              <Link href="/properties" className="text-ruby font-medium">
                Clear filters
              </Link>
            </>
          )}
        </p>

        {properties.length === 0 ? (
          <div className="card py-20 text-center">
            <p className="font-display text-3xl text-ruby">Nothing matches yet</p>
            <p className="mt-2 text-bronze/60">Tell us what you&apos;re looking for and we&apos;ll find it.</p>
            <Link href="/contact" className="btn btn-primary mt-6">
              Contact us
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {properties.map((p, i) => (
              <Reveal key={p._id} delay={(i % 3) * 100} as="article">
                <Link href={`/properties/${p._id}`} className="group block card overflow-hidden h-full">
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                    {p.images[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.title}
                        fill
                        unoptimized={p.images[0].startsWith('/api/')}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-bronze/40">Photos coming soon</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {p.featured && <span className="bg-gold text-ink text-[10px] font-bold tracking-wider px-3 py-1 rounded-full">FEATURED</span>}
                      {p.status === 'sold' && <span className="bg-ink text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full">SOLD</span>}
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                      <p className="flex items-center gap-1.5 text-xs text-white/80">
                        <MapPin className="w-3.5 h-3.5" /> {p.location}
                      </p>
                      <h2 className="mt-1.5 font-display text-2xl leading-tight">{p.title}</h2>
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-bronze/55 truncate">{[p.measurement, p.bedrooms].filter(Boolean).join(' · ')}</p>
                      <p className="mt-0.5 font-semibold text-ruby">{p.price}</p>
                    </div>
                    <span className="text-sm font-semibold text-bronze group-hover:text-ruby shrink-0">View →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
