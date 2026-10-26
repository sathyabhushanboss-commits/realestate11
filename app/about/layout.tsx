import { pageMetadata } from '@/lib/seo'

// The page itself is a client component, so its metadata lives here
export const metadata = pageMetadata({
  title: 'About Us | Trusted Real Estate Group in Bangalore',
  description:
    'Learn about Sri Megha Lakshmi Group: 15+ years of land development, construction and real estate services in Bengaluru, with 500+ happy clients and complete legal transparency.',
  keywords: [
    'about Sri Megha Lakshmi',
    'real estate company Bangalore',
    'trusted builders Bangalore',
    'property developers Bengaluru',
    'construction company Koramangala',
  ],
  path: '/about',
  image: '/services/developers-layout-aerial-bengaluru.webp',
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
