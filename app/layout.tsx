// app/layout.tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Manrope } from 'next/font/google'
import './globals.css'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'
import CustomCursor from '@/components/CustomCursor'
import ParticleCursor from '@/components/ParticleCursor'
import HideOnAdmin from '@/components/HideOnAdmin'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
// Used by the admin/user panels and login screens
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.srimeghalakshmi.in'),
  
  title: {
    default: 'Sri Megha Lakshmi Group - Best Real Estate & Construction Company in Bangalore',
    template: '%s | Sri Megha Lakshmi Group'
  },
  
  description: 'Sri Megha Lakshmi Group offers premium land development, construction, property sales, rentals, interiors, e-Khata, and legal services in Bangalore. 15+ years experience, 500+ happy clients.',
  
  keywords: ['real estate Bangalore', 'construction company Bangalore', 'land development', 'property sales', 'e-Khata services', 'interior design Bangalore'],
  
  authors: [{ name: 'Sri Megha Lakshmi Group' }],
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  
  alternates: {
    canonical: 'https://www.srimeghalakshmi.in',
  },
  
  openGraph: {
    title: 'Sri Megha Lakshmi Group - Trusted Real Estate & Construction Company',
    description: 'Delivering excellence in land development, construction, property sales, and real estate services across Bengaluru.',
    url: 'https://www.srimeghalakshmi.in',
    siteName: 'Sri Megha Lakshmi Group',
    images: [
      {
        url: 'https://www.srimeghalakshmi.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sri Megha Lakshmi Group',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Megha Lakshmi Group - Best Real Estate in Bangalore',
    description: 'Premium real estate and construction services in Bangalore.',
    images: ['https://www.srimeghalakshmi.in/twitter-image.jpg'],
  },
  
  verification: {
    google: 'your-google-verification-code', // Add your code here
  },
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${cormorant.variable}`}>
      <body className="bg-[#F8F6F2] overflow-x-hidden">
        <HideOnAdmin>
          <Navbar />
        </HideOnAdmin>
        {children}
        <HideOnAdmin>
          <Footer />
          <FloatingContact />
        </HideOnAdmin>
        <CustomCursor />
        <ParticleCursor />
      </body>
    </html>
  )
}