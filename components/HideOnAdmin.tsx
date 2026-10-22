'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// Public site chrome (footer, contact buttons) is not shown inside the admin and user panels
export default function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname.startsWith('/admin') || pathname.startsWith('/account')) return null
  return <>{children}</>
}
