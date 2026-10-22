'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import SectionHeading from './SectionHeading'

const COMPANIES = [
  {
    href: '/developers',
    short: 'Developers',
    title: 'Sri Megha Lakshmi Developers',
    subtitle: 'Land development & plotting',
    description:
      "One of Bengaluru's trusted development companies, specialising in land acquisition, site conversion, plotting and residential and commercial layout development.",
    services: [
      ['Land Acquisition', 'Strategically located land for layouts, gated communities, villas and investment.'],
      ['Site Conversion', 'Agricultural-to-residential and commercial conversion, approvals and legal processing.'],
      ['Residential Layouts', 'Roads, drainage, water supply, electricity, parks and modern infrastructure.'],
      ['Commercial Plots', 'Plots planned for offices, showrooms, retail and investment.'],
      ['DTCP & BMRDA Approved', 'Legally approved layouts that keep every purchase safe.'],
      ['Investment Consultation', 'Expert guidance on land and plots with high growth potential.'],
    ],
  },
  {
    href: '/constructions',
    short: 'Constructions',
    title: 'Sri Megha Lakshmi Constructions',
    subtitle: 'Residential, commercial & interiors',
    description:
      'High-quality construction for residential, commercial and industrial projects — from structural design and approvals through to interiors and handover.',
    services: [
      ['Residential Construction', 'Independent houses, villas, duplexes, apartments and gated communities.'],
      ['Commercial Construction', 'Office buildings, showrooms, retail spaces, hotels and complexes.'],
      ['Turnkey Projects', 'Planning, architecture, approvals, construction, interiors and handover.'],
      ['Interior Design', 'Modular kitchens, wardrobes, false ceilings and luxury interiors.'],
      ['Renovation & Remodelling', 'Modern upgrades for homes, apartments and offices.'],
      ['Building Maintenance', 'Repairs, waterproofing, painting and structural care.'],
    ],
  },
  {
    href: '/real-estate',
    short: 'Real Estate',
    title: 'Sri Megha Lakshmi Real Estate',
    subtitle: 'Sales, rentals & legal services',
    description:
      'Complete real estate solutions — buying, selling, rentals, leasing, legal documentation, registration and property consultancy.',
    services: [
      ['Residential Sales', 'Plots, apartments, villas, independent houses and luxury homes.'],
      ['Commercial Sales', 'Offices, complexes, showrooms, warehouses and investment properties.'],
      ['Rentals & Leasing', 'Residential and commercial rentals in prime locations.'],
      ['e-Khata Services', 'Registration, transfers, corrections and property tax.'],
      ['Property Registration', 'Document preparation, EC verification and registration management.'],
      ['Legal Documentation', 'Sale deeds, agreements, khata transfer and tax documents.'],
    ],
  },
]

export default function CompaniesSection() {
  const [active, setActive] = useState(0)
  const company = COMPANIES[active]

  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Companies"
          title={
            <>
              Three companies. <em className="text-gold-deep">One promise.</em>
            </>
          }
          description="Every stage of your property journey handled by a specialist team you can trust."
        />

        {/* TABS */}
        <div role="tablist" aria-label="Our companies" className="mt-12 grid grid-cols-3 gap-2 p-1.5 bg-ivory rounded-2xl border border-bronze/10 max-w-2xl mx-auto">
          {COMPANIES.map((c, i) => (
            <button
              key={c.href}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`rounded-xl px-2 py-3 sm:py-3.5 text-sm sm:text-[15px] font-semibold transition-all ${
                active === i ? 'bg-ruby text-white shadow-lg shadow-ruby/20' : 'text-bronze hover:text-ruby'
              }`}
            >
              <span className="hidden sm:inline font-display text-lg mr-1.5 opacity-70">0{i + 1}</span>
              {c.short}
            </button>
          ))}
        </div>

        {/* PANEL */}
        <div key={active} role="tabpanel" className="mt-10 grid lg:grid-cols-[0.9fr_1.4fr] gap-10 lg:gap-16 animate-fade-up">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-bold text-gold-deep">{company.subtitle}</p>
            <h3 className="heading-md mt-3">{company.title}</h3>
            <p className="lead mt-5">{company.description}</p>
            <Link href={company.href} className="btn btn-primary mt-8">
              Visit {company.short} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ul className="grid sm:grid-cols-2 gap-4">
            {company.services.map(([title, desc]) => (
              <li key={title} className="flex gap-4 p-5 rounded-2xl bg-ivory border border-bronze/[0.07]">
                <span className="w-8 h-8 rounded-full bg-ruby text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </span>
                <span>
                  <span className="block font-semibold text-bronze">{title}</span>
                  <span className="block text-sm text-bronze/65 mt-1 leading-relaxed">{desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
