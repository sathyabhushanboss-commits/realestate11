import { Plus } from 'lucide-react'
import SectionHeading from './SectionHeading'

const FAQS = [
  {
    question: 'What types of properties do you offer?',
    answer:
      'We offer villas, apartments, commercial spaces, residential plots and investment properties across Bengaluru.',
  },
  {
    question: 'Are the homes vastu compliant?',
    answer:
      'Yes, Sri Megha Lakshmi properties are designed with vastu principles to ensure harmony, positivity and comfortable living.',
  },
  {
    question: 'Do you provide site visit appointments?',
    answer:
      'Absolutely. Schedule a personalised site visit through our website or call our sales team directly.',
  },
  {
    question: 'Do you assist with property investment guidance?',
    answer: 'Yes, we provide professional consultation for real estate investments, ROI analysis and property selection.',
  },
  {
    question: 'Where are your projects located?',
    answer:
      'Our developments are in prime Bengaluru areas including Koramangala, Whitefield, HSR Layout and Electronic City.',
  },
]

export default function FaqSection() {
  return (
    <section className="section bg-ivory">
      <div className="container-x grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-32 self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={
              <>
                Questions, <em className="text-gold-deep">answered</em>
              </>
            }
            description="Can't find what you're looking for? Our team is a phone call away."
          />
        </div>

        {/* Native <details> works without JavaScript and is accessible by default */}
        <div className="border-t border-bronze/15">
          {FAQS.map((faq, i) => (
            <details key={faq.question} className="group border-b border-bronze/15" open={i === 0}>
              <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-display text-xl md:text-2xl text-bronze group-open:text-ruby transition-colors">
                  {faq.question}
                </span>
                <span className="w-10 h-10 rounded-full border border-bronze/20 flex items-center justify-center shrink-0 group-open:bg-ruby group-open:border-ruby group-open:text-white transition-colors">
                  <Plus className="w-4 h-4 transition-transform duration-300 group-open:rotate-45" />
                </span>
              </summary>
              <p className="pb-6 pr-14 text-bronze/70 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
