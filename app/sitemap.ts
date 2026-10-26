// app/sitemap.ts
import { MetadataRoute } from 'next'
import { blogs } from './blog/data/blogs'
import { connectDB } from '@/lib/db'
import { Property } from '@/lib/models'
import { SITE_URL } from '@/lib/seo'

type Entry = MetadataRoute.Sitemap[number]

const PAGES: [path: string, changeFrequency: Entry['changeFrequency'], priority: number][] = [
  ['', 'daily', 1.0],
  ['/developers', 'weekly', 0.9],
  ['/constructions', 'weekly', 0.9],
  ['/real-estate', 'weekly', 0.9],
  ['/properties', 'daily', 0.9],
  ['/about', 'monthly', 0.7],
  ['/blog', 'weekly', 0.7],
  ['/appointment', 'monthly', 0.6],
  ['/contact', 'monthly', 0.8],
  ['/privacy-policy', 'yearly', 0.3],
  ['/terms-and-conditions', 'yearly', 0.3],
  ['/disclaimer', 'yearly', 0.3],
  ['/refund-policy', 'yearly', 0.3],
]

async function propertyEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    await connectDB()
    const docs = await Property.find({ status: { $ne: 'draft' } }, { updatedAt: 1 }).lean()
    return docs.map((doc) => ({
      url: `${SITE_URL}/properties/${doc._id}`,
      lastModified: doc.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch {
    // Keep serving the static pages if the database is unreachable
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  return [
    ...PAGES.map(([path, changeFrequency, priority]) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...blogs.map((blog) => ({
      url: `${SITE_URL}/blog/${blog.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...(await propertyEntries()),
  ]
}
