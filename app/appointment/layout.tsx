import { pageMetadata } from '@/lib/seo'

// The page itself is a client component, so its metadata lives here
export const metadata = pageMetadata({
  title: 'Book a Site Visit or Property Consultation',
  description:
    'Book a free site visit or consultation with Sri Megha Lakshmi Group. Choose a date and time to view plots, villas, apartments and commercial properties in Bengaluru.',
  keywords: [
    'book site visit Bangalore',
    'property consultation Bangalore',
    'schedule property visit',
    'real estate appointment',
    'plot site visit Bengaluru',
  ],
  path: '/appointment',
})

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return children
}
