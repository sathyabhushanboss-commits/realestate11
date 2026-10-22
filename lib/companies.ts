import path from 'path'
import { connectDB } from './db'
import { Company as CompanyModel } from './models'

// Uploaded media stays on disk; page content lives in MongoDB
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
    tagline: 'Approved layouts and land development across Bengaluru',
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
    tagline: 'Quality homes and commercial buildings, built to last',
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
    tagline: 'Buy, sell and rent with a partner you can trust',
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
  await connectDB()
  const docs = await CompanyModel.find({ slug: { $in: COMPANY_SLUGS } }).lean()
  const result = structuredClone(DEFAULTS)
  for (const doc of docs) {
    const slug = doc.slug as CompanySlug
    result[slug] = {
      ...DEFAULTS[slug],
      name: doc.name,
      tagline: doc.tagline,
      description: doc.description,
      highlights: doc.highlights,
      images: doc.images,
      videos: doc.videos,
      priceList: doc.priceList.map((row) => ({
        id: row.id ?? '',
        type: row.type ?? '',
        area: row.area ?? '',
        price: row.price ?? '',
        status: row.status ?? '',
      })),
      priceNote: doc.priceNote,
      slug,
      updatedAt: (doc.updatedAt ?? new Date(0)).toISOString(),
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
  await connectDB()
  await CompanyModel.findOneAndUpdate({ slug }, { ...data, slug }, { upsert: true, runValidators: true })
  return getCompany(slug)
}
