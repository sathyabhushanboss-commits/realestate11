'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Pencil, Search, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/PanelShell'
import StatusBadge from '@/components/StatusBadge'
import type { PropertyJSON } from '@/lib/properties'

export default function AdminPropertiesPage() {
  const [items, setItems] = useState<PropertyJSON[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [error, setError] = useState('')

  const load = useCallback(async (q: string, s: string) => {
    setLoading(true)
    const params = new URLSearchParams({ status: s })
    if (q) params.set('q', q)
    const res = await fetch(`/api/properties?${params}`)
    setItems(res.ok ? await res.json() : [])
    setLoading(false)
  }, [])

  // Debounce the search box
  useEffect(() => {
    const t = setTimeout(() => load(query, status), 250)
    return () => clearTimeout(t)
  }, [query, status, load])

  const remove = async (p: PropertyJSON) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return
    setError('')
    const res = await fetch(`/api/properties/${p._id}`, { method: 'DELETE' })
    if (res.ok) setItems((list) => list.filter((x) => x._id !== p._id))
    else setError((await res.json()).error || 'Delete failed')
  }

  return (
    <>
      <PageHeader
        title="Properties"
        description={`${items.length} listing${items.length === 1 ? '' : 's'}`}
        action={
          <Link href="/admin/properties/new" className="btn btn-primary">
            + Add Property
          </Link>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-bronze/40" />
          <input
            className="field !pl-11"
            placeholder="Search title, location or description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="field sm:!w-48" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="sold">Sold / Rented</option>
        </select>
      </div>

      {error && <p className="mb-4 text-sm text-ruby">{error}</p>}

      {loading ? (
        <p className="py-16 text-center text-bronze/50">Loading…</p>
      ) : items.length === 0 ? (
        <div className="card py-16 text-center text-bronze/60">No properties match.</div>
      ) : (
        <ul className="grid grid-cols-1 gap-3">
          {items.map((p) => (
            <li key={p._id} className="card p-3 sm:p-4 flex gap-4 items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-sand shrink-0">
                {p.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={p.status} />
                  {p.featured && <span className="text-[10px] font-bold tracking-wider text-gold-deep">★ FEATURED</span>}
                </div>
                <p className="mt-1.5 font-semibold text-bronze truncate">{p.title}</p>
                <p className="text-sm text-bronze/60 truncate">
                  {p.location} · <span className="text-ruby font-medium">{p.price}</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 shrink-0">
                <Link href={`/properties/${p._id}`} target="_blank" className="p-2.5 rounded-lg hover:bg-sand text-bronze/60" aria-label="View on site">
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <Link href={`/admin/properties/${p._id}/edit`} className="p-2.5 rounded-lg hover:bg-sand text-bronze" aria-label="Edit">
                  <Pencil className="w-4 h-4" />
                </Link>
                <button onClick={() => remove(p)} className="p-2.5 rounded-lg hover:bg-ruby/10 text-ruby" aria-label="Delete">
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
