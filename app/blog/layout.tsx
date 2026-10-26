import { pageMetadata } from '@/lib/seo'

// The page itself is a client component, so its metadata lives here
export const metadata = pageMetadata({
  title: 'Real Estate Blog | Bangalore Property Guides & Market Trends',
  description:
    'Expert guides on buying property in Bangalore: Koramangala, HSR Layout and Sarjapur Road price trends, investment tips, legal checklists and home buying advice.',
  keywords: [
    'Bangalore real estate blog',
    'property buying guide Bangalore',
    'Koramangala property prices',
    'HSR Layout investment',
    'Sarjapur Road real estate',
    'real estate market trends Bangalore',
  ],
  path: '/blog',
})

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
