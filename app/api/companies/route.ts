import { NextResponse } from 'next/server'
import { getCompanies } from '@/lib/companies'

export async function GET() {
  const companies = await getCompanies()
  return NextResponse.json(companies)
}
