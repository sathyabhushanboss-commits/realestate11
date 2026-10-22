const ITEMS = [
  'Clear Titles',
  'DTCP & BMRDA Approved',
  'Vastu Compliant',
  'Turnkey Construction',
  'e-Khata Assistance',
  'Investment Consultation',
  'Legal Verification',
  'Interior Solutions',
]

export default function TrustedSection() {
  return (
    <section className="relative bg-ivory border-y border-bronze/10 py-6 overflow-hidden" aria-label="Our commitments">
      {/* fade the edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-ivory to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-ivory to-transparent z-10" />

      <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-8 px-8" aria-hidden={i >= ITEMS.length}>
            <span className="font-display italic text-2xl md:text-3xl text-bronze/80 whitespace-nowrap">{item}</span>
            <span className="text-gold text-lg">✦</span>
          </div>
        ))}
      </div>
    </section>
  )
}
