'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Company, PriceItem } from '@/lib/companies'
import { uploadFile } from '@/lib/uploadClient'

const inputClass =
  'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9B1C1C] outline-none bg-white'

const STATUS_OPTIONS = ['Available', 'Few Left', 'Sold Out', 'Coming Soon']

export default function CompanyEditor({ initial }: { initial: Company }) {
  const router = useRouter()
  const [company, setCompany] = useState(initial)
  const [highlightsText, setHighlightsText] = useState(initial.highlights.join('\n'))
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null)
  const [mediaPath, setMediaPath] = useState('')

  const update = <K extends keyof Company>(key: K, value: Company[K]) =>
    setCompany((prev) => ({ ...prev, [key]: value }))

  const handleFiles = async (files: FileList | null, kind: 'images' | 'videos') => {
    if (!files?.length) return
    setMessage(null)
    const list = Array.from(files)

    for (let i = 0; i < list.length; i++) {
      const file = list[i]
      try {
        const url = await uploadFile(file, company.slug, (pct) =>
          setUploading(`Uploading ${file.name} (${i + 1}/${list.length}) — ${pct}%`)
        )
        setCompany((prev) => ({ ...prev, [kind]: [...prev[kind], url] }))
      } catch (err) {
        setMessage({ type: 'error', text: `${file.name}: ${(err as Error).message}` })
      }
    }
    setUploading(null)
  }

  const addMediaPath = () => {
    const value = mediaPath.trim()
    if (!value) return
    const kind = /\.(mp4|webm|mov)$/i.test(value) ? 'videos' : 'images'
    update(kind, [...company[kind], value])
    setMediaPath('')
  }

  const removeMedia = (kind: 'images' | 'videos', index: number) =>
    update(kind, company[kind].filter((_, i) => i !== index))

  const moveImage = (index: number, dir: -1 | 1) => {
    const next = [...company.images]
    const target = index + dir
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    update('images', next)
  }

  const updatePriceRow = (id: string, field: keyof PriceItem, value: string) =>
    update(
      'priceList',
      company.priceList.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    )

  const addPriceRow = () =>
    update('priceList', [
      ...company.priceList,
      { id: crypto.randomUUID(), type: '', area: '', price: '', status: 'Available' },
    ])

  const removePriceRow = (id: string) =>
    update('priceList', company.priceList.filter((row) => row.id !== id))

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const { slug, updatedAt, ...rest } = company
    void updatedAt
    const payload = {
      ...rest,
      highlights: highlightsText.split('\n').map((s) => s.trim()).filter(Boolean),
    }

    try {
      const res = await fetch(`/api/companies/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.status === 401) {
        router.push('/login')
        return
      }
      if (!res.ok) {
        const issue = data.issues?.[0]
        throw new Error(issue ? `${issue.path.join('.')}: ${issue.message}` : data.error)
      }
      setCompany(data)
      setMessage({ type: 'ok', text: 'Saved! Changes are live on the website.' })
    } catch (err) {
      setMessage({ type: 'error', text: (err as Error).message || 'Save failed' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="max-w-4xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#9B1C1C]">{company.name}</h1>
            <p className="text-sm text-gray-500 mt-1">Edit page content, media and price list</p>
          </div>
          <div className="flex gap-4">
            <Link href={`/${company.slug}`} target="_blank" className="text-gray-600 hover:text-[#9B1C1C]">
              View page ↗
            </Link>
            <Link href="/admin/companies" className="text-gray-600 hover:text-[#9B1C1C]">
              ← Back
            </Link>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* DETAILS */}
          <section className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[#4A1F12]">Details</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Company Name *</label>
              <input
                required
                className={inputClass}
                value={company.name}
                onChange={(e) => update('name', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tagline</label>
              <input
                className={inputClass}
                value={company.tagline}
                onChange={(e) => update('tagline', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows={8}
                className={`${inputClass} resize-y`}
                value={company.description}
                onChange={(e) => update('description', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Leave a blank line between paragraphs.</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Highlights (one per line)</label>
              <textarea
                rows={5}
                className={`${inputClass} resize-y`}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
              />
            </div>
          </section>

          {/* PHOTOS */}
          <section className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#4A1F12]">Photos</h2>
              <label className="cursor-pointer bg-[#9B1C1C] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#7E1717] transition">
                + Upload Photos
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  multiple
                  hidden
                  disabled={!!uploading}
                  onChange={(e) => {
                    handleFiles(e.target.files, 'images')
                    e.target.value = ''
                  }}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">The first photo is used as the page banner. Max 10 MB each.</p>

            {company.images.length === 0 ? (
              <p className="text-sm text-gray-400">No photos yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {company.images.map((src, i) => (
                  <div key={src} className="relative rounded-xl overflow-hidden border group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="w-full aspect-[4/3] object-cover" />
                    {i === 0 && (
                      <span className="absolute top-2 left-2 bg-[#D4A017] text-white text-xs px-2 py-0.5 rounded">
                        Banner
                      </span>
                    )}
                    <div className="flex justify-between bg-gray-50 px-2 py-1 text-sm">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => moveImage(i, -1)} className="hover:text-[#9B1C1C]">
                          ←
                        </button>
                        <button type="button" onClick={() => moveImage(i, 1)} className="hover:text-[#9B1C1C]">
                          →
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMedia('images', i)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* VIDEOS */}
          <section className="bg-white rounded-2xl shadow-sm p-6 space-y-4 border border-[#D4A017]">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#9B1C1C]">Videos</h2>
              <label className="cursor-pointer bg-[#9B1C1C] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#7E1717] transition">
                + Upload Video
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  multiple
                  hidden
                  disabled={!!uploading}
                  onChange={(e) => {
                    handleFiles(e.target.files, 'videos')
                    e.target.value = ''
                  }}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">MP4, WEBM or MOV. Max 200 MB each.</p>

            {company.videos.length === 0 ? (
              <p className="text-sm text-gray-400">No videos yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {company.videos.map((src, i) => (
                  <div key={src} className="rounded-xl overflow-hidden border">
                    <video src={src} controls preload="metadata" className="w-full aspect-video bg-black" />
                    <div className="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm">
                      <span className="truncate text-gray-500">{src}</span>
                      <button
                        type="button"
                        onClick={() => removeMedia('videos', i)}
                        className="text-red-600 hover:text-red-800 shrink-0 ml-3"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <label className="block text-sm font-medium mb-2">
                Or add an existing file from the public folder
              </label>
              <div className="flex gap-3">
                <input
                  className={inputClass}
                  placeholder="/properties/realestate_esteem_property.mp4"
                  value={mediaPath}
                  onChange={(e) => setMediaPath(e.target.value)}
                />
                <button
                  type="button"
                  onClick={addMediaPath}
                  className="border px-5 rounded-xl hover:bg-gray-50 transition shrink-0"
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Video paths go to Videos, image paths go to Photos.</p>
            </div>
          </section>

          {/* PRICE LIST */}
          <section className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#4A1F12]">Price List</h2>
              <button
                type="button"
                onClick={addPriceRow}
                className="bg-[#9B1C1C] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#7E1717] transition"
              >
                + Add Row
              </button>
            </div>

            {company.priceList.length === 0 ? (
              <p className="text-sm text-gray-400">
                No prices yet. The page will show &quot;Prices available on request&quot;.
              </p>
            ) : (
              <div className="space-y-3">
                <div className="hidden md:grid grid-cols-[2fr_1.5fr_1.5fr_1.2fr_auto] gap-3 text-xs font-semibold text-gray-500 px-1">
                  <span>Type *</span>
                  <span>Area</span>
                  <span>Price *</span>
                  <span>Status</span>
                  <span className="w-16" />
                </div>
                {company.priceList.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1.5fr_1.2fr_auto] gap-3 border md:border-0 rounded-xl p-3 md:p-0"
                  >
                    <input
                      required
                      placeholder="30x40 Plot / 2 BHK"
                      className={inputClass}
                      value={row.type}
                      onChange={(e) => updatePriceRow(row.id, 'type', e.target.value)}
                    />
                    <input
                      placeholder="1200 sq ft"
                      className={inputClass}
                      value={row.area}
                      onChange={(e) => updatePriceRow(row.id, 'area', e.target.value)}
                    />
                    <input
                      required
                      placeholder="₹45 Lakhs"
                      className={inputClass}
                      value={row.price}
                      onChange={(e) => updatePriceRow(row.id, 'price', e.target.value)}
                    />
                    <select
                      className={inputClass}
                      value={row.status}
                      onChange={(e) => updatePriceRow(row.id, 'status', e.target.value)}
                    >
                      <option value="">—</option>
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removePriceRow(row.id)}
                      className="text-red-600 hover:text-red-800 text-sm w-16"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Price note</label>
              <input
                className={inputClass}
                placeholder="Prices are indicative and subject to change."
                value={company.priceNote}
                onChange={(e) => update('priceNote', e.target.value)}
              />
            </div>
          </section>

          {/* STATUS + ACTIONS */}
          <div className="sticky bottom-0 bg-gray-50/95 backdrop-blur py-4 space-y-3">
            {uploading && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm">
                {uploading}
              </div>
            )}
            {message && (
              <div
                className={`px-4 py-3 rounded-xl text-sm border ${
                  message.type === 'ok'
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-red-50 border-red-200 text-red-600'
                }`}
              >
                {message.text}
              </div>
            )}
            <button
              type="submit"
              disabled={saving || !!uploading}
              className="w-full bg-[#9B1C1C] text-white py-3 rounded-xl font-semibold hover:bg-[#7E1717] transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
