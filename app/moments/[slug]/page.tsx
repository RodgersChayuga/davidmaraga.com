import Link from "next/link"
import { prisma } from "@/lib/prisma"
import GalleryViewer from "../../../components/GalleryViewer"

export default async function SingleGalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params Promise
  const resolvedParams = await params

  // Fetch gallery data directly from Prisma
  const gallery = await prisma.gallery.findUnique({
    where: { slug: resolvedParams.slug },
    include: { images: true },
  })

  if (!gallery) {
    return (
      <div className="min-h-screen bg-gray-50">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Gallery Not Found</h1>
            <Link href="/moments" className="text-maraga-green hover:text-maraga-dark-green">
              ← Back to All Moments
            </Link>
          </div>
        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">


      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/moments"
              className="inline-flex items-center text-maraga-green hover:text-maraga-dark-green mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Galleries
            </Link>
            <h1 className="text-4xl font-bold font-serif text-gray-900 mb-4">{gallery.title}</h1>
            <p className="text-gray-600">{Array.isArray(gallery.images) ? gallery.images.length : 0} photos</p>
          </div>

          {/* Client component for interactive gallery */}
          <GalleryViewer gallery={gallery} />
        </div>
      </section>


    </div>
  )
}
