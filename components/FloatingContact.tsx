'use client'

import { useState } from 'react'

import {
  Phone,
  Mail,
  MessageSquareMore,
} from 'lucide-react'

export default function FloatingContact() {

  const [open, setOpen] = useState(false)

  return (

    <div className="fixed bottom-6 right-4 md:right-6 z-[9999]">

      {/* VERTICAL MENU */}
      <div
        className={`
          absolute bottom-24 right-0
          flex flex-col gap-4
          transition-all duration-500
          ${open
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5 pointer-events-none'
          }
        `}
      >

        {/* WHATSAPP */}
        <a
          href="https://wa.me/919741021116"
          target="_blank"
          className="group"
        >

          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-xl rounded-full pl-2 pr-5 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.12)] hover:scale-105 transition-all duration-300">

            {/* ICON */}
            <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shrink-0">

              {/* OFFICIAL WHATSAPP SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-white"
              >
                <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.82.735 5.57 2.13 7.99L0 32l7.82-2.052a15.94 15.94 0 0 0 8.18 2.252c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.09a13.1 13.1 0 0 1-6.67-1.83l-.48-.286-4.64 1.217 1.238-4.52-.313-.464A13.08 13.08 0 1 1 16 29.486zm7.19-9.81c-.394-.197-2.33-1.15-2.69-1.28-.36-.132-.623-.198-.886.197-.263.394-1.018 1.28-1.248 1.543-.23.263-.46.296-.854.099-.394-.197-1.664-.613-3.17-1.956-1.17-1.043-1.96-2.33-2.19-2.724-.23-.394-.024-.607.173-.803.177-.176.394-.46.59-.69.197-.23.263-.394.394-.657.132-.263.066-.493-.033-.69-.099-.197-.886-2.134-1.215-2.92-.32-.77-.646-.665-.886-.677l-.755-.013c-.263 0-.69.099-1.05.493-.36.394-1.378 1.345-1.378 3.28 0 1.936 1.41 3.806 1.607 4.07.197.263 2.775 4.238 6.72 5.94.94.406 1.674.648 2.245.83.943.3 1.802.258 2.48.157.756-.113 2.33-.952 2.658-1.87.328-.92.328-1.706.23-1.87-.099-.165-.362-.264-.756-.46z"/>
              </svg>
            </div>

            {/* TEXT */}
            <div>

              <p className="text-[10px] uppercase tracking-[2px] text-gray-400 leading-none">
                WhatsApp
              </p>

              <h3 className="text-sm font-bold text-[#111] mt-1 whitespace-nowrap">
                Chat With Us
              </h3>
            </div>
          </div>
        </a>

        {/* CALL */}
        <a
          href="tel:+919741021116"
          className="group"
        >

          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-xl rounded-full pl-2 pr-5 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.12)] hover:scale-105 transition-all duration-300">

            {/* ICON */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E8B889] to-[#B46B4D] flex items-center justify-center shadow-lg shrink-0">

              <Phone className="text-white w-4 h-4" />
            </div>

            {/* TEXT */}
            <div>

              <p className="text-[10px] uppercase tracking-[2px] text-gray-400 leading-none">
                Direct
              </p>

              <h3 className="text-sm font-bold text-[#111] mt-1 whitespace-nowrap">
                Call Us
              </h3>
            </div>
          </div>
        </a>

        {/* EMAIL */}
        <a
          href="mailto:hello@srimeghalakshmi.in"
          className="group"
        >

          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-xl rounded-full pl-2 pr-5 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.12)] hover:scale-105 transition-all duration-300">

            {/* ICON */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shrink-0">

              <Mail className="text-white w-4 h-4" />
            </div>

            {/* TEXT */}
            <div>

              <p className="text-[10px] uppercase tracking-[2px] text-gray-400 leading-none">
                Email
              </p>

              <h3 className="text-sm font-bold text-[#111] mt-1 whitespace-nowrap">
                Mail Us
              </h3>
            </div>
          </div>
        </a>
      </div>

      {/* MAIN BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="group relative"
      >

        {/* GLOW */}
        <div className="absolute inset-0 rounded-full bg-[#9B1C1C] blur-2xl opacity-40 animate-pulse"></div>

        {/* BUTTON */}
        <div
          className="relative mt-6 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#9B1C1C] to-[#D4A017] shadow-[0_15px_60px_rgba(155,28,28,0.4)] flex items-center justify-center hover:scale-110 transition-all duration-500"
        >

          <MessageSquareMore className="text-white w-7 h-7 md:w-9 md:h-9" />
        </div>
      </button>
    </div>
  )
}