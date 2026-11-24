import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

// Neon Postgres over HTTP: no connection pool to manage, works in serverless functions.
// The schema is created on first use, so a brand new Neon database needs no setup step.

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
    id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name          text NOT NULL,
    email         text NOT NULL UNIQUE,
    phone         text NOT NULL DEFAULT '',
    password_hash text NOT NULL,
    role          text NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at    timestamptz NOT NULL DEFAULT now(),
    updated_at    timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS properties (
    id               text PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title            text NOT NULL,
    location         text NOT NULL,
    price            text NOT NULL,
    property_type    text NOT NULL DEFAULT '',
    measurement      text NOT NULL DEFAULT '',
    bedrooms         text NOT NULL DEFAULT '',
    bathrooms        text NOT NULL DEFAULT '',
    balconies        text NOT NULL DEFAULT '',
    security_deposit text NOT NULL DEFAULT '',
    year             text NOT NULL DEFAULT '',
    description      text NOT NULL DEFAULT '',
    features         text[] NOT NULL DEFAULT '{}',
    images           text[] NOT NULL DEFAULT '{}',
    videos           text[] NOT NULL DEFAULT '{}',
    status           text NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'sold')),
    featured         boolean NOT NULL DEFAULT false,
    created_at       timestamptz NOT NULL DEFAULT now(),
    updated_at       timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS favorites (
    user_id     text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id text NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    created_at  timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, property_id)
  )`,
  `CREATE TABLE IF NOT EXISTS enquiries (
    id             text PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id        text REFERENCES users(id) ON DELETE SET NULL,
    property_id    text REFERENCES properties(id) ON DELETE SET NULL,
    name           text NOT NULL,
    email          text NOT NULL DEFAULT '',
    phone          text NOT NULL,
    message        text NOT NULL DEFAULT '',
    type           text NOT NULL DEFAULT 'enquiry' CHECK (type IN ('enquiry', 'site-visit', 'contact')),
    preferred_date text NOT NULL DEFAULT '',
    status         text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
    created_at     timestamptz NOT NULL DEFAULT now(),
    updated_at     timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS enquiries_user_idx ON enquiries (user_id)`,
  `CREATE TABLE IF NOT EXISTS companies (
    slug        text PRIMARY KEY,
    name        text NOT NULL,
    tagline     text NOT NULL DEFAULT '',
    description text NOT NULL DEFAULT '',
    highlights  text[] NOT NULL DEFAULT '{}',
    images      text[] NOT NULL DEFAULT '{}',
    videos      text[] NOT NULL DEFAULT '{}',
    price_list  jsonb NOT NULL DEFAULT '[]',
    price_note  text NOT NULL DEFAULT '',
    updated_at  timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS otps (
    email      text NOT NULL,
    purpose    text NOT NULL CHECK (purpose IN ('login', 'register', 'reset')),
    code_hash  text NOT NULL,
    attempts   integer NOT NULL DEFAULT 0,
    expires_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (email, purpose)
  )`,
]

const globalForDb = globalThis as unknown as { neonSql?: NeonQueryFunction<false, false>; neonReady?: Promise<void> }

function client() {
  if (!globalForDb.neonSql) {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error('DATABASE_URL is not set (use your Neon connection string)')
    globalForDb.neonSql = neon(url)
  }
  return globalForDb.neonSql
}

// Returns the query function once the tables exist
export async function db() {
  const sql = client()
  globalForDb.neonReady ??= sql
    .transaction(SCHEMA.map((statement) => sql.query(statement)))
    .then(() => undefined)
    .catch((error) => {
      globalForDb.neonReady = undefined
      throw error
    })
  await globalForDb.neonReady
  return sql
}

export type Row = Record<string, unknown>

export const iso = (value: unknown) => new Date((value as string | Date | null) ?? 0).toISOString()

// IDs are UUIDs; anything else can't match a row, so reject it before querying
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export function isId(value: string) {
  return UUID.test(value)
}
