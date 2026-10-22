'use client'

import { useEffect, useState } from 'react'
import { Trash2, X } from 'lucide-react'
import { PageHeader } from '@/components/PanelShell'

interface UserRow {
  _id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'user'
  createdAt: string
  favorites: number
}

const EMPTY = { name: '', email: '', phone: '', password: '', role: 'user' as 'admin' | 'user' }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    const res = await fetch('/api/users')
    setUsers(res.ok ? await res.json() : [])
    setLoading(false)
  }

  useEffect(() => {
    let cancelled = false
    fetch('/api/users')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!cancelled) {
          setUsers(data)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const changeRole = async (u: UserRow, role: UserRow['role']) => {
    setError('')
    const res = await fetch(`/api/users/${u._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    })
    if (res.ok) setUsers((list) => list.map((x) => (x._id === u._id ? { ...x, role } : x)))
    else setError((await res.json()).error)
  }

  const remove = async (u: UserRow) => {
    if (!confirm(`Delete ${u.name}'s account?`)) return
    setError('')
    const res = await fetch(`/api/users/${u._id}`, { method: 'DELETE' })
    if (res.ok) setUsers((list) => list.filter((x) => x._id !== u._id))
    else setError((await res.json()).error)
  }

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (!res.ok) {
      setError((await res.json()).error)
      return
    }
    setForm(EMPTY)
    setShowForm(false)
    load()
  }

  return (
    <>
      <PageHeader
        title="Users"
        description={`${users.length} account${users.length === 1 ? '' : 's'}`}
        action={
          <button onClick={() => setShowForm((v) => !v)} className="btn btn-primary">
            {showForm ? 'Close' : '+ Add User'}
          </button>
        }
      />

      {showForm && (
        <form onSubmit={create} className="card p-5 sm:p-6 mb-6 grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 flex items-center justify-between">
            <h2 className="font-semibold text-bronze">New account</h2>
            <button type="button" onClick={() => setShowForm(false)} aria-label="Close" className="p-1 text-bronze/60">
              <X className="w-5 h-5" />
            </button>
          </div>
          <input className="field" required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="field" required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="field" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input
            className="field"
            required
            type="password"
            minLength={8}
            placeholder="Temporary password (8+ chars)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <select className="field" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as UserRow['role'] })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button disabled={saving} className="btn btn-primary disabled:opacity-60">
            {saving ? 'Creating…' : 'Create account'}
          </button>
        </form>
      )}

      {error && <p className="mb-4 text-sm text-ruby">{error}</p>}

      {loading ? (
        <p className="py-16 text-center text-bronze/50">Loading…</p>
      ) : (
        <ul className="grid grid-cols-1 gap-3">
          {users.map((u) => (
            <li key={u._id} className="card p-4 sm:p-5 flex flex-wrap items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-ruby/10 text-ruby font-semibold flex items-center justify-center shrink-0">
                {u.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-bronze truncate">{u.name}</p>
                <p className="text-sm text-bronze/60 truncate">
                  {u.email}
                  {u.phone && ` · ${u.phone}`}
                </p>
                <p className="text-xs text-bronze/45 mt-0.5">
                  Joined {new Date(u.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })} · {u.favorites} saved
                </p>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <select
                  className={`text-sm font-semibold rounded-full border px-3 py-1.5 ${
                    u.role === 'admin' ? 'border-gold bg-gold/10 text-gold-deep' : 'border-bronze/15 text-bronze'
                  }`}
                  value={u.role}
                  onChange={(e) => changeRole(u, e.target.value as UserRow['role'])}
                  aria-label="Role"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button onClick={() => remove(u)} className="p-2.5 rounded-lg text-ruby hover:bg-ruby/10" aria-label="Delete user">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
