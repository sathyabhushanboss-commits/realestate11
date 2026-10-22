import type { Metadata } from 'next'
import CompanyPage from '@/components/CompanyPage'

export const metadata: Metadata = {
  title: 'Sri Megha Lakshmi Developers',
  description: 'Approved residential layouts, plots and land development in Bengaluru.',
  alternates: { canonical: '/developers' },
}

export default function Page() {
  return <CompanyPage slug="developers" />
}
