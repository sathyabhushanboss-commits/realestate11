'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { SITE } from '@/lib/site'

const SEEN_KEY = 'sml_lead_popup_seen'

export default function LeadPopup({ delayMs = 15000 }: { delayMs?: number }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  // Show once per browser session, after a delay
  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {}
    if (seen) return
    const t = setTimeout(() => setOpen(true), delayMs)
    return () => clearTimeout(t)
  }, [delayMs])

  const close = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {}
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your name'
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit mobile number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) e.email = 'Enter a valid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('sending')

    // Opened synchronously so mobile browsers don't block it as a popup
    const text = `*NEW LEAD FROM WEBSITE*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email || '-'}`
    window.open(`${SITE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')

    // Saved for the admin panel, and emailed to the team
    await Promise.allSettled([
      fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'contact', message: 'Requested a consultation (website popup)' }),
      }),
      form.email &&
        fetch('/api/send-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }),
    ])
    setStatus('sent')
    setTimeout(close, 2500)
  }

  if (!open) return null

  const fieldClass = (err?: string) =>
    `w-full h-12 rounded-xl bg-white/10 border px-4 text-white text-base placeholder:text-white/40 outline-none transition focus:border-gold ${
      err ? 'border-red-400' : 'border-white/15'
    }`

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-ink/70 backdrop-blur-sm sm:px-4 animate-fade-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-title"
      onClick={close}
    >
      <div
        className="relative w-full sm:max-w-[440px] rounded-t-3xl sm:rounded-3xl bg-ink text-white overflow-hidden shadow-2xl pb-[env(safe-area-inset-bottom)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-ruby/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full bg-gold/20 blur-3xl" />

        <button
          onClick={close}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative p-7 sm:p-9">
          {status === 'sent' ? (
            <div className="text-center py-8">
              <p className="font-display text-4xl">Thank you</p>
              <p className="mt-3 text-white/70">Our team will call you shortly.</p>
            </div>
          ) : (
            <>
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white">
                <Image src="/logo.jpeg" alt="" fill sizes="64px" className="object-cover" />
              </div>
              <p className="eyebrow eyebrow-light mt-6">Complimentary</p>
              <h2 id="lead-title" className="mt-3 font-display text-4xl leading-tight">
                Speak with a <em className="text-gold-soft">property expert</em>
              </h2>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                Plots, construction, rentals or legal paperwork — get honest advice, free of charge.
              </p>

              <form onSubmit={submit} noValidate className="mt-6 space-y-3">
                <div>
                  <input
                    className={fieldClass(errors.name)}
                    placeholder="Full name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && <p className="text-red-300 text-xs mt-1 ml-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    className={fieldClass(errors.phone)}
                    type="tel"
                    inputMode="numeric"
                    placeholder="10-digit mobile number"
                    autoComplete="tel-national"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  />
                  {errors.phone && <p className="text-red-300 text-xs mt-1 ml-1">{errors.phone}</p>}
                </div>
                <div>
                  <input
                    className={fieldClass(errors.email)}
                    type="email"
                    placeholder="Email (optional)"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && <p className="text-red-300 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>
                <button disabled={status === 'sending'} className="btn btn-gold w-full !mt-5 disabled:opacity-60">
                  {status === 'sending' ? 'Sending…' : 'Get a Free Consultation'}
                </button>
              </form>
              <p className="mt-4 text-[11px] text-white/35 leading-relaxed text-center">
                By submitting you agree to be contacted by Sri Megha Lakshmi Group.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
