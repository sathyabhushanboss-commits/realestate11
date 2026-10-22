import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, MapPin } from 'lucide-react'
import { connectDB } from '@/lib/db'
import { Property } from '@/lib/models'
import { getSession } from '@/lib/auth'
import { ensurePropertiesSeeded, isId, toPropertyJSON } from '@/lib/properties'
import PropertyGallery from '@/components/PropertyGallery'
import FavoriteButton from '@/components/FavoriteButton'
import EnquiryForm from '@/components/EnquiryForm'

async function load(id: string) {
  if (!isId(id)) return null
  await ensurePropertiesSeeded()
  const doc = await Property.findById(id).lean()
  if (!doc) return null
  if (doc.status === 'draft' && (await getSession())?.role !== 'admin') return null
  return toPropertyJSON(doc)
}

export async function generateMetadata({ params }: PageProps<'/properties/[id]'>): Promise<Metadata> {
  const { id } = await params
  await connectDB()
  const p = await load(id)
  return p ? { title: p.title, description: p.description.slice(0, 160) } : { title: 'Property not found' }
}

export default async function PropertyDetailPage({ params }: PageProps<'/properties/[id]'>) {
  const { id } = await params
  await connectDB()
  const property = await load(id)
  if (!property) notFound()

  const specs = [
    ['Area', property.measurement],
    ['Configuration', property.bedrooms],
    ['Type', property.propertyType],
    ['Bathrooms', property.bathrooms],
    ['Balconies', property.balconies],
    ['Deposit', property.securityDeposit],
    ['Year built', property.year],
  ].filter(([, v]) => v)

  return (
    <main className="bg-ivory">
      <div className="container-x pt-6 md:pt-10">
        <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-medium text-bronze/70 hover:text-ruby">
          <ArrowLeft className="w-4 h-4" /> All properties
        </Link>
      </div>

      <div className="container-x py-6 md:py-10 grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-14">
        {/* MEDIA */}
        <div className="space-y-6 min-w-0">
          <PropertyGallery images={property.images} title={property.title} />
          {property.videos.map((src) => (
            <video key={src} src={src} controls playsInline preload="metadata" className="w-full rounded-2xl bg-black aspect-video" />
          ))}
        </div>

        {/* DETAILS */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {property.status === 'sold' && (
              <span className="bg-ink text-white text-xs font-semibold px-3 py-1 rounded-full">Sold / Rented</span>
            )}
            {property.status === 'draft' && (
              <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">Draft — only admins see this</span>
            )}
            <p className="flex items-center gap-1.5 text-sm text-gold-deep font-semibold">
              <MapPin className="w-4 h-4" /> {property.location}
            </p>
          </div>

          <h1 className="heading-lg mt-3">{property.title}</h1>

          <div className="mt-5 flex items-center justify-between gap-4 pb-6 border-b border-bronze/10">
            <p className="font-display text-4xl text-bronze">{property.price}</p>
            <FavoriteButton
              propertyId={property._id}
              className="px-4 py-2.5 rounded-full border border-bronze/15 text-sm font-semibold text-bronze hover:border-ruby"
            />
          </div>

          {specs.length > 0 && (
            <dl className="grid grid-cols-2 gap-px bg-bronze/10 rounded-2xl overflow-hidden mt-6">
              {specs.map(([label, value]) => (
                <div key={label} className="bg-white p-4">
                  <dt className="text-xs text-bronze/55">{label}</dt>
                  <dd className="mt-1 font-semibold text-bronze">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {property.description && (
            <section className="mt-8">
              <h2 className="font-display text-2xl text-ruby">About this property</h2>
              <p className="mt-3 lead whitespace-pre-line">{property.description}</p>
            </section>
          )}

          {property.features.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-2xl text-ruby">Key features</h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-bronze">
                    <span className="w-6 h-6 rounded-full bg-gold/15 text-gold-deep flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="enquire" className="card p-5 sm:p-7 mt-10 scroll-mt-28">
            <h2 className="font-display text-3xl text-ruby">Enquire about this property</h2>
            <p className="text-sm text-bronze/60 mt-1 mb-5">We usually respond within a few hours.</p>
            <EnquiryForm propertyId={property._id} />
          </section>
        </div>
      </div>
    </main>
  )
}
