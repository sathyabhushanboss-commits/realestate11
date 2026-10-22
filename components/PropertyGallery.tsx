'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-[4/5] sm:aspect-[4/3] rounded-3xl bg-sand flex items-center justify-center text-bronze/50">
        Photos coming soon
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Portrait-friendly frame so phone photos aren't cropped awkwardly */}
      <div className="relative aspect-[4/5] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-sand">
        <Image
          src={images[active]}
          alt={`${title} — photo ${active + 1}`}
          fill
          priority
          unoptimized={images[active].startsWith('/api/')}
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
        {images.length > 1 && (
          <span className="absolute bottom-4 right-4 bg-ink/70 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {active + 1} / {images.length}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 transition ${
                i === active ? 'ring-2 ring-gold ring-offset-2 ring-offset-ivory' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={src} alt="" fill unoptimized={src.startsWith('/api/')} sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
