import Image from 'next/image'
import Link from 'next/link'
import { connection } from 'next/server'
import { getCompany, type CompanySlug } from '@/lib/companies'

const STATUS_STYLES: Record<string, string> = {
  available: 'bg-green-100 text-green-700',
  'few left': 'bg-amber-100 text-amber-700',
  'sold out': 'bg-red-100 text-red-700',
  'coming soon': 'bg-sky-100 text-sky-700',
}

export default async function CompanyPage({ slug }: { slug: CompanySlug }) {
  // Content is edited by the admin at runtime, so always render per request
  await connection()
  const company = await getCompany(slug)
  const [heroImage] = company.images

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      {/* HERO */}
      <section className="relative min-h-[420px] md:min-h-[520px] flex items-end overflow-hidden bg-[#4A1F12]">
        {heroImage && (
          <Image src={heroImage} alt={company.name} fill priority unoptimized className="object-cover opacity-70" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto w-full px-4 md:px-6 pt-20 pb-12">
          <p className="text-[#D4A017] uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-3">
            Sri Megha Lakshmi Group
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">{company.name}</h1>
          {company.tagline && <p className="text-white/85 text-lg md:text-xl mt-4 max-w-2xl">{company.tagline}</p>}
        </div>
      </section>

      {/* ABOUT + HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#9B1C1C] mb-6">About {company.name}</h2>
          <div className="space-y-4 text-[#4A1F12]/85 text-base md:text-lg leading-relaxed">
            {company.description
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((para, i) => (
                <p key={i} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
          </div>
        </div>

        {company.highlights.length > 0 && (
          <aside className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-[#D4A017]/20 h-fit">
            <h3 className="text-xl font-bold text-[#9B1C1C] mb-5">Why choose us</h3>
            <ul className="space-y-3">
              {company.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-[#4A1F12]">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#D4A017] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/appointment"
              className="mt-8 block text-center bg-[#9B1C1C] hover:bg-[#7E1717] text-white py-3 rounded-xl font-semibold transition"
            >
              Book a Site Visit
            </Link>
          </aside>
        )}
      </section>

      {/* VIDEOS */}
      {company.videos.length > 0 && (
        <section className="bg-white py-14 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#9B1C1C] mb-8">Video Tour</h2>
            <div className={`grid gap-6 ${company.videos.length > 1 ? 'md:grid-cols-2' : 'max-w-4xl'}`}>
              {company.videos.map((src) => (
                <video
                  key={src}
                  src={src}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full rounded-2xl shadow-lg bg-black max-h-[80vh]"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PHOTO GALLERY */}
      {company.images.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#9B1C1C] mb-8">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {company.images.map((src, i) => (
              <a
                key={src}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[4/3] rounded-xl overflow-hidden group bg-gray-100"
              >
                <Image
                  src={src}
                  alt={`${company.name} photo ${i + 1}`}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* PRICE LIST */}
      <section className="bg-white py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#9B1C1C] mb-2">Price List</h2>
          {company.priceList.length === 0 ? (
            <p className="text-[#4A1F12]/70 mt-4">
              Prices available on request.{' '}
              <Link href="/contact" className="text-[#9B1C1C] font-semibold underline">
                Contact us
              </Link>{' '}
              for the latest price list.
            </p>
          ) : (
            <>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-[#D4A017]/30">
                <table className="w-full min-w-[520px]">
                  <thead className="bg-[#9B1C1C] text-white">
                    <tr>
                      <th className="text-left px-5 py-4 font-semibold">Type</th>
                      <th className="text-left px-5 py-4 font-semibold">Area</th>
                      <th className="text-left px-5 py-4 font-semibold">Price</th>
                      <th className="text-left px-5 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.priceList.map((row) => (
                      <tr key={row.id} className="border-t border-[#D4A017]/20 even:bg-[#F8F6F2]">
                        <td className="px-5 py-4 font-medium text-[#4A1F12]">{row.type}</td>
                        <td className="px-5 py-4 text-[#4A1F12]/80">{row.area || '—'}</td>
                        <td className="px-5 py-4 font-semibold text-[#9B1C1C]">{row.price}</td>
                        <td className="px-5 py-4">
                          {row.status && (
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                STATUS_STYLES[row.status.toLowerCase()] ?? 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {row.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {company.priceNote && <p className="text-sm text-[#4A1F12]/60 mt-4">* {company.priceNote}</p>}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#9B1C1C] py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Interested in {company.name}?</h2>
            <p className="text-white/80 mt-2">Talk to our team for site visits, pricing and offers.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
            <Link
              href="/contact"
              className="text-center bg-white text-[#9B1C1C] px-6 py-3 rounded-xl font-semibold hover:bg-[#F8F6F2] transition"
            >
              Contact Us
            </Link>
            <Link
              href="/appointment"
              className="text-center bg-[#D4A017] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#B8890F] transition"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
