import Link from 'next/link'

export interface LegalSection {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/refund-policy', label: 'Refund & Cancellation' },
]

export const LEGAL_CONTACT = {
  company: 'Sri Megha Lakshmi Group',
  address: 'Shop No. 902, Koramangala, Bengaluru, Karnataka 560034',
  email: 'hello@srimeghalakshmi.in',
  phone: '+91 9741021116',
}

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
  path,
}: {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
  path: string
}) {
  return (
    <main className="bg-ivory font-sans">
      <section className="bg-ruby text-white">
        <div className="container-x py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70">
            <Link href="/" className="hover:text-gold-soft">Home</Link>
            <span className="mx-2 text-gold-soft">/</span>
            <span>{title}</span>
          </nav>
          <h1 className="mt-5 font-display text-4xl md:text-6xl font-semibold">{title}</h1>
          <p className="mt-4 text-white/75">Last updated: {updated}</p>
        </div>
      </section>

      <div className="container-x py-12 md:py-16 grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
        <aside className="lg:sticky lg:top-28 h-fit">
          <p className="eyebrow">Legal</p>
          <ul className="mt-4 flex flex-wrap lg:flex-col gap-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.href === path ? 'page' : undefined}
                  className={`block rounded-full lg:rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    link.href === path ? 'bg-ruby text-white' : 'bg-white text-bronze hover:text-ruby border border-bronze/10'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <article className="card p-6 sm:p-10 max-w-3xl">
          <p className="lead">{intro}</p>
          {sections.map((section, i) => (
            <section key={section.heading} className="mt-10">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-ruby">
                {i + 1}. {section.heading}
              </h2>
              {section.paragraphs?.map((text) => (
                <p key={text} className="mt-4 text-bronze/80 leading-relaxed">{text}</p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-2.5">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3 text-bronze/80 leading-relaxed">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="mt-12 rounded-2xl bg-sand/60 border border-gold/30 p-6">
            <h2 className="font-display text-2xl font-semibold text-ruby">Contact us</h2>
            <p className="mt-3 text-bronze/80 leading-relaxed">
              {LEGAL_CONTACT.company}
              <br />
              {LEGAL_CONTACT.address}
              <br />
              Email:{' '}
              <a href={`mailto:${LEGAL_CONTACT.email}`} className="text-ruby font-semibold hover:underline">
                {LEGAL_CONTACT.email}
              </a>
              <br />
              Phone:{' '}
              <a href={`tel:${LEGAL_CONTACT.phone.replace(/\s/g, '')}`} className="text-ruby font-semibold hover:underline">
                {LEGAL_CONTACT.phone}
              </a>
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
