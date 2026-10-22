'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react'
import { uploadFile } from '@/lib/uploadClient'
import type { PropertyInput } from '@/lib/properties'

const PROPERTY_TYPES = [
  'Apartment for Rent',
  'Apartment for Sale',
  'Residential Plot',
  'Commercial Property',
  'Independent House',
  'Villa',
]

export default function PropertyForm({ id, initial }: { id?: string; initial: PropertyInput }) {
  const router = useRouter()
  const [form, setForm] = useState(initial)
  const [featuresText, setFeaturesText] = useState(initial.features.join('\n'))
  const [mediaPath, setMediaPath] = useState('')
  const [uploading, setUploading] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof PropertyInput>(key: K, value: PropertyInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const input = (key: keyof PropertyInput) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      set(key, e.target.value as never),
  })

  const handleFiles = async (files: FileList | null, kind: 'images' | 'videos') => {
    if (!files?.length) return
    setError('')
    const list = Array.from(files)
    for (let i = 0; i < list.length; i++) {
      const file = list[i]
      try {
        const url = await uploadFile(file, 'properties', (pct) =>
          setUploading(`Uploading ${file.name} (${i + 1}/${list.length}) — ${pct}%`)
        )
        setForm((f) => ({ ...f, [kind]: [...f[kind], url] }))
      } catch (err) {
        setError(`${file.name}: ${(err as Error).message}`)
      }
    }
    setUploading(null)
  }

  const addPath = () => {
    const value = mediaPath.trim()
    if (!value) return
    const kind = /\.(mp4|webm|mov)$/i.test(value) ? 'videos' : 'images'
    set(kind, [...form[kind], value])
    setMediaPath('')
  }

  const move = (index: number, dir: -1 | 1) => {
    const next = [...form.images]
    const target = index + dir
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    set('images', next)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = { ...form, features: featuresText.split('\n').map((s) => s.trim()).filter(Boolean) }

    try {
      const res = await fetch(id ? `/api/properties/${id}` : '/api/properties', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Save failed')
      router.push('/admin/properties')
      router.refresh()
    } catch (err) {
      setError((err as Error).message)
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6 pb-28">
      {/* BASICS */}
      <section className="card p-5 sm:p-7 space-y-5">
        <h2 className="font-semibold text-bronze">Basic details</h2>
        <div>
          <label className="field-label">Title *</label>
          <input className="field" required placeholder="2 BHK Apartment for Rent – Esteem Splendor" {...input('title')} />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="field-label">Location *</label>
            <input className="field" required placeholder="Koramangala, Bengaluru" {...input('location')} />
          </div>
          <div>
            <label className="field-label">Price *</label>
            <input className="field" required placeholder="₹65,000/month or On Request" {...input('price')} />
          </div>
          <div>
            <label className="field-label">Property type</label>
            <select className="field" {...input('propertyType')}>
              <option value="">Select type</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Status</label>
            <select className="field" {...input('status')}>
              <option value="published">Published (visible on site)</option>
              <option value="draft">Draft (hidden)</option>
              <option value="sold">Sold / Rented</option>
            </select>
          </div>
        </div>
        <label className="flex items-center gap-3 text-sm text-bronze">
          <input
            type="checkbox"
            className="w-5 h-5 accent-ruby"
            checked={form.featured}
            onChange={(e) => set('featured', e.target.checked)}
          />
          Featured — show this property first
        </label>
      </section>

      {/* SPECS */}
      <section className="card p-5 sm:p-7 space-y-5">
        <h2 className="font-semibold text-bronze">Specifications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="field-label">Area / measurement</label>
            <input className="field" placeholder="1200 sq ft" {...input('measurement')} />
          </div>
          <div>
            <label className="field-label">Configuration</label>
            <input className="field" placeholder="2 BHK" {...input('bedrooms')} />
          </div>
          <div>
            <label className="field-label">Bathrooms</label>
            <input className="field" placeholder="2" {...input('bathrooms')} />
          </div>
          <div>
            <label className="field-label">Balconies</label>
            <input className="field" placeholder="2" {...input('balconies')} />
          </div>
          <div>
            <label className="field-label">Security deposit</label>
            <input className="field" placeholder="4 months rent" {...input('securityDeposit')} />
          </div>
          <div>
            <label className="field-label">Year built</label>
            <input className="field" placeholder="2026" {...input('year')} />
          </div>
        </div>
        <div>
          <label className="field-label">Description</label>
          <textarea className="field resize-y" rows={6} placeholder="Full property description…" {...input('description')} />
        </div>
        <div>
          <label className="field-label">Key features (one per line)</label>
          <textarea
            className="field resize-y"
            rows={4}
            placeholder={'East facing\nCovered parking'}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
          />
        </div>
      </section>

      {/* MEDIA */}
      <section className="card p-5 sm:p-7 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold text-bronze">Photos &amp; videos</h2>
          <div className="flex gap-2">
            <label className="btn btn-outline !min-h-0 !py-2 !px-4 text-sm cursor-pointer">
              + Photos
              <input
                type="file"
                hidden
                multiple
                accept="image/jpeg,image/png,image/webp,image/avif"
                disabled={!!uploading}
                onChange={(e) => {
                  handleFiles(e.target.files, 'images')
                  e.target.value = ''
                }}
              />
            </label>
            <label className="btn btn-outline !min-h-0 !py-2 !px-4 text-sm cursor-pointer">
              + Video
              <input
                type="file"
                hidden
                multiple
                accept="video/mp4,video/webm,video/quicktime"
                disabled={!!uploading}
                onChange={(e) => {
                  handleFiles(e.target.files, 'videos')
                  e.target.value = ''
                }}
              />
            </label>
          </div>
        </div>
        <p className="text-xs text-bronze/55">Images up to 10 MB, videos up to 200 MB. The first photo is the cover image.</p>

        {form.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {form.images.map((src, i) => (
              <div key={src} className="relative rounded-xl overflow-hidden border border-bronze/10 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full aspect-[4/3] object-cover" />
                {i === 0 && (
                  <span className="absolute top-2 left-2 bg-gold text-ink text-[10px] font-bold px-2 py-0.5 rounded">COVER</span>
                )}
                <div className="flex justify-between items-center px-2 py-1.5 text-bronze/70">
                  <div className="flex">
                    <button type="button" onClick={() => move(i, -1)} className="p-1.5 hover:text-ruby" aria-label="Move earlier">
                      <ArrowUp className="w-4 h-4 -rotate-90" />
                    </button>
                    <button type="button" onClick={() => move(i, 1)} className="p-1.5 hover:text-ruby" aria-label="Move later">
                      <ArrowDown className="w-4 h-4 -rotate-90" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => set('images', form.images.filter((_, j) => j !== i))}
                    className="p-1.5 text-ruby"
                    aria-label="Remove photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {form.videos.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-3">
            {form.videos.map((src, i) => (
              <div key={src} className="rounded-xl overflow-hidden border border-bronze/10 bg-white">
                <video src={src} controls preload="metadata" className="w-full aspect-video bg-black" />
                <div className="flex justify-between items-center px-3 py-2 text-xs text-bronze/60">
                  <span className="truncate">{src}</span>
                  <button
                    type="button"
                    onClick={() => set('videos', form.videos.filter((_, j) => j !== i))}
                    className="p-1.5 text-ruby shrink-0"
                    aria-label="Remove video"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div>
          <label className="field-label">Or add a file already in the public folder</label>
          <div className="flex gap-2">
            <input
              className="field"
              placeholder="/properties/realestate_esteem_property.mp4"
              value={mediaPath}
              onChange={(e) => setMediaPath(e.target.value)}
            />
            <button type="button" onClick={addPath} className="btn btn-outline shrink-0">
              Add
            </button>
          </div>
        </div>
      </section>

      {/* STICKY ACTIONS */}
      <div className="fixed bottom-0 inset-x-0 lg:left-[264px] z-30 bg-white/95 backdrop-blur border-t border-bronze/10 px-4 sm:px-8 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="max-w-4xl flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="flex-1 text-sm min-h-5" role="status">
            {uploading ? (
              <span className="text-bronze/70">{uploading}</span>
            ) : error ? (
              <span className="text-ruby">{error}</span>
            ) : null}
          </p>
          <div className="flex gap-3">
            <Link href="/admin/properties" className="btn btn-outline flex-1 sm:flex-none">
              Cancel
            </Link>
            <button type="submit" disabled={saving || !!uploading} className="btn btn-primary flex-1 sm:flex-none disabled:opacity-60">
              {saving ? 'Saving…' : id ? 'Save changes' : 'Create property'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
