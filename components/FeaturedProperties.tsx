import PropertyCard from './PropertyCard'

const properties = [
  {
    title: 'Luxury Villa',
    location: 'Koramangala',
    price: '₹ 2.5 Cr',
    image: '/property1.jpg',
  },

  {
    title: 'Premium Apartment',
    location: 'Indiranagar',
    price: '₹ 1.8 Cr',
    image: '/property2.jpg',
  },

  {
    title: 'Commercial Space',
    location: 'MG Road',
    price: '₹ 4.2 Cr',
    image: '/property3.jpg',
  },
]

export default function FeaturedProperties() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">

          <p className="text-[#D4A017] uppercase tracking-[6px] text-sm">
            Featured Properties
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#9B1C1C] mt-4">
            Luxury Properties Collection
          </h2>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {properties.map((property, index) => (
            <PropertyCard
              key={index}
              title={property.title}
              location={property.location}
              price={property.price}
              image={property.image}
            />
          ))}

        </div>
      </div>
    </section>
  )
}