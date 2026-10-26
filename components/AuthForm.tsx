'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

// Only follow same-site relative paths after login (prevents open redirects)
function safeNext(value: string | null) {
  return value && value.startsWith('/') && !value.startsWith('//') ? value : null
}

type Mode = 'login' | 'register' | 'reset'
type LoginMethod = 'password' | 'otp'

const COPY: Record<Mode, { eyebrow: string; title: string; subtitle: string }> = {
  login: { eyebrow: 'Welcome back', title: 'Sign in', subtitle: 'Sign in to your account or the admin panel.' },
  register: { eyebrow: 'Create account', title: 'Join us', subtitle: 'We will email you a code to verify your address.' },
  reset: { eyebrow: 'Account recovery', title: 'Reset password', subtitle: 'We will email you a code to set a new password.' },
}

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, data }
}

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter()
  const params = useSearchParams()
  const next = safeNext(params.get('next'))
  const nextQuery = next ? `?next=${encodeURIComponent(next)}` : ''

  const [method, setMethod] = useState<LoginMethod>('password')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', code: '' })
  const [codeSent, setCodeSent] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)

  const usesOtp = mode !== 'login' || method === 'otp'
  const copy = COPY[mode]

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: key === 'code' ? e.target.value.replace(/\D/g, '').slice(0, 6) : e.target.value }))

  const switchMethod = (value: LoginMethod) => {
    setMethod(value)
    setCodeSent(false)
    setError('')
    setNotice('')
    setForm((f) => ({ ...f, password: '', code: '' }))
  }

  const finish = (role: string) => {
    const home = role === 'admin' ? '/admin/dashboard' : '/account'
    // A user can't follow a "next" link into the admin area
    const target = next && (role === 'admin' || !next.startsWith('/admin')) ? next : home
    router.replace(target)
    router.refresh()
  }

  const sendCode = async () => {
    setError('')
    setNotice('')
    setLoading(true)
    try {
      const { ok, data } = await postJson('/api/auth/otp/send', { email: form.email, purpose: mode })
      if (!ok) {
        setError(data.error || 'Could not send the code')
        return
      }
      setCodeSent(true)
      setCooldown(60)
      setNotice(
        mode === 'register'
          ? `We sent a 6-digit code to ${form.email}. Check your inbox and spam folder.`
          : `If ${form.email} has an account, a 6-digit code is on its way. Check your inbox and spam folder.`
      )
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (usesOtp && !codeSent) {
      await sendCode()
      return
    }

    setError('')
    setLoading(true)
    try {
      const request =
        mode === 'register'
          ? postJson('/api/auth/register', form)
          : mode === 'reset'
            ? postJson('/api/auth/reset-password', { email: form.email, code: form.code, password: form.password })
            : method === 'otp'
              ? postJson('/api/auth/otp/login', { email: form.email, code: form.code })
              : postJson('/api/auth/login', { email: form.email, password: form.password })
      const { ok, data } = await request
      if (!ok) {
        setError(data.error || 'Something went wrong')
        return
      }
      finish(data.role)
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const submitLabel = loading
    ? 'Please wait…'
    : usesOtp && !codeSent
      ? 'Send verification code'
      : mode === 'register'
        ? 'Verify & create account'
        : mode === 'reset'
          ? 'Set new password'
          : 'Sign in'

  // Password field: always for registration, for password login, and for reset once the code is sent
  const showPassword = mode === 'register' || (mode === 'login' && method === 'password') || (mode === 'reset' && codeSent)

  return (
    <main className="min-h-[calc(100vh-84px)] font-sans grid lg:grid-cols-2">
      {/* BRAND PANEL */}
      <div className="hidden lg:flex relative bg-ink text-white flex-col justify-between p-14 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-ruby/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-gold/10 blur-3xl" />
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
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="heading-lg mt-4">{copy.title}</h2>
          <p className="mt-3 text-bronze/65">{copy.subtitle}</p>

          {mode === 'login' && (
            <div role="tablist" aria-label="Sign-in method" className="mt-8 grid grid-cols-2 p-1 rounded-full bg-sand">
              {(['password', 'otp'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={method === value}
                  onClick={() => switchMethod(value)}
                  className={`min-h-11 rounded-full text-sm font-semibold transition ${
                    method === value ? 'bg-ruby text-white shadow' : 'text-bronze/70 hover:text-ruby'
                  }`}
                >
                  {value === 'password' ? 'Password' : 'Email code (OTP)'}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {mode === 'register' && (
              <>
                <div>
                  <label className="field-label" htmlFor="name">Full name</label>
                  <input id="name" className="field" required autoComplete="name" disabled={codeSent} value={form.name} onChange={set('name')} />
                </div>
                <div>
                  <label className="field-label" htmlFor="phone">Mobile number</label>
                  <input id="phone" type="tel" className="field" required autoComplete="tel" placeholder="10-digit number" disabled={codeSent} value={form.phone} onChange={set('phone')} />
                </div>
              </>
            )}
            <div>
              <div className="flex items-center justify-between">
                <label className="field-label" htmlFor="email">Email</label>
                {usesOtp && codeSent && (
                  <button
                    type="button"
                    onClick={() => {
                      setCodeSent(false)
                      setNotice('')
                    }}
                    className="text-xs font-semibold text-ruby hover:underline mb-1.5"
                  >
                    Change
                  </button>
                )}
              </div>
              <input
                id="email"
                type="email"
                className="field disabled:bg-sand/50"
                required
                autoComplete="email"
                disabled={usesOtp && codeSent}
                value={form.email}
                onChange={set('email')}
              />
            </div>

            {showPassword && (
              <div>
                <div className="flex items-center justify-between">
                  <label className="field-label" htmlFor="password">{mode === 'reset' ? 'New password' : 'Password'}</label>
                  {mode === 'login' && (
                    <Link href={`/forgot-password${nextQuery}`} className="text-xs font-semibold text-ruby hover:underline mb-1.5">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  className="field"
                  required
                  minLength={mode === 'login' ? undefined : 8}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  placeholder={mode === 'login' ? '' : 'At least 8 characters'}
                  disabled={mode === 'register' && codeSent}
                  value={form.password}
                  onChange={set('password')}
                />
              </div>
            )}

            {usesOtp && codeSent && (
              <div>
                <label className="field-label" htmlFor="code">6-digit code</label>
                <input
                  id="code"
                  className="field text-center text-2xl font-semibold tracking-[0.5em]"
                  required
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\d{6}"
                  maxLength={6}
                  autoFocus
                  placeholder="••••••"
                  value={form.code}
                  onChange={set('code')}
                />
                <button
                  type="button"
                  onClick={sendCode}
                  disabled={cooldown > 0 || loading}
                  className="mt-2 text-sm font-semibold text-ruby hover:underline disabled:text-bronze/40 disabled:no-underline"
                >
                  {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
                </button>
              </div>
            )}

            {notice && !error && (
              <p role="status" className="text-sm text-gold-deep bg-gold/10 border border-gold/30 rounded-xl px-4 py-3">
                {notice}
              </p>
            )}
            {error && (
              <p role="alert" className="text-sm text-ruby bg-ruby/5 border border-ruby/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-60">
              {submitLabel}
            </button>
          </form>

          <p className="mt-8 text-sm text-bronze/70 text-center">
            {mode === 'login' ? "Don't have an account? " : mode === 'register' ? 'Already registered? ' : 'Remembered it? '}
            <Link
              href={`/${mode === 'login' ? 'register' : 'login'}${nextQuery}`}
              className="text-ruby font-semibold hover:underline"
            >
              {mode === 'login' ? 'Create one' : 'Sign in'}
            </Link>
          </p>
          {mode === 'register' && (
            <p className="mt-4 text-xs text-bronze/55 text-center">
              By creating an account you agree to our{' '}
              <Link href="/terms-and-conditions" className="underline hover:text-ruby">Terms</Link> and{' '}
              <Link href="/privacy-policy" className="underline hover:text-ruby">Privacy Policy</Link>.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
