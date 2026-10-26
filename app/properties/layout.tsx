import { pageMetadata } from '@/lib/seo'

// The page itself is a client component, so its metadata lives here
export const metadata = pageMetadata({
  title: 'Properties for Sale & Rent in Bangalore',
  description:
    'Browse verified plots, apartments, villas and commercial properties for sale and rent in Bengaluru, including Koramangala, Kasavanahalli and Doddakanahalli. Book a site visit today.',
  keywords: [
    'properties for sale in Bangalore',
    'plots for sale Bangalore',
    'apartments for sale Bengaluru',
    'commercial property Koramangala',
    'villas for sale Bangalore',
    'property for rent Bangalore',
  ],
  path: '/properties',
  image: '/services/luxury-villa-for-sale-bengaluru.webp',
})

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
