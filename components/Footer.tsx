import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import { COMPANY_LINKS, NAV_LINKS, SITE } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="relative bg-ink text-white/70 overflow-hidden">
      <div className="absolute inset-x-0 top-0 hairline" />

      {/* CTA STRIP */}
      <div className="container-x pt-16 md:pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-14 border-b border-white/10">
          <div className="max-w-xl">
            <p className="eyebrow eyebrow-light">Start a conversation</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-white leading-[1.05]">
              Let&apos;s find the right <em className="text-gold-soft">address</em> for you.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/appointment" className="btn btn-gold">
              Book a Site Visit
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* LINKS */}
      <div className="container-x py-14 grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr] gap-x-8 gap-y-12">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white shrink-0">
              <Image src="/logo.jpeg" alt="Sri Megha Lakshmi logo" fill sizes="64px" className="object-cover" />
            </div>
            <div>
              <p className="font-display text-2xl text-white leading-none">Sri Megha Lakshmi</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mt-2">Group of Companies</p>
            </div>
          </Link>
          <p className="mt-6 text-sm leading-relaxed max-w-sm">
            Land development, construction, property sales, rentals, interiors, e-Khata and legal services —
            delivered with complete transparency across Bengaluru.
          </p>
        </div>

        <FooterColumn title="Explore">
          {NAV_LINKS.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
          <FooterLink href="/appointment">Book Appointment</FooterLink>
        </FooterColumn>

        <FooterColumn title="Our Companies">
          {COMPANY_LINKS.map((c) => (
            <FooterLink key={c.href} href={c.href}>
              {c.short}
            </FooterLink>
          ))}
        </FooterColumn>

        <div className="col-span-2 lg:col-span-1">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold font-semibold">Visit Us</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <span className="leading-relaxed">
                {SITE.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <span className="space-y-1">
                {SITE.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block hover:text-white transition">
                    {p}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <a href={`mailto:${SITE.email}`} className="hover:text-white transition break-all">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <p>© {new Date().getFullYear()} Sri Megha Lakshmi Group. All rights reserved.</p>
          <p>Real Estate &amp; Construction · Bengaluru</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.25em] uppercase text-gold font-semibold">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  )
}
