import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import EnquiryForm from '@/components/EnquiryForm'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Sri Megha Lakshmi Group in Koramangala, Bengaluru for plots, homes, construction, rentals and property consultation.',
}

export default function ContactPage() {
  return (
    <main className="bg-ivory">
      <section className="container-x pt-12 md:pt-20 pb-10 md:pb-14">
        <p className="eyebrow">Contact</p>
        <h1 className="heading-xl mt-5 max-w-4xl">
          Let&apos;s build your <em className="text-gold-deep">dream property.</em>
        </h1>
        <p className="lead mt-5 max-w-2xl">
          Plots, homes, construction, rentals or legal paperwork — our team in Koramangala is here to help.
        </p>
      </section>

      <section className="container-x pb-16 md:pb-24 grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-14 items-start">
        {/* DETAILS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <a href={SITE.phoneHref} className="card p-6 flex gap-5 hover:-translate-y-0.5 transition-transform">
            <span className="w-12 h-12 rounded-full bg-ruby text-white flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </span>
            <span>
              <span className="block text-[11px] tracking-[0.2em] uppercase font-bold text-gold-deep">Call us</span>
              {SITE.phones.map((p) => (
                <span key={p} className="block mt-1 font-semibold text-bronze">
                  {p}
                </span>
              ))}
            </span>
          </a>
          <a href={`mailto:${SITE.email}`} className="card p-6 flex gap-5 hover:-translate-y-0.5 transition-transform">
            <span className="w-12 h-12 rounded-full bg-ruby text-white flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] tracking-[0.2em] uppercase font-bold text-gold-deep">Email</span>
              <span className="block mt-1 font-semibold text-bronze break-all">{SITE.email}</span>
            </span>
          </a>
          <div className="card p-6 flex gap-5">
            <span className="w-12 h-12 rounded-full bg-ruby text-white flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </span>
            <address className="not-italic">
              <span className="block text-[11px] tracking-[0.2em] uppercase font-bold text-gold-deep">Office</span>
              {SITE.addressLines.map((line) => (
                <span key={line} className="block mt-1 text-bronze">
                  {line}
                </span>
              ))}
            </address>
          </div>
          <div className="card p-6 flex gap-5">
            <span className="w-12 h-12 rounded-full bg-ruby text-white flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </span>
            <span>
              <span className="block text-[11px] tracking-[0.2em] uppercase font-bold text-gold-deep">Hours</span>
              <span className="block mt-1 text-bronze">{SITE.hours}</span>
            </span>
          </div>
        </div>

        {/* FORM */}
        <div className="card p-6 sm:p-9">
          <h2 className="font-display text-3xl md:text-4xl text-ruby">Send us a message</h2>
          <p className="text-bronze/60 mt-2 mb-7">We usually respond within a few hours.</p>
          <EnquiryForm type="contact" submitLabel="Send Message" />
        </div>
      </section>

      {/* MAP */}
      <section className="container-x pb-16 md:pb-24">
        <div className="rounded-3xl overflow-hidden border border-bronze/10 h-[320px] md:h-[440px] bg-sand">
          <iframe
            src="https://www.google.com/maps?q=Cauvery+Colony,+Koramangala,+Bengaluru+560034&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sri Megha Lakshmi office location — Koramangala, Bengaluru"
          />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            name: 'Sri Megha Lakshmi',
            description: 'Real estate developer and construction company in Bangalore offering property consultation, homes and construction services.',
            telephone: '+919741021116',
            email: SITE.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Shop No. 902, 2nd Main Rd, Nirguna Mandir Layout, Cauvery Colony, Koramangala',
              addressLocality: 'Bengaluru',
              addressRegion: 'Karnataka',
              postalCode: '560034',
              addressCountry: 'India',
            },
            openingHours: 'Mo-Sa 10:00-19:00',
            areaServed: 'Bengaluru',
          }),
        }}
      />
    </main>
  )
}
