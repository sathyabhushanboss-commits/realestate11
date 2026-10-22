import type { Metadata } from 'next'
import CompanyPage from '@/components/CompanyPage'

export const metadata: Metadata = {
  title: 'Sri Megha Lakshmi Constructions',
  description: 'Turnkey construction of homes, villas, apartments and commercial buildings in Bengaluru.',
  alternates: { canonical: '/constructions' },
}

export default function Page() {
  return <CompanyPage slug="constructions" />
}
