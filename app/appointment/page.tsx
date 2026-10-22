import type { Metadata } from 'next'
import { CalendarCheck, Clock, MapPin, Phone } from 'lucide-react'
import EnquiryForm from '@/components/EnquiryForm'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Book a Site Visit',
  description: 'Schedule a site visit or consultation with Sri Megha Lakshmi Group in Bengaluru.',
}

export default function AppointmentPage() {
  return (
    <main className="bg-ivory">
      <div className="container-x py-12 md:py-20 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div>
          <p className="eyebrow">Book an appointment</p>
          <h1 className="heading-xl mt-5">
            See it <em className="text-gold-deep">in person.</em>
          </h1>
          <p className="lead mt-5 max-w-lg">
            Pick a date that suits you and our team will confirm your site visit or office consultation by phone.
          </p>

          <ul className="mt-10 space-y-5">
            {[
              { icon: CalendarCheck, title: 'Confirmed within hours', text: 'We call back to lock in a time that works for you.' },
              { icon: MapPin, title: 'Guided site visits', text: 'Walk the property with someone who knows every document.' },
              { icon: Clock, title: SITE.hours, text: SITE.addressLines.join(', ') },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="w-11 h-11 rounded-full bg-ruby/10 text-ruby flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <span>
                  <span className="block font-semibold text-bronze">{title}</span>
                  <span className="block text-sm text-bronze/60 mt-0.5">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <a href={SITE.phoneHref} className="btn btn-outline mt-10">
            <Phone className="w-4 h-4" /> Prefer to call? {SITE.phones[0]}
          </a>
        </div>

        <div className="card p-6 sm:p-9">
          <h2 className="font-display text-3xl text-ruby">Request a visit</h2>
          <p className="text-sm text-bronze/60 mt-1 mb-6">Tell us which property or service you&apos;re interested in.</p>
          <EnquiryForm type="site-visit" withDate submitLabel="Request Appointment" />
        </div>
      </div>
    </main>
  )
}
