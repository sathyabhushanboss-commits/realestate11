'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Property {
  _id: string
  title: string
  location: string
  price: string
  images: string[]
  sqft: string
  bedrooms: string
  description: string
  measurement: string
  year?: string
  features: string[]
  createdAt: string
}

export default function PropertyDetailPage() {
  const { id } = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    fetchProperty()
  }, [id])

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${id}`)
      const data = await response.json()
      setProperty(data)
    } catch (error) {
      console.error('Error fetching property:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9B1C1C] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#4A1F12]">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#9B1C1C]">Property Not Found</h2>
          <Link href="/properties" className="mt-4 inline-block bg-[#9B1C1C] text-white px-6 py-3 rounded-xl">
            Back to Properties
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2] py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/properties" className="inline-flex items-center gap-2 text-[#9B1C1C] hover:text-[#D4A017] mb-6">
          ← Back to Properties
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
              {property.images && property.images.length > 0 && (
                <Image
                  src={property.images[currentImage]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            {property.images && property.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 ${
                      currentImage === idx ? 'ring-2 ring-[#D4A017]' : ''
                    }`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-[#D4A017] font-semibold">{property.location}</span>
                {property.year && (
                  <span className="text-sm text-gray-500">Built {property.year}</span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-[#9B1C1C]">{property.title}</h1>
              <p className="text-3xl font-bold text-[#D4A017] mt-4">{property.price}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-2xl">
              <div>
                <p className="text-[#4A1F12]/50 text-sm">Land/Built-up Area</p>
                <p className="text-[#9B1C1C] font-bold text-lg">{property.measurement || property.sqft}</p>
              </div>
              <div>
                <p className="text-[#4A1F12]/50 text-sm">Configuration</p>
                <p className="text-[#9B1C1C] font-bold text-lg">{property.bedrooms}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#9B1C1C] mb-3">Description</h2>
              <p className="text-[#4A1F12]/80 leading-relaxed">{property.description}</p>
            </div>

            {property.features && property.features.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#9B1C1C] mb-3">Key Features</h2>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, idx) => (
                    <span key={idx} className="bg-[#D4A017]/10 px-3 py-1 rounded-full text-[#9B1C1C] text-sm">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Link
                href="/contact"
                className="flex-1 bg-[#9B1C1C] hover:bg-[#7E1717] text-white py-4 rounded-xl font-semibold text-center transition-all"
              >
                Enquire Now
              </Link>
              <Link
                href="/schedule-visit"
                className="flex-1 bg-white border-2 border-[#9B1C1C] text-[#9B1C1C] py-4 rounded-xl font-semibold text-center hover:bg-[#9B1C1C] hover:text-white transition-all"
              >
                Schedule Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}