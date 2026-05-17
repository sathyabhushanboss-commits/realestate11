import Image from 'next/image'
import Link from 'next/link'

const properties = [
  {
    id: 1,
    title: 'Luxury Villa',
    location: 'Koramangala',
    price: '₹ 2.5 Cr',
    image: '/property1.jpg',
    sqft: '4500 sqft',
    bedrooms: '4 BHK',
    description: 'Exquisite luxury villa with private garden, pool, and premium finishes in prime Koramangala location.',
  },
  {
    id: 2,
    title: 'Premium Apartment',
    location: 'Indiranagar',
    price: '₹ 1.8 Cr',
    image: '/property2.jpg',
    sqft: '2100 sqft',
    bedrooms: '3 BHK',
    description: 'Modern premium apartment with smart home features and stunning city views.',
  },
  {
    id: 3,
    title: 'Commercial Space',
    location: 'MG Road',
    price: '₹ 4.2 Cr',
    image: '/property3.jpg',
    sqft: '3200 sqft',
    bedrooms: 'Commercial',
    description: 'Prime commercial space on MG Road, perfect for retail or office use with high footfall.',
  },
  {
    id: 4,
    title: 'Luxury Penthouse',
    location: 'Whitefield',
    price: '₹ 3.1 Cr',
    image: '/property1.jpg',
    sqft: '3800 sqft',
    bedrooms: '4 BHK',
    description: 'Spectacular penthouse with rooftop terrace, panoramic views, and luxury amenities.',
  },
  {
    id: 5,
    title: 'Residential Plot',
    location: 'Electronic City',
    price: '₹ 95 Lakhs',
    image: '/property2.jpg',
    sqft: '2400 sqft',
    bedrooms: 'Plot',
    description: 'Prime residential plot in growing Electronic City, ideal for custom dream home.',
  },
  {
    id: 6,
    title: 'Office Space',
    location: 'HSR Layout',
    price: '₹ 5.4 Cr',
    image: '/property3.jpg',
    sqft: '5600 sqft',
    bedrooms: 'Commercial',
    description: 'Corporate office space with modern infrastructure in HSR Layout business district.',
  },
]

