'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

type EnquiryType = 'enquiry' | 'site-visit' | 'contact'

export default function EnquiryForm({
  propertyId,
  type = 'enquiry',
  withDate = false,
  submitLabel = 'Send Enquiry',
  dark = false,
}: {
  propertyId?: string
  type?: EnquiryType
  withDate?: boolean
  submitLabel?: string
  dark?: boolean
}) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', preferredDate: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  // Prefill for signed-in users
  useEffect(() => {
    fetch('/api/account')
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => u && setForm((f) => ({ ...f, name: f.name || u.name, phone: f.phone || u.phone, email: f.email || u.email })))
      .catch(() => {})
  }, [])

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setStatus('sending')
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, type, ...(propertyId ? { property: propertyId } : {}) }),
    })
    if (!res.ok) {
      setError((await res.json()).error || 'Could not send. Please try again.')
      setStatus('idle')
      return
    }
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className={`text-center py-8 ${dark ? 'text-white' : 'text-bronze'}`}>
        <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500" />
        <p className="mt-4 font-display text-3xl">Thank you!</p>
        <p className={`mt-2 ${dark ? 'text-white/70' : 'text-bronze/65'}`}>Our team will contact you shortly.</p>
      </div>
    )
  }

  const field = dark ? 'field !bg-white/10 !border-white/15 !text-white placeholder:!text-white/40' : 'field'

  return (
    <form onSubmit={submit} className="space-y-4">
      <input className={field} required placeholder="Full name" autoComplete="name" value={form.name} onChange={set('name')} />
      <div className="grid sm:grid-cols-2 gap-4">
        <input className={field} required type="tel" placeholder="Mobile number" autoComplete="tel" value={form.phone} onChange={set('phone')} />
        <input className={field} type="email" placeholder="Email (optional)" autoComplete="email" value={form.email} onChange={set('email')} />
      </div>
      {withDate && (
        <input
          className={field}
          type="date"
          aria-label="Preferred date"
          min={new Date().toISOString().slice(0, 10)}
          value={form.preferredDate}
          onChange={set('preferredDate')}
        />
      )}
      <textarea className={`${field} resize-none`} rows={4} placeholder="Message (optional)" value={form.message} onChange={set('message')} />
      {error && <p className={`text-sm ${dark ? 'text-red-300' : 'text-ruby'}`}>{error}</p>}
      <button disabled={status === 'sending'} className={`btn ${dark ? 'btn-gold' : 'btn-primary'} w-full disabled:opacity-60`}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}
