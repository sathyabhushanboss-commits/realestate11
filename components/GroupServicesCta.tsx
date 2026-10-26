import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { COMPANY_CONTENT, serviceAnchor } from '@/lib/companyContent'
import type { CompanySlug } from '@/lib/companies'

const COMPANIES: { slug: CompanySlug; name: string; title: string; image: string; alt: string }[] = [
  {
    slug: 'developers',
    name: 'Developers',
    title: 'Land Development & Plotting',
    image: '/services/developers-layout-aerial-bengaluru.webp',
    alt: 'Aerial view of an approved residential plotted layout near Bengaluru',
  },
  {
    slug: 'constructions',
    name: 'Constructions',
    title: 'Residential, Commercial & Interiors',
    image: '/services/independent-house-construction-bengaluru.webp',
    alt: 'Modern independent house built in Bengaluru',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    title: 'Sales, Rentals & Legal Services',
    image: '/services/luxury-villa-for-sale-bengaluru.webp',
    alt: 'Luxury villa for sale in a Bengaluru gated community',
  },
]

export default function GroupServicesCta() {
  return (
    <section className="bg-ivory py-16 md:py-24 font-sans" aria-labelledby="group-heading">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Sri Megha Lakshmi Group</p>
            <h2 id="group-heading" className="heading-lg mt-4">
              Three companies. One trusted partner.
            </h2>
            <p className="lead mt-4">
              Buy a plot, build your home and manage your property, all with one team that handles the land,
              the construction and the paperwork. Tap any service to see it in detail.
            </p>
          </div>
          <Link href="/appointment" className="btn btn-primary self-start md:self-auto">
            Book a Free Consultation
          </Link>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {COMPANIES.map((company) => {
            const href = `/${company.slug}`
            return (
              <article key={company.slug} className="group card overflow-hidden flex flex-col">
                <Link href={href} className="block relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={company.image}
                    alt={company.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <span className="absolute top-4 left-4 bg-ruby text-white text-xs font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full">
                    {company.name}
                  </span>
                  <h3 className="absolute bottom-4 left-5 right-5 font-display text-2xl md:text-3xl font-semibold text-white leading-tight">
                    {company.title}
                  </h3>
                </Link>

                <ul className="p-3 md:p-4 flex-1 divide-y divide-bronze/10">
                  {COMPANY_CONTENT[company.slug].services.map((service) => (
                    <li key={service.title}>
                      <Link
                        href={`${href}#${serviceAnchor(service.title)}`}
                        className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-[0.95rem] text-bronze hover:bg-sand/60 hover:text-ruby transition"
                      >
                        {service.title}
                        <ChevronRight className="w-4 h-4 shrink-0 text-gold-deep" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={href}
                  className="m-4 mt-0 inline-flex items-center justify-center gap-2 rounded-full bg-ruby hover:bg-ruby-dark text-white font-semibold py-3 transition"
                >
                  Explore {company.name}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
