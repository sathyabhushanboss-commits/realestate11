import { NextResponse } from 'next/server'

export async function GET() {
  const properties = [
    {
      _id: '1',
      title: '1500 sq ft Residential Plot',
      location: 'Doddakanahalli, Bengaluru',
      price: 'On Request',
      images: ['/properties/set1.jpeg'],
      measurement: '1500 sq ft',
      bedrooms: 'Residential Plot',
      description: 'Prime residential plot in Doddakanahalli, Bengaluru. Close to IT hubs, schools, hospitals.',
      year: '2025',
    },
    {
      _id: '2',
      title: '4800 sq ft Land with 16 Units',
      location: 'Kasavanahalli, Bengaluru',
      price: 'On Request',
      images: ['/properties/set2.jpeg'],
      measurement: '4800 sq ft',
      bedrooms: '16 Units of 2BHK',
      description: '4800 sq ft land featuring 16 ready 2BHK units. Excellent rental yield.',
      year: '2025',
    },
    {
      _id: '3',
      title: 'Koramangala Premium Property',
      location: 'Koramangala, Bengaluru',
      price: 'On Request',
      images: ['/properties/set3.1.jpeg', '/properties/set3.jpeg'],
      measurement: '600 sq ft land | 3400 sq ft built-up',
      bedrooms: '4 BHK + Commercial Space',
      description: 'Premium property in Koramangala with 600 sq ft land and 3400 sq ft built-up area.',
      year: '2018',
    },
    {
      _id: '4',
      title: 'Legacy Commercial Building',
      location: 'Koramangala, Bengaluru',
      price: 'On Request',
      images: ['/properties/set4.jpeg'],
      measurement: 'Commercial Building',
      bedrooms: 'Commercial Space',
      description: 'Well-maintained commercial building in Koramangala.',
      year: '2005',
    },
  ]

  return NextResponse.json(properties)
}