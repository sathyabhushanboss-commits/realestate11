import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Contact Us | Real Estate Experts in Koramangala, Bangalore',
  description:
    'Contact Sri Megha Lakshmi Group in Cauvery Colony, Koramangala, Bengaluru for plots, construction, property sales, rentals, e-Khata and legal services. Call, WhatsApp or send a message.',
  keywords: [
    'contact real estate agent Bangalore',
    'real estate office Koramangala',
    'property consultant Bengaluru',
    'construction company contact Bangalore',
    'Sri Megha Lakshmi contact number',
  ],
  path: '/contact',
})

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F6F2]">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden">
        {/* RUBY GLOW */}
        <div className="absolute top-[-250px] left-[-200px] w-[700px] h-[700px] rounded-full bg-[#9B1C1C]/10 blur-3xl"></div>
        {/* GOLD GLOW */}
        <div className="absolute bottom-[-250px] right-[-200px] w-[700px] h-[700px] rounded-full bg-[#D4A017]/10 blur-3xl"></div>
        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      {/* HERO - Zero top gap */}
      <section className="relative pt-0 pb-12 md:pb-20 px-4 md:px-6 text-center">
        <div className="max-w-5xl mx-auto">
          {/* TAG */}
          <div className="inline-flex items-center gap-2 md:gap-3 bg-white/70 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-xl">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#D4A017] animate-pulse"></div>
            <p className="uppercase tracking-[3px] md:tracking-[6px] text-[#9B1C1C] text-xs md:text-sm font-semibold">
              Contact Sri Megha Lakshmi
            </p>
          </div>

          {/* HEADING */}
          <h1 className="mt-6 md:mt-10 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] md:leading-[0.95] text-[#9B1C1C]">
            Let&apos;s Build
            <br />
            <span className="text-[#D4A017]">Your Dream</span>
            <br />
            Property
          </h1>

          {/* DESCRIPTION */}
          <p className="max-w-3xl mx-auto mt-6 md:mt-10 text-lg md:text-xl lg:text-2xl text-[#4A1F12]/70 leading-relaxed px-4">
            Contact Sri Megha Lakshmi for luxury apartments,
            premium villas, real estate investments,
            construction solutions, and property consultations in Bengaluru.
          </p>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="relative pb-20 md:pb-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT SIDE */}
          <div>
            {/* TITLE */}
            <div>
              <p className="uppercase tracking-[4px] md:tracking-[6px] text-[#D4A017] text-xs md:text-sm font-semibold">
                Contact Information
              </p>
              <h2 className="mt-4 md:mt-5 text-3xl md:text-5xl lg:text-6xl font-black text-[#9B1C1C] leading-tight">
                Luxury Real Estate
                <br />
                Consultation
              </h2>
              <p className="mt-6 md:mt-8 text-lg md:text-xl text-[#4A1F12]/70 leading-relaxed">
                Our expert team provides personalized support for
                premium properties, construction services,
                and investment opportunities across Bangalore.
              </p>
            </div>

            {/* CONTACT CARDS */}
            <div className="mt-10 md:mt-14 space-y-5 md:space-y-8">
              {/* PHONE */}
              <div className="group relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl md:rounded-[32px] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 md:hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(155,28,28,0.15)] transition-all duration-700">
                <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-[#9B1C1C]/5 rounded-full blur-3xl"></div>
                <p className="uppercase tracking-[3px] md:tracking-[5px] text-[#D4A017] text-xs md:text-sm font-semibold">
                  Phone
                </p>
                <Link href="tel:+919741021116">
                  <h3 className="mt-3 md:mt-5 text-2xl md:text-3xl font-bold text-[#9B1C1C] hover:text-[#B76E79] transition-colors duration-300">
                    +91 9741021116
                  </h3>
                </Link>
                <Link href="tel:+919845735652">
                  <p className="mt-2 md:mt-3 text-lg text-[#4A1F12]/70 hover:text-[#9B1C1C] transition-colors duration-300">
                    +91 9845735652
                  </p>
                </Link>
              </div>

              {/* EMAIL */}
              <div className="group relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl md:rounded-[32px] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 md:hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(212,160,23,0.15)] transition-all duration-700">
                <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-[#D4A017]/10 rounded-full blur-3xl"></div>
                <p className="uppercase tracking-[3px] md:tracking-[5px] text-[#D4A017] text-xs md:text-sm font-semibold">
                  Email Address
                </p>
                <Link href="mailto:hello@srimeghalakshmi.in">
                  <h3 className="mt-3 md:mt-5 text-xl md:text-2xl lg:text-3xl font-bold text-[#9B1C1C] break-all hover:text-[#B76E79] transition-colors duration-300">
                    hello@srimeghalakshmi.in
                  </h3>
                </Link>
              </div>

              {/* ADDRESS */}
              <div className="group relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl md:rounded-[32px] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 md:hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(180,107,77,0.15)] transition-all duration-700">
                <div className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-[#B76E79]/10 rounded-full blur-3xl"></div>
                <p className="uppercase tracking-[3px] md:tracking-[5px] text-[#D4A017] text-xs md:text-sm font-semibold">
                  Office Address
                </p>
                <address className="mt-3 md:mt-5 text-base md:text-lg text-[#4A1F12]/80 leading-relaxed not-italic">
                  Shop No. 902,
                  <br />
                  2nd Main Rd,
                  <br />
                  Nirguna Mandir Layout,
                  <br />
                  Cauvery Colony,
                  <br />
                  Koramangala,
                  <br />
                  Bengaluru - 560034
                </address>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="relative mt-10 lg:mt-0">
            {/* GLOW */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#9B1C1C]/10 to-[#D4A017]/10 blur-3xl rounded-2xl md:rounded-[40px]"></div>

            {/* FORM CONTAINER */}
            <div className="relative bg-white/80 backdrop-blur-2xl border border-white/50 rounded-2xl md:rounded-[40px] p-6 md:p-10 lg:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.10)]">
              {/* HEADER */}
              <div>
                <p className="uppercase tracking-[4px] md:tracking-[6px] text-[#D4A017] text-xs md:text-sm font-semibold">
                  Send Message
                </p>
                <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-[#9B1C1C]">
                  Contact Form
                </h2>
                <p className="mt-4 md:mt-5 text-base md:text-lg text-[#4A1F12]/70 leading-relaxed">
                  Fill out the form below and our luxury real estate team
                  will contact you shortly.
                </p>
              </div>

              {/* FORM */}
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="relative py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl md:rounded-[40px] p-4 md:p-8 shadow-2xl overflow-hidden">
            <h2 className="text-2xl md:text-4xl font-black text-[#9B1C1C] text-center mb-6 md:mb-8">
              Find Us Here
            </h2>
            <div className="relative w-full h-[300px] md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Cauvery+Colony,+Koramangala,+Bengaluru+560034&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sri Megha Lakshmi Office Location - Koramangala, Bengaluru"
                className="rounded-xl md:rounded-2xl"
              />
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
            '@type': 'RealEstateAgent',
            name: 'Sri Megha Lakshmi',
            description: 'Premium luxury real estate developer in Bangalore offering property consultation, luxury apartments, and construction services.',
            telephone: '+919741021116',
            email: 'hello@srimeghalakshmi.in',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Shop No. 902, 2nd Main Rd, Nirguna Mandir Layout, Cauvery Colony, Koramangala',
              addressLocality: 'Bengaluru',
              addressRegion: 'Karnataka',
              postalCode: '560034',
              addressCountry: 'India',
            },
            openingHours: 'Mon-Sat 10:00 AM - 7:00 PM',
            priceRange: '₹₹₹₹',
            areaServed: 'Bengaluru',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+919741021116',
              contactType: 'customer service',
              availableLanguage: ['English', 'Kannada', 'Hindi'],
            },
            sameAs: [
              // Add social media URLs here if available
            ],
          }),
        }}
      />
    </main>
  )
}