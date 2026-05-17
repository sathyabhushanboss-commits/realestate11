import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'
import CustomCursor from '@/components/CustomCursor'
import ParticleCursor from '@/components/ParticleCursor'

export const metadata = {
  title: 'Sri Megha Lakshmi',
  description: 'Luxury real estate & construction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        <FloatingContact />
        <CustomCursor />
        <ParticleCursor />
      </body>
    </html>
  )
}