'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mail, MessageCircle, Phone, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/PanelShell'

interface EnquiryRow {
  _id: string
  name: string
  phone: string
  email: string
  message: string
  type: 'enquiry' | 'site-visit' | 'contact'
  preferredDate: string
  status: 'new' | 'contacted' | 'closed'
  createdAt: string
  property: { _id: string; title: string; location: string } | null
  user: { _id: string; name: string; email: string } | null
}

const TYPE_LABELS = { enquiry: 'Property enquiry', 'site-visit': 'Site visit', contact: 'Contact form' }
const STATUS_STYLES = {
  new: 'border-ruby/30 bg-ruby/5 text-ruby',
  contacted: 'border-amber-300 bg-amber-50 text-amber-800',
  closed: 'border-emerald-300 bg-emerald-50 text-emerald-800',
}

export default function AdminEnquiriesPage() {
  const [items, setItems] = useState<EnquiryRow[]>([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/enquiries${filter ? `?status=${filter}` : ''}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!cancelled) {
          setItems(data)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [filter])

  const changeFilter = (value: string) => {
    setLoading(true)
    setFilter(value)
  }

  const updateStatus = async (id: string, status: EnquiryRow['status']) => {
    setItems((list) => list.map((e) => (e._id === id ? { ...e, status } : e)))
    await fetch(`/api/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this enquiry?')) return
    const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' })
    if (res.ok) setItems((list) => list.filter((e) => e._id !== id))
  }

  return (
    <>
      <PageHeader title="Enquiries" description="Leads from property pages, the contact form and site-visit bookings" />

      <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
        {[
          ['', 'All'],
          ['new', 'New'],
          ['contacted', 'Contacted'],
          ['closed', 'Closed'],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => changeFilter(value)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition ${
              filter === value ? 'bg-ink text-white border-ink' : 'bg-white border-bronze/15 text-bronze'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="py-16 text-center text-bronze/50">Loading…</p>
      ) : items.length === 0 ? (
        <div className="card py-16 text-center text-bronze/60">No enquiries here.</div>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {items.map((e) => (
            <li key={e._id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-gold-deep">{TYPE_LABELS[e.type]}</p>
                  <p className="mt-1 font-semibold text-bronze text-lg">{e.name}</p>
                  <p className="text-xs text-bronze/50">
                    {new Date(e.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    {e.user && ' · registered user'}
                  </p>
                </div>
                <select
                  value={e.status}
                  onChange={(ev) => updateStatus(e._id, ev.target.value as EnquiryRow['status'])}
                  className={`text-sm font-semibold rounded-full border px-3 py-1.5 capitalize ${STATUS_STYLES[e.status]}`}
                  aria-label="Enquiry status"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {e.property && (
                <Link href={`/properties/${e.property._id}`} target="_blank" className="mt-3 inline-block text-sm text-ruby font-medium hover:underline">
                  {e.property.title} — {e.property.location}
                </Link>
              )}
              {e.preferredDate && <p className="mt-2 text-sm text-bronze/70">Preferred: {e.preferredDate}</p>}
              {e.message && <p className="mt-3 text-sm text-bronze/80 bg-ivory rounded-xl p-3 whitespace-pre-line">{e.message}</p>}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <a href={`tel:${e.phone}`} className="btn btn-outline !min-h-0 !py-2 !px-4 text-sm">
                  <Phone className="w-4 h-4" /> {e.phone}
                </a>
                <a
                  href={`https://wa.me/${e.phone.replace(/\D/g, '').replace(/^(?=\d{10}$)/, '91')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline !min-h-0 !py-2 !px-4 text-sm"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                {e.email && (
                  <a href={`mailto:${e.email}`} className="btn btn-outline !min-h-0 !py-2 !px-4 text-sm">
                    <Mail className="w-4 h-4" /> Email
                  </a>
                )}
                <button onClick={() => remove(e._id)} className="ml-auto p-2.5 rounded-lg text-ruby hover:bg-ruby/10" aria-label="Delete enquiry">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
