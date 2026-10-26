import type { Metadata } from 'next'
import type { CompanySlug } from './companies'
import { pageMetadata } from './seo'

// Static SEO content for the company pages. The admin-editable fields
// (name, tagline, description, gallery, prices) still come from MongoDB.

export interface ServiceItem {
  title: string
  description: string
  points: string[]
  image: string
  imageAlt: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface CompanyContent {
  seoTitle: string
  seoDescription: string
  keywords: string[]
  serviceType: string
  heroImage: string
  heroAlt: string
  servicesIntro: string
  services: ServiceItem[]
  process: ProcessStep[]
  areas: string[]
  faqs: FaqItem[]
}

const AREAS = [
  'Koramangala',
  'Whitefield',
  'HSR Layout',
  'Electronic City',
  'Sarjapur Road',
  'Hosur Road',
  'Anekal',
  'Devanahalli',
  'Hoskote',
  'Kanakapura Road',
]

// URL fragment for a service, e.g. /developers#site-conversion
export function serviceAnchor(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// First sentence of a service description, for short previews
export function serviceSummary(description: string) {
  return description.split(/(?<=\.)\s/)[0]
}

export const COMPANY_CONTENT: Record<CompanySlug, CompanyContent> = {
  developers: {
    seoTitle: 'Land Developers in Bangalore | DTCP & BMRDA Approved Plots',
    seoDescription:
      'Sri Megha Lakshmi Developers: land acquisition, site conversion, DTCP & BMRDA approved residential layouts, commercial plots and plot sales in Bangalore with clear titles.',
    keywords: [
      'land developers in Bangalore',
      'land acquisition Bangalore',
      'site conversion Bangalore',
      'DC conversion services',
      'commercial plots for sale Bangalore',
      'plot investment consultation',
      'DTCP approved plots Bangalore',
      'BMRDA approved layouts',
      'residential plots for sale Bangalore',
      'gated community plots',
      'layout development company',
      'e-Khata plots Bangalore',
      'plot investment Bangalore',
    ],
    serviceType: 'Land development and residential plotted layouts',
    heroImage: '/services/developers-layout-aerial-bengaluru.webp',
    heroAlt: 'Aerial view of an approved residential plotted layout with wide roads and entrance arch near Bengaluru',
    servicesIntro:
      'Sri Megha Lakshmi Developers is one of Bengaluru\'s trusted real estate development companies specializing in land acquisition, site conversion, plotting, and residential and commercial layout development.',
    services: [
      {
        title: 'Land Acquisition Services',
        description:
          'We identify and acquire strategically located lands suitable for residential layouts, gated communities, villas, commercial developments, and future investment opportunities. Every parcel is studied for growth corridors, road access, water availability and title history before we commit.',
        points: [
          'Land scouting in high-growth Bengaluru corridors',
          'Title chain, survey and encumbrance checks',
          'Joint development and outright purchase options',
          'Fair, transparent dealings with landowners',
        ],
        image: '/services/land-acquisition-bengaluru.webp',
        imageAlt: 'Open agricultural land parcel with survey flags on the outskirts of Bengaluru',
      },
      {
        title: 'Property Purchasing Assistance',
        description:
          'Professional support for purchasing agricultural land, residential sites, commercial properties, and investment properties with complete legal verification. We check every document so you buy with confidence.',
        points: [
          'RTC, mutation and survey sketch verification',
          'Encumbrance certificate and title deed review',
          'Price negotiation with sellers',
          'Sale agreement and registration support',
        ],
        image: '/services/property-purchase-land-verification.webp',
        imageAlt: 'Land survey map and property records being verified with a magnifying glass',
      },
      {
        title: 'Site Conversion',
        description:
          'Complete agricultural-to-residential and commercial site conversion services including government approvals and legal processing. We manage the paperwork with the revenue and planning departments from application to final order.',
        points: [
          'Agricultural to residential (DC) conversion',
          'Agricultural to commercial and industrial conversion',
          'Survey, 11E sketch and podi work',
          'Follow-up with revenue and planning authorities',
        ],
        image: '/services/dtcp-bmrda-layout-approval-documents.webp',
        imageAlt: 'Land conversion plan drawings, blueprints and official stamp on a desk',
      },
      {
        title: 'Residential Layout Development',
        description:
          'Development of premium residential layouts with roads, drainage systems, underground pipelines, water supply, electricity, parks, and modern infrastructure. Plots are handed over ready for you to start building.',
        points: [
          'Wide black-top roads with footpaths and avenue trees',
          'Underground drainage and stormwater lines',
          'Water supply pipelines and overhead tank',
          'Underground electrical cabling and LED street lights',
        ],
        image: '/services/layout-infrastructure-roads-drainage.webp',
        imageAlt: 'New tar road with street lights, footpaths and avenue trees inside a residential layout',
      },
      {
        title: 'Commercial Plot Development',
        description:
          'Planning and development of commercial plots suitable for offices, showrooms, retail spaces, and investment purposes. Plots are placed on main roads with the frontage and access that businesses need.',
        points: [
          'Main-road frontage with high visibility',
          'Plot sizes suited to offices, showrooms and retail',
          'Commercial conversion and zoning approvals',
          'Strong rental and resale potential',
        ],
        image: '/services/commercial-plot-development.webp',
        imageAlt: 'Developed commercial plots with new showroom and office buildings along a main road in Bengaluru',
      },
      {
        title: 'Plot Selling Services',
        description:
          'Affordable and luxury residential plots for sale with clear titles, legal approvals, and excellent appreciation potential. Choose from 30x40, 30x50, 40x60 and corner plots in gated layouts.',
        points: [
          'Clear-title plots with e-Khata assistance',
          'East, north and corner facing options',
          'Home loan support with leading banks',
          'Guided site visits on weekdays and weekends',
        ],
        image: '/services/residential-plot-for-sale-bengaluru.webp',
        imageAlt: 'Ready-to-build residential corner plot with boundary stones and tar road in a gated layout',
      },
      {
        title: 'DTCP & BMRDA Approved Projects',
        description:
          'Development and marketing of legally approved layouts ensuring safe investments for buyers. Approval copies are shared with every buyer before booking, so you know exactly what you are buying.',
        points: [
          'DTCP, BMRDA and local planning authority approvals',
          'Approved layout plan and release orders',
          'Bank-loan eligible projects',
          'Gated communities with parks and civic amenities',
        ],
        image: '/services/gated-layout-park-clubhouse.webp',
        imageAlt: 'Landscaped park and clubhouse inside an approved gated residential layout',
      },
      {
        title: 'Investment Consultation',
        description:
          'Expert guidance for clients looking to invest in land and plots with high future growth. We share location research, upcoming infrastructure and appreciation trends so you can invest with clarity.',
        points: [
          'Location and growth-corridor analysis',
          'Budget-based plot recommendations',
          'Short-term and long-term investment planning',
          'Resale and exit guidance',
        ],
        image: '/services/land-investment-consultation.webp',
        imageAlt: 'Real estate consultation desk with a layout master plan, scale model and growth chart',
      },
    ],
    process: [
      { title: 'Site Visit', description: 'Tour the layout and shortlist plots with our team.' },
      { title: 'Document Review', description: 'Check approvals, title deeds and the EC with your lawyer.' },
      { title: 'Booking & Loan', description: 'Reserve your plot and get help with a home loan.' },
      { title: 'Registration', description: 'Register the sale deed and receive your e-Khata.' },
    ],
    areas: AREAS,
    faqs: [
      {
        question: 'Are your plots DTCP or BMRDA approved?',
        answer:
          'Yes. Our layouts are developed only after land conversion and plan approval from the relevant authority (DTCP, BMRDA or the local planning authority). Approval copies are shared with every buyer before booking.',
      },
      {
        question: 'What plot sizes are available?',
        answer:
          'Most of our layouts offer 30x40 (1200 sq ft), 30x50 (1500 sq ft) and 40x60 (2400 sq ft) plots, with corner and odd-size plots in select projects. Current availability is shown in the price list on this page.',
      },
      {
        question: 'Will I get e-Khata for my plot?',
        answer:
          'Yes. After registration, our team helps you apply for e-Khata and complete the khata transfer, so the property is recorded in your name with the local body.',
      },
      {
        question: 'Do you help with home loans for plots?',
        answer:
          'Yes. Our approved layouts are eligible for plot and composite (plot + construction) loans from leading banks. We help with the documentation for a faster sanction.',
      },
      {
        question: 'Can you also construct a house on the plot I buy?',
        answer:
          'Yes. Our group company, Sri Megha Lakshmi Constructions, offers turnkey house construction, so you can buy a plot and build your home with one trusted team.',
      },
    ],
  },

  constructions: {
    seoTitle: 'Construction Company in Bangalore | House & Villa Builders',
    seoDescription:
      'Sri Megha Lakshmi Constructions: residential and commercial construction, civil contracts, turnkey projects, interiors, compound walls, renovation and maintenance in Bangalore.',
    keywords: [
      'construction company in Bangalore',
      'civil contractors Bangalore',
      'compound wall construction',
      'renovation and remodeling Bangalore',
      'building maintenance and waterproofing',
      'house construction Bangalore',
      'villa builders Bangalore',
      'turnkey construction contractors',
      'commercial building contractors Bangalore',
      'building plan approval Bangalore',
      'interior designers Bangalore',
      'construction cost per sq ft Bangalore',
    ],
    serviceType: 'Residential and commercial building construction',
    heroImage: '/services/constructions-villa-under-construction.webp',
    heroAlt: 'Modern three-storey villa under construction with scaffolding at dusk in Bengaluru',
    servicesIntro:
      'Sri Megha Lakshmi Constructions delivers high-quality construction services for residential, commercial, and industrial projects.',
    services: [
      {
        title: 'Residential Construction',
        description:
          'Complete construction services for independent houses, villas, duplex homes, apartments, and gated community residences. We build on your plot from foundation to final finish with stage-wise quality checks.',
        points: [
          'Independent houses, villas and duplex homes',
          'Apartments and gated community residences',
          'RCC framed, earthquake-resistant structures',
          'Branded cement, steel and fittings',
        ],
        image: '/services/independent-house-construction-bengaluru.webp',
        imageAlt: 'Completed modern two-storey independent house with glass windows and balcony in Bengaluru',
      },
      {
        title: 'Commercial Construction',
        description:
          'Construction of commercial complexes, office buildings, showrooms, retail spaces, hotels, and business infrastructure. Each project has a dedicated project manager and a clear schedule.',
        points: [
          'Commercial complexes and office buildings',
          'Showrooms, retail spaces and hotels',
          'Glass facades and structural glazing',
          'Fire safety and occupancy certificate compliance',
        ],
        image: '/services/commercial-building-construction.webp',
        imageAlt: 'Multi-storey commercial building under construction with glass facade and tower crane',
      },
      {
        title: 'Civil Contract Works',
        description:
          'Reliable labor and material contract services for all types of construction projects. Choose labour-only or labour-with-material contracts with clear rates and timelines.',
        points: [
          'Labour-only and labour + material contracts',
          'Foundation, RCC, masonry and plastering',
          'Skilled supervision on site',
          'Transparent per sq ft and BOQ-based rates',
        ],
        image: '/services/civil-contract-works-materials.webp',
        imageAlt: 'Construction material yard with steel bars, cement bags, bricks and a concrete mixer',
      },
      {
        title: 'Turnkey Construction Projects',
        description:
          'End-to-end turnkey construction solutions including planning, architecture, approvals, construction, interiors, and handover. One contract, one point of contact, and a home ready to move in.',
        points: [
          'Architecture, 3D elevations and structural design',
          'Building plan approval from BBMP, BDA or local body',
          'Construction, finishing and interiors',
          'Handover with final inspection',
        ],
        image: '/services/structural-design-building-plan-approval.webp',
        imageAlt: 'Architectural scale model of a house with structural drawings and 3D design on a laptop',
      },
      {
        title: 'Interior Design Solutions',
        description:
          'Modern and customized interior works including modular kitchens, wardrobes, false ceilings, TV units, and luxury interiors. Designs are planned around how your family lives.',
        points: [
          'Modular kitchens and wardrobes',
          'False ceilings and lighting design',
          'TV units, pooja units and feature walls',
          'Luxury interiors for homes and offices',
        ],
        image: '/services/interior-design-living-room-bengaluru.webp',
        imageAlt: 'Modern living room interior with marble flooring, false ceiling lighting and wooden TV unit',
      },
      {
        title: 'Compound Wall Construction',
        description:
          'Strong and attractive compound wall construction for layouts, villas, and commercial properties. Walls are built on proper footings to last, with gates and finishes to match your property.',
        points: [
          'Layout boundary and perimeter walls',
          'Villa compound walls with gates',
          'Commercial property boundary walls',
          'Stone cladding, plaster and paint finishes',
        ],
        image: '/services/compound-wall-construction.webp',
        imageAlt: 'New compound wall with stone-clad pillars and metal gate around a modern villa',
      },
      {
        title: 'Renovation & Remodeling',
        description:
          'Modern renovation services for old homes, apartments, commercial buildings, and office spaces. We upgrade layouts, kitchens, bathrooms and finishes while keeping the structure safe.',
        points: [
          'Kitchen and bathroom remodeling',
          'Flooring, electrical and plumbing upgrades',
          'Office and commercial space makeovers',
          'Structural repairs and extensions',
        ],
        image: '/services/renovation-remodeling-kitchen.webp',
        imageAlt: 'Freshly renovated modern kitchen and dining area in an apartment',
      },
      {
        title: 'Building Maintenance Services',
        description:
          'Long-term maintenance services including repairs, waterproofing, painting, and structural maintenance. Regular care protects your building and its value.',
        points: [
          'Terrace and bathroom waterproofing',
          'Interior and exterior painting',
          'Crack repair and structural maintenance',
          'Annual maintenance contracts',
        ],
        image: '/services/building-maintenance-waterproofing.webp',
        imageAlt: 'Terrace with fresh waterproofing coating, paint buckets and rollers',
      },
    ],
    process: [
      { title: 'Consultation', description: 'Share your plot details, requirements and budget.' },
      { title: 'Design & Estimate', description: 'Approve the floor plans, elevation and a detailed BOQ.' },
      { title: 'Construction', description: 'Track progress through stage-wise quality checks.' },
      { title: 'Handover', description: 'Move in after the final inspection, with a structural warranty.' },
    ],
    areas: AREAS,
    faqs: [
      {
        question: 'What is the construction cost per sq ft in Bangalore?',
        answer:
          'Construction cost depends on the specifications you choose (basic, standard or premium), the number of floors and the soil conditions. Contact us with your plot size for a detailed, itemised estimate.',
      },
      {
        question: 'How long does it take to build a house?',
        answer:
          'A typical G+1 or G+2 independent house takes 8 to 12 months from plan approval to handover, depending on the built-up area and the finishes chosen.',
      },
      {
        question: 'Do you handle building plan approval?',
        answer:
          'Yes. We prepare the architectural and structural drawings and obtain building plan sanction from BBMP, BDA or the relevant local authority before construction starts.',
      },
      {
        question: 'Which materials do you use?',
        answer:
          'We use branded cement, TMT steel, electrical wiring, plumbing and sanitary fittings. The exact brands and specifications are listed in your construction agreement.',
      },
      {
        question: 'Do you offer interior design along with construction?',
        answer:
          'Yes. We offer turnkey interiors including modular kitchens, wardrobes, false ceilings and lighting, so your home is ready to move into on handover.',
      },
    ],
  },

  'real-estate': {
    seoTitle: 'Real Estate Agents in Bangalore | Buy, Sell & Rent Property',
    seoDescription:
      'Buy, sell or rent homes and commercial property in Bangalore with Sri Megha Lakshmi Real Estate. Purchase guidance, e-Khata, registration and legal documentation support.',
    keywords: [
      'real estate agents in Bangalore',
      'property registration services Bangalore',
      'legal documentation for property',
      'commercial rental services Bangalore',
      'property purchase guidance',
      'buy property in Bangalore',
      'sell property Bangalore',
      'flats for rent Bangalore',
      'villas for sale Bangalore',
      'commercial property for lease Bangalore',
      'e-Khata services Bangalore',
      'property registration Bangalore',
    ],
    serviceType: 'Real estate brokerage, rentals and property legal services',
    heroImage: '/services/real-estate-apartments-bengaluru-skyline.webp',
    heroAlt: 'Premium residential apartment towers with a landscaped pool deck at dusk in Bengaluru',
    servicesIntro:
      'Sri Megha Lakshmi Real Estate offers complete real estate solutions including property buying, selling, rentals, leasing, legal documentation, registration, and property consultancy services.',
    services: [
      {
        title: 'Residential Property Sales',
        description:
          'Buying and selling of residential plots, apartments, villas, independent houses, and luxury properties. Sellers get accurate valuations, and buyers get verified options that match their budget.',
        points: [
          'Plots, apartments, villas and independent houses',
          'Luxury and premium properties',
          'Market valuation for sellers',
          'Guided site visits',
        ],
        image: '/services/luxury-villa-for-sale-bengaluru.webp',
        imageAlt: 'Luxury independent villa with landscaped lawn for sale in a Bengaluru gated community',
      },
      {
        title: 'Commercial Property Sales',
        description:
          'Sales and purchase support for offices, commercial complexes, showrooms, retail spaces, warehouses, and investment properties. We help investors judge rental yield and tenant quality.',
        points: [
          'Offices and commercial complexes',
          'Showrooms and retail spaces',
          'Warehouses and investment properties',
          'Rental yield and return analysis',
        ],
        image: '/services/commercial-complex-for-sale.webp',
        imageAlt: 'Modern commercial complex with glass showrooms and offices on a Bengaluru main road',
      },
      {
        title: 'Property Purchase Guidance',
        description:
          'Professional assistance in selecting, verifying, negotiating, and purchasing legally approved properties. We stay with you from shortlisting to registration.',
        points: [
          'Shortlisting by budget and location',
          'Legal and approval verification',
          'Price negotiation',
          'Home loan and registration support',
        ],
        image: '/services/real-estate-apartments-bengaluru-skyline.webp',
        imageAlt: 'Premium residential apartment towers with a landscaped pool deck at dusk in Bengaluru',
      },
      {
        title: 'Residential Rental Services',
        description:
          'Rental solutions for apartments, villas, independent houses, and family homes in prime locations. Owners get verified tenants, and tenants get well-maintained homes.',
        points: [
          'Apartments, villas and family homes',
          'Tenant screening and police verification',
          'Rental agreement drafting',
          'Rent collection and NRI owner support',
        ],
        image: '/services/furnished-apartment-for-rent.webp',
        imageAlt: 'Fully furnished apartment bedroom with balcony and city view available for rent',
      },
      {
        title: 'Commercial Rental Services',
        description:
          'Commercial leasing and rental services for offices, shops, warehouses, and industrial spaces. We negotiate fair lease terms for both owners and businesses.',
        points: [
          'Office spaces in IT corridors',
          'Shops and retail outlets',
          'Warehouses and industrial spaces',
          'Lease agreement drafting and registration',
        ],
        image: '/services/commercial-office-space-for-lease.webp',
        imageAlt: 'Empty open-plan commercial office space with glass windows and city view for lease',
      },
      {
        title: 'e-Khata Services',
        description:
          'Complete support for e-Khata registration, transfers, corrections, updates, and property tax services. We prepare the documents and follow up with the local body until it is done.',
        points: [
          'New e-Khata registration',
          'Khata transfer after purchase',
          'Name and detail corrections',
          'Property tax payment and updates',
        ],
        image: '/services/ekhata-property-tax-services.webp',
        imageAlt: 'Laptop with an online property form beside khata certificate and property tax receipts',
      },
      {
        title: 'Property Registration Services',
        description:
          'Professional registration support including document preparation, EC verification, and registration management at the sub-registrar office.',
        points: [
          'Sale deed and agreement preparation',
          'Encumbrance certificate (EC) verification',
          'Stamp duty and fee calculation',
          'Sub-registrar appointment and registration',
        ],
        image: '/services/property-registration-ekhata-documents.webp',
        imageAlt: 'House keys, property sale deed documents, stamp paper and official seal on a table',
      },
      {
        title: 'Legal Documentation Assistance',
        description:
          'Support for sale deeds, agreements, khata transfer, tax documents, and legal property paperwork, prepared and checked by experienced legal professionals.',
        points: [
          'Sale deeds and sale agreements',
          'Rental and lease agreements',
          'Khata transfer and tax documents',
          'Title verification reports',
        ],
        image: '/services/property-purchase-land-verification.webp',
        imageAlt: 'Property documents and survey records being checked with a magnifying glass',
      },
    ],
    process: [
      { title: 'Requirement', description: 'Tell us your budget, location and property type.' },
      { title: 'Shortlist & Visit', description: 'Visit verified properties chosen for you.' },
      { title: 'Legal Check', description: 'We verify the title, approvals and dues before you commit.' },
      { title: 'Registration', description: 'Sign the agreement, register the deed and get the keys.' },
    ],
    areas: AREAS,
    faqs: [
      {
        question: 'Which areas in Bangalore do you cover?',
        answer:
          'We work across Bengaluru, including Koramangala, Whitefield, HSR Layout, Electronic City, Sarjapur Road, Hosur Road and the growing northern and southern suburbs.',
      },
      {
        question: 'How do you verify a property before I buy it?',
        answer:
          'We check the title deed chain, encumbrance certificate, khata, approved plans, tax receipts and any pending dues. We share the findings with you before any payment is made.',
      },
      {
        question: 'Can you help me get e-Khata for my property?',
        answer:
          'Yes. We handle e-Khata applications, A-Khata conversion and khata transfer after purchase, including document preparation and follow-up with the local body.',
      },
      {
        question: 'Do you manage rental properties for NRIs?',
        answer:
          'Yes. We offer end-to-end rental management for NRI owners, including tenant verification, agreements, rent collection and maintenance, with regular updates.',
      },
      {
        question: 'What are your charges for buying or selling property?',
        answer:
          'Our service fee depends on the property type and transaction value and is agreed in writing upfront. There are no hidden charges.',
      },
    ],
  },
}

export function companyMetadata(slug: CompanySlug): Metadata {
  const content = COMPANY_CONTENT[slug]
  return pageMetadata({
    title: content.seoTitle,
    description: content.seoDescription,
    keywords: content.keywords,
    path: `/${slug}`,
    image: content.heroImage,
    imageAlt: content.heroAlt,
    absoluteTitle: true,
  })
}
