import Link from 'next/link'
import { requirePageSession } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { Enquiry, User } from '@/lib/models'
import { PageHeader } from '@/components/PanelShell'
import StatusBadge from '@/components/StatusBadge'

export default async function AccountOverview() {
  const session = await requirePageSession()
  await connectDB()

  const [user, enquiries] = await Promise.all([
    User.findById(session.sub).select('favorites').lean(),
    Enquiry.find({ user: session.sub })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate<{ property: { title: string } | null }>('property', 'title')
      .lean(),
  ])
  const firstName = session.name.split(' ')[0]

  return (
    <>
      <PageHeader title={`Hello, ${firstName}`} description="Here's what's happening with your property search" />

      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/account/saved" className="card p-6 hover:-translate-y-0.5 transition-transform">
          <p className="text-sm text-bronze/60">Saved properties</p>
          <p className="font-display text-5xl text-ruby mt-2">{user?.favorites.length ?? 0}</p>
        </Link>
        <Link href="/account/enquiries" className="card p-6 hover:-translate-y-0.5 transition-transform">
          <p className="text-sm text-bronze/60">Enquiries sent</p>
          <p className="font-display text-5xl text-bronze mt-2">{enquiries.length}</p>
        </Link>
        <div className="card p-6 bg-ink text-white border-0 flex flex-col justify-between gap-4">
          <p className="text-white/70 text-sm">Ready to see a property in person?</p>
          <Link href="/appointment" className="btn btn-gold !min-h-0 !py-2.5 self-start">
            Book a Site Visit
          </Link>
        </div>
      </div>

      <section className="card mt-8 overflow-hidden">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-bronze/10">
          <h2 className="font-semibold text-bronze">Recent enquiries</h2>
          <Link href="/properties" className="text-sm text-ruby font-semibold">
            Browse properties →
          </Link>
        </div>
        {enquiries.length === 0 ? (
          <p className="px-6 py-10 text-center text-bronze/55">
            You haven&apos;t sent any enquiries yet. Open any property and tap <strong>Enquire</strong>.
          </p>
        ) : (
          <ul className="divide-y divide-bronze/10">
            {enquiries.map((e) => (
              <li key={String(e._id)} className="px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-bronze truncate">{e.property?.title ?? 'General enquiry'}</p>
                  <p className="text-xs text-bronze/50">
                    {new Date(e.createdAt ?? 0).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                  </p>
                </div>
                <StatusBadge status={e.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
