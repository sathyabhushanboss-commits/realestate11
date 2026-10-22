'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/PanelShell'

export default function ProfilePage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', currentPassword: '', newPassword: '' })
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/account')
      .then((r) => r.json())
      .then((u) => {
        setEmail(u.email ?? '')
        setForm((f) => ({ ...f, name: u.name ?? '', phone: u.phone ?? '' }))
        setLoaded(true)
      })
  }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    const body: Record<string, string> = { name: form.name, phone: form.phone }
    if (form.newPassword) {
      body.currentPassword = form.currentPassword
      body.newPassword = form.newPassword
    }
    const res = await fetch('/api/account', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) {
      setMessage({ ok: false, text: data.error })
      return
    }
    setForm((f) => ({ ...f, currentPassword: '', newPassword: '' }))
    setMessage({ ok: true, text: 'Profile updated.' })
    router.refresh()
  }

  if (!loaded) return <p className="py-16 text-center text-bronze/50">Loading…</p>

  return (
    <>
      <PageHeader title="Profile" description="Update your details and password" />

      <form onSubmit={save} className="max-w-2xl space-y-6">
        <section className="card p-5 sm:p-7 space-y-5">
          <h2 className="font-semibold text-bronze">Your details</h2>
          <div>
            <label className="field-label">Email</label>
            <input className="field !bg-sand/50" value={email} disabled />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label">Full name</label>
              <input className="field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="field-label">Mobile</label>
              <input className="field" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
        </section>

        <section className="card p-5 sm:p-7 space-y-5">
          <div>
            <h2 className="font-semibold text-bronze">Change password</h2>
            <p className="text-sm text-bronze/55 mt-1">Leave blank to keep your current password.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label">Current password</label>
              <input
                className="field"
                type="password"
                autoComplete="current-password"
                value={form.currentPassword}
                onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              />
            </div>
            <div>
              <label className="field-label">New password</label>
              <input
                className="field"
                type="password"
                minLength={8}
                autoComplete="new-password"
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              />
            </div>
          </div>
        </section>

        {message && (
          <p role="status" className={`text-sm rounded-xl px-4 py-3 ${message.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-ruby/5 text-ruby'}`}>
            {message.text}
          </p>
        )}

        <button disabled={saving} className="btn btn-primary disabled:opacity-60">
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </>
  )
}
