import { z } from 'zod'
import { isValidObjectId } from 'mongoose'
import { connectDB } from './db'
import { Property, type PropertyDoc } from './models'

export const PROPERTY_STATUSES = ['published', 'draft', 'sold'] as const

const text = (max: number) => z.string().trim().max(max).default('')

export const propertyInput = z.object({
  title: z.string().trim().min(3, 'Title is required').max(160),
  location: z.string().trim().min(2, 'Location is required').max(200),
  price: z.string().trim().min(1, 'Price is required').max(80),
  propertyType: text(60),
  measurement: text(120),
  bedrooms: text(80),
  bathrooms: text(20),
  balconies: text(20),
  securityDeposit: text(80),
  year: text(10),
  description: text(10000),
  features: z.array(z.string().trim().min(1).max(120)).max(30).default([]),
  images: z.array(z.string().trim().min(1).max(500)).max(40).default([]),
  videos: z.array(z.string().trim().min(1).max(500)).max(10).default([]),
  status: z.enum(PROPERTY_STATUSES).default('published'),
  featured: z.boolean().default(false),
})
export type PropertyInput = z.infer<typeof propertyInput>

export const EMPTY_PROPERTY: PropertyInput = {
  title: '',
  location: '',
  price: '',
  propertyType: '',
  measurement: '',
  bedrooms: '',
  bathrooms: '',
  balconies: '',
  securityDeposit: '',
  year: '',
  description: '',
  features: [],
  images: [],
  videos: [],
  status: 'published',
  featured: false,
}

export interface PropertyJSON extends PropertyInput {
  _id: string
  createdAt: string
  updatedAt: string
}

// Lean Mongo document -> plain JSON safe to send to client components
export function toPropertyJSON(d: PropertyDoc & { _id: unknown }): PropertyJSON {
  return {
    _id: String(d._id),
    title: d.title,
    location: d.location,
    price: d.price,
    propertyType: d.propertyType ?? '',
    measurement: d.measurement ?? '',
    bedrooms: d.bedrooms ?? '',
    bathrooms: d.bathrooms ?? '',
    balconies: d.balconies ?? '',
    securityDeposit: d.securityDeposit ?? '',
    year: d.year ?? '',
    description: d.description ?? '',
    features: d.features ?? [],
    images: d.images ?? [],
    videos: d.videos ?? [],
    status: d.status ?? 'published',
    featured: !!d.featured,
    createdAt: new Date(d.createdAt ?? 0).toISOString(),
    updatedAt: new Date(d.updatedAt ?? 0).toISOString(),
  }
}

export function isId(value: string) {
  return isValidObjectId(value)
}

// The four listings that used to be hard-coded, inserted once into an empty collection
const SEED: Partial<PropertyInput>[] = [
  {
    title: '1500 sq ft Residential Plot',
    location: 'Doddakanahalli, Bengaluru',
    price: 'On Request',
    propertyType: 'Residential Plot',
    images: ['/properties/set1.jpeg'],
    measurement: '1500 sq ft',
    bedrooms: 'Residential Plot',
    description: 'Prime residential plot in Doddakanahalli, Bengaluru. Close to IT hubs, schools, hospitals.',
    year: '2025',
    features: ['Corner Plot', 'East Facing', 'All Approvals Done', 'Ready to Build'],
  },
  {
    title: '4800 sq ft Land with 16 Units',
    location: 'Kasavanahalli, Bengaluru',
    price: 'On Request',
    propertyType: 'Apartment for Sale',
    images: ['/properties/set2.jpeg'],
    measurement: '4800 sq ft',
    bedrooms: '16 Units of 2BHK',
    description: '4800 sq ft land featuring 16 ready 2BHK units. Excellent rental yield.',
    year: '2025',
    features: ['Fully Rented', 'Regular Income', 'Prime Location', 'High Appreciation'],
  },
  {
    title: 'Koramangala Premium Property',
    location: 'Koramangala, Bengaluru',
    price: 'On Request',
    propertyType: 'Commercial Property',
    images: ['/properties/set3.1.jpeg', '/properties/set3.jpeg'],
    measurement: '600 sq ft land | 3400 sq ft built-up',
    bedrooms: '4 BHK + Commercial Space',
    description: 'Premium property in Koramangala with 600 sq ft land and 3400 sq ft built-up area.',
    year: '2018',
    features: ['Prime Koramangala', 'High Rental Income', 'Mixed Use Property', 'Modern Construction'],
  },
  {
    title: 'Legacy Commercial Building',
    location: 'Koramangala, Bengaluru',
    price: 'On Request',
    propertyType: 'Commercial Property',
    images: ['/properties/set4.jpeg'],
    measurement: 'Commercial Building',
    bedrooms: 'Commercial Space',
    description: 'Well-maintained commercial building in Koramangala.',
    year: '2005',
    features: ['Prime Location', 'High Footfall', 'Redevelopment Potential', 'Stable Income'],
  },
]

let seeded = false
export async function ensurePropertiesSeeded() {
  if (seeded) return
  await connectDB()
  if ((await Property.estimatedDocumentCount()) === 0) {
    await Property.insertMany(SEED.map((p) => propertyInput.parse(p)))
  }
  seeded = true
}
