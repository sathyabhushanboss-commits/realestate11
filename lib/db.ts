import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ruby-estates'

// Reuse one connection across hot reloads in dev and across requests in prod
const globalForMongo = globalThis as unknown as {
  mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
}
const cached = (globalForMongo.mongoose ??= { conn: null, promise: null })

export async function connectDB() {
  if (cached.conn) return cached.conn
  cached.promise ??= mongoose.connect(MONGODB_URI, { bufferCommands: false })
  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }
  return cached.conn
}
