'use client'

import { useState } from 'react'

const fieldClass =
  'w-full bg-white/70 border border-[#D4A017]/20 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 outline-none focus:border-[#9B1C1C] focus:ring-2 focus:ring-[#9B1C1C]/20 transition-all duration-300 text-base md:text-lg shadow-sm'

const INQUIRY_TYPES: Record<string, string> = {
  property: 'Property Inquiry',
  construction: 'Construction Service',
  investment: 'Investment Consultation',
  general: 'General Inquiry',
}

// Contact page form — saves to Enquiries in the admin panel
export default function ContactForm() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', inquiryType: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setStatus('sending')
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        type: 'contact',
        message: `[${INQUIRY_TYPES[form.inquiryType] ?? 'General Inquiry'}] ${form.message}`,
      }),
    }).catch(() => null)

    if (!res || !res.ok) {
      const data = res ? await res.json().catch(() => ({})) : {}
      setError(data.error || 'Could not send your message. Please try again or call us.')
      setStatus('idle')
      return
    }
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="mt-8 md:mt-12 rounded-2xl bg-[#F8F6F2] border border-[#D4A017]/20 p-8 text-center">
        <p className="text-3xl font-black text-[#9B1C1C]">Thank you!</p>
        <p className="mt-3 text-lg text-[#4A1F12]/70">Our team will contact you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 md:mt-12 space-y-4 md:space-y-6">
      <input type="text" name="fullName" placeholder="Full Name" required autoComplete="name" className={fieldClass} value={form.fullName} onChange={set('fullName')} />
      <input type="email" name="email" placeholder="Email Address" required autoComplete="email" className={fieldClass} value={form.email} onChange={set('email')} />
      <input type="tel" name="phone" placeholder="Phone Number" required autoComplete="tel" className={fieldClass} value={form.phone} onChange={set('phone')} />
      <select name="inquiryType" required className={fieldClass} value={form.inquiryType} onChange={set('inquiryType')}>
        <option value="">Select Inquiry Type</option>
        {Object.entries(INQUIRY_TYPES).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <textarea name="message" rows={5} placeholder="Your Message" required className={`${fieldClass} resize-none`} value={form.message} onChange={set('message')} />

      {error && <p className="text-[#9B1C1C] text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group relative overflow-hidden w-full bg-gradient-to-r from-[#9B1C1C] to-[#B76E79] hover:scale-[1.02] text-white py-4 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 text-lg md:text-xl font-semibold shadow-[0_20px_60px_rgba(155,28,28,0.35)] disabled:opacity-60"
      >
        <span className="relative z-10">{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      </button>
    </form>
  )
}
