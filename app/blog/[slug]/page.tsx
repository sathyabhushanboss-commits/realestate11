// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { blogs, Blog } from '../data/blogs'
import { pageMetadata } from '@/lib/seo'

// Generate static params for all blogs
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = blogs.find((b) => b.slug === slug)
  if (!blog) return { title: 'Article not found', robots: { index: false } }
  return pageMetadata({
    title: blog.title,
    description: blog.description,
    keywords: [...blog.keywords, blog.category],
    path: `/blog/${blog.slug}`,
    absoluteTitle: blog.title.length > 45,
    type: 'article',
  })
}

// FAQ Accordion Component
function FAQAccordion({ faqs }: { faqs: Blog['faqs'] }) {
  return (
    <div className="mt-12 md:mt-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#D4A017] rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#9B1C1C]">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white rounded-xl border border-[#D4A017]/20 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none hover:bg-[#F8F6F2] transition-colors">
              <span className="text-base md:text-lg font-semibold text-[#4A1F12] pr-4">
                {faq.question}
              </span>
              <span className="text-[#D4A017] text-2xl group-open:rotate-45 transition-transform duration-300 flex-shrink-0">
                +
              </span>
            </summary>
            <div className="px-5 md:px-6 pb-5 md:pb-6 bg-[#F8F6F2]/50">
              <p className="text-sm md:text-base text-[#4A1F12]/80 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}

// Individual Blog Page Component
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params with await
  const { slug } = await params
  
  // Find the blog post by slug
  const blog = blogs.find((b) => b.slug === slug)

  // If blog not found, show 404
  if (!blog) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2] overflow-hidden">
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#9B1C1C]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#D4A017]/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-[#D4A017] hover:text-[#9B1C1C] mb-6 transition-colors font-semibold group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> 
          <span>Back to all posts</span>
        </Link>

        {/* Blog Content */}
        <article className="bg-white/80 backdrop-blur-xl rounded-3xl md:rounded-[40px] p-6 md:p-10 lg:p-12 border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          {/* Header */}
          <header className="mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-[#D4A017]/10 text-[#D4A017] px-3 py-1 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]"></span>
              {blog.category}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#9B1C1C] leading-tight">
              {blog.title}
            </h1>
            
            {/* Author Section */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#D4A017]/10">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#9B1C1C] to-[#D4A017] flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                SM
              </div>
              <div>
                <p className="font-semibold text-[#4A1F12] text-base md:text-lg">
                  Sathyabhushan M N
                </p>
                <p className="text-sm text-[#4A1F12]/50">
                  Real Estate Expert & Content Writer
                </p>
              </div>
            </div>
          </header>

          {/* Blog Content with Styled Sections - Using Tailwind classes */}
          <div className="prose prose-lg max-w-none prose-headings:text-[#9B1C1C] prose-headings:font-bold prose-p:text-[#4A1F12]/80 prose-p:leading-relaxed prose-strong:text-[#9B1C1C] prose-ul:text-[#4A1F12]/80 prose-li:text-[#4A1F12]/80 prose-table:border-collapse prose-table:w-full prose-th:bg-[#9B1C1C]/10 prose-th:p-3 prose-th:text-[#9B1C1C] prose-td:p-3 prose-td:border prose-td:border-[#D4A017]/20 prose-ul:list-none prose-ul:pl-0">
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Keywords */}
          <div className="mt-10 pt-8 border-t border-[#D4A017]/10">
            <h3 className="text-sm font-semibold text-[#4A1F12] mb-3 flex items-center gap-2">
              <span>🏷️</span> Related Topics:
            </h3>
            <div className="flex flex-wrap gap-2">
              {blog.keywords.map((keyword) => (
                <span 
                  key={keyword} 
                  className="text-xs bg-[#F8F6F2] text-[#4A1F12] px-3 py-1.5 rounded-full border border-[#D4A017]/10 hover:border-[#D4A017]/30 transition-colors"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <FAQAccordion faqs={blog.faqs} />

          {/* Share Section */}
          <div className="mt-10 pt-8 border-t border-[#D4A017]/10">
            <h3 className="text-sm font-semibold text-[#4A1F12] mb-4 flex items-center gap-2">
              <span>📤</span> Share this guide:
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(`https://srimeghalakshmi.in/blog/${blog.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1DA1F2] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-80 transition flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://srimeghalakshmi.in/blog/${blog.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0A66C2] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-80 transition flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${blog.title} - https://srimeghalakshmi.in/blog/${blog.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-80 transition flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </article>
      </div>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: blog.title,
            description: blog.description,
            author: {
              '@type': 'Person',
              name: 'Sathyabhushan M N',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Sri Megha Lakshmi',
              logo: {
                '@type': 'ImageObject',
                url: 'https://srimeghalakshmi.in/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://srimeghalakshmi.in/blog/${blog.slug}`,
            },
            keywords: blog.keywords.join(', '),
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
            mainEntity: blog.faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          }),
        }}
      />

      {/* Global styles for blog content using style tag (works in Server Components) */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .blog-content {
            color: #4A1F12;
          }
          
          .blog-content h2 {
            font-size: 1.75rem;
            font-weight: 800;
            color: #9B1C1C;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 3px solid #D4A017;
            display: inline-block;
          }
          
          .blog-content h3 {
            font-size: 1.35rem;
            font-weight: 700;
            color: #9B1C1C;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
          }
          
          .blog-content h4 {
            font-size: 1.15rem;
            font-weight: 600;
            color: #D4A017;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
          }
          
          .blog-content p {
            font-size: 1.0625rem;
            line-height: 1.8;
            color: rgba(74, 31, 18, 0.8);
            margin-bottom: 1.25rem;
          }
          
          .blog-content ul {
            list-style: none;
            padding-left: 0;
            margin-bottom: 1.5rem;
          }
          
          .blog-content ul li {
            padding: 0.5rem 0 0.5rem 2rem;
            position: relative;
            color: rgba(74, 31, 18, 0.8);
            font-size: 1.0625rem;
            line-height: 1.6;
            border-bottom: 1px solid rgba(212, 160, 23, 0.08);
          }
          
          .blog-content ul li:last-child {
            border-bottom: none;
          }
          
          .blog-content ul li::before {
            content: "▸";
            position: absolute;
            left: 0;
            color: #D4A017;
            font-weight: bold;
          }
          
          .blog-content ul ul {
            padding-left: 1.5rem;
            margin-top: 0.25rem;
            margin-bottom: 0;
          }
          
          .blog-content ul ul li {
            border-bottom: none;
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
          }
          
          .blog-content ul ul li::before {
            content: "•";
            color: #9B1C1C;
          }
          
          .blog-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 0.95rem;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          }
          
          .blog-content table thead {
            background: linear-gradient(135deg, #9B1C1C, #B76E79);
          }
          
          .blog-content table th {
            padding: 0.75rem 1rem;
            text-align: left;
            color: white;
            font-weight: 700;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .blog-content table td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid rgba(212, 160, 23, 0.15);
            color: rgba(74, 31, 18, 0.8);
          }
          
          .blog-content table tr:nth-child(even) {
            background-color: #F8F6F2;
          }
          
          .blog-content table tr:hover {
            background-color: #F0E8D8;
          }
          
          .blog-content table tr:last-child td {
            border-bottom: none;
          }
          
          .blog-content strong {
            color: #9B1C1C;
            font-weight: 700;
          }
          
          .blog-content .highlight-box {
            background: linear-gradient(135deg, #F8F6F2, #F0E8D8);
            border-left: 4px solid #D4A017;
            padding: 1.5rem 2rem;
            border-radius: 12px;
            margin: 1.5rem 0;
          }
          
          .blog-content .highlight-box p {
            margin-bottom: 0;
          }
          
          .blog-content .highlight-box strong {
            color: #9B1C1C;
          }
          
          @media (max-width: 768px) {
            .blog-content h2 {
              font-size: 1.5rem;
            }
            .blog-content h3 {
              font-size: 1.2rem;
            }
            .blog-content p {
              font-size: 1rem;
            }
            .blog-content ul li {
              font-size: 1rem;
            }
            .blog-content table {
              font-size: 0.8rem;
            }
            .blog-content table th,
            .blog-content table td {
              padding: 0.5rem 0.75rem;
            }
          }
        `
      }} />
    </main>
  )
}