'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function EditProperty() {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    measurement: '',
    bedrooms: '',
    description: '',
    year: '',
  })

  useEffect(() => {
    const properties = JSON.parse(localStorage.getItem('properties') || '[]')
    const property = properties.find((p: any) => p.id === id)
    if (property) {
      setFormData({
        title: property.title,
        location: property.location,
        price: property.price,
        measurement: property.measurement,
        bedrooms: property.bedrooms,
        description: property.description,
        year: property.year || '',
      })
    }
  }, [id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const properties = JSON.parse(localStorage.getItem('properties') || '[]')
    const index = properties.findIndex((p: any) => p.id === id)
    
    if (index !== -1) {
      properties[index] = { ...properties[index], ...formData }
      localStorage.setItem('properties', JSON.stringify(properties))
      alert('Property updated!')
      router.push('/admin/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#9B1C1C]">Edit Property</h1>
          <Link href="/admin/dashboard" className="text-gray-600">← Back</Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Property Title *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9B1C1C] outline-none"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9B1C1C] outline-none"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9B1C1C] outline-none"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Area/Measurement *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9B1C1C] outline-none"
              value={formData.measurement}
              onChange={(e) => setFormData({ ...formData, measurement: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Configuration *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9B1C1C] outline-none"
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Year Built</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9B1C1C] outline-none"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9B1C1C] outline-none resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={loading} className="flex-1 bg-[#9B1C1C] text-white py-3 rounded-xl font-semibold">
              {loading ? 'Updating...' : 'Update Property'}
            </button>
            <Link href="/admin/dashboard" className="flex-1 border text-center py-3 rounded-xl font-semibold">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}