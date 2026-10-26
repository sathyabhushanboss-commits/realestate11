import LegalPage, { type LegalSection } from '@/components/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Refund & Cancellation Policy',
  description:
    'Refund and cancellation policy for plot bookings, construction contracts and real estate services with Sri Megha Lakshmi Group.',
  keywords: ['refund policy', 'booking cancellation', 'plot booking refund'],
  path: '/refund-policy',
})

const SECTIONS: LegalSection[] = [
  {
    heading: 'Website services are free',
    paragraphs: [
      'Creating an account, sending enquiries and booking site visits on this website are free. No online payments are collected through this website.',
    ],
  },
  {
    heading: 'Plot and property bookings',
    paragraphs: [
      'Booking amounts, payment schedules and cancellation terms for plots and properties are set out in the booking form or sale agreement you sign. If that document is silent:',
    ],
    list: [
      'A cancellation request must be made in writing to our office or by email.',
      'Refunds of booking amounts, minus any deductions stated in your agreement, are processed within 30 working days of the written request.',
      'Stamp duty, registration charges and government fees already paid are not refundable by us.',
    ],
  },
  {
    heading: 'Construction contracts',
    paragraphs: [
      'For construction and interior projects, payments are linked to completed stages. If a contract is cancelled, you pay for work completed and materials bought up to the cancellation date, as set out in your construction agreement.',
    ],
  },
  {
    heading: 'Brokerage and service fees',
    paragraphs: [
      'Brokerage, legal verification and e-Khata service fees become payable once the agreed service is delivered. They are generally not refundable after the service is completed, unless agreed otherwise in writing.',
    ],
  },
  {
    heading: 'How refunds are paid',
    paragraphs: ['Approved refunds are paid by bank transfer to the account the original payment came from. We do not refund in cash.'],
  },
]

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      updated="27 October 2026"
      path="/refund-policy"
      intro="This policy explains how cancellations and refunds work for bookings and services with Sri Megha Lakshmi Group. Where your signed agreement says something different, the agreement applies."
      sections={SECTIONS}
    />
  )
}
