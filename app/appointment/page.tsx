'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AppointmentPage() {

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    date: '',
    time: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    setLoading(true)

    try {

      // EMAIL API
      await fetch('/api/appointment', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(form),
      })

      // WHATSAPP
      const whatsappMessage = `
New Appointment Booking

Full Name: ${form.name}

Email: ${form.email}

Phone: ${form.phone}

Country: ${form.country}

Preferred Date: ${form.date}

Preferred Time: ${form.time}

Additional Message:
${form.message}
      `

      const whatsappURL =
        `https://wa.me/919741021116?text=${encodeURIComponent(whatsappMessage)}`

      window.open(whatsappURL, '_blank')

      alert('Appointment request sent successfully!')

      setForm({
        name: '',
        email: '',
        phone: '',
        country: '',
        date: '',
        time: '',
        message: '',
      })

    } catch (error) {

      console.error(error)

      alert('Something went wrong.')
    }

    setLoading(false)
  }

  return (

    <main className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 overflow-y-auto">

      {/* MODAL */}
      <div className="w-full max-w-5xl bg-white rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl my-auto">

        {/* HEADER */}
        <div className="bg-[#9B1C1C] text-white px-5 md:px-8 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* ICON */}
            <div className="w-11 h-11 rounded-full bg-[#D4A017] flex items-center justify-center text-xl shrink-0">
              📅
            </div>

            {/* TITLE */}
            <div>

              <h1 className="text-2xl md:text-3xl font-bold">
                Book Appointment
              </h1>

              <p className="text-white/80 text-sm mt-1">
                Schedule your consultation with Sri Megha Lakshmi
              </p>
            </div>
          </div>

          {/* CLOSE */}
          <button
            onClick={() => router.push('/')}
            className="text-3xl md:text-4xl text-white/80 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-5 md:p-8"
        >

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* FULL NAME */}
            <div>

              <label className="block mb-2 font-medium text-[#4A1F12]">
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#9B1C1C]"
              />
            </div>

            {/* EMAIL */}
            <div>

              <label className="block mb-2 font-medium text-[#4A1F12]">
                Email *
              </label>

              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#9B1C1C]"
              />
            </div>

            {/* PHONE */}
            <div>

              <label className="block mb-2 font-medium text-[#4A1F12]">
                Phone *
              </label>

              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+91"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#9B1C1C]"
              />
            </div>

            {/* COUNTRY */}
            <div>

              <label className="block mb-2 font-medium text-[#4A1F12]">
                Country *
              </label>

              <select
                name="country"
                required
                value={form.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#9B1C1C]"
              >

                <option value="">
                  Select your country
                </option>

                <option value="India">
                  India
                </option>

                <option value="UAE">
                  UAE
                </option>

                <option value="USA">
                  USA
                </option>

                <option value="UK">
                  UK
                </option>

              </select>
            </div>

            {/* DATE */}
            <div>

              <label className="block mb-2 font-medium text-[#4A1F12]">
                Preferred Date *
              </label>

              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#9B1C1C]"
              />
            </div>

            {/* TIME */}
            <div>

              <label className="block mb-2 font-medium text-[#4A1F12]">
                Preferred Time *
              </label>

              <select
                name="time"
                required
                value={form.time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#9B1C1C]"
              >

                <option value="">
                  Select time
                </option>

                <option value="9AM - 12PM">
                  9AM - 12PM
                </option>

                <option value="1PM - 4PM">
                  1PM - 4PM
                </option>

                <option value="4PM - 7PM">
                  4PM - 7PM
                </option>

              </select>
            </div>

          </div>

          {/* MESSAGE */}
          <div className="mt-5">

            <label className="block mb-2 font-medium text-[#4A1F12]">
              Additional Message
            </label>

            <textarea
              rows={3}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us briefly about your property requirement..."
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none resize-none focus:border-[#9B1C1C]"
            />
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

            {/* CANCEL */}
            <button
              type="button"
              onClick={() => router.push('/')}
              className="border border-gray-300 py-4 rounded-2xl text-lg font-medium hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#9B1C1C] hover:bg-[#8B1E1E] text-white py-4 rounded-2xl text-lg font-semibold transition-all"
            >
              {
                loading
                  ? 'Sending...'
                  : 'Send to WhatsApp'
              }
            </button>

          </div>
        </form>
      </div>
    </main>
  )
}