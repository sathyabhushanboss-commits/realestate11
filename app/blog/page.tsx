'use client'

import Link from 'next/link'
import { blogs, Blog } from './data/blogs'

// Blog Card Component - WITHOUT IMAGES
function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className="group bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-[#D4A017]/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-700 flex flex-col h-full">
      {/* PLACEHOLDER ICON INSTEAD OF IMAGE */}
      <div className="relative h-[200px] md:h-[240px] overflow-hidden bg-gradient-to-br from-[#9B1C1C]/10 to-[#D4A017]/10 flex-shrink-0 flex items-center justify-center">
        <span className="text-7xl md:text-8xl opacity-60">🏠</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* CATEGORY */}
        <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-white/90 backdrop-blur-xl text-[#9B1C1C] text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
          {blog.category}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <h3 className="mt-0 text-lg md:text-xl lg:text-2xl font-bold text-[#9B1C1C] leading-snug group-hover:text-[#B76E79] transition-colors duration-500 line-clamp-2">
          {blog.title}
        </h3>

        <p className="mt-2 text-sm md:text-base text-[#4A1F12]/70 leading-relaxed line-clamp-3 flex-grow">
          {blog.description}
        </p>

        {/* AUTHOR */}
        <div className="mt-3 flex items-center gap-2">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#9B1C1C]/10 flex items-center justify-center text-[#9B1C1C] text-xs md:text-sm font-bold">
            SM
          </div>
          <span className="text-xs md:text-sm text-[#4A1F12]/60">
            By <span className="font-medium text-[#4A1F12]">Sathyabhushan M N</span>
          </span>
        </div>

        {/* KEYWORDS TAGS */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {blog.keywords.slice(0, 2).map((keyword: string) => (
            <span key={keyword} className="text-[9px] md:text-xs bg-[#D4A017]/10 text-[#4A1F12] px-2 py-0.5 rounded-full">
              {keyword}
            </span>
          ))}
        </div>

        {/* FAQ INDICATOR */}
        {blog.faqs && blog.faqs.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2 text-[10px] md:text-xs text-[#D4A017]">
            <span>📋</span>
            <span>{blog.faqs.length} FAQs</span>
          </div>
        )}

        {/* BUTTON */}
        <Link
          href={`/blog/${blog.slug}`}
          className="inline-flex items-center gap-2 mt-3 md:mt-4 text-[#9B1C1C] font-semibold text-sm md:text-base hover:gap-4 transition-all duration-500 group/link"
        >
          Read More
          <span className="text-lg group-hover/link:translate-x-1 transition-transform duration-300">
            →
          </span>
        </Link>
      </div>
    </article>
  )
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F2] overflow-hidden">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#9B1C1C]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#D4A017]/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      {/* HERO */}
      <section className="relative pt-0 pb-8 md:pb-12 px-4 md:px-6 text-center">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 md:gap-3 bg-white/70 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-xl mb-6 md:mb-8">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#D4A017] animate-pulse"></div>
            <p className="uppercase tracking-[3px] md:tracking-[6px] text-[#D4A017] text-xs md:text-sm font-semibold">
              Koramangala & Bangalore Real Estate Insights
            </p>
          </div>

          <h1 className="mt-6 md:mt-8 text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] md:leading-tight text-[#9B1C1C]">
            Koramangala Real Estate
            <br />
            <span className="text-[#D4A017]">Expert Guides & Insights</span>
          </h1>

          <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-[#4A1F12]/70 leading-relaxed max-w-3xl mx-auto px-4">
            Comprehensive guides on Koramangala property, investment trends, luxury homes, 
            and location comparisons across Bangalore&apos;s premier neighborhoods.
          </p>
        </div>
      </section>

      {/* ALL BLOG GRID - 2 COLUMN */}
      <section className="relative pb-12 md:pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION COMPARISON */}
      <section className="relative pb-16 md:pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-[#D4A017]/20">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#9B1C1C] mb-4 text-center">
              Compare Bangalore&apos;s Top Locations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {['Koramangala', 'HSR Layout', 'Indiranagar', 'Sarjapur Road', 'Bellandur', 'Electronic City', 'Whitefield', 'Jayanagar'].map((location) => (
                <Link
                  key={location}
                  href="/properties"
                  className="text-center bg-[#F8F6F2] hover:bg-[#D4A017]/10 p-3 md:p-4 rounded-xl transition-all duration-300 hover:scale-105 border border-[#D4A017]/10"
                >
                  <span className="font-semibold text-[#4A1F12] text-sm md:text-base">{location}</span>
                </Link>
              ))}
            </div>
          </div>
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
              Find Your Dream Property in Koramangala
            </p>
          </div>

          <h2 className="mt-4 md:mt-6 text-2xl md:text-4xl lg:text-5xl font-black leading-tight">
            Ready To Invest In
            <br />
            Koramangala Real Estate?
          </h2>

          <p className="mt-6 md:mt-8 text-base md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto px-4">
            Connect with Sri Megha Lakshmi Real Estate and discover premium apartments,
            villas, and investment opportunities in Koramangala and across Bangalore.
          </p>

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
            '@type': 'CollectionPage',
            name: 'Koramangala Real Estate - Sri Megha Lakshmi Blog',
            description: 'Expert guides on Koramangala property investment, luxury homes, market trends, and location comparisons in Bangalore.',
            publisher: {
              '@type': 'Organization',
              name: 'Sri Megha Lakshmi',
              logo: {
                '@type': 'ImageObject',
                url: 'https://srimeghalakshmi.in/logo.png',
              },
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: blogs.map((blog, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'BlogPosting',
                  headline: blog.title,
                  description: blog.description,
                  author: {
                    '@type': 'Person',
                    name: 'Sathyabhushan M N',
                  },
                  mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `https://srimeghalakshmi.in/blog/${blog.slug}`,
                  },
                  keywords: blog.keywords.join(', '),
                }
              }))
            }
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: blogs.flatMap(blog => 
              blog.faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer
                }
              }))
            )
          }),
        }}
      />
    </main>
  )
}