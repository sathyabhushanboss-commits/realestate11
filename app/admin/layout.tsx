import type { Metadata } from 'next'
import { requirePageSession } from '@/lib/auth'
import PanelShell, { type PanelNavItem } from '@/components/PanelShell'

export const metadata: Metadata = { title: 'Admin', robots: { index: false } }

const NAV: PanelNavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/admin/properties', label: 'Properties', icon: 'Home' },
  { href: '/admin/enquiries', label: 'Enquiries', icon: 'Inbox' },
  { href: '/admin/users', label: 'Users', icon: 'Users' },
  { href: '/admin/companies', label: 'Company Pages', icon: 'Building2' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requirePageSession('admin')

  return (
    <PanelShell title="Admin Panel" user={{ name: session.name, email: session.email, role: session.role }} nav={NAV}>
      {children}
    </PanelShell>
  )
}
