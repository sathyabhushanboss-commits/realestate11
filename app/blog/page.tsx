import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { blogs } from './data/blogs'
import Reveal from '@/components/Reveal'
import CtaBanner from '@/components/CtaBanner'

export const metadata: Metadata = {
  title: 'Insights — Koramangala & Bengaluru Real Estate Guides',
  description:
    'Expert guides on Koramangala property, investment trends, luxury homes and location comparisons across Bengaluru.',
}

const LOCATIONS = ['Koramangala', 'HSR Layout', 'Indiranagar', 'Sarjapur Road', 'Bellandur', 'Electronic City', 'Whitefield', 'Jayanagar']

export default function BlogPage() {
  const [lead, ...rest] = blogs

  return (
    <main className="bg-ivory">
      <section className="container-x pt-12 md:pt-20 pb-10 md:pb-14">
        <p className="eyebrow">Insights</p>
        <h1 className="heading-xl mt-5 max-w-4xl">
          Bengaluru real estate, <em className="text-gold-deep">explained.</em>
        </h1>
        <p className="lead mt-5 max-w-2xl">
          Guides on Koramangala property, investment trends and how Bengaluru&apos;s best neighbourhoods compare.
        </p>
      </section>

      <section className="container-x pb-16 md:pb-24">
        {/* LEAD ARTICLE */}
        {lead && (
          <Reveal>
            <Link
              href={`/blog/${lead.slug}`}
              className="group grid lg:grid-cols-[1.1fr_1fr] rounded-3xl overflow-hidden bg-ink text-white"
            >
              <div className="relative min-h-[220px] lg:min-h-[380px] bg-gradient-to-br from-ruby via-ruby-dark to-ink flex items-end p-7 md:p-10">
                <span className="font-display italic text-[7rem] md:text-[10rem] leading-none text-white/10 absolute -top-4 right-4 select-none">
                  01
                </span>
                <span className="relative text-[11px] tracking-[0.2em] uppercase font-bold bg-gold text-ink px-3 py-1.5 rounded-full">
                  {lead.category}
                </span>
              </div>
              <div className="p-7 md:p-12 flex flex-col justify-center">
                <h2 className="font-display text-3xl md:text-4xl leading-tight group-hover:text-gold-soft transition-colors">
                  {lead.title}
                </h2>
                <p className="mt-4 text-white/65 leading-relaxed line-clamp-3">{lead.description}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-gold-soft font-semibold">
                  Read the guide <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* OTHER ARTICLES */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {rest.map((blog, i) => (
            <Reveal key={blog.id} delay={(i % 2) * 100} as="article">
              <Link href={`/blog/${blog.slug}`} className="group card h-full p-7 md:p-9 flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-gold-deep">{blog.category}</span>
                  <span className="font-display text-3xl text-bronze/15">{String(i + 2).padStart(2, '0')}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl md:text-[1.9rem] leading-tight text-ruby">{blog.title}</h2>
                <p className="mt-3 text-bronze/65 leading-relaxed line-clamp-3 flex-1">{blog.description}</p>
                <div className="mt-6 pt-5 border-t border-bronze/10 flex items-center justify-between text-sm">
                  <span className="text-bronze/55">{blog.faqs.length} FAQs answered</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-bronze group-hover:text-ruby">
                    Read <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* LOCATIONS */}
        <div className="mt-16 md:mt-20">
          <h2 className="font-display text-3xl text-ruby text-center">Explore by location</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc}
                href={`/properties?q=${encodeURIComponent(loc)}`}
                className="px-5 py-2.5 rounded-full border border-bronze/15 bg-white text-sm font-medium text-bronze hover:border-ruby hover:text-ruby transition"
              >
                {loc}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Koramangala Real Estate - Sri Megha Lakshmi Blog',
            description: 'Expert guides on Koramangala property investment, luxury homes, market trends and location comparisons in Bangalore.',
            publisher: {
              '@type': 'Organization',
              name: 'Sri Megha Lakshmi',
              logo: { '@type': 'ImageObject', url: 'https://www.srimeghalakshmi.in/logo.jpeg' },
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
                  author: { '@type': 'Person', name: 'Sathyabhushan M N' },
                  mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.srimeghalakshmi.in/blog/${blog.slug}` },
                  keywords: blog.keywords.join(', '),
                },
              })),
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: blogs.flatMap((blog) =>
              blog.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              }))
            ),
          }),
        }}
      />
    </main>
  )
}
