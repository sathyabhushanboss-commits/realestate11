import Image from 'next/image'
import Link from 'next/link'
import { connection } from 'next/server'
import { Check } from 'lucide-react'
import { getCompany, type CompanySlug } from '@/lib/companies'
import { COMPANY_LINKS } from '@/lib/site'
import Reveal from './Reveal'

const STATUS_STYLES: Record<string, string> = {
  available: 'bg-emerald-100 text-emerald-800',
  'few left': 'bg-amber-100 text-amber-800',
  'sold out': 'bg-ruby/10 text-ruby',
  'coming soon': 'bg-sky-100 text-sky-800',
}

// Uploaded media is streamed from /api/media and skips the image optimiser
const isUpload = (src: string) => src.startsWith('/api/')

export default async function CompanyPage({ slug }: { slug: CompanySlug }) {
  // Content is edited by the admin at runtime, so always render per request
  await connection()
  const company = await getCompany(slug)
  const [heroImage] = company.images
  const index = COMPANY_LINKS.findIndex((c) => c.href === `/${slug}`)
  const others = COMPANY_LINKS.filter((c) => c.href !== `/${slug}`)

  return (
    <main className="bg-ivory">
      {/* HERO */}
      <section className="relative min-h-[460px] md:min-h-[600px] flex items-end overflow-hidden bg-ink">
        {heroImage && (
          <Image
            src={heroImage}
            alt={company.name}
            fill
            priority
            unoptimized={isUpload(heroImage)}
            sizes="100vw"
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        {!heroImage && <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-ruby/30 blur-3xl" />}

        <div className="relative container-x pb-12 md:pb-20 pt-24">
          <p className="eyebrow eyebrow-light">
            {index >= 0 ? `0${index + 1} · ` : ''}Sri Megha Lakshmi Group
          </p>
          <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1.02] max-w-4xl text-balance">
            {company.name}
          </h1>
          {company.tagline && <p className="mt-5 text-lg md:text-xl text-white/75 max-w-2xl">{company.tagline}</p>}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/appointment" className="btn btn-gold">
              Book a Site Visit
            </Link>
            {company.priceList.length > 0 && (
              <a href="#prices" className="btn btn-ghost-light">
                See Price List
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT + HIGHLIGHTS */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">
          <Reveal>
            <p className="eyebrow">About</p>
            <div className="mt-6 space-y-5">
              {company.description
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((para, i) => (
                  <p
                    key={i}
                    className={i === 0 ? 'font-display text-2xl md:text-3xl leading-snug text-bronze' : 'lead whitespace-pre-line'}
                  >
                    {para}
                  </p>
                ))}
            </div>
          </Reveal>

          {company.highlights.length > 0 && (
            <Reveal delay={120}>
              <aside className="card p-7 md:p-9">
                <h2 className="font-display text-2xl text-ruby">Why choose us</h2>
                <ul className="mt-6 space-y-4">
                  {company.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-bronze">
                      <span className="w-6 h-6 rounded-full bg-gold/15 text-gold-deep flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          )}
        </div>
      </section>

      {/* VIDEOS */}
      {company.videos.length > 0 && (
        <section className="section bg-ink">
          <div className="container-x">
            <p className="eyebrow eyebrow-light">Video Tour</p>
            <h2 className="heading-lg mt-5 !text-white">See it for yourself</h2>
            <div className={`mt-10 grid gap-6 ${company.videos.length > 1 ? 'md:grid-cols-2' : 'max-w-4xl'}`}>
              {company.videos.map((src) => (
                <video
                  key={src}
                  src={src}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full rounded-3xl bg-black max-h-[80vh]"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {company.images.length > 0 && (
        <section className="section">
          <div className="container-x">
            <p className="eyebrow">Gallery</p>
            <h2 className="heading-lg mt-5">Our work</h2>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
              {company.images.map((src, i) => (
                <Reveal key={src} delay={(i % 3) * 80}>
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-sand"
                  >
                    <Image
                      src={src}
                      alt={`${company.name} photo ${i + 1}`}
                      fill
                      unoptimized={isUpload(src)}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRICE LIST */}
      <section id="prices" className="section bg-white scroll-mt-24">
        <div className="container-x max-w-5xl">
          <p className="eyebrow">Pricing</p>
          <h2 className="heading-lg mt-5">Price list</h2>

          {company.priceList.length === 0 ? (
            <p className="lead mt-6">
              Prices are available on request.{' '}
              <Link href="/contact" className="text-ruby font-semibold underline underline-offset-4">
                Contact us
              </Link>{' '}
              for the latest price list.
            </p>
          ) : (
            <>
              {/* Cards on phones */}
              <ul className="mt-10 grid gap-3 md:hidden">
                {company.priceList.map((row) => (
                  <li key={row.id} className="rounded-2xl border border-bronze/10 bg-ivory p-5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-bronze">{row.type}</p>
                      {row.status && <PriceStatus status={row.status} />}
                    </div>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <p className="text-sm text-bronze/60">{row.area || '—'}</p>
                      <p className="font-display text-2xl text-ruby">{row.price}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Table on larger screens */}
              <div className="hidden md:block mt-10 rounded-3xl border border-bronze/10 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-ink text-white/80 text-xs tracking-[0.18em] uppercase">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Type</th>
                      <th className="px-6 py-4 font-semibold">Area</th>
                      <th className="px-6 py-4 font-semibold">Price</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.priceList.map((row) => (
                      <tr key={row.id} className="border-t border-bronze/10 even:bg-ivory/60">
                        <td className="px-6 py-5 font-semibold text-bronze">{row.type}</td>
                        <td className="px-6 py-5 text-bronze/70">{row.area || '—'}</td>
                        <td className="px-6 py-5 font-display text-2xl text-ruby">{row.price}</td>
                        <td className="px-6 py-5">{row.status && <PriceStatus status={row.status} />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {company.priceNote && <p className="text-sm text-bronze/55 mt-5">* {company.priceNote}</p>}
            </>
          )}
        </div>
      </section>

      {/* SISTER COMPANIES */}
      <section className="section">
        <div className="container-x">
          <p className="eyebrow">Also from the group</p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {others.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group card p-6 md:p-8 flex items-center justify-between gap-4 hover:-translate-y-0.5 transition-transform"
              >
                <span>
                  <span className="block font-display text-2xl md:text-3xl text-ruby">{c.label}</span>
                  <span className="block text-sm text-bronze/60 mt-1">{c.note}</span>
                </span>
                <span className="text-2xl text-gold group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function PriceStatus({ status }: { status: string }) {
  return (
    <span
      className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${
        STATUS_STYLES[status.toLowerCase()] ?? 'bg-gray-100 text-gray-700'
      }`}
    >
      {status}
    </span>
  )
}
