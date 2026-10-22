'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import {
  Building2,
  ExternalLink,
  Heart,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  UserCog,
  UserRound,
  Users,
} from 'lucide-react'

// Icons are referenced by name so server layouts can pass plain data
const ICONS = { Building2, Heart, Home, Inbox, LayoutDashboard, UserCog, UserRound, Users }
export type PanelIcon = keyof typeof ICONS

export interface PanelNavItem {
  href: string
  label: string
  icon: PanelIcon
}

export default function PanelShell({
  title,
  user,
  nav,
  children,
}: {
  title: string
  user: { name: string; email: string; role: string }
  nav: PanelNavItem[]
  children: ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/login')
    router.refresh()
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <div className="min-h-screen font-sans bg-[#F4F1EA] lg:grid lg:grid-cols-[264px_1fr]">
      {/* SIDEBAR (desktop) */}
      <aside className="hidden lg:flex flex-col bg-ink text-white/70 sticky top-0 h-screen">
        <div className="px-6 py-7 border-b border-white/10">
          <Link href="/" className="font-display text-2xl text-white leading-none">
            Sri Megha Lakshmi
          </Link>
          <p className="mt-2 text-[10px] tracking-[0.3em] uppercase text-gold">{title}</p>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {nav.map((item) => {
            const Icon = ICONS[item.icon]
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${active ? 'text-gold' : ''}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm hover:bg-white/5 hover:text-white">
            <ExternalLink className="w-4 h-4" /> View website
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm hover:bg-white/5 hover:text-white">
            <LogOut className="w-4 h-4" /> Log out
          </button>
          <div className="px-4 pt-3">
            <p className="text-sm text-white truncate">{user.name}</p>
            <p className="text-xs text-white/50 truncate">{user.email}</p>
          </div>
        </div>
      </aside>

      {/* TOP BAR + TABS (mobile / tablet) */}
      <div className="lg:hidden sticky top-0 z-40 bg-ink text-white">
        <div className="flex items-center justify-between px-5 h-16">
          <div className="min-w-0">
            <p className="font-display text-xl leading-none truncate">Sri Megha Lakshmi</p>
            <p className="text-[9px] tracking-[0.3em] uppercase text-gold mt-1">{title}</p>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10" aria-label="View website">
              <ExternalLink className="w-4 h-4" />
            </Link>
            <button onClick={logout} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10" aria-label="Log out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 [scrollbar-width:none]">
          {nav.map((item) => {
            const Icon = ICONS[item.icon]
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                  active ? 'bg-gold text-ink font-semibold' : 'bg-white/10 text-white/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <main className="min-w-0 px-4 py-6 sm:px-8 sm:py-10">{children}</main>
    </div>
  )
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-4xl text-ruby leading-tight">{title}</h1>
        {description && <p className="text-bronze/60 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  )
}
