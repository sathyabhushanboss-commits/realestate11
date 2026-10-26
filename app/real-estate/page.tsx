import CompanyPage from '@/components/CompanyPage'
import { companyMetadata } from '@/lib/companyContent'

export const metadata = companyMetadata('real-estate')

export default function Page() {
  return <CompanyPage slug="real-estate" />
}
