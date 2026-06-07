'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface Property {
  id: string
  title: string
  location: string
  price: string
  images: string[]
  description: string
  measurement: string
  bedrooms: string
  year: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (!isLoggedIn) {
      router.push('/admin/login')
      return
    }
    loadProperties()
  }, [router])

  const loadProperties = () => {
    const stored = localStorage.getItem('properties')
    if (stored) {
      setProperties(JSON.parse(stored))
    } else {
      // Sample data
      const sample = [
        {
          id: '1',
          title: '1500 sq ft Residential Plot',
          location: 'Doddakanahalli, Bengaluru',
          price: 'On Request',
          images: ['/properties/set1.jpeg'],
          description: 'Prime residential plot in Doddakanahalli',
          measurement: '1500 sq ft',
          bedrooms: 'Plot',
          year: '2025',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: '4800 sq ft Land with 16 Units',
          location: 'Kasavanahalli, Bengaluru',
          price: 'On Request',
          images: ['/properties/set2.jpeg'],
          description: '4800 sq ft land with 16 units',
          measurement: '4800 sq ft',
          bedrooms: '16 x 2BHK',
          year: '2025',
          createdAt: new Date().toISOString(),
        },
      ]
      setProperties(sample)
      localStorage.setItem('properties', JSON.stringify(sample))
    }
    setLoading(false)
  }

  const deleteProperty = (id: string) => {
    if (!confirm('Delete this property?')) return
    const updated = properties.filter(p => p.id !== id)
    setProperties(updated)
    localStorage.setItem('properties', JSON.stringify(updated))
    alert('Deleted!')
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    localStorage.removeItem('adminEmail')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#9B1C1C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#9B1C1C]">Property Management</h1>
            <p className="text-sm text-gray-500">{properties.length} properties total</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/properties/new" className="bg-[#9B1C1C] text-white px-5 py-2 rounded-xl hover:bg-[#7E1717] transition">
              + Add Property
            </Link>
            <button onClick={handleLogout} className="border px-5 py-2 rounded-xl hover:bg-gray-50 transition">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4">Image</th>
                  <th className="text-left px-6 py-4">Title</th>
                  <th className="text-left px-6 py-4">Location</th>
                  <th className="text-left px-6 py-4">Price</th>
                  <th className="text-left px-6 py-4">Area</th>
                  <th className="text-left px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((prop) => (
                  <tr key={prop.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {prop.images[0] && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image src={prop.images[0]} alt={prop.title} fill className="object-cover" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">{prop.title}</td>
                    <td className="px-6 py-4 text-gray-600">{prop.location}</td>
                    <td className="px-6 py-4 font-semibold text-[#D4A017]">{prop.price}</td>
                    <td className="px-6 py-4 text-gray-600">{prop.measurement}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <Link href={`/admin/properties/${prop.id}/edit`} className="text-blue-600 hover:text-blue-800">
                          Edit
                        </Link>
                        <button onClick={() => deleteProperty(prop.id)} className="text-red-600 hover:text-red-800">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}