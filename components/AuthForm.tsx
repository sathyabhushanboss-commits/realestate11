'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

// Only follow same-site relative paths after login (prevents open redirects)
function safeNext(value: string | null) {
  return value && value.startsWith('/') && !value.startsWith('//') ? value : null
}

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter()
  const params = useSearchParams()
  const next = safeNext(params.get('next'))
  const isLogin = mode === 'login'

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLogin ? { email: form.email, password: form.password } : form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }
      const home = data.role === 'admin' ? '/admin/dashboard' : '/account'
      // A user can't follow a "next" link into the admin area
      const target = next && (data.role === 'admin' || !next.startsWith('/admin')) ? next : home
      router.replace(target)
      router.refresh()
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-84px)] grid lg:grid-cols-2">
      {/* BRAND PANEL */}
      <div className="hidden lg:flex relative bg-ink text-white flex-col justify-between p-14 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-ruby/30 blur-3xl" />
        <div className="relative">
          <p className="eyebrow eyebrow-light">Sri Megha Lakshmi Group</p>
          <h1 className="mt-6 font-display text-6xl leading-[1.02]">
            Your property journey,
            <br />
            <em className="text-gold-soft">in one place.</em>
          </h1>
          <p className="mt-6 text-white/65 max-w-md leading-relaxed">
            Save the homes you love, track your enquiries and site visits, and hear from our team first.
          </p>
        </div>
        <div className="relative w-28 h-28 rounded-3xl overflow-hidden bg-white">
          <Image src="/logo.jpeg" alt="" fill sizes="112px" className="object-cover" />
        </div>
      </div>

      {/* FORM */}
      <div className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <p className="eyebrow">{isLogin ? 'Welcome back' : 'Create account'}</p>
          <h2 className="heading-lg mt-4">{isLogin ? 'Sign in' : 'Join us'}</h2>
          <p className="mt-3 text-bronze/65">
            {isLogin ? 'Sign in to your account or the admin panel.' : 'It takes less than a minute.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {!isLogin && (
              <>
                <div>
                  <label className="field-label" htmlFor="name">Full name</label>
                  <input id="name" className="field" required autoComplete="name" value={form.name} onChange={set('name')} />
                </div>
                <div>
                  <label className="field-label" htmlFor="phone">Mobile number</label>
                  <input id="phone" type="tel" className="field" required autoComplete="tel" placeholder="10-digit number" value={form.phone} onChange={set('phone')} />
                </div>
              </>
            )}
            <div>
              <label className="field-label" htmlFor="email">Email</label>
              <input id="email" type="email" className="field" required autoComplete="email" value={form.email} onChange={set('email')} />
            </div>
            <div>
              <label className="field-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="field"
                required
                minLength={isLogin ? undefined : 8}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                placeholder={isLogin ? '' : 'At least 8 characters'}
                value={form.password}
                onChange={set('password')}
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-ruby bg-ruby/5 border border-ruby/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-60">
              {loading ? 'Please wait…' : isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="mt-8 text-sm text-bronze/70 text-center">
            {isLogin ? "Don't have an account? " : 'Already registered? '}
            <Link
              href={`/${isLogin ? 'register' : 'login'}${next ? `?next=${encodeURIComponent(next)}` : ''}`}
              className="text-ruby font-semibold hover:underline"
            >
              {isLogin ? 'Create one' : 'Sign in'}
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
