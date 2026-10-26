import type { Metadata } from 'next'
import { Suspense } from 'react'
import AuthForm from '@/components/AuthForm'

export const metadata: Metadata = { title: 'Reset password', robots: { index: false } }

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <AuthForm mode="reset" />
    </Suspense>
  )
}
