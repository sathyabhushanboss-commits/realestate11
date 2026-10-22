'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  // The video is ~30 MB, so nothing downloads until the visitor presses play
  const play = () => {
    setPlaying(true)
    videoRef.current?.play()
  }

  return (
    <section className="section bg-ink text-white relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-ruby/25 blur-3xl" />

      <div className="relative container-x grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">
        <div>
          <p className="eyebrow eyebrow-light">Property Walkthrough</p>
          <h2 className="heading-lg mt-5 !text-white">
            Take a look <em className="text-gold-soft">inside.</em>
          </h2>
          <p className="lead mt-5 !text-white/70 max-w-md">
            Walk through one of our recent properties — then book a guided site visit and see every detail in person.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/appointment" className="btn btn-gold">
              Book a Site Visit
            </Link>
            <Link href="/properties" className="btn btn-ghost-light">
              Explore Properties
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[380px] lg:max-w-[420px]">
          <div className="relative aspect-[9/16] max-h-[78vh] rounded-[2rem] overflow-hidden ring-1 ring-white/15 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] bg-black">
            <video
              ref={videoRef}
              src="/properties/realestate_esteem_property.mp4"
              poster="/properties/set3.1.jpeg"
              preload="none"
              playsInline
              controls={playing}
              onEnded={() => setPlaying(false)}
              className="w-full h-full object-cover"
            />
            {!playing && (
              <button
                onClick={play}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/30 hover:bg-ink/20 transition group"
                aria-label="Play property video"
              >
                <span className="relative w-20 h-20 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="absolute inset-0 rounded-full ring-1 ring-white/30 animate-ping" />
                  <Play className="w-7 h-7 fill-white text-white ml-1" />
                </span>
                <span className="text-xs tracking-[0.25em] uppercase text-white/85">Watch the tour</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
