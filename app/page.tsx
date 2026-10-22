import Hero from '@/components/Hero'
import TrustedSection from '@/components/TrustedSection'
import FeaturedProperties from '@/components/FeaturedProperties'
import Amenities from '@/components/Amenities'
import VideoShowcase from '@/components/VideoShowcase'
import Testimonials from '@/components/Testimonials'
import FaqSection from '@/components/FaqSection'
import CtaBanner from '@/components/CtaBanner'

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#F8F6F2]">
      <Hero />
      <TrustedSection />
      <FeaturedProperties />
      <Amenities />
      <VideoShowcase />
      <Testimonials />
      <FaqSection />
      <CtaBanner />
    </main>
  )
}
