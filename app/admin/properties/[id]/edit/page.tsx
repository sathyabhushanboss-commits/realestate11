import { notFound } from 'next/navigation'
import { findProperty, isId, toPropertyJSON } from '@/lib/properties'
import { PageHeader } from '@/components/PanelShell'
import PropertyForm from '@/components/admin/PropertyForm'

export default async function EditPropertyPage({ params }: PageProps<'/admin/properties/[id]/edit'>) {
  const { id } = await params
  if (!isId(id)) notFound()

  const doc = await findProperty(id)
  if (!doc) notFound()

  const { _id, createdAt, updatedAt, ...initial } = toPropertyJSON(doc)
  void createdAt
  void updatedAt

  return (
    <>
      <PageHeader title="Edit property" description={initial.title} />
      <PropertyForm id={_id} initial={initial} />
    </>
  )
}
