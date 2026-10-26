import mongoose, { Schema, type Model, type Types } from 'mongoose'

// Explicit interfaces keep TypeScript fast (schema inference is very expensive)
interface Timestamps {
  createdAt?: Date
  updatedAt?: Date
}

export interface UserDoc extends Timestamps {
  name: string
  email: string
  phone: string
  passwordHash: string
  role: 'admin' | 'user'
  favorites: Types.ObjectId[]
}

export interface PropertyDoc extends Timestamps {
  title: string
  location: string
  price: string
  propertyType: string
  measurement: string
  bedrooms: string
  bathrooms: string
  balconies: string
  securityDeposit: string
  year: string
  description: string
  features: string[]
  images: string[]
  videos: string[]
  status: 'published' | 'draft' | 'sold'
  featured: boolean
}

export interface EnquiryDoc extends Timestamps {
  user: Types.ObjectId | null
  property: Types.ObjectId | null
  name: string
  email: string
  phone: string
  message: string
  type: 'enquiry' | 'site-visit' | 'contact'
  preferredDate: string
  status: 'new' | 'contacted' | 'closed'
}

export interface CompanyDoc extends Timestamps {
  slug: string
  name: string
  tagline: string
  description: string
  highlights: string[]
  images: string[]
  videos: string[]
  priceList: { id?: string; type?: string; area?: string; price?: string; status?: string }[]
  priceNote: string
}

export type OtpPurpose = 'login' | 'register' | 'reset'

export interface OtpDoc extends Timestamps {
  email: string
  purpose: OtpPurpose
  codeHash: string
  attempts: number
  expiresAt: Date
}

// ---------- User ----------
const userSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, default: '', trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
  },
  { timestamps: true }
)

// ---------- Property ----------
const propertySchema = new Schema<PropertyDoc>(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    propertyType: { type: String, default: '' },
    measurement: { type: String, default: '' },
    bedrooms: { type: String, default: '' },
    bathrooms: { type: String, default: '' },
    balconies: { type: String, default: '' },
    securityDeposit: { type: String, default: '' },
    year: { type: String, default: '' },
    description: { type: String, default: '' },
    features: { type: [String], default: [] },
    images: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    status: { type: String, enum: ['published', 'draft', 'sold'], default: 'published' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)
propertySchema.index({ title: 'text', location: 'text', description: 'text' })

// ---------- Enquiry ----------
const enquirySchema = new Schema<EnquiryDoc>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    property: { type: Schema.Types.ObjectId, ref: 'Property', default: null },
    name: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, default: '', trim: true },
    type: { type: String, enum: ['enquiry', 'site-visit', 'contact'], default: 'enquiry' },
    preferredDate: { type: String, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  },
  { timestamps: true }
)

// ---------- Company page ----------
const priceItemSchema = new Schema(
  { id: String, type: String, area: String, price: String, status: String },
  { _id: false }
)
const companySchema = new Schema<CompanyDoc>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String, default: '' },
    description: { type: String, default: '' },
    highlights: { type: [String], default: [] },
    images: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    priceList: { type: [priceItemSchema], default: [] },
    priceNote: { type: String, default: '' },
  },
  { timestamps: true }
)

// ---------- One-time email codes ----------
const otpSchema = new Schema<OtpDoc>(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    purpose: { type: String, enum: ['login', 'register', 'reset'], required: true },
    codeHash: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    // MongoDB deletes the document automatically once this time passes
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true }
)
otpSchema.index({ email: 1, purpose: 1 }, { unique: true })

// Guard against "OverwriteModelError" on hot reload
function model<T>(name: string, schema: Schema<T>): Model<T> {
  return (mongoose.models[name] as Model<T>) || (mongoose.model(name, schema) as unknown as Model<T>)
}

export const User = model<UserDoc>('User', userSchema)
export const Property = model<PropertyDoc>('Property', propertySchema)
export const Enquiry = model<EnquiryDoc>('Enquiry', enquirySchema)
export const Company = model<CompanyDoc>('Company', companySchema)
export const Otp = model<OtpDoc>('Otp', otpSchema)
