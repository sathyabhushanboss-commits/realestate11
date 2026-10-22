import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { requireApiSession } from '@/lib/auth'
import { isCompanySlug, UPLOADS_DIR } from '@/lib/companies'

const IMAGE_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/avif': '.avif',
}
const VIDEO_TYPES: Record<string, string> = {
  'video/mp4': '.mp4',
  'video/webm': '.webm',
  'video/quicktime': '.mov',
}

const MAX_IMAGE_BYTES = 10 * 1024 * 1024 // 10 MB
const MAX_VIDEO_BYTES = 200 * 1024 * 1024 // 200 MB

export async function POST(request: NextRequest) {
  const { error } = await requireApiSession('admin')
  if (error) return error

  const form = await request.formData()
  const file = form.get('file')
  // Files are grouped by company slug, or under "properties" for listings
  const slug = String(form.get('slug') || '')

  if (!isCompanySlug(slug) && slug !== 'properties') {
    return NextResponse.json({ error: 'Unknown upload folder' }, { status: 400 })
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const isImage = file.type in IMAGE_TYPES
  const isVideo = file.type in VIDEO_TYPES
  if (!isImage && !isVideo) {
    return NextResponse.json(
      { error: 'Only JPG, PNG, WEBP, AVIF images or MP4, WEBM, MOV videos are allowed' },
      { status: 400 }
    )
  }

  const limit = isImage ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES
  if (file.size > limit) {
    return NextResponse.json(
      { error: `File too large. Max ${limit / 1024 / 1024} MB for ${isImage ? 'images' : 'videos'}` },
      { status: 400 }
    )
  }

  const ext = isImage ? IMAGE_TYPES[file.type] : VIDEO_TYPES[file.type]
  const fileName = `${randomUUID()}${ext}`
  const dir = path.join(UPLOADS_DIR, slug)

  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(path.join(dir, fileName), Buffer.from(await file.arrayBuffer()))

  return NextResponse.json({
    url: `/api/media/${slug}/${fileName}`,
    kind: isImage ? 'image' : 'video',
  })
}
