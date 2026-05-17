'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What types of properties do you offer?',
    answer:
      'We offer luxury villas, premium apartments, commercial spaces, residential plots, and high-end investment properties across Bengaluru.',
  },

  {
    question: 'Are the homes vastu compliant?',
    answer:
      'Yes, all Sri Megha Lakshmi properties are thoughtfully designed with vastu principles to ensure harmony, positivity, and comfortable living.',
  },

  {
    question: 'Do you provide site visit appointments?',
    answer:
      'Absolutely. You can easily schedule personalized site visits through our website or contact our sales team directly.',
  },

  {
    question: 'Do you assist with property investment guidance?',
    answer:
      'Yes, we provide professional consultation for luxury real estate investments, ROI analysis, and premium property selection.',
  },

  {
    question: 'Where are your projects located?',
    answer:
      'Our premium developments are strategically located in prime Bengaluru areas including Koramangala, Whitefield, HSR Layout, and Electronic City.',
  },
]

export default function FaqSection() {

  const [open, setOpen] = useState<number | null>(0)

  return (

    <section className="relative py-32 px-4 md:px-6 overflow-hidden bg-[#F8F6F2]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] rounded-full bg-[#9B1C1C]/10 blur-3xl"></div>

        <div className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] rounded-full bg-[#D4A017]/10 blur-3xl"></div>

      </div>

      <div className="relative max-w-5xl mx-auto">

        {/* HEADING */}
        <div className="text-center">

          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-5 py-3 shadow-xl">

            <div className="w-3 h-3 rounded-full bg-[#D4A017] animate-pulse"></div>

            <p className="uppercase tracking-[5px] text-[#9B1C1C] text-xs md:text-sm font-semibold">
              Frequently Asked Questions
            </p>

          </div>

          <h2 className="mt-8 text-5xl md:text-7xl font-black text-[#9B1C1C] leading-tight">

            Luxury Real Estate
            <br />

            <span className="text-[#D4A017]">
              FAQs
            </span>

          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg md:text-2xl text-[#4A1F12]/70 leading-relaxed">

            Everything you need to know about our premium
            luxury properties and real estate services.

          </p>

        </div>

        {/* FAQ LIST */}
        <div className="mt-20 space-y-6">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="group relative"
            >

              {/* GLOW */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#9B1C1C]/10 via-[#D4A017]/10 to-[#B76E79]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

              {/* CARD */}
              <div className="relative overflow-hidden rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_25px_80px_rgba(0,0,0,0.08)] transition-all duration-700">

                {/* BUTTON */}
                <button
                  onClick={() => setOpen(open === index ? null : index)}
                  className="w-full flex items-center justify-between gap-6 p-8 text-left"
                >

                  <h3 className="text-xl md:text-2xl font-bold text-[#9B1C1C]">

                    {faq.question}

                  </h3>

                  <div
                    className={`
                      w-12 h-12 rounded-full bg-[#9B1C1C]/10 flex items-center justify-center transition-all duration-500
                      ${open === index ? 'rotate-180 bg-[#D4A017]/20' : ''}
                    `}
                  >

                    <ChevronDown className="text-[#9B1C1C]" />

                  </div>

                </button>

                {/* ANSWER */}
                <div
                  className={`
                    overflow-hidden transition-all duration-700
                    ${open === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >

                  <div className="px-8 pb-8">

                    <p className="text-lg text-[#4A1F12]/75 leading-relaxed">

                      {faq.answer}

                    </p>

                  </div>

                </div>

                {/* BORDER */}
                <div className="absolute inset-0 rounded-[32px] border border-white/30 pointer-events-none"></div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}