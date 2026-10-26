import type { Metadata } from 'next'

export const SITE_URL = 'https://www.srimeghalakshmi.in'
export const SITE_NAME = 'Sri Megha Lakshmi Group'
export const DEFAULT_OG_IMAGE = '/services/real-estate-apartments-bengaluru-skyline.webp'

// Keywords every public page shares; each page adds its own on top
const BRAND_KEYWORDS = ['Sri Megha Lakshmi Group', 'real estate Bangalore', 'Bengaluru property']

interface PageSeo {
  title: string
  description: string
  keywords: string[]
  path: string
  image?: string
  imageAlt?: string
  // Use the title as-is instead of appending the site name (for long titles)
  absoluteTitle?: boolean
  type?: 'website' | 'article'
}

export function pageMetadata({
  title,
  description,
  keywords,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = title,
  absoluteTitle,
  type = 'website',
}: PageSeo): Metadata {
  const images = [{ url: image, alt: imageAlt }]
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...keywords, ...BRAND_KEYWORDS],
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      images,
      locale: 'en_IN',
      type,
    },
    twitter: { card: 'summary_large_image', title, description, images },
  }
}
