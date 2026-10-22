import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Compass, Sun, Wind, LayoutGrid } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import CtaBanner from '@/components/CtaBanner'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Sri Megha Lakshmi Group — land development, construction and real estate services across Bengaluru with 15+ years of experience.',
}

const FEATURES = [
  { icon: LayoutGrid, title: 'Smart Design', desc: 'Optimised layouts crafted for spacious living and modern lifestyles.' },
  { icon: Compass, title: 'Vaastu Friendly', desc: 'Every residence designed with harmony, balance and positive energy.' },
  { icon: Wind, title: 'Well Ventilated', desc: 'Natural airflow and abundant sunlight for healthier living.' },
  { icon: Sun, title: 'Balcony Spaces', desc: 'Private outdoor spaces that bring light and views indoors.' },
]

const PROCESS = [
  ['Explore Projects', 'Browse verified listings or tell us exactly what you need.'],
  ['Schedule a Site Visit', 'Walk the property with a team member who knows every document.'],
  ['Book Your Home', 'Transparent pricing, clear paperwork and no surprises.'],
  ['Construction Updates', 'Regular progress updates through every stage of the build.'],
  ['Handover', 'Keys, documents and e-Khata — all handed over together.'],
  ['After-Sales Support', 'We stay on call for maintenance, rentals and resale.'],
]

export default function AboutPage() {
  return (
    <main className="bg-ivory">
      {/* INTRO */}
      <section className="container-x pt-12 md:pt-20 pb-16 md:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="animate-fade-up">
          <p className="eyebrow">About Sri Megha Lakshmi</p>
          <h1 className="heading-xl mt-6">
            Spacious homes, <em className="text-gold-deep">tailored</em> for you.
          </h1>
          <p className="lead mt-6 max-w-xl">
            For over 15 years we have helped Bengaluru families and investors find, build and own property with
            confidence — combining land development, construction and real estate services under one trusted name.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link href="/properties" className="btn btn-primary">
              View Properties
            </Link>
            <Link href="/appointment" className="btn btn-outline">
              Book a Site Visit
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 max-w-md">
            {[
              ['15+', 'Years'],
              ['500+', 'Clients'],
              ['250+', 'Projects'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-4xl md:text-5xl text-ruby">{value}</dd>
                <p className="text-xs tracking-[0.2em] uppercase text-bronze/55 mt-1">{label}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] animate-fade-up [animation-delay:150ms]">
          <div className="relative aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden ring-1 ring-gold/30 shadow-[0_40px_80px_-30px_rgba(30,12,7,0.45)]">
            <Image
              src="/properties/set3.jpeg"
              alt="Residential building by Sri Megha Lakshmi Group"
              fill
              priority
              sizes="(max-width: 1024px) 460px, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-7 text-white">
              <p className="eyebrow eyebrow-light">Our promise</p>
              <p className="mt-3 font-display text-3xl leading-tight">Homes that breathe — built with care and clear titles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Modern Living"
            title={
              <>
                Thoughtfully planned <em className="text-gold-deep">homes</em>
              </>
            }
            description="Designed for modern lifestyles, natural ventilation and spacious, elegant living."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="h-full p-7 rounded-3xl bg-ivory border border-bronze/[0.07]">
                  <span className="w-12 h-12 rounded-full bg-ruby text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-ruby">{title}</h3>
                  <p className="mt-2 text-bronze/65 leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                Your journey to your <em className="text-gold-deep">dream home</em>
              </>
            }
            description="A seamless, transparent process with personal support at every step."
          />
          <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-bronze/10">
            {PROCESS.map(([title, desc], i) => (
              <Reveal key={title} as="li" delay={(i % 3) * 100} className="border-r border-b border-bronze/10">
                <div className="h-full p-7 md:p-10">
                  <span className="font-display text-6xl text-gold/70 leading-none">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-6 font-display text-2xl text-ruby">{title}</h3>
                  <p className="mt-2 text-bronze/65 leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner />
    </main>
  )
}
