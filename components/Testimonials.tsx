import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    role: 'Villa Owner',
    text: 'Sri Megha Lakshmi delivered an exceptional living experience with premium quality construction and vastu-perfect layouts.',
  },
  {
    name: 'Priya Reddy',
    role: 'Apartment Buyer',
    text: 'The spacious layouts, modern amenities and attentive support made our home-buying journey seamless.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Investor',
    text: 'One of the best real estate investments I have made in Bangalore. Excellent appreciation and fine craftsmanship.',
  },
]

export default function Testimonials() {
  return (
    <section className="section bg-sand/60">
      <div className="container-x">
        <SectionHeading
          eyebrow="Client Stories"
          title={
            <>
              Trusted by <em className="text-gold-deep">homeowners</em>
            </>
          }
        />

        {/* Swipe on phones, three columns on desktop */}
        <div className="mt-14 -mx-5 px-5 sm:mx-0 sm:px-0 flex lg:grid lg:grid-cols-3 gap-5 md:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-2 [scrollbar-width:none]">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120} className="snap-start shrink-0 w-[85%] sm:w-[60%] lg:w-auto">
              <figure className="card h-full p-7 md:p-9 flex flex-col">
                <span className="font-display text-7xl leading-none text-gold/60 h-10">&ldquo;</span>
                <blockquote className="mt-4 font-display text-[1.4rem] md:text-2xl leading-snug text-bronze flex-1">
                  {t.text}
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-bronze/10 flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full bg-ruby text-white font-semibold flex items-center justify-center">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold text-bronze">{t.name}</span>
                    <span className="block text-xs tracking-[0.18em] uppercase text-gold-deep mt-0.5">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
