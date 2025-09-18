import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { cache } from "react"

const getGalleries = cache(async () => {
  const galleries = await prisma.gallery.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { images: true },
  })
  return galleries
})

export default async function GalleriesPage() {
  const galleries = await getGalleries()

  return (
    <div className="min-h-screen bg-gray-50">


      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-serif text-gray-900 mb-4">Campaign Galleries</h1>
            <p className="text-xl text-gray-600">Explore moments from our campaign events across Kenya</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery) => {
              const mainImageSrc = (Array.isArray(gallery.images) && gallery.images.length > 0 ? gallery.images[0] : "/placeholder.svg") as string

              return (

                <Link
                  key={gallery.id}
                  href={`/moments/${gallery.slug}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 hover-lift"
                >
                  <div className="relative h-64">

                    <Image
                      src={mainImageSrc}
                      alt={gallery.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        {Array.isArray(gallery.images) ? gallery.images.length : 0} Photos
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-serif font-bold text-white leading-tight">{gallery.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-maraga-green font-semibold group-hover:text-maraga-dark-green transition duration-200">
                        View Gallery
                      </span>
                      <svg
                        className="w-5 h-5 text-maraga-green group-hover:text-maraga-dark-green group-hover:translate-x-1 transition duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>


    </div>
  )
}
