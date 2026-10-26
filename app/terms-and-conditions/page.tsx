import LegalPage, { type LegalSection } from '@/components/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Terms & Conditions',
  description:
    'Terms and conditions for using the Sri Megha Lakshmi Group website, property listings, site-visit bookings and user accounts.',
  keywords: ['terms and conditions', 'website terms', 'property listing terms'],
  path: '/terms-and-conditions',
})

const SECTIONS: LegalSection[] = [
  {
    heading: 'Acceptance of terms',
    paragraphs: [
      'By using this website, you agree to these terms. If you do not agree, please do not use the website. These terms apply together with our Privacy Policy and Disclaimer.',
    ],
  },
  {
    heading: 'Our services',
    paragraphs: [
      'This website provides information about plotted developments, construction services, and properties for sale or rent offered or brokered by Sri Megha Lakshmi Group. Any property transaction is governed only by the written agreement signed between the parties, not by the content of this website.',
    ],
  },
  {
    heading: 'User accounts',
    list: [
      'You must give accurate information and verify your email address when registering.',
      'Keep your password and one-time codes confidential. You are responsible for activity on your account.',
      'We may suspend or close accounts that are misused, used fraudulently or used to break these terms.',
    ],
  },
  {
    heading: 'Enquiries and site visits',
    list: [
      'Submitting an enquiry or booking a site visit does not reserve or allot any property.',
      'Site-visit times are subject to confirmation by our team.',
      'Availability and prices can change without notice until a written booking is confirmed.',
    ],
  },
  {
    heading: 'Acceptable use',
    paragraphs: ['You agree not to:'],
    list: [
      'Submit false, misleading or another person’s information.',
      'Copy, scrape or republish listings, images or content without written permission.',
      'Try to access the admin area, other users’ accounts or our systems without authorisation.',
      'Upload or send malicious code, spam or unlawful content.',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      'The website design, text, logos, photographs, renders and videos belong to Sri Megha Lakshmi Group or are used with permission. Some images are illustrative or computer-generated.',
    ],
  },
  {
    heading: 'Limitation of liability',
    paragraphs: [
      'To the extent allowed by law, Sri Megha Lakshmi Group is not liable for any indirect or consequential loss arising from use of this website or reliance on its content. Please verify all details independently before making a decision.',
    ],
  },
  {
    heading: 'Governing law',
    paragraphs: ['These terms are governed by the laws of India. Courts in Bengaluru, Karnataka have exclusive jurisdiction over any dispute.'],
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="27 October 2026"
      path="/terms-and-conditions"
      intro="These terms govern your use of www.srimeghalakshmi.in and the services offered through it by Sri Megha Lakshmi Group and its group companies."
      sections={SECTIONS}
    />
  )
}
