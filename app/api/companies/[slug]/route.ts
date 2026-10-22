import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getCompany, isCompanySlug, saveCompany } from '@/lib/companies'
import { requireApiSession } from '@/lib/auth'

const mediaUrl = z.string().trim().min(1).max(500)

const companySchema = z.object({
  name: z.string().trim().min(1).max(120),
  tagline: z.string().trim().max(200),
  description: z.string().trim().max(10000),
  highlights: z.array(z.string().trim().min(1).max(200)).max(30),
  images: z.array(mediaUrl).max(50),
  videos: z.array(mediaUrl).max(10),
  priceList: z
    .array(
      z.object({
        id: z.string().min(1).max(50),
        type: z.string().trim().min(1).max(120),
        area: z.string().trim().max(120),
        price: z.string().trim().min(1).max(120),
        status: z.string().trim().max(60),
      })
    )
    .max(100),
  priceNote: z.string().trim().max(500),
})

export async function GET(_request: NextRequest, ctx: RouteContext<'/api/companies/[slug]'>) {
  const { slug } = await ctx.params
  if (!isCompanySlug(slug)) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 })
  }
  return NextResponse.json(await getCompany(slug))
}

export async function PUT(request: NextRequest, ctx: RouteContext<'/api/companies/[slug]'>) {
  const { error } = await requireApiSession('admin')
  if (error) return error

  const { slug } = await ctx.params
  if (!isCompanySlug(slug)) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 })
  }

  const parsed = companySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid data', issues: parsed.error.issues },
      { status: 400 }
    )
  }

  const saved = await saveCompany(slug, parsed.data)
  return NextResponse.json(saved)
}
