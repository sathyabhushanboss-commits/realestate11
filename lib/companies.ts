import path from 'path'
import { db, iso } from './db'

// Uploaded media stays on disk; page content lives in Postgres
export const STORAGE_DIR = path.join(process.cwd(), 'storage')
export const UPLOADS_DIR = path.join(STORAGE_DIR, 'uploads')

export const COMPANY_SLUGS = ['developers', 'constructions', 'real-estate'] as const
export type CompanySlug = (typeof COMPANY_SLUGS)[number]

export interface PriceItem {
  id: string
  type: string // e.g. "30x40 Plot", "2 BHK", "Duplex Villa"
  area: string // e.g. "1200 sq ft"
  price: string // e.g. "₹45 Lakhs" or "₹2,100 / sq ft"
  status: string // e.g. "Available", "Sold Out", "Few Left"
}

export interface Company {
  slug: CompanySlug
  name: string
  tagline: string
  description: string
  highlights: string[]
  images: string[]
  videos: string[]
  priceList: PriceItem[]
  priceNote: string
  updatedAt: string
}

const DEFAULTS: Record<CompanySlug, Company> = {
  developers: {
    slug: 'developers',
    name: 'Sri Megha Lakshmi Developers',
    tagline: 'Premium Land Development & Plotting Company',
    description:
      'Sri Megha Lakshmi Developers plans and develops DTCP & BMRDA approved residential layouts with clear titles, wide roads, underground drainage and complete civic infrastructure. Every plot is backed by verified documentation so families and investors can build with confidence.',
    highlights: [
      'DTCP & BMRDA approved layouts',
      'Clear title & e-Khata assistance',
      'Wide tar roads, UGD & street lights',
      'Investment consultation',
    ],
    images: [],
    videos: [],
    priceList: [],
    priceNote: 'Prices are indicative and subject to change. Registration and other charges extra.',
    updatedAt: new Date(0).toISOString(),
  },
  constructions: {
    slug: 'constructions',
    name: 'Sri Megha Lakshmi Constructions',
    tagline: 'Residential, Commercial & Interior Construction Experts',
    description:
      'Sri Megha Lakshmi Constructions delivers turnkey construction for independent houses, villas, apartments and commercial buildings. From structural design and approvals to finishing and handover, our engineers manage every stage with transparent pricing and branded materials.',
    highlights: [
      'Turnkey construction packages',
      'Structural design & plan approvals',
      'Branded materials, quality checks at every stage',
      'Interior design solutions',
    ],
    images: [],
    videos: [],
    priceList: [],
    priceNote: 'Construction rates are per sq ft of built-up area and vary with specifications.',
    updatedAt: new Date(0).toISOString(),
  },
  'real-estate': {
    slug: 'real-estate',
    name: 'Sri Megha Lakshmi Real Estate',
    tagline: 'Property Sales, Rentals & Legal Documentation Services',
    description:
      'Sri Megha Lakshmi Real Estate helps clients buy, sell and rent residential and commercial properties across Bengaluru. We handle site visits, price negotiation, legal verification, e-Khata and registration so every transaction is smooth and secure.',
    highlights: [
      'Verified residential & commercial listings',
      'Legal verification & e-Khata services',
      'Rental management',
      'End-to-end registration support',
    ],
    images: [],
    videos: [],
    priceList: [],
    priceNote: 'Listed prices are as quoted by owners and are negotiable.',
    updatedAt: new Date(0).toISOString(),
  },
}

export function isCompanySlug(value: string): value is CompanySlug {
  return (COMPANY_SLUGS as readonly string[]).includes(value)
}

async function readAll(): Promise<Record<CompanySlug, Company>> {
  const result = structuredClone(DEFAULTS)
  let rows: Record<string, any>[] // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    const sql = await db()
    rows = await sql`SELECT * FROM companies WHERE slug = ANY(${[...COMPANY_SLUGS]})`
  } catch (error) {
    // Public company pages still render with their default content if the database is down
    console.error('Companies: database unavailable', error)
    return result
  }
  for (const row of rows) {
    const slug = row.slug as CompanySlug
    const priceList = (row.price_list ?? []) as Partial<PriceItem>[]
    result[slug] = {
      ...DEFAULTS[slug],
      name: row.name,
      tagline: row.tagline,
      description: row.description,
      highlights: row.highlights,
      images: row.images,
      videos: row.videos,
      priceList: priceList.map((item) => ({
        id: item.id ?? '',
        type: item.type ?? '',
        area: item.area ?? '',
        price: item.price ?? '',
        status: item.status ?? '',
      })),
      priceNote: row.price_note,
      slug,
      updatedAt: iso(row.updated_at),
    }
  }
  return result
}

export async function getCompanies(): Promise<Company[]> {
  const all = await readAll()
  return COMPANY_SLUGS.map((slug) => all[slug])
}

export async function getCompany(slug: CompanySlug): Promise<Company> {
  const all = await readAll()
  return all[slug]
}

export async function saveCompany(slug: CompanySlug, data: Omit<Company, 'slug' | 'updatedAt'>) {
  const sql = await db()
  const priceList = JSON.stringify(data.priceList)
  await sql`
    INSERT INTO companies (slug, name, tagline, description, highlights, images, videos, price_list, price_note, updated_at)
    VALUES (${slug}, ${data.name}, ${data.tagline}, ${data.description}, ${data.highlights}, ${data.images},
      ${data.videos}, ${priceList}::jsonb, ${data.priceNote}, now())
    ON CONFLICT (slug) DO UPDATE SET
      name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
      highlights = EXCLUDED.highlights, images = EXCLUDED.images, videos = EXCLUDED.videos,
      price_list = EXCLUDED.price_list, price_note = EXCLUDED.price_note, updated_at = now()`
  return getCompany(slug)
}
