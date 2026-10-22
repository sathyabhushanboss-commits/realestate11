import Link from 'next/link'
import { requirePageSession } from '@/lib/auth'
import { getCompanies } from '@/lib/companies'

export default async function AdminCompaniesPage() {
  await requirePageSession('admin')
  const companies = await getCompanies()

  return (
    <div>
      <div className="max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#9B1C1C]">Company Pages</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage photos, videos, description and price list for each company
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {companies.map((c) => (
            <div key={c.slug} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
              <h2 className="text-lg font-bold text-[#4A1F12]">{c.name}</h2>
              <p className="text-sm text-gray-500 mt-2 flex-1">{c.tagline}</p>
              <div className="text-xs text-gray-500 mt-4 space-y-1">
                <p>{c.images.length} photos · {c.videos.length} videos · {c.priceList.length} price rows</p>
                <p>
                  Last updated:{' '}
                  {new Date(c.updatedAt).getTime() > 0
                    ? new Date(c.updatedAt).toLocaleString('en-IN')
                    : 'never'}
                </p>
              </div>
              <div className="flex gap-3 mt-5">
                <Link
                  href={`/admin/companies/${c.slug}`}
                  className="flex-1 text-center bg-[#9B1C1C] text-white py-2 rounded-xl hover:bg-[#7E1717] transition"
                >
                  Edit
                </Link>
                <Link
                  href={`/${c.slug}`}
                  target="_blank"
                  className="flex-1 text-center border py-2 rounded-xl hover:bg-gray-50 transition"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
