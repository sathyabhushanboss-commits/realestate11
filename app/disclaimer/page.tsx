import LegalPage, { type LegalSection } from '@/components/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Disclaimer',
  description:
    'Disclaimer for property information, prices, images and approvals shown on the Sri Megha Lakshmi Group website.',
  keywords: ['real estate disclaimer', 'property information disclaimer'],
  path: '/disclaimer',
})

const SECTIONS: LegalSection[] = [
  {
    heading: 'Information is indicative',
    paragraphs: [
      'Property details, sizes, prices, specifications, amenities and timelines on this website are for general information only. They are indicative, may change without notice, and do not form an offer, contract or commitment.',
    ],
  },
  {
    heading: 'Images and renders',
    paragraphs: [
      'Photographs, artist impressions, 3D renders and AI-generated illustrations are used to represent the type of property or service. They may not show the actual property, finishes, furniture or surroundings.',
    ],
  },
  {
    heading: 'Approvals and legal status',
    paragraphs: [
      'Approval details (such as DTCP, BMRDA, BBMP, RERA or Khata) are shared in good faith. Buyers should check all title documents, approvals and encumbrances with their own legal advisor before booking or paying.',
    ],
  },
  {
    heading: 'No professional advice',
    paragraphs: [
      'Market trends, investment returns and price appreciation mentioned in blogs or guides are opinions based on available information. They are not financial, legal or tax advice. Past performance does not guarantee future results.',
    ],
  },
  {
    heading: 'Third-party listings and links',
    paragraphs: [
      'Some properties are listed on behalf of their owners, and some pages link to external websites. We are not responsible for the accuracy of owner-provided information or for content on external sites.',
    ],
  },
]

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      updated="27 October 2026"
      path="/disclaimer"
      intro="Please read this disclaimer before relying on any information shown on www.srimeghalakshmi.in."
      sections={SECTIONS}
    />
  )
}
