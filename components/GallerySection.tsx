import Image from 'next/image'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

// Real project photos (portrait phone shots), arranged so tall frames suit them
const PHOTOS = [
  { src: '/properties/set3.1.jpeg', alt: 'Residential apartment building, Koramangala', label: 'Koramangala' },
  { src: '/properties/set1.jpeg', alt: 'Commercial building, Doddakannalli', label: 'Doddakannalli' },
  { src: '/properties/set4.jpeg', alt: 'Legacy commercial building, Koramangala', label: 'Koramangala' },
  { src: '/properties/set2.jpeg', alt: 'Residential units, Kasavanahalli', label: 'Kasavanahalli' },
]

export default function GallerySection() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Work"
          title={
            <>
              Built across <em className="text-gold-deep">Bengaluru</em>
            </>
          }
          description="A selection of properties we have developed, built and sold for our clients."
        />

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {PHOTOS.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 100}
              // stagger the columns on desktop for an editorial rhythm
              className={i % 2 === 1 ? 'lg:mt-16' : ''}
            >
              <figure className="group relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-sand">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-white text-xs sm:text-sm font-semibold tracking-wide">
                  {photo.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
