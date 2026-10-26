'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, X, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react'
import { COMPANY_CONTENT, serviceAnchor, serviceSummary } from '@/lib/companyContent'

// Tracks whether the desktop (lg) layout is showing; false during server render
const DESKTOP_QUERY = '(min-width: 1024px)'
function subscribeDesktop(callback: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}
const getDesktop = () => window.matchMedia(DESKTOP_QUERY).matches
const getDesktopOnServer = () => false

export default function Hero() {
  const [active, setActive] = useState(0)
  // Phones: each company card expands in place (accordion)
  const [mobileOpen, setMobileOpen] = useState<number | null>(null)
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktop, getDesktopOnServer)

  const selectCompany = (index: number, card: HTMLElement) => {
    setActive(index)
    const opening = mobileOpen !== index
    setMobileOpen(opening ? index : null)
    // Keep the tapped card in view after the previously open one collapses
    if (opening && !isDesktop) {
      setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 320)
    }
  }
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
    
    // Save for the admin panel (Enquiries)
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, type: 'contact', message: 'Requested a consultation (website popup)' }),
    }).catch(() => {})

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
    } catch {
      showNotification('Thank you! Our team will contact you shortly.', 'success')
      setLeadForm({ name: '', phone: '', email: '' })
      setShowLeadPopup(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const companies = [
    {
      href: '/developers',
      number: '01',
      title: 'Sri Megha Lakshmi Developers',
      subtitle: 'Premium Land Development & Plotting Company',
      description: 'Sri Megha Lakshmi Developers is one of Bengaluru\'s trusted real estate development companies specializing in land acquisition, site conversion, plotting, and residential and commercial layout development.',
      services: COMPANY_CONTENT['developers'].services,
    },
    {
      href: '/constructions',
      number: '02',
      title: 'Sri Megha Lakshmi Constructions',
      subtitle: 'Residential, Commercial & Interior Construction Experts',
      description: 'Sri Megha Lakshmi Constructions delivers high-quality construction services for residential, commercial, and industrial projects.',
      services: COMPANY_CONTENT['constructions'].services,
    },
    {
      href: '/real-estate',
      number: '03',
      title: 'Sri Megha Lakshmi Real Estate',
      subtitle: 'Property Sales, Rentals & Legal Documentation Services',
      description: 'Sri Megha Lakshmi Real Estate offers complete real estate solutions including property buying, selling, rentals, leasing, legal documentation, registration, and property consultancy services.',
      services: COMPANY_CONTENT['real-estate'].services,
    },
  ]

  // Luxury Gallery Items
  // Real project photos
  const luxuryGallery = [
    { id: 1, title: 'Residential Apartments', image: '/properties/set3.1.jpeg', category: 'Koramangala' },
    { id: 2, title: 'Commercial Building', image: '/properties/set1.jpeg', category: 'Doddakannalli' },
    { id: 3, title: 'Residential Units', image: '/properties/set2.jpeg', category: 'Kasavanahalli' },
    { id: 4, title: 'Legacy Commercial Building', image: '/properties/set4.jpeg', category: 'Koramangala' },
    { id: 5, title: 'Premium Residence', image: '/properties/set3.jpeg', category: 'Koramangala' },
    { id: 6, title: 'Rental Apartments', image: '/properties/set2.jpeg', category: 'Kasavanahalli' },
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
              <p className="tracking-[2px] sm:tracking-[6px] md:tracking-[8px] text-[#9B1C1C] font-bold uppercase text-[11px] sm:text-xs md:text-sm">
                Bengaluru&apos;s Trusted Real Estate &amp; Construction Company
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8 mt-20 md:mt-24">
            {companies.map((company, index) => {
              // Desktop highlights the selected card; phones highlight the expanded one
              const on = isDesktop ? active === index : mobileOpen === index
              const expanded = !isDesktop && mobileOpen === index
              return (
                <div
                  key={company.href}
                  className={`relative border rounded-2xl md:rounded-[36px] overflow-hidden scroll-mt-28 transition-all duration-700 ${
                    on ? 'bg-[#9B1C1C] text-white border-[#9B1C1C] shadow-2xl' : 'bg-white/80 backdrop-blur-xl border-white/40 lg:hover:-translate-y-3 hover:shadow-xl'
                  }`}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9B1C1C] via-[#D4A017] to-[#9B1C1C]"></div>

                  <button
                    onClick={(e) => selectCompany(index, e.currentTarget.parentElement as HTMLElement)}
                    aria-expanded={isDesktop ? undefined : expanded}
                    aria-controls={`company-details-${index}`}
                    className="w-full text-left p-6 md:p-8"
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl font-black shadow-lg ${
                      on ? 'bg-white text-[#9B1C1C]' : 'bg-[#9B1C1C] text-white'
                    }`}>
                      {company.number}
                    </div>
                    <h2 className="mt-6 md:mt-8 text-2xl md:text-3xl lg:text-4xl font-black leading-tight">{company.title}</h2>
                    <p className={`mt-2 md:mt-3 font-bold uppercase tracking-[1px] md:tracking-[2px] text-xs md:text-sm ${
                      on ? 'text-[#F5D67B]' : 'text-[#D4A017]'
                    }`}>
                      {company.subtitle}
                    </p>
                    {/* Short teaser; on phones the full text shows once expanded */}
                    <p className={`mt-4 md:mt-6 leading-relaxed text-sm md:text-base ${
                      on ? 'text-white/80' : 'text-[#4A1F12]/75'
                    } ${expanded ? 'hidden' : ''}`}>
                      {company.description.substring(0, 120)}...
                    </p>
                    <span className="mt-6 md:mt-8 flex items-center justify-between">
                      <span className={`lg:hidden text-sm font-semibold ${on ? 'text-white' : 'text-[#9B1C1C]'}`}>
                        {expanded ? 'Show less' : 'View services'}
                      </span>
                      <span className={`w-10 h-10 lg:w-auto lg:h-auto rounded-full lg:rounded-none flex items-center justify-center ${
                        on ? 'bg-white/15 lg:bg-transparent' : 'bg-[#9B1C1C]/10 lg:bg-transparent'
                      }`}>
                        <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ${on ? 'rotate-180' : ''}`} />
                      </span>
                    </span>
                  </button>

                  {/* PHONES: details expand inside the card */}
                  <div
                    id={`company-details-${index}`}
                    className={`lg:hidden grid transition-[grid-template-rows] duration-500 ease-out ${
                      expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 md:px-8 md:pb-8">
                        <p className="text-sm md:text-base leading-relaxed text-white/85">{company.description}</p>

                        <ul className="mt-6 space-y-3">
                          {company.services.map((service) => (
                            <li key={service.title}>
                              <Link
                                href={`${company.href}#${serviceAnchor(service.title)}`}
                                tabIndex={expanded ? 0 : -1}
                                className="flex gap-3 rounded-2xl bg-white/10 border border-white/10 p-3 hover:bg-white/15 transition"
                              >
                                <span className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden">
                                  <Image src={service.image} alt={service.imageAlt} fill sizes="64px" className="object-cover" />
                                </span>
                                <span className="min-w-0">
                                  <span className="flex items-center gap-1 font-bold text-white">
                                    {service.title}
                                    <ArrowUpRight className="w-4 h-4 shrink-0 text-[#F5D67B]" />
                                  </span>
                                  <span className="block mt-1 text-sm leading-relaxed text-white/70">{serviceSummary(service.description)}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                          <Link
                            href={company.href}
                            tabIndex={expanded ? 0 : -1}
                            className="text-center bg-white text-[#9B1C1C] px-6 py-3.5 rounded-xl font-semibold shadow-lg"
                          >
                            Visit {company.title.replace('Sri Megha Lakshmi ', '')}
                          </Link>
                          <Link
                            href="/contact"
                            tabIndex={expanded ? 0 : -1}
                            className="text-center border border-white/30 text-white px-6 py-3.5 rounded-xl font-semibold"
                          >
                            Contact Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="hidden lg:block mt-10">
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl lg:rounded-[40px] p-6 md:p-10 shadow-2xl">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-2xl md:rounded-3xl bg-[#9B1C1C] text-white flex items-center justify-center text-2xl md:text-3xl font-black">
                  {companies[active].number}
                </div>
                <div>
                  <h2 className="text-2xl md:text-4xl font-black text-[#9B1C1C] leading-tight">{companies[active].title}</h2>
                  <p className="mt-1 uppercase tracking-[2px] md:tracking-[3px] text-[#D4A017] font-bold text-xs md:text-sm">{companies[active].subtitle}</p>
                </div>
              </div>
              <p className="mt-6 md:mt-8 text-base md:text-lg leading-relaxed text-[#4A1F12]/75">{companies[active].description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-8 md:mt-10">
                {companies[active].services.map((service) => (
                  <Link
                    key={service.title}
                    href={`${companies[active].href}#${serviceAnchor(service.title)}`}
                    className="group flex gap-4 bg-[#F8F6F2] border border-[#D4A017]/10 rounded-2xl p-3 pr-5 hover:bg-white hover:shadow-lg hover:border-[#D4A017]/40 transition-all duration-500"
                  >
                    <span className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </span>
                    <span className="min-w-0 py-1">
                      <span className="flex items-center gap-1.5 text-lg font-bold text-[#9B1C1C]">
                        {service.title}
                        <ArrowUpRight className="w-4 h-4 shrink-0 text-[#D4A017] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                      <span className="block mt-1 text-[#4A1F12]/70 text-sm leading-relaxed">{serviceSummary(service.description)}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 md:mt-10">
                <Link href={companies[active].href} className="text-center bg-[#9B1C1C] hover:bg-[#7E1717] text-white px-8 py-4 rounded-xl text-base font-semibold shadow-lg hover:scale-105 transition-all duration-500">
                  Visit {companies[active].title.replace('Sri Megha Lakshmi ', '')}
                </Link>
                <Link href="/contact" className="text-center bg-[#F8F6F2] border border-[#D4A017]/20 hover:bg-white text-[#4A1F12] px-8 py-4 rounded-xl text-base font-semibold shadow-lg hover:-translate-y-1 transition-all duration-500">
                  Contact Now
                </Link>
              </div>
            </div>
          </div>

          {/* LUXURY GALLERY SECTION - This is the only gallery section now */}
          <div className="mt-24 md:mt-32">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-white/80 backdrop-blur-xl border border-[#D4A017]/20 rounded-full px-4 md:px-5 py-2 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse"></div>
                <p className="uppercase tracking-[3px] md:tracking-[5px] text-[#9B1C1C] text-xs md:text-sm font-bold">Project Gallery</p>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#9B1C1C] mt-5 md:mt-6">
                Our <span className="text-[#D4A017]">Work</span>
              </h2>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-[#4A1F12]/70">
                A selection of properties we have developed, built and sold across Bengaluru
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {luxuryGallery.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-48 md:h-64 lg:h-72 overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-[#9B1C1C]/10 to-[#D4A017]/10';
                          fallback.innerHTML = `<p class="text-[#9B1C1C] font-semibold text-sm">${item.category}</p>`;
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                        <p className="text-[#9B1C1C] font-bold text-xs md:text-sm">{item.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-[#F5D67B] text-[10px] md:text-xs font-semibold uppercase tracking-wider">{item.category}</p>
                    <h4 className="text-white font-bold text-sm md:text-base">{item.title}</h4>
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