// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/account/', '/login', '/register', '/forgot-password'],
    },
    sitemap: 'https://www.srimeghalakshmi.in/sitemap.xml',
    host: 'https://www.srimeghalakshmi.in',
  }
}