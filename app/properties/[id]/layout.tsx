import type { Metadata } from 'next'
import { connectDB } from '@/lib/db'
import { Property } from '@/lib/models'
import { isId } from '@/lib/properties'
import { pageMetadata } from '@/lib/seo'

// The page itself is a client component, so its metadata is generated here
export async function generateMetadata({ params }: LayoutProps<'/properties/[id]'>): Promise<Metadata> {
  const { id } = await params
  if (!isId(id)) return { title: 'Property not found', robots: { index: false } }

  await connectDB()
  const property = await Property.findById(id).lean()
  if (!property || property.status === 'draft') return { title: 'Property not found', robots: { index: false } }

  const facts = [...new Set([property.propertyType, property.measurement, property.bedrooms].filter(Boolean))].join(' · ')
  const summary = property.description.replace(/\s+/g, ' ').trim()
  const description = `${property.title} in ${property.location}${facts ? ` (${facts})` : ''}. ${summary}`.slice(0, 160)
  const area = property.location.split(',')[0].trim()

  return pageMetadata({
    title: `${property.title} in ${property.location}`,
    description,
    keywords: [
      property.title,
      `${property.propertyType || 'property'} in ${area}`,
      `property for sale in ${area}`,
      `${area} real estate`,
      ...property.features.slice(0, 4),
    ],
    path: `/properties/${id}`,
    image: property.images[0],
    imageAlt: `${property.title}, ${property.location}`,
  })
}

export default function PropertyLayout({ children }: LayoutProps<'/properties/[id]'>) {
  return children
}
