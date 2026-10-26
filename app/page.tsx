import Hero from '@/components/Hero'
import TrustedSection from '@/components/TrustedSection'
import GroupServicesCta from '@/components/GroupServicesCta'
import FeaturedProperties from '@/components/FeaturedProperties'
import Amenities from '@/components/Amenities'
import VideoShowcase from '@/components/VideoShowcase'
import Testimonials from '@/components/Testimonials'
import FaqSection from '@/components/FaqSection'
import CtaBanner from '@/components/CtaBanner'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Sri Megha Lakshmi Group | Real Estate, Developers & Construction in Bangalore',
  description:
    'Sri Megha Lakshmi Group offers DTCP & BMRDA approved plots, turnkey house construction, interiors and verified properties for sale and rent in Bengaluru, with e-Khata and legal support.',
  keywords: [
    'real estate company in Bangalore',
    'land developers Bangalore',
    'construction company Bangalore',
    'plots for sale Bangalore',
    'property dealers Koramangala',
    'e-Khata services Bangalore',
    'interior design Bangalore',
    'buy property in Bengaluru',
  ],
  path: '/',
  absoluteTitle: true,
})

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#F8F6F2]">
      <Hero />
      <TrustedSection />
      <GroupServicesCta />
      <FeaturedProperties />
      <Amenities />
      <VideoShowcase />
      <Testimonials />
      <FaqSection />
      <CtaBanner />
    </main>
  )
}
