'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Property {
  _id: string
  title: string
  location: string
  price: string
  images: string[]
  measurement: string
  bedrooms: string
  description: string
  year: string
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showLeadPopup, setShowLeadPopup] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '' })

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties')
      const data = await response.json()
      console.log('Fetched properties:', data) // Debug log
      setProperties(data)
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, phone, email } = leadForm
    
    const message = `*NEW LEAD FROM PROPERTIES PAGE*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}`
    window.open(`https://wa.me/919741021116?text=${message}`, '_blank')
    
    setShowLeadPopup(false)
    setLeadForm({ name: '', phone: '', email: '' })
    alert('Thank you! Our team will contact you shortly.')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9B1C1C] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#4A1F12]">Loading properties...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F6F2]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-[#9B1C1C]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] bg-[#D4A017]/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:70px_70px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-16 pb-8 md:pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 md:gap-3 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-4 md:px-5 py-2 md:py-3 shadow-xl">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#D4A017] animate-pulse"></div>
            <p className="uppercase tracking-[3px] md:tracking-[5px] text-[#9B1C1C] text-xs md:text-sm font-semibold">
              Premium Real Estate Properties
            </p>
          </div>
          <h1 className="mt-6 md:mt-8 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] md:leading-[1] text-[#9B1C1C]">
            Our Premium
            <br />
            <span className="text-[#D4A017]">Properties Collection</span>
          </h1>
          <p className="max-w-4xl mx-auto mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl text-[#4A1F12]/70 leading-relaxed px-4">
            Explore residential plots, commercial buildings, and investment properties 
            in Bengaluru's prime locations.
          </p>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="relative pb-20 md:pb-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#4A1F12]/70 text-lg">No properties found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {properties.map((property) => (
                <div key={property._id} className="group relative">
                  <div className="relative overflow-hidden rounded-2xl md:rounded-[40px] bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_25px_80px_rgba(0,0,0,0.08)] hover:-translate-y-3 transition-all duration-700">
                    
                    {/* Image */}
                    <div className="relative h-[240px] md:h-[280px] lg:h-[320px] overflow-hidden bg-gray-200">
                      {property.images && property.images[0] ? (
                        <Image
                          src={property.images[0]}
                          alt={property.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#9B1C1C]/10 to-[#D4A017]/10">
                          <p className="text-[#9B1C1C] font-semibold">Image Coming Soon</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                      
                      {/* Location Badge */}
                      <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-white/80 backdrop-blur-xl rounded-full px-3 md:px-5 py-1 md:py-2">
                        <p className="uppercase tracking-[2px] text-[#9B1C1C] text-[10px] md:text-xs font-semibold">
                          {property.location}
                        </p>
                      </div>
                      
                      {/* Year Badge */}
                      {property.year && (
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <p className="text-[#9B1C1C] text-xs font-bold">{property.year}</p>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-8">
                      <h2 className="text-xl md:text-2xl font-black text-[#9B1C1C] leading-tight line-clamp-1">
                        {property.title}
                      </h2>
                      
                      <p className="mt-3 text-[#4A1F12]/70 text-sm leading-relaxed line-clamp-2">
                        {property.description}
                      </p>

                      {/* Specifications */}
                      <div className="grid grid-cols-2 gap-3 mt-4 p-3 bg-[#F8F6F2] rounded-xl">
                        <div>
                          <p className="text-[#4A1F12]/50 text-xs">Area</p>
                          <p className="text-[#9B1C1C] font-bold text-sm truncate">{property.measurement}</p>
                        </div>
                        <div>
                          <p className="text-[#4A1F12]/50 text-xs">Configuration</p>
                          <p className="text-[#9B1C1C] font-bold text-sm truncate">{property.bedrooms}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <p className="text-xl md:text-2xl font-black text-[#D4A017]">{property.price}</p>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 mt-4">
                        <Link
                          href={`/properties/${property._id}`}
                          className="flex-1 bg-[#9B1C1C] hover:bg-[#7E1717] text-white py-2 rounded-xl font-semibold text-sm text-center transition-all"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => setShowLeadPopup(true)}
                          className="flex-1 bg-white/80 border border-[#D4A017]/20 hover:bg-white text-[#4A1F12] py-2 rounded-xl font-semibold text-sm transition-all"
                        >
                          Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lead Popup */}
      {showLeadPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
          <div className="relative w-full max-w-[460px] rounded-3xl bg-[#4A1F12] shadow-2xl p-6 md:p-8">
            <button
              onClick={() => setShowLeadPopup(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white">Get Premium Consultation</h2>
              <p className="text-white/60 text-sm mt-2">Fill your details below</p>
            </div>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full h-12 rounded-xl bg-white/10 border border-white/10 px-4 text-white placeholder:text-white/40 outline-none focus:border-[#D4A017]"
                value={leadForm.name}
                onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="10-digit Mobile Number"
                required
                className="w-full h-12 rounded-xl bg-white/10 border border-white/10 px-4 text-white placeholder:text-white/40 outline-none focus:border-[#D4A017]"
                value={leadForm.phone}
                onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full h-12 rounded-xl bg-white/10 border border-white/10 px-4 text-white placeholder:text-white/40 outline-none focus:border-[#D4A017]"
                value={leadForm.email}
                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
              />
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#9B1C1C] to-[#C62828] text-white font-bold"
              >
                Get Free Consultation
              </button>
            </form>
          </div>
        </div>
      )}

      <style>
        {`
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </main>
  )
}