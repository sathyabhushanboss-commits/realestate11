'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { PageHeader } from '@/components/PanelShell'
import type { PropertyJSON } from '@/lib/properties'

export default function SavedPropertiesPage() {
  const [items, setItems] = useState<PropertyJSON[] | null>(null)

  useEffect(() => {
    fetch('/api/favorites')
      .then((r) => (r.ok ? r.json() : []))
      .then(setItems)
  }, [])

  const unsave = async (id: string) => {
    setItems((list) => list?.filter((p) => p._id !== id) ?? null)
    await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId: id }),
    })
  }

  return (
    <>
      <PageHeader title="Saved properties" description="Tap the heart on any listing to save it here" />

      {items === null ? (
        <p className="py-16 text-center text-bronze/50">Loading…</p>
      ) : items.length === 0 ? (
        <div className="card py-16 px-6 text-center">
          <Heart className="w-10 h-10 mx-auto text-ruby/30" />
          <p className="mt-4 text-bronze/65">No saved properties yet.</p>
          <Link href="/properties" className="btn btn-primary mt-6">
            Browse properties
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.map((p) => (
            <li key={p._id} className="card overflow-hidden flex flex-col">
              <Link href={`/properties/${p._id}`} className="relative block aspect-[4/3] bg-sand">
                {p.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                )}
                {p.status === 'sold' && (
                  <span className="absolute top-3 left-3 bg-ink text-white text-xs font-semibold px-3 py-1 rounded-full">Sold</span>
                )}
              </Link>
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-xs tracking-[0.15em] uppercase text-gold-deep font-semibold truncate">{p.location}</p>
                <Link href={`/properties/${p._id}`} className="mt-1.5 font-display text-2xl text-ruby leading-tight hover:underline">
                  {p.title}
                </Link>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <p className="font-semibold text-bronze">{p.price}</p>
                  <button onClick={() => unsave(p._id)} className="text-sm text-ruby font-medium flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-current" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
