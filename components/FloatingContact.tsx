'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarDays, Mail, MessageSquareMore, Phone, X } from 'lucide-react'
import { SITE } from '@/lib/site'

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.82.735 5.57 2.13 7.99L0 32l7.82-2.052a15.94 15.94 0 0 0 8.18 2.252c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.09a13.1 13.1 0 0 1-6.67-1.83l-.48-.286-4.64 1.217 1.238-4.52-.313-.464A13.08 13.08 0 1 1 16 29.486zm7.19-9.81c-.394-.197-2.33-1.15-2.69-1.28-.36-.132-.623-.198-.886.197-.263.394-1.018 1.28-1.248 1.543-.23.263-.46.296-.854.099-.394-.197-1.664-.613-3.17-1.956-1.17-1.043-1.96-2.33-2.19-2.724-.23-.394-.024-.607.173-.803.177-.176.394-.46.59-.69.197-.23.263-.394.394-.657.132-.263.066-.493-.033-.69-.099-.197-.886-2.134-1.215-2.92-.32-.77-.646-.665-.886-.677l-.755-.013c-.263 0-.69.099-1.05.493-.36.394-1.378 1.345-1.378 3.28 0 1.936 1.41 3.806 1.607 4.07.197.263 2.775 4.238 6.72 5.94.94.406 1.674.648 2.245.83.943.3 1.802.258 2.48.157.756-.113 2.33-.952 2.658-1.87.328-.92.328-1.706.23-1.87-.099-.165-.362-.264-.756-.46z" />
    </svg>
  )
}

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  const actions = [
    { href: SITE.whatsapp, label: 'Chat on WhatsApp', icon: <WhatsAppIcon className="w-5 h-5" />, color: 'bg-[#25D366]', external: true },
    { href: SITE.phoneHref, label: 'Call Us', icon: <Phone className="w-5 h-5" />, color: 'bg-ruby' },
    { href: `mailto:${SITE.email}`, label: 'Email Us', icon: <Mail className="w-5 h-5" />, color: 'bg-bronze' },
  ]

  return (
    <>
      {/* MOBILE: fixed bottom action bar */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-ivory/95 backdrop-blur-xl border-t border-bronze/10 shadow-[0_-10px_30px_-15px_rgba(30,12,7,0.3)] pb-[env(safe-area-inset-bottom)]"
        aria-label="Quick contact"
      >
        <div className="grid grid-cols-3 h-[4.25rem]">
          <a href={SITE.phoneHref} className="flex flex-col items-center justify-center gap-1 text-bronze active:bg-sand">
            <Phone className="w-5 h-5 text-ruby" />
            <span className="text-[11px] font-semibold">Call</span>
          </a>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 text-bronze border-x border-bronze/10 active:bg-sand"
          >
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            <span className="text-[11px] font-semibold">WhatsApp</span>
          </a>
          <Link
            href="/appointment"
            className="flex flex-col items-center justify-center gap-1 bg-ruby text-white active:bg-ruby-dark"
          >
            <CalendarDays className="w-5 h-5" />
            <span className="text-[11px] font-semibold">Book Visit</span>
          </Link>
        </div>
      </nav>

      {/* DESKTOP: expanding floating button */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <div
          className={`absolute bottom-20 right-0 flex flex-col items-end gap-3 transition-all duration-300 ${
            open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {actions.map((a) => (
            <a
              key={a.label}
              href={a.href}
              {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-3 bg-white rounded-full pl-5 pr-1.5 py-1.5 shadow-[0_12px_40px_-12px_rgba(30,12,7,0.35)] hover:-translate-x-1 transition-transform"
            >
              <span className="text-sm font-semibold text-bronze whitespace-nowrap">{a.label}</span>
              <span className={`w-10 h-10 rounded-full ${a.color} text-white flex items-center justify-center`}>
                {a.icon}
              </span>
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="w-16 h-16 rounded-full bg-ruby text-white flex items-center justify-center shadow-[0_18px_50px_-12px_rgba(155,28,28,0.7)] hover:bg-ruby-dark transition-colors ring-4 ring-gold/25"
          aria-label={open ? 'Close contact options' : 'Open contact options'}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <MessageSquareMore className="w-7 h-7" />}
        </button>
      </div>
    </>
  )
}
