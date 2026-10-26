import CompanyPage from '@/components/CompanyPage'
import { companyMetadata } from '@/lib/companyContent'

export const metadata = companyMetadata('developers')

export default function Page() {
  return <CompanyPage slug="developers" />
}
