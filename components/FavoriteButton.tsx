'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'

export default function FavoriteButton({ propertyId, className = '' }: { propertyId: string; className?: string }) {
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  // Know whether this one is already saved (silently ignored when signed out)
  useEffect(() => {
    let cancelled = false
    fetch('/api/favorites')
      .then((r) => (r.ok ? r.json() : []))
      .then((list: { _id: string }[]) => !cancelled && setSaved(list.some((p) => p._id === propertyId)))
    return () => {
      cancelled = true
    }
  }, [propertyId])

  const toggle = async () => {
    setBusy(true)
    const res = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId }),
    })
    setBusy(false)
    if (res.status === 401) {
      router.push(`/login?next=${encodeURIComponent(window.location.pathname)}`)
      return
    }
    if (res.ok) setSaved((await res.json()).saved)
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from saved' : 'Save property'}
      className={`flex items-center justify-center gap-2 transition ${className}`}
    >
      <Heart className={`w-5 h-5 ${saved ? 'fill-ruby text-ruby' : ''}`} />
      <span>{saved ? 'Saved' : 'Save'}</span>
    </button>
  )
}
