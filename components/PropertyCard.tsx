import Image from 'next/image'

interface PropertyCardProps {
  title: string
  location: string
  price: string
  image: string
}

export default function PropertyCard({
  title,
  location,
  price,
  image,
}: PropertyCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#D4A017]/10">

      {/* IMAGE */}
      <div className="relative h-[280px] overflow-hidden">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6">

        <p className="text-[#D4A017] text-sm uppercase tracking-[4px]">
          {location}
        </p>

        <h3 className="text-2xl font-bold text-[#9B1C1C] mt-3">
          {title}
        </h3>

        <div className="mt-5 flex items-center justify-between">

          <p className="text-xl font-semibold text-[#4A1F12]">
            {price}
          </p>

          <button className="bg-[#9B1C1C] hover:bg-[#8B1E1E] text-white px-5 py-2 rounded-xl transition-all">
            View
          </button>

        </div>
      </div>
    </div>
  )
}