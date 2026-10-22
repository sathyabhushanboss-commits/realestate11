'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/PanelShell'
import StatusBadge from '@/components/StatusBadge'

interface MyEnquiry {
  _id: string
  type: 'enquiry' | 'site-visit' | 'contact'
  message: string
  preferredDate: string
  status: string
  createdAt: string
  property: { _id: string; title: string; location: string } | null
}

const TYPE_LABELS = { enquiry: 'Property enquiry', 'site-visit': 'Site visit request', contact: 'Message' }

export default function MyEnquiriesPage() {
  const [items, setItems] = useState<MyEnquiry[] | null>(null)

  useEffect(() => {
    fetch('/api/enquiries')
      .then((r) => (r.ok ? r.json() : []))
      .then(setItems)
  }, [])

  const withdraw = async (id: string) => {
    if (!confirm('Withdraw this enquiry?')) return
    const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' })
    if (res.ok) setItems((list) => list?.filter((e) => e._id !== id) ?? null)
  }

  return (
    <>
      <PageHeader title="My enquiries" description="Track the status of everything you've sent us" />

      {items === null ? (
        <p className="py-16 text-center text-bronze/50">Loading…</p>
      ) : items.length === 0 ? (
        <div className="card py-16 px-6 text-center text-bronze/60">
          No enquiries yet.{' '}
          <Link href="/properties" className="text-ruby font-semibold">
            Browse properties
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {items.map((e) => (
            <li key={e._id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-gold-deep">{TYPE_LABELS[e.type]}</p>
                  {e.property ? (
                    <Link href={`/properties/${e.property._id}`} className="mt-1 block font-semibold text-bronze hover:text-ruby truncate">
                      {e.property.title}
                    </Link>
                  ) : (
                    <p className="mt-1 font-semibold text-bronze">General enquiry</p>
                  )}
                  <p className="text-xs text-bronze/50">
                    Sent {new Date(e.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
                <StatusBadge status={e.status} />
              </div>
              {e.preferredDate && <p className="mt-3 text-sm text-bronze/70">Preferred: {e.preferredDate}</p>}
              {e.message && <p className="mt-3 text-sm text-bronze/80 bg-ivory rounded-xl p-3 whitespace-pre-line">{e.message}</p>}
              {e.status === 'new' && (
                <button onClick={() => withdraw(e._id)} className="mt-4 text-sm text-ruby font-medium">
                  Withdraw
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
