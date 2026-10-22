import { Building2, Car, Dumbbell, ShieldCheck, Trees, Waves } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const AMENITIES = [
  { icon: Building2, title: 'Clubhouse', desc: 'Community spaces designed for gatherings and modern living.' },
  { icon: ShieldCheck, title: '24/7 Security', desc: 'Gated communities with round-the-clock protection.' },
  { icon: Trees, title: 'Green Spaces', desc: 'Landscaped gardens and peaceful outdoor areas.' },
  { icon: Dumbbell, title: 'Fitness Centre', desc: 'Well-equipped gyms and wellness spaces.' },
  { icon: Waves, title: 'Swimming Pool', desc: 'Pool areas made for relaxation and recreation.' },
  { icon: Car, title: 'Secure Parking', desc: 'Spacious parking with controlled access.' },
]

export default function Amenities() {
  return (
    <section className="section bg-ivory">
      <div className="container-x">
        <SectionHeading
          eyebrow="Lifestyle"
          title={
            <>
              Designed for the way <em className="text-gold-deep">you live</em>
            </>
          }
          description="Thoughtful amenities that make every day more comfortable, secure and connected."
        />

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 border-t border-l border-bronze/10">
          {AMENITIES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={(i % 3) * 100} className="border-r border-b border-bronze/10">
              <div className="group h-full p-5 sm:p-8 md:p-10 hover:bg-white transition-colors duration-500">
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gold/40 text-gold-deep flex items-center justify-center group-hover:bg-ruby group-hover:border-ruby group-hover:text-white transition-colors duration-500">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 sm:mt-7 font-display text-xl sm:text-[1.75rem] leading-tight text-ruby">{title}</h3>
                <p className="mt-2 text-sm sm:text-base text-bronze/65 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
