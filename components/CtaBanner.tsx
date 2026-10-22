import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'

export default function CtaBanner() {
  return (
    <section className="bg-ivory pb-16 md:pb-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ruby text-white">
            <Image
              src="/properties/set3.jpeg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ruby via-ruby/90 to-ruby/60" />

            <div className="relative px-6 py-14 sm:px-12 md:px-16 md:py-20 max-w-3xl">
              <p className="eyebrow eyebrow-light">Find your property</p>
              <h2 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
                Ready to invest in your <em className="text-gold-soft">next address?</em>
              </h2>
              <p className="mt-5 text-white/80 text-lg max-w-xl">
                Talk to our team about plots, homes, construction or rentals anywhere in Bengaluru.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Link href="/appointment" className="btn btn-gold">
                  Book an Appointment
                </Link>
                <Link href="/properties" className="btn btn-ghost-light">
                  View Properties
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
