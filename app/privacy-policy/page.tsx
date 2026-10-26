import LegalPage, { type LegalSection } from '@/components/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Sri Megha Lakshmi Group collects, uses, stores and protects your personal data when you use our website, enquire about properties or create an account.',
  keywords: ['privacy policy', 'data protection', 'DPDP Act 2023', 'personal data'],
  path: '/privacy-policy',
})

const SECTIONS: LegalSection[] = [
  {
    heading: 'Information we collect',
    paragraphs: ['We collect only the information needed to help you with your property requirements:'],
    list: [
      'Contact details you give us: name, mobile number and email address.',
      'Enquiry details: the property or service you are interested in, preferred site-visit dates and your messages.',
      'Account details: your login email, a securely hashed password (we never store your actual password) and your saved properties.',
      'Verification codes: one-time codes (OTP) sent to your email are stored only in hashed form and deleted automatically after 10 minutes.',
      'Technical data: browser type, device and pages visited, collected through standard server logs.',
    ],
  },
  {
    heading: 'How we use your information',
    list: [
      'To respond to your enquiries, schedule site visits and share property details and price lists.',
      'To create and secure your account, including email verification and sign-in codes.',
      'To send updates about properties or services you asked about. You can opt out at any time.',
      'To meet legal, tax and regulatory obligations related to property transactions.',
      'To improve our website and services.',
    ],
  },
  {
    heading: 'Cookies',
    paragraphs: [
      'We use one essential cookie (sml_session) to keep you signed in. It is secure, cannot be read by scripts and expires after 7 days. We do not use advertising cookies. Third-party services embedded on our pages, such as Google Maps, may set their own cookies under their own policies.',
    ],
  },
  {
    heading: 'Sharing of information',
    paragraphs: ['We do not sell or rent your personal data. We share it only when necessary:'],
    list: [
      'With our group companies (Sri Megha Lakshmi Developers, Constructions and Real Estate) to serve your request.',
      'With legal advisors, banks or registration authorities when you proceed with a transaction.',
      'With service providers who host our website, database and email, under confidentiality obligations.',
      'When required by law, court order or a government authority.',
    ],
  },
  {
    heading: 'Data security and retention',
    paragraphs: [
      'Passwords are hashed with bcrypt, sessions use signed tokens in secure cookies, and access to the admin panel is restricted. We keep your data only as long as needed for the purposes above or as required by law, after which it is deleted or anonymised.',
    ],
  },
  {
    heading: 'Your rights',
    paragraphs: ['Under the Digital Personal Data Protection Act, 2023, you may:'],
    list: [
      'Access a summary of the personal data we hold about you.',
      'Correct or update inaccurate information (you can edit your profile from your account).',
      'Ask us to delete your data or close your account.',
      'Withdraw consent for marketing communication at any time.',
      'Raise a grievance with us, and then with the Data Protection Board of India if it is not resolved.',
    ],
  },
  {
    heading: 'Children',
    paragraphs: ['Our services are meant for adults. We do not knowingly collect data from anyone under 18.'],
  },
  {
    heading: 'Changes to this policy',
    paragraphs: [
      'We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="27 October 2026"
      path="/privacy-policy"
      intro="Sri Megha Lakshmi Group respects your privacy. This policy explains what personal data we collect through www.srimeghalakshmi.in, why we collect it, and how we protect it."
      sections={SECTIONS}
    />
  )
}
