import { NextRequest } from 'next/server'
import { createReadStream, promises as fs } from 'fs'
import path from 'path'
import { Readable } from 'stream'
import { UPLOADS_DIR } from '@/lib/companies'

// Files uploaded at runtime are not served from /public in production,
// so uploaded media is streamed from storage/uploads through this route.

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
}

export async function GET(request: NextRequest, ctx: RouteContext<'/api/media/[...path]'>) {
  const { path: segments } = await ctx.params
  const filePath = path.resolve(UPLOADS_DIR, ...segments)

  // Block path traversal outside the uploads folder
  if (!filePath.startsWith(UPLOADS_DIR + path.sep)) {
    return new Response('Not found', { status: 404 })
  }

  const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()]
  if (!contentType) return new Response('Not found', { status: 404 })

  let size: number
  try {
    size = (await fs.stat(filePath)).size
  } catch {
    return new Response('Not found', { status: 404 })
  }

  const headers = {
    'Content-Type': contentType,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=31536000, immutable',
  }

  // Range requests let browsers seek inside videos
  const range = request.headers.get('range')
  const match = range && /^bytes=(\d*)-(\d*)$/.exec(range)
  if (match) {
    let start = match[1] ? parseInt(match[1], 10) : size - parseInt(match[2], 10)
    let end = match[1] && match[2] ? parseInt(match[2], 10) : size - 1
    start = Math.max(0, start)
    end = Math.min(end, size - 1)

    if (Number.isNaN(start) || Number.isNaN(end) || start > end) {
      return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } })
    }

    const stream = Readable.toWeb(createReadStream(filePath, { start, end })) as ReadableStream
    return new Response(stream, {
      status: 206,
      headers: {
        ...headers,
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': String(end - start + 1),
      },
    })
  }

  const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream
  return new Response(stream, {
    headers: { ...headers, 'Content-Length': String(size) },
  })
}
