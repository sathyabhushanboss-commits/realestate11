import type { Metadata } from 'next'
import CompanyPage from '@/components/CompanyPage'

export const metadata: Metadata = {
  title: 'Sri Megha Lakshmi Real Estate',
  description: 'Buy, sell and rent residential and commercial properties in Bengaluru with complete legal support.',
  alternates: { canonical: '/real-estate' },
}

export default function Page() {
  return <CompanyPage slug="real-estate" />
}
