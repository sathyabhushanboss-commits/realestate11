'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, CheckCircle2, X, CheckCircle, AlertCircle } from 'lucide-react'

export default function Hero() {
  const [active, setActive] = useState(0)
  const [showLeadPopup, setShowLeadPopup] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
  })
  
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
  })

  // Show popup after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowLeadPopup(true), 15000)
    return () => clearTimeout(timer)
  }, [])

  // Auto hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  // Validation functions
  const validateName = (name: string) => {
    if (!name.trim()) return 'Name is required'
    if (name.trim().length < 2) return 'Name must be at least 2 characters'
    if (!/^[a-zA-Z\s\-']+$/.test(name)) return 'Name should only contain letters'
    return ''
  }

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return 'Mobile number is required'
    if (!/^\d{10}$/.test(phone)) return 'Enter a valid 10-digit mobile number'
    return ''
  }

  const validateEmail = (email: string) => {
    if (!email.trim()) return 'Email is required'
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) return 'Enter a valid email address (e.g., name@domain.com)'
    return ''
  }

  const handleInputChange = (field: string, value: string) => {
    setLeadForm(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleBlur = (field: string) => {
    let error = ''
    if (field === 'name') error = validateName(leadForm.name)
    else if (field === 'phone') error = validatePhone(leadForm.phone)
    else if (field === 'email') error = validateEmail(leadForm.email)
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
  }

  // Handle lead submission with Nodemailer
  const handleLeadSubmit = async () => {
    const nameError = validateName(leadForm.name)
    const phoneError = validatePhone(leadForm.phone)
    const emailError = validateEmail(leadForm.email)
    
    setErrors({
      name: nameError,
      phone: phoneError,
      email: emailError,
    })
    
    if (nameError || phoneError || emailError) {
      showNotification('Please check the form for errors', 'error')
      return
    }
    
    setIsSubmitting(true)
    
    const { name, phone, email } = leadForm
    
    // Send to WhatsApp
    const whatsappMessage = `*NEW LEAD FROM WEBSITE*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A%0A*Source:* Sri Megha Lakshmi Group Website`
    const whatsappUrl = `https://wa.me/919741021116?text=${whatsappMessage}`
    window.open(whatsappUrl, '_blank')
    
    // Send email using Nodemailer API
    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email }),
      })
      
      if (response.ok) {
        showNotification('Thank you! Our team will contact you shortly.', 'success')
        setLeadForm({ name: '', phone: '', email: '' })
        setShowLeadPopup(false)
      } else {
        showNotification('Thank you! Our team will contact you shortly.', 'success')
        setLeadForm({ name: '', phone: '', email: '' })
        setShowLeadPopup(false)
      }
    } catch (error) {
      showNotification('Thank you! Our team will contact you shortly.', 'success')
      setLeadForm({ name: '', phone: '', email: '' })
      setShowLeadPopup(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const companies = [
    {
      number: '01',
      title: 'Sri Megha Lakshmi Developers',
      subtitle: 'Premium Land Development & Plotting Company',
      description: 'Sri Megha Lakshmi Developers is one of Bengaluru\'s trusted real estate development companies specializing in land acquisition, site conversion, plotting, and residential and commercial layout development.',
      services: [
        { title: 'Land Acquisition Services', desc: 'We identify and acquire strategically located lands suitable for residential layouts, gated communities, villas, commercial developments, and future investment opportunities.' },
        { title: 'Property Purchasing Assistance', desc: 'Professional support for purchasing agricultural land, residential sites, commercial properties, and investment properties with complete legal verification.' },
        { title: 'Site Conversion', desc: 'Complete agricultural-to-residential and commercial site conversion services including government approvals and legal processing.' },
        { title: 'Residential Layout Development', desc: 'Development of premium residential layouts with roads, drainage systems, underground pipelines, water supply, electricity, parks, and modern infrastructure.' },
        { title: 'Commercial Plot Development', desc: 'Planning and development of commercial plots suitable for offices, showrooms, retail spaces, and investment purposes.' },
        { title: 'Plot Selling Services', desc: 'Affordable and luxury residential plots for sale with clear titles, legal approvals, and excellent appreciation potential.' },
        { title: 'DTCP & BMRDA Approved Projects', desc: 'Development and marketing of legally approved layouts ensuring safe investments for buyers.' },
        { title: 'Investment Consultation', desc: 'Expert guidance for clients looking to invest in land and plots with high future growth.' },
      ],
    },
    {
      number: '02',
      title: 'Sri Megha Lakshmi Constructions',
      subtitle: 'Residential, Commercial & Interior Construction Experts',
      description: 'Sri Megha Lakshmi Constructions delivers high-quality construction services for residential, commercial, and industrial projects.',
      services: [
        { title: 'Residential Construction', desc: 'Complete construction services for independent houses, villas, duplex homes, apartments, and gated community residences.' },
        { title: 'Commercial Construction', desc: 'Construction of commercial complexes, office buildings, showrooms, retail spaces, hotels, and business infrastructure.' },
        { title: 'Civil Contract Works', desc: 'Reliable labor and material contract services for all types of construction projects.' },
        { title: 'Turnkey Construction Projects', desc: 'End-to-end turnkey construction solutions including planning, architecture, approvals, construction, interiors, and handover.' },
        { title: 'Interior Design Solutions', desc: 'Modern and customized interior works including modular kitchens, wardrobes, false ceilings, TV units, and luxury interiors.' },
        { title: 'Compound Wall Construction', desc: 'Strong and attractive compound wall construction for layouts, villas, and commercial properties.' },
        { title: 'Renovation & Remodeling', desc: 'Modern renovation services for old homes, apartments, commercial buildings, and office spaces.' },
        { title: 'Building Maintenance Services', desc: 'Long-term maintenance services including repairs, waterproofing, painting, and structural maintenance.' },
      ],
    },
    {
      number: '03',
      title: 'Sri Megha Lakshmi Real Estate',
      subtitle: 'Property Sales, Rentals & Legal Documentation Services',
      description: 'Sri Megha Lakshmi Real Estate offers complete real estate solutions including property buying, selling, rentals, leasing, legal documentation, registration, and property consultancy services.',
      services: [
        { title: 'Residential Property Sales', desc: 'Buying and selling of residential plots, apartments, villas, independent houses, and luxury properties.' },
        { title: 'Commercial Property Sales', desc: 'Sales and purchase support for offices, commercial complexes, showrooms, retail spaces, warehouses, and investment properties.' },
        { title: 'Property Purchase Guidance', desc: 'Professional assistance in selecting, verifying, negotiating, and purchasing legally approved properties.' },
        { title: 'Residential Rental Services', desc: 'Rental solutions for apartments, villas, independent houses, and family homes in prime locations.' },
        { title: 'Commercial Rental Services', desc: 'Commercial leasing and rental services for offices, shops, warehouses, and industrial spaces.' },
        { title: 'e-Khata Services', desc: 'Complete support for e-Khata registration, transfers, corrections, updates, and property tax services.' },
        { title: 'Property Registration Services', desc: 'Professional registration support including document preparation, EC verification, and registration management.' },
        { title: 'Legal Documentation Assistance', desc: 'Support for sale deeds, agreements, khata transfer, tax documents, and legal property paperwork.' },
        { title: 'Real Estate Consultancy', desc: 'Trusted consultancy services for property investment, legal approvals, property valuation, and decision-making.' },
      ],
    },
  ]

  const featuredProperties = [
    {
      id: 1,
      title: '1500 sq ft Residential Plot',
      location: 'Doddakanahalli, Bengaluru',
      price: 'On Request',
      image: '/properties/set1.jpeg',
      sqft: '1500 sq ft',
      year: '2025',
      description: 'Prime residential plot in Doddakanahalli, Bengaluru. Close to IT hubs, schools, and hospitals.',
    },
    {
      id: 2,
      title: '4800 sq ft Land with 16 Units',
      location: 'Kasavanahalli, Bengaluru',
      price: 'On Request',
      image: '/properties/set2.jpeg',
      sqft: '4800 sq ft',
      year: '2025',
      description: '4800 sq ft land featuring 16 ready 2BHK units. Excellent rental yield and investment potential.',
    },
    {
      id: 3,
      title: 'Koramangala Premium Property',
      location: 'Koramangala, Bengaluru',
      price: 'On Request',
      image: '/properties/set3.1.jpeg',
      sqft: '600 sq ft land | 3400 sq ft built-up',
      year: '2018',
      description: 'Premium property in Koramangala with 600 sq ft land and 3400 sq ft built-up area.',
    },
    {
      id: 4,
      title: 'Legacy Commercial Building',
      location: 'Koramangala, Bengaluru',
      price: 'On Request',
      image: '/properties/set4.jpeg',
      sqft: 'Commercial Building',
      year: '2005',
      description: 'Well-maintained commercial building in Koramangala. Perfect for retail, office, or redevelopment.',
    },
  ]

  return (
    <>
      {/* TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] animate-in slide-in-from-top-5 duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg ${
            toastType === 'success' 
              ? 'bg-green-500/95 text-white border border-green-400' 
              : 'bg-red-500/95 text-white border border-red-400'
          }`}>
            {toastType === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <p className="font-medium">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* LEAD POPUP */}
      {showLeadPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-[460px] overflow-hidden rounded-3xl border border-white/20 bg-[#4A1F12] shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] rounded-full bg-[#9B1C1C]/30 blur-3xl"></div>
              <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] rounded-full bg-[#D4A017]/20 blur-3xl"></div>
            </div>

            <button
              onClick={() => setShowLeadPopup(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl font-bold transition-all duration-300 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 p-6 md:p-8">
              <div className="flex justify-center">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-xl">
                  <Image src="/logo.jpeg" alt="Sri Megha Lakshmi Group Logo" fill sizes="80px" className="object-cover" />
                </div>
              </div>

              <div className="mt-5 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Get Premium <br />
                  <span className="text-[#D4A017]">Consultation</span>
                </h2>
                <p className="mt-3 text-white/60 text-sm leading-relaxed">
                  Connect with us for premium plots, construction, rentals, interiors, and luxury real estate investments.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={leadForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`w-full h-12 rounded-xl bg-white/10 border px-4 text-white placeholder:text-white/40 outline-none transition-all focus:border-[#D4A017] ${
                      errors.name ? 'border-red-400 focus:border-red-400' : 'border-white/10'
                    }`}
                  />
                  {errors.name && <p className="text-red-300 text-xs mt-1 ml-2">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="10-digit Mobile Number"
                    value={leadForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    onBlur={() => handleBlur('phone')}
                    maxLength={10}
                    className={`w-full h-12 rounded-xl bg-white/10 border px-4 text-white placeholder:text-white/40 outline-none transition-all focus:border-[#D4A017] ${
                      errors.phone ? 'border-red-400 focus:border-red-400' : 'border-white/10'
                    }`}
                  />
                  {errors.phone && <p className="text-red-300 text-xs mt-1 ml-2">{errors.phone}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email Address (e.g., name@domain.com)"
                    value={leadForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full h-12 rounded-xl bg-white/10 border px-4 text-white placeholder:text-white/40 outline-none transition-all focus:border-[#D4A017] ${
                      errors.email ? 'border-red-400 focus:border-red-400' : 'border-white/10'
                    }`}
                  />
                  {errors.email && <p className="text-red-300 text-xs mt-1 ml-2">{errors.email}</p>}
                </div>

                <button
                  onClick={handleLeadSubmit}
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#9B1C1C] to-[#C62828] hover:from-[#7E1717] hover:to-[#A12222] text-white font-bold shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
                </button>
              </div>

              <p className="mt-5 text-center text-[10px] leading-relaxed text-white/30">
                By submitting this form, you agree to be contacted by Sri Megha Lakshmi Group regarding real estate, construction, and investment opportunities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MAIN HERO SECTION */}
      <section className="relative overflow-hidden bg-[#F8F6F2] pt-0 pb-20 lg:pb-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-250px] right-[-250px] w-[700px] h-[700px] rounded-full bg-[#D4A017]/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-[#9B1C1C]/10 blur-3xl"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-5xl mx-auto pt-10">
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-6 py-3 shadow-lg mb-8">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-5 h-5 rounded-full bg-[#D4A017]/40 animate-ping"></span>
                <span className="absolute w-4 h-4 rounded-full bg-[#D4A017]/60 animate-pulse"></span>
                <span className="relative w-3 h-3 rounded-full bg-[#D4A017] shadow-[0_0_20px_#D4A017]"></span>
              </div>
              <p className="tracking-[6px] md:tracking-[8px] text-[#9B1C1C] font-bold uppercase text-xs md:text-sm">
                Bengaluru's Trusted Real Estate & Construction Company
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight text-[#9B1C1C]">
              Sri Megha Lakshmi
              <br />
              <span className="text-[#D4A017]">Group Of Companies</span>
            </h1>
            <p className="mt-6 md:mt-8 text-base md:text-2xl text-[#4A1F12]/80 leading-relaxed">
              Delivering excellence in land development, construction, property sales, rentals, interiors, legal documentation, e-Khata, and premium real estate services across Bengaluru.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-5 mt-8 md:mt-12">
              <Link href="/properties" className="bg-[#9B1C1C] hover:bg-[#7E1717] text-white px-6 md:px-8 py-3 md:py-5 rounded-xl md:rounded-2xl text-base md:text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-500">
                Explore Properties
              </Link>
              <Link href="/contact" className="bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 hover:bg-white text-[#4A1F12] px-6 md:px-8 py-3 md:py-5 rounded-xl md:rounded-2xl text-base md:text-lg font-semibold shadow-lg hover:-translate-y-1 transition-all duration-500">
                Contact Our Team
              </Link>
            </div>
          </div>

          <div className="relative mt-16 md:mt-20 flex justify-center">
            <div className="absolute w-[500px] md:w-[600px] h-[500px] md:h-[600px] rounded-full bg-[#D4A017]/20 blur-3xl"></div>
            <div className="relative rounded-2xl md:rounded-[40px] overflow-hidden border border-white/40 shadow-2xl">
              <Image src="/logo.jpeg" alt="Sri Megha Lakshmi Group - Leading Real Estate and Construction Company in Bangalore" width={1400} height={800} priority sizes="(max-width: 768px) 100vw, 1200px" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-[3000ms]" />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mt-20 md:mt-24">
            {companies.map((company, index) => (
              <div key={index}>
                <button
                  onClick={() => setActive(index)}
                  className={`w-full group relative border rounded-2xl md:rounded-[36px] p-6 md:p-8 text-left transition-all duration-700 overflow-hidden ${
                    active === index ? 'bg-[#9B1C1C] text-white border-[#9B1C1C]' : 'bg-white/80 backdrop-blur-xl border-white/40 hover:-translate-y-2 md:hover:-translate-y-3 hover:shadow-xl'
                  }`}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9B1C1C] via-[#D4A017] to-[#9B1C1C]"></div>
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl font-black shadow-lg ${
                    active === index ? 'bg-white text-[#9B1C1C]' : 'bg-[#9B1C1C] text-white'
                  }`}>
                    {company.number}
                  </div>
                  <h2 className="mt-6 md:mt-8 text-2xl md:text-3xl lg:text-4xl font-black leading-tight">{company.title}</h2>
                  <p className={`mt-2 md:mt-3 font-bold uppercase tracking-[1px] md:tracking-[2px] text-xs md:text-sm ${
                    active === index ? 'text-[#F5D67B]' : 'text-[#D4A017]'
                  }`}>
                    {company.subtitle}
                  </p>
                  <p className={`mt-4 md:mt-6 leading-relaxed text-sm md:text-base ${
                    active === index ? 'text-white/80' : 'text-[#4A1F12]/75'
                  }`}>
                    {company.description.substring(0, 120)}...
                  </p>
                  <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 mt-6 md:mt-8 transition-all duration-500 ${active === index ? 'rotate-180' : ''}`} />
                </button>
              </div>
            ))}
          </div>

          <div className="hidden lg:block mt-10">
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[40px] p-10 shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-[#9B1C1C] text-white flex items-center justify-center text-3xl font-black">
                  {companies[active].number}
                </div>
                <div>
                  <h2 className="text-4xl font-black text-[#9B1C1C]">{companies[active].title}</h2>
                  <p className="mt-1 uppercase tracking-[3px] text-[#D4A017] font-bold text-sm">{companies[active].subtitle}</p>
                </div>
              </div>
              <p className="mt-8 text-lg leading-relaxed text-[#4A1F12]/75">{companies[active].description}</p>
              <div className="grid md:grid-cols-2 gap-5 mt-10">
                {companies[active].services.slice(0, 8).map((service, idx) => (
                  <div key={idx} className="bg-[#F8F6F2] border border-[#D4A017]/10 rounded-2xl p-5 hover:bg-white hover:shadow-lg transition-all duration-500">
                    <div className="flex gap-3">
                      <div className="min-w-[40px] h-[40px] rounded-xl bg-[#9B1C1C] text-white flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#9B1C1C]">{service.title}</h3>
                        <p className="mt-1 text-[#4A1F12]/70 text-sm leading-relaxed">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-10">
                <Link href="/contact" className="bg-[#9B1C1C] hover:bg-[#7E1717] text-white px-8 py-4 rounded-xl text-base font-semibold shadow-lg hover:scale-105 transition-all duration-500">
                  Contact Now
                </Link>
                <Link href="/properties" className="bg-[#F8F6F2] border border-[#D4A017]/20 hover:bg-white text-[#4A1F12] px-8 py-4 rounded-xl text-base font-semibold shadow-lg hover:-translate-y-1 transition-all duration-500">
                  Explore Properties
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-24 md:mt-32">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-4 md:px-5 py-2 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse"></div>
                <p className="uppercase tracking-[3px] md:tracking-[5px] text-[#9B1C1C] text-xs md:text-sm font-bold">Featured Projects</p>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#9B1C1C] mt-5 md:mt-6">
                Our Premium<span className="text-[#D4A017]"> Properties</span>
              </h2>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-[#4A1F12]/70">
                Discover exclusive real estate opportunities across Bengaluru's prime locations
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {featuredProperties.map((property) => (
                <div key={property.id} className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-[#9B1C1C]/10 to-[#D4A017]/10';
                          fallback.innerHTML = '<p class="text-[#9B1C1C] font-semibold text-sm">Image Coming Soon</p>';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 md:px-3 py-0.5 md:py-1 text-xs font-bold text-[#9B1C1C]">
                      {property.year}
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg md:text-xl font-bold text-[#9B1C1C] line-clamp-1">{property.title}</h3>
                    <p className="text-xs md:text-sm text-[#D4A017] font-semibold mt-1">{property.location}</p>
                    <p className="text-xs md:text-sm text-gray-600 mt-2 line-clamp-2">{property.description}</p>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs text-gray-500">{property.sqft}</span>
                      <Link href={`/properties/${property.id}`} className="text-sm font-bold text-[#9B1C1C] hover:text-[#D4A017] transition">
                        Know More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 md:mt-12">
              <Link href="/properties" className="inline-flex items-center gap-2 bg-[#9B1C1C] hover:bg-[#7E1717] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold shadow-lg transition-all duration-500 hover:scale-105">
                View All Properties
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-20 md:mt-24">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '500+', label: 'Happy Clients' },
              { value: '250+', label: 'Projects Completed' },
              { value: '100%', label: 'Legal Transparency' },
            ].map((item, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl md:rounded-[30px] p-5 md:p-8 text-center shadow-lg hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-700">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#9B1C1C]">{item.value}</h3>
                <p className="mt-1 md:mt-3 text-[#4A1F12]/70 text-xs md:text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Sri Megha Lakshmi Group',
          url: 'https://www.srimeghalakshmi.in',
          logo: 'https://www.srimeghalakshmi.in/logo.jpeg',
          description: 'Sri Megha Lakshmi Group is a leading real estate developer and construction company in Bangalore offering land development, plotting, construction, interiors, rentals, e-Khata, property registration, and legal real estate services.',
          address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'India' },
          contactPoint: { '@type': 'ContactPoint', telephone: '+91-9741021116', contactType: 'customer service' },
        }) }} />
      </section>
    </>
  )
}