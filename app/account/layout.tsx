import type { Metadata } from 'next'
import { requirePageSession } from '@/lib/auth'
import PanelShell, { type PanelNavItem } from '@/components/PanelShell'

export const metadata: Metadata = { title: 'My Account', robots: { index: false } }

const NAV: PanelNavItem[] = [
  { href: '/account', label: 'Overview', icon: 'LayoutDashboard' },
  { href: '/account/saved', label: 'Saved Properties', icon: 'Heart' },
  { href: '/account/enquiries', label: 'My Enquiries', icon: 'Inbox' },
  { href: '/account/profile', label: 'Profile', icon: 'UserCog' },
]

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await requirePageSession()
  // Admins also get a shortcut back to their panel
  const nav: PanelNavItem[] =
    session.role === 'admin' ? [...NAV, { href: '/admin/dashboard', label: 'Admin Panel', icon: 'Building2' }] : NAV

  return (
    <PanelShell title="My Account" user={{ name: session.name, email: session.email, role: session.role }} nav={nav}>
      {children}
    </PanelShell>
  )
}
