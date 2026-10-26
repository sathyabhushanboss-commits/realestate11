import CompanyPage from '@/components/CompanyPage'
import { companyMetadata } from '@/lib/companyContent'

export const metadata = companyMetadata('constructions')

export default function Page() {
  return <CompanyPage slug="constructions" />
}
