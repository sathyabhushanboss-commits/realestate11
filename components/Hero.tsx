import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { COMPANY_LINKS } from '@/lib/site'
import LeadPopup from './LeadPopup'

const STATS = [
  { value: '15+', label: 'Years of experience' },
  { value: '500+', label: 'Happy clients' },
  { value: '250+', label: 'Projects delivered' },
  { value: '100%', label: 'Legal transparency' },
]

export default function Hero() {
  return (
    <>
      <LeadPopup />

      <section className="relative overflow-hidden bg-ivory">
        {/* soft decorative light */}
        <div className="pointer-events-none absolute -top-40 right-[-10%] w-[640px] h-[640px] rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-[-15%] w-[520px] h-[520px] rounded-full bg-ruby/[0.06] blur-3xl" />

        <div className="relative container-x grid lg:grid-cols-12 gap-12 lg:gap-10 items-center pt-10 pb-16 md:pt-16 lg:pt-20 lg:pb-24">
          {/* COPY */}
          <div className="lg:col-span-7 animate-fade-up">
            <p className="eyebrow">Bengaluru&apos;s trusted property group</p>

            <h1 className="heading-xl mt-6">
              Sri Megha Lakshmi
              <span className="block italic font-medium text-gold-deep">Group of Companies</span>
            </h1>

            <p className="lead mt-6 max-w-xl">
              Land development, construction, property sales, rentals, interiors, e-Khata and legal documentation —
              one trusted family of companies, from first site visit to final handover.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/properties" className="btn btn-primary">
                Explore Properties <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/appointment" className="btn btn-outline">
                Book a Site Visit
              </Link>
            </div>

            {/* COMPANY SHORTCUTS */}
            <ul className="mt-12 grid sm:grid-cols-3 gap-px bg-bronze/10 rounded-2xl overflow-hidden border border-bronze/10">
              {COMPANY_LINKS.map((c, i) => (
                <li key={c.href} className="bg-ivory">
                  <Link href={c.href} className="group flex sm:block items-center gap-4 p-4 sm:p-5 hover:bg-white transition-colors">
                    <span className="font-display text-3xl text-gold leading-none">0{i + 1}</span>
                    <span className="block sm:mt-3">
                      <span className="block font-semibold text-bronze group-hover:text-ruby transition-colors">{c.short}</span>
                      <span className="block text-xs text-bronze/55 mt-0.5">{c.note}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* IMAGERY */}
          <div className="lg:col-span-5 relative mx-auto w-full max-w-[420px] lg:max-w-none animate-fade-up [animation-delay:150ms]">
            <div className="relative aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(30,12,7,0.45)] ring-1 ring-gold/30">
              <Image
                src="/properties/set3.1.jpeg"
                alt="Residential building by Sri Megha Lakshmi Group in Koramangala"
                fill
                priority
                sizes="(max-width: 1024px) 420px, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            </div>

            {/* inset photo */}
            <div className="hidden sm:block absolute -left-10 lg:-left-16 bottom-16 w-36 lg:w-44 aspect-[3/4] rounded-2xl overflow-hidden border-4 border-ivory shadow-xl">
              <Image src="/properties/set4.jpeg" alt="" fill sizes="176px" className="object-cover" />
            </div>

            {/* trust card */}
            <div className="absolute -bottom-6 right-4 sm:-right-4 card px-5 py-4 flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <Image src="/logo.jpeg" alt="" fill sizes="48px" className="object-cover" />
              </div>
              <div>
                <p className="font-display text-3xl text-ruby leading-none">15+</p>
                <p className="text-xs text-bronze/60 mt-1">years building trust</p>
              </div>
            </div>
          </div>
        </div>

        {/* STATS BAND */}
        <div className="relative bg-ink">
          <div className="container-x grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`py-8 md:py-10 px-2 text-center ${i % 2 === 1 ? 'border-l border-white/10' : ''} ${
                  i >= 2 ? 'border-t lg:border-t-0 border-white/10' : ''
                } ${i === 2 ? 'lg:border-l' : ''}`}
              >
                <p className="font-display text-4xl md:text-5xl text-gold-soft">{s.value}</p>
                <p className="mt-2 text-[11px] md:text-xs tracking-[0.2em] uppercase text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Sri Megha Lakshmi Group',
              url: 'https://www.srimeghalakshmi.in',
              logo: 'https://www.srimeghalakshmi.in/logo.jpeg',
              description:
                'Sri Megha Lakshmi Group is a real estate developer and construction company in Bangalore offering land development, plotting, construction, interiors, rentals, e-Khata, property registration and legal real estate services.',
              address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'India' },
              contactPoint: { '@type': 'ContactPoint', telephone: '+91-9741021116', contactType: 'customer service' },
            }),
          }}
        />
      </section>
    </>
  )
}