export default function PropertiesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F6F2]">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* RUBY GLOW */}
        <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-[#9B1C1C]/10 rounded-full blur-3xl"></div>
        {/* GOLD GLOW */}
        <div className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] bg-[#D4A017]/10 rounded-full blur-3xl"></div>
        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:70px_70px]"></div>
      </div>

      {/* HERO - Zero top gap */}
      <section className="relative pt-0 pb-12 md:pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* TAG */}
          <div className="inline-flex items-center gap-2 md:gap-3 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-4 md:px-5 py-2 md:py-3 shadow-xl">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#D4A017] animate-pulse"></div>
            <p className="uppercase tracking-[3px] md:tracking-[5px] text-[#9B1C1C] text-xs md:text-sm font-semibold">
              Premium Luxury Properties
            </p>
          </div>

          {/* TITLE */}
          <h1 className="mt-6 md:mt-8 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] md:leading-[1] text-[#9B1C1C]">
            Luxury Properties
            <br />
            <span className="text-[#D4A017]">Collection</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="max-w-4xl mx-auto mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl text-[#4A1F12]/70 leading-relaxed px-4">
            Explore premium residential apartments,
            luxury villas, commercial spaces,
            and investment properties in Bengaluru
            designed for modern luxury living.
          </p>
        </div>
      </section>

      {/* PROPERTY GRID */}
      <section className="relative pb-20 md:pb-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="group relative animate-[float_6s_ease-in-out_infinite]"
                style={{
                  animationDelay: `${index * 0.3}s`,
                }}
              >
                {/* GLOW */}
                <div className="absolute inset-0 rounded-2xl md:rounded-[40px] bg-gradient-to-br from-[#9B1C1C]/10 via-[#D4A017]/10 to-[#B76E79]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                {/* CARD */}
                <div className="relative overflow-hidden rounded-2xl md:rounded-[40px] bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_25px_80px_rgba(0,0,0,0.08)] hover:-translate-y-3 md:hover:-translate-y-5 hover:shadow-[0_35px_120px_rgba(155,28,28,0.18)] transition-all duration-700">
                  {/* IMAGE */}
                  <div className="relative h-[240px] md:h-[280px] lg:h-[320px] overflow-hidden">
                    <Image
                      src={property.image}
                      alt={`${property.title} in ${property.location} - Premium luxury property by Sri Megha Lakshmi`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-[2500ms]"
                    />
                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                    {/* LOCATION BADGE */}
                    <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-white/80 backdrop-blur-xl border border-white/40 rounded-full px-3 md:px-5 py-1 md:py-2 shadow-xl">
                      <p className="uppercase tracking-[2px] md:tracking-[4px] text-[#9B1C1C] text-[10px] md:text-xs font-semibold">
                        {property.location}
                      </p>
                    </div>

                    {/* PRICE BADGE */}
                    <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl md:rounded-[24px] p-3 md:p-5">
                      <p className="text-xl md:text-3xl font-black text-white">
                        {property.price}
                      </p>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 md:p-8">
                    <h2 className="text-2xl md:text-4xl font-black text-[#9B1C1C] leading-tight">
                      {property.title}
                    </h2>
                    
                    <p className="mt-3 md:mt-5 text-[#4A1F12]/70 text-sm md:text-lg leading-relaxed">
                      {property.description}
                    </p>

                    {/* FEATURES */}
                    <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6">
                      {[property.bedrooms, 'Premium', 'Vastu'].map((tag, tagIndex) => (
                        <div
                          key={tagIndex}
                          className="bg-[#D4A017]/10 border border-[#D4A017]/20 rounded-full px-3 md:px-4 py-1 md:py-2"
                        >
                          <p className="text-[#9B1C1C] text-xs md:text-sm font-semibold">
                            {tag}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
                      <Link
                        href={`/properties/${property.id}`}
                        className="group/button relative overflow-hidden flex-1 bg-[#9B1C1C] hover:bg-[#7E1717] text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base shadow-2xl transition-all duration-500 hover:scale-[1.03] text-center"
                      >
                        <span className="relative z-10">View Details</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-1000"></div>
                      </Link>

                      <Link
                        href="/contact"
                        className="flex-1 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 hover:bg-white text-[#4A1F12] py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base shadow-xl hover:-translate-y-1 transition-all duration-500 text-center"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>

                  {/* BORDER EFFECT */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-[40px] border border-white/30 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-3xl md:rounded-[60px] p-8 md:p-16 shadow-2xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#9B1C1C]">
              Find Your Dream Property Today
            </h2>
            <p className="mt-4 md:mt-6 text-lg md:text-xl text-[#4A1F12]/70 max-w-2xl mx-auto">
              Schedule a site visit and explore our luxury properties with our expert real estate advisors.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center mt-8 md:mt-12">
              <Link
                href="/appointment"
                className="bg-gradient-to-r from-[#9B1C1C] to-[#B76E79] hover:scale-105 transition-all duration-500 text-white px-8 md:px-12 py-3 md:py-5 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg shadow-xl"
              >
                Book Site Visit
              </Link>
              <Link
                href="/contact"
                className="bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 hover:bg-white text-[#9B1C1C] px-8 md:px-12 py-3 md:py-5 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg shadow-xl transition-all duration-500"
              >
                Contact Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Luxury Properties in Bangalore',
            description: 'Premium collection of luxury villas, apartments, penthouses, and commercial spaces in prime Bangalore locations.',
            numberOfItems: properties.length,
            itemListElement: properties.map((property, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Product',
                name: property.title,
                description: property.description,
                offers: {
                  '@type': 'Offer',
                  price: property.price,
                  priceCurrency: 'INR',
                },
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: property.location,
                  addressRegion: 'Karnataka',
                  addressCountry: 'India',
                },
              },
            })),
          }),
        }}
      />

      {/* Custom Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }
        `}
      </style>
    </main>
  )
}