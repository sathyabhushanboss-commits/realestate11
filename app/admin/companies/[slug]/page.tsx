import { notFound } from 'next/navigation'
import { requirePageSession } from '@/lib/auth'
import { getCompany, isCompanySlug } from '@/lib/companies'
import CompanyEditor from './CompanyEditor'

export default async function EditCompanyPage({ params }: PageProps<'/admin/companies/[slug]'>) {
  await requirePageSession('admin')

  const { slug } = await params
  if (!isCompanySlug(slug)) notFound()

  const company = await getCompany(slug)
  return <CompanyEditor initial={company} />
}
