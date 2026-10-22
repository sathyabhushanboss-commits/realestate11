import { PageHeader } from '@/components/PanelShell'
import PropertyForm from '@/components/admin/PropertyForm'
import { EMPTY_PROPERTY } from '@/lib/properties'

export default function NewPropertyPage() {
  return (
    <>
      <PageHeader title="Add property" description="Create a new listing with photos, video and details" />
      <PropertyForm initial={EMPTY_PROPERTY} />
    </>
  )
}
