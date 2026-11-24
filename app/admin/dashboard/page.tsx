import Link from 'next/link'
import { db } from '@/lib/db'
import { ENQUIRY_SELECT, toEnquiryJSON } from '@/lib/enquiries'
import { ensurePropertiesSeeded } from '@/lib/properties'
import { PageHeader } from '@/components/PanelShell'
import StatusBadge from '@/components/StatusBadge'

export default async function AdminDashboard() {
  await ensurePropertiesSeeded()
  const sql = await db()

  const [[counts], recentRows] = await Promise.all([
    sql`
      SELECT (SELECT count(*)::int FROM properties) AS properties,
             (SELECT count(*)::int FROM properties WHERE status = 'published') AS published,
             (SELECT count(*)::int FROM users WHERE role = 'user') AS users,
             (SELECT count(*)::int FROM enquiries WHERE status = 'new') AS new_enquiries`,
    sql.query(`${ENQUIRY_SELECT} ORDER BY e.created_at DESC LIMIT 6`),
  ])
  const { properties, published, users, new_enquiries: newEnquiries } = counts as Record<string, number>
  const recent = recentRows.map(toEnquiryJSON)

  const stats = [
    { label: 'Total properties', value: properties, href: '/admin/properties' },
    { label: 'Published', value: published, href: '/admin/properties' },
    { label: 'Registered users', value: users, href: '/admin/users' },
    { label: 'New enquiries', value: newEnquiries, href: '/admin/enquiries', highlight: newEnquiries > 0 },
  ]

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="An overview of your listings and leads"
        action={
          <Link href="/admin/properties/new" className="btn btn-primary">
            + Add Property
          </Link>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5 sm:p-6 hover:-translate-y-0.5 transition-transform">
            <p className="text-xs sm:text-sm text-bronze/60">{s.label}</p>
            <p className={`font-display text-4xl sm:text-5xl mt-2 ${s.highlight ? 'text-ruby' : 'text-bronze'}`}>{s.value}</p>
          </Link>
        ))}
      </div>

      <section className="card mt-8 overflow-hidden">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-bronze/10">
          <h2 className="font-semibold text-bronze">Latest enquiries</h2>
          <Link href="/admin/enquiries" className="text-sm text-ruby font-semibold">
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-6 py-10 text-center text-bronze/50">No enquiries yet.</p>
        ) : (
          <ul className="divide-y divide-bronze/10">
            {recent.map((e) => (
              <li key={String(e._id)} className="px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-bronze truncate">
                    {e.name} <span className="text-bronze/50 font-normal">· {e.phone}</span>
                  </p>
                  <p className="text-sm text-bronze/60 truncate">
                    {e.property?.title ?? (e.type === 'contact' ? 'General contact' : 'Site visit request')}
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
