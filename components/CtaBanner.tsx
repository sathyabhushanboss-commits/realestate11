import Link from 'next/link'
import { CalendarCheck, MessageCircle, Phone, ShieldCheck } from 'lucide-react'

const STATS = [
  { value: '15+', label: 'Years of experience' },
  { value: '500+', label: 'Happy families' },
  { value: '100%', label: 'Legally verified' },
]

const CONTACTS = [
  {
    href: '/appointment',
    icon: CalendarCheck,
    title: 'Book a site visit',
    text: 'Pick a date that suits you',
  },
  {
    href: 'tel:+919741021116',
    icon: Phone,
    title: '+91 97410 21116',
    text: 'Talk to a property expert',
  },
  {
    href: 'https://wa.me/919741021116',
    icon: MessageCircle,
    title: 'Chat on WhatsApp',
    text: 'Get a quick reply',
    external: true,
  },
]

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-ruby font-sans" aria-labelledby="cta-heading">
      {/* Gold and maroon light, all from the logo palette */}
      <div className="absolute inset-0 bg-gradient-to-br from-ruby via-ruby-dark to-ink" />
      <div className="absolute -top-48 -right-32 w-[560px] h-[560px] rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-56 -left-40 w-[560px] h-[560px] rounded-full bg-ink/60 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative container-x py-16 md:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <p className="eyebrow eyebrow-light">Start your property journey</p>
          <h2 id="cta-heading" className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05] text-balance">
            Find, build or invest with <em className="text-gold-soft">complete confidence.</em>
          </h2>
          <p className="mt-6 text-lg text-white/75 max-w-xl leading-relaxed">
            Speak to our experts about approved plots, home construction or verified properties across Bengaluru.
            The first consultation is free, with no obligation.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-l-2 border-gold pl-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl md:text-4xl font-semibold text-gold-soft">{stat.value}</dd>
                <dd className="mt-1 text-xs md:text-sm text-white/65">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-3xl bg-white/[0.06] border border-white/15 backdrop-blur-sm p-5 sm:p-7">
          <ul className="space-y-3">
            {CONTACTS.map(({ href, icon: Icon, title, text, external }) => {
              const body = (
                <>
                  <span className="w-12 h-12 rounded-2xl bg-gold text-ink flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-white">{title}</span>
                    <span className="block text-sm text-white/60">{text}</span>
                  </span>
                  <span aria-hidden className="text-gold-soft text-xl transition-transform group-hover:translate-x-1">→</span>
                </>
              )
              const className =
                'group flex items-center gap-4 rounded-2xl bg-ink/30 hover:bg-ink/50 border border-white/10 hover:border-gold/50 p-4 transition'
              return (
                <li key={href}>
                  {href.startsWith('/') ? (
                    <Link href={href} className={className}>{body}</Link>
                  ) : (
                    <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {body}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
          <p className="mt-5 flex items-center gap-2 text-sm text-white/60">
            <ShieldCheck className="w-4 h-4 text-gold-soft shrink-0" />
            Your details stay private. We never share them with third parties.
          </p>
        </div>
      </div>
    </section>
  )
}
