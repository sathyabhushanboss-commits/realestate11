'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const companies = [
    {
      number: '01',
      title: 'Sri Megha Lakshmi Developers',
      subtitle: 'Premium Land Development & Plotting Company',
      description:
        'Sri Megha Lakshmi Developers is one of Bengaluru’s trusted real estate development companies specializing in land acquisition, site conversion, plotting, and residential and commercial layout development. We focus on creating legally approved premium layouts with modern infrastructure, high investment value, and long-term growth opportunities. Our expert team handles every stage of the development process from identifying strategic locations to converting land, planning layouts, and selling premium plots.',
      services: [
        {
          title: 'Land Acquisition Services',
          desc:
            'We identify and acquire strategically located lands suitable for residential layouts, gated communities, villas, commercial developments, and future investment opportunities across Bengaluru and surrounding growth corridors.',
        },
        {
          title: 'Property Purchasing Assistance',
          desc:
            'Professional support for purchasing agricultural land, residential sites, commercial properties, and investment properties with complete legal verification and document validation.',
        },
        {
          title: 'Site Conversion',
          desc:
            'We provide complete agricultural-to-residential and agricultural-to-commercial site conversion services including government approvals, documentation, and legal processing.',
        },
        {
          title: 'Residential Layout Development',
          desc:
            'Development of premium residential layouts with wide roads, drainage systems, electricity connections, underground pipelines, water supply, streetlights, parks, and modern infrastructure.',
        },
        {
          title: 'Commercial Plot Development',
          desc:
            'Planning and development of commercial plots in high-demand business locations suitable for offices, showrooms, retail spaces, and investment purposes.',
        },
        {
          title: 'Plot Selling Services',
          desc:
            'Affordable and luxury residential plots for sale in rapidly developing areas with clear titles, legal approvals, and excellent appreciation potential.',
        },
        {
          title: 'DTCP & BMRDA Approved Projects',
          desc:
            'Development and marketing of legally approved layouts under DTCP, BMRDA, and local authority regulations ensuring safe investments for buyers.',
        },
        {
          title: 'Investment Consultation',
          desc:
            'Expert guidance for clients looking to invest in land and plots with high future growth and long-term appreciation value.',
        },
      ],
    },

    {
      number: '02',
      title: 'Sri Megha Lakshmi Constructions',
      subtitle: 'Residential, Commercial & Interior Construction Experts',
      description:
        'Sri Megha Lakshmi Constructions delivers high-quality construction services for residential, commercial, and industrial projects. We specialize in complete building construction, contract works, interior design solutions, compound wall construction, and turnkey project execution. Our mission is to provide durable construction, premium finishes, modern architecture, and timely project completion with customer satisfaction as our top priority.',
      services: [
        {
          title: 'Residential Construction',
          desc:
            'Complete construction services for independent houses, villas, duplex homes, apartments, and gated community residences using high-quality materials and modern designs.',
        },
        {
          title: 'Commercial Construction',
          desc:
            'Construction of commercial complexes, office buildings, showrooms, retail spaces, hotels, and business infrastructure with professional project management.',
        },
        {
          title: 'Civil Contract Works',
          desc:
            'Reliable labor and material contract services for all types of residential and commercial construction projects with quality assurance.',
        },
        {
          title: 'Turnkey Construction Projects',
          desc:
            'End-to-end turnkey construction solutions including planning, architecture, approvals, construction, interiors, finishing, and handover.',
        },
        {
          title: 'Interior Design Solutions',
          desc:
            'Modern and customized interior works including modular kitchens, wardrobes, false ceilings, TV units, office interiors, luxury interiors, and space planning.',
        },
        {
          title: 'Compound Wall Construction',
          desc:
            'Strong and attractive compound wall construction for residential layouts, villas, commercial buildings, and industrial properties.',
        },
        {
          title: 'Renovation & Remodeling',
          desc:
            'Modern renovation services for old homes, apartments, commercial buildings, and office spaces with upgraded designs and structural improvements.',
        },
        {
          title: 'Building Maintenance Services',
          desc:
            'Long-term maintenance services for residential and commercial buildings including repairs, waterproofing, painting, and structural maintenance.',
        },
      ],
    },

    {
      number: '03',
      title: 'Sri Megha Lakshmi Real Estate',
      subtitle: 'Property Sales, Rentals & Legal Documentation Services',
      description:
        'Sri Megha Lakshmi Real Estate offers complete real estate solutions including property buying, selling, rentals, leasing, legal documentation, registration, and property consultancy services. We help individuals, families, and businesses find the right residential and commercial properties with transparency, trust, and professional guidance. Our team also supports customers with e-Khata services, registration assistance, and property documentation.',
      services: [
        {
          title: 'Residential Property Sales',
          desc:
            'Buying and selling of residential plots, apartments, villas, independent houses, gated community homes, and luxury properties.',
        },
        {
          title: 'Commercial Property Sales',
          desc:
            'Sales and purchase support for offices, commercial complexes, showrooms, retail spaces, warehouses, and investment properties.',
        },
        {
          title: 'Property Purchase Guidance',
          desc:
            'Professional assistance in selecting, verifying, negotiating, and purchasing legally approved residential and commercial properties.',
        },
        {
          title: 'Residential Rental Services',
          desc:
            'Rental solutions for apartments, villas, independent houses, and family homes in prime residential areas of Bengaluru.',
        },
        {
          title: 'Commercial Rental Services',
          desc:
            'Commercial leasing and rental services for offices, shops, warehouses, industrial spaces, and business establishments.',
        },
        {
          title: 'e-Khata Services',
          desc:
            'Complete support for e-Khata registration, transfers, corrections, updates, and property tax-related services.',
        },
        {
          title: 'Property Registration Services',
          desc:
            'Professional registration support including document preparation, legal verification, EC verification, and registration process management.',
        },
        {
          title: 'Legal Documentation Assistance',
          desc:
            'Support for sale deeds, agreements, khata transfer, encumbrance certificates, tax documents, and legal property paperwork.',
        },
        {
          title: 'Real Estate Consultancy',
          desc:
            'Trusted consultancy services for property investment, legal approvals, property valuation, and real estate decision-making.',
        },
      ],
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#F8F6F2] py-20 lg:py-28">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-250px] right-[-250px] w-[700px] h-[700px] rounded-full bg-[#D4A017]/20 blur-3xl animate-pulse"></div>

        <div className="absolute bottom-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-[#9B1C1C]/10 blur-3xl"></div>

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:70px_70px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* HERO SECTION */}
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-5 py-3 shadow-lg mb-8">
            <div className="w-3 h-3 rounded-full bg-[#D4A017] animate-pulse"></div>

            <p className="uppercase tracking-[4px] text-[#9B1C1C] text-sm font-semibold">
              Bengaluru’s Trusted Real Estate & Construction Company
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight text-[#9B1C1C]">
            Sri Megha Lakshmi
            <br />

            <span className="text-[#D4A017]">
              Group Of Companies
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-2xl text-[#4A1F12]/80 leading-relaxed">
            Delivering excellence in land development,
            construction, property sales, rentals,
            interiors, legal documentation, e-Khata,
            and premium real estate services across Bengaluru.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap justify-center gap-5 mt-12">
            <Link
              href="/properties"
              className="bg-[#9B1C1C] hover:bg-[#7E1717] text-white px-8 py-5 rounded-2xl text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-500"
            >
              Explore Properties
            </Link>

            <Link
              href="/contact"
              className="bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 hover:bg-white text-[#4A1F12] px-8 py-5 rounded-2xl text-lg font-semibold shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              Contact Our Team
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative mt-20 flex justify-center">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#D4A017]/20 blur-3xl"></div>

          <div className="relative rounded-[40px] overflow-hidden border border-white/40 shadow-[0_30px_100px_rgba(74,31,18,0.25)]">
            <Image
              src="/logo.jpeg"
              alt="Sri Megha Lakshmi Developers, Constructions and Real Estate Company Bangalore"
              width={1400}
              height={800}
              priority
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-[3000ms]"
            />
          </div>
        </div>

        {/* COMPANY SECTIONS */}
        <div className="grid lg:grid-cols-3 gap-8 mt-24">
          {companies.map((company, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-[36px] p-8 shadow-2xl hover:-translate-y-3 transition-all duration-700 overflow-hidden"
            >
              {/* TOP BORDER */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9B1C1C] via-[#D4A017] to-[#9B1C1C]"></div>

              {/* NUMBER */}
              <div className="w-20 h-20 rounded-3xl bg-[#9B1C1C] text-white flex items-center justify-center text-3xl font-black shadow-xl">
                {company.number}
              </div>

              {/* TITLE */}
              <h2 className="mt-8 text-3xl lg:text-4xl font-black leading-tight text-[#9B1C1C]">
                {company.title}
              </h2>

              {/* SUBTITLE */}
              <p className="mt-3 text-[#D4A017] font-bold uppercase tracking-[2px] text-sm">
                {company.subtitle}
              </p>

              {/* DESCRIPTION */}
              <p className="mt-6 text-[#4A1F12]/75 leading-relaxed text-base">
                {company.description}
              </p>

              {/* SERVICES */}
              <div className="mt-10 space-y-5">
                {company.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F8F6F2] border border-[#D4A017]/10 rounded-3xl p-5 hover:bg-white hover:shadow-lg transition-all duration-500"
                  >
                    <div className="flex gap-4">
                      <div className="min-w-[14px] h-[14px] rounded-full bg-[#D4A017] mt-2"></div>

                      <div>
                        <h3 className="text-lg font-bold text-[#9B1C1C]">
                          {service.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-[#4A1F12]/70">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#9B1C1C] hover:bg-[#7E1717] text-white px-7 py-4 rounded-2xl font-semibold shadow-xl hover:scale-105 transition-all duration-500"
                >
                  Contact Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {[
            {
              value: '15+',
              label: 'Years Experience',
            },
            {
              value: '500+',
              label: 'Happy Clients',
            },
            {
              value: '250+',
              label: 'Projects Completed',
            },
            {
              value: '100%',
              label: 'Legal Transparency',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[30px] p-8 text-center shadow-xl hover:-translate-y-2 transition-all duration-700"
            >
              <h3 className="text-4xl md:text-5xl font-black text-[#9B1C1C]">
                {item.value}
              </h3>

              <p className="mt-3 text-[#4A1F12]/70 text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SEO SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Sri Megha Lakshmi Group',
            url: 'https://www.srimeghalakshmi.com',
            logo: 'https://www.srimeghalakshmi.com/logo.jpeg',
            description:
              'Sri Megha Lakshmi Group is a leading real estate developer and construction company in Bangalore offering land development, plotting, construction, interiors, rentals, e-Khata, property registration, and legal real estate services.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Bangalore',
              addressRegion: 'Karnataka',
              addressCountry: 'India',
            },
            areaServed: 'Bangalore',
            knowsAbout: [
              'Land Development',
              'Residential Layouts',
              'Commercial Properties',
              'Construction Services',
              'Interior Designing',
              'Property Registration',
              'e-Khata Services',
              'Real Estate Consultancy',
            ],
          }),
        }}
      />
    </section>
  )
}