import Image from 'next/image'
import Link from 'next/link'

const blogs = [
  {
    id: 1,
    title: 'Top Luxury Apartments in Bangalore 2026',
    category: 'Luxury Living',
    image: '/property1.jpg',
    description:
      'Discover premium luxury apartments in Bangalore with modern amenities, vastu-compliant layouts, and world-class lifestyle experiences. Explore the best properties with high ROI potential.',
    date: 'May 2026',
    readTime: '5 min read',
    slug: 'top-luxury-apartments-bangalore-2026',
  },
  {
    id: 2,
    title: 'Why Sarjapur Road is the Best Investment Location',
    category: 'Investment',
    image: '/property2.jpg',
    description:
      'Sarjapur Road continues to be one of Bangalore\'s fastest-growing real estate destinations with excellent ROI potential, IT connectivity, and social infrastructure development.',
    date: 'May 2026',
    readTime: '4 min read',
    slug: 'why-sarjapur-road-best-investment-location',
  },
  {
    id: 3,
    title: 'Benefits of Vaastu-Compliant Homes',
    category: 'Vaastu',
    image: '/property3.jpg',
    description:
      'Learn how vastu-aligned homes improve positivity, harmony, natural energy flow, family wellbeing, and overall financial prosperity in your living space.',
    date: 'April 2026',
    readTime: '6 min read',
    slug: 'benefits-vaastu-compliant-homes',
  },
  {
    id: 4,
    title: 'Luxury Villas vs Apartments: Which is Better?',
    category: 'Real Estate Guide',
    image: '/property4.jpg',
    description:
      'Compare luxury villas and premium apartments to choose the perfect lifestyle investment for your family based on budget, space, amenities, and location preferences.',
    date: 'April 2026',
    readTime: '7 min read',
    slug: 'luxury-villas-vs-apartments-which-better',
  },
  {
    id: 5,
    title: 'Top Features Buyers Look For in Modern Homes',
    category: 'Modern Living',
    image: '/property5.jpg',
    description:
      'Smart layouts, natural ventilation, security, clubhouse amenities, eco-friendly designs, and sustainable features are shaping modern home preferences in 2026.',
    date: 'March 2026',
    readTime: '5 min read',
    slug: 'top-features-buyers-look-modern-homes',
  },
  {
    id: 6,
    title: 'Future of Real Estate in Bangalore',
    category: 'Market Trends',
    image: '/property6.jpg',
    description:
      'Explore the future of Bangalore real estate and upcoming opportunities in luxury residential developments, smart cities, and sustainable living projects.',
    date: 'March 2026',
    readTime: '8 min read',
    slug: 'future-real-estate-bangalore',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F2] overflow-hidden">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#9B1C1C]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#D4A017]/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      {/* HERO - Zero top gap */}
      <section className="relative pt-0 pb-12 md:pb-20 px-4 md:px-6 text-center">
        {/* CONTENT */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 md:gap-3 bg-white/70 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-xl mb-6 md:mb-8">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#D4A017] animate-pulse"></div>
            <p className="uppercase tracking-[3px] md:tracking-[6px] text-[#D4A017] text-xs md:text-sm font-semibold">
              Real Estate Insights
            </p>
          </div>

          <h1 className="mt-6 md:mt-8 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] md:leading-tight text-[#9B1C1C]">
            Luxury Real Estate
            <br />
            <span className="text-[#D4A017]">Blog & Insights</span>
          </h1>

          <p className="mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl text-[#4A1F12]/70 leading-relaxed max-w-3xl mx-auto px-4">
            Explore the latest insights, investment trends, luxury living ideas,
            and real estate opportunities in Bangalore. Expert advice for home buyers and investors.
          </p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="relative pb-20 md:pb-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {blogs.map((blog, index) => (
            <article
              key={blog.id}
              className="group bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-[32px] overflow-hidden border border-[#D4A017]/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:-translate-y-3 md:hover:-translate-y-4 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-700"
            >
              {/* IMAGE */}
              <div className="relative h-[200px] md:h-[240px] lg:h-[260px] overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* CATEGORY */}
                <div className="absolute top-4 md:top-5 left-4 md:left-5 bg-white/90 backdrop-blur-xl text-[#9B1C1C] text-xs font-semibold px-3 md:px-4 py-1 md:py-2 rounded-full shadow-lg">
                  {blog.category}
                </div>

                {/* READ TIME */}
                <div className="absolute bottom-4 md:bottom-5 right-4 md:right-5 bg-black/50 backdrop-blur-xl text-white text-xs px-2 md:px-3 py-1 rounded-full">
                  {blog.readTime}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 md:p-8">
                <p className="text-xs md:text-sm text-[#D4A017] uppercase tracking-[2px] md:tracking-[3px] font-medium">
                  {blog.date}
                </p>

                <h2 className="mt-3 md:mt-4 text-xl md:text-2xl lg:text-3xl font-bold text-[#9B1C1C] leading-snug group-hover:text-[#B76E79] transition-colors duration-500">
                  {blog.title}
                </h2>

                <p className="mt-3 md:mt-5 text-sm md:text-base text-[#4A1F12]/70 leading-relaxed">
                  {blog.description}
                </p>

                {/* BUTTON */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 mt-6 md:mt-8 text-[#9B1C1C] font-semibold hover:gap-4 transition-all duration-500 group/link"
                >
                  Read More
                  <span className="text-xl group-hover/link:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-16 md:py-28 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#9B1C1C] to-[#B76E79]"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 md:gap-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-xl mb-6 md:mb-8">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#F4C542] animate-pulse"></div>
            <p className="uppercase tracking-[3px] md:tracking-[6px] text-[#F4C542] text-xs md:text-sm font-semibold">
              Find Your Dream Property
            </p>
          </div>

          <h2 className="mt-4 md:mt-6 text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
            Ready To Invest In
            <br />
            Luxury Living?
          </h2>

          <p className="mt-6 md:mt-8 text-base md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto px-4">
            Connect with Sri Megha Lakshmi Real Estate and discover premium apartments,
            villas, and investment opportunities across Bangalore. Expert guidance from start to finish.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-5 mt-8 md:mt-12">
            <Link
              href="/properties"
              className="bg-white text-[#9B1C1C] hover:bg-[#F8F6F2] px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg transition-all duration-500 hover:scale-105 shadow-2xl"
            >
              View Properties
            </Link>

            <Link
              href="/appointment"
              className="bg-[#D4A017] hover:bg-[#F4C542] text-[#4A1F12] px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg transition-all duration-500 hover:scale-105 shadow-2xl"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Sri Megha Lakshmi Real Estate Blog',
            description: 'Expert insights on luxury real estate, investment trends, property buying guides, and market updates in Bangalore.',
            publisher: {
              '@type': 'Organization',
              name: 'Sri Megha Lakshmi',
              logo: {
                '@type': 'ImageObject',
                url: 'https://srimeghalakshmi.in/logo.png',
              },
            },
            blogPost: blogs.map((blog) => ({
              '@type': 'BlogPosting',
              headline: blog.title,
              description: blog.description,
              datePublished: blog.date,
              dateModified: blog.date,
              author: {
                '@type': 'Organization',
                name: 'Sri Megha Lakshmi Real Estate',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://srimeghalakshmi.in/blog/${blog.slug}`,
              },
              keywords: `${blog.category}, Bangalore real estate, luxury homes, property investment`,
            })),
          }),
        }}
      />
    </main>
  )
}