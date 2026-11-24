import { iso, type Row } from './db'

// Columns for an enquiry joined with its property and user, used by the list queries
export const ENQUIRY_SELECT = `
  SELECT e.*, p.title AS property_title, p.location AS property_location,
         u.name AS user_name, u.email AS user_email
  FROM enquiries e
  LEFT JOIN properties p ON p.id = e.property_id
  LEFT JOIN users u ON u.id = e.user_id`

// Same JSON shape the client pages already expect (populated property / user)
export function toEnquiryJSON(r: Row) {
  return {
    _id: String(r.id),
    name: r.name as string,
    phone: r.phone as string,
    email: r.email as string,
    message: r.message as string,
    type: r.type as 'enquiry' | 'site-visit' | 'contact',
    preferredDate: r.preferred_date as string,
    status: r.status as 'new' | 'contacted' | 'closed',
    createdAt: iso(r.created_at),
    updatedAt: iso(r.updated_at),
    property: r.property_id
      ? { _id: String(r.property_id), title: (r.property_title as string) ?? '', location: (r.property_location as string) ?? '' }
      : null,
    user: r.user_id ? { _id: String(r.user_id), name: (r.user_name as string) ?? '', email: (r.user_email as string) ?? '' } : null,
  }
}
