import Hero from '@/components/Hero'
import TrustedSection from '@/components/TrustedSection'
import CompaniesSection from '@/components/CompaniesSection'
import FeaturedProperties from '@/components/FeaturedProperties'
import GallerySection from '@/components/GallerySection'
import VideoShowcase from '@/components/VideoShowcase'
import Amenities from '@/components/Amenities'
import Testimonials from '@/components/Testimonials'
import FaqSection from '@/components/FaqSection'
import CtaBanner from '@/components/CtaBanner'

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-ivory">
      <Hero />
      <TrustedSection />
      <CompaniesSection />
      <FeaturedProperties />
      <VideoShowcase />
      <GallerySection />
      <Amenities />
      <Testimonials />
      <FaqSection />
      <CtaBanner />
    </main>
  )
}
