import Image from 'next/image'
import Link from 'next/link'

interface Gall {
  id: number
  title: string
  slug?: string | null
  images?: any
}

export default function GalleryPreview({ gallery }: { gallery: Gall | null }) {
  if (!gallery) {
    return null
  }

  return (
    <section className="py-20 bg-gray-100 scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in">
            Maraga&apos;s Moments
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 animate-fade-in-up animate-delay-200">
            Snapshots from the Campaign Trail
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
            Capturing the energy and spirit of our movement across Kenya as we engage with
            communities nationwide
          </p>
        </div>

        <div className="mb-16 animate-scale-in animate-delay-400">
          {!gallery ||
            !gallery.images ||
            (Array.isArray(gallery.images) && gallery.images.length === 0) ? (
            <div className="text-center">
              <span className="inline-block bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse-slow">
                Loading...
              </span>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover-lift transition duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-96">
                  <Image
                    src={
                      Array.isArray(gallery.images) && gallery.images.length > 0
                        ? typeof gallery.images[0] === 'string'
                          ? gallery.images[0]
                          : typeof gallery.images[0] === 'object' &&
                            gallery.images[0] &&
                            'url' in gallery.images[0]
                            ? (gallery.images[0] as { url: string }).url
                            : '/placeholder.svg'
                        : '/placeholder.svg'
                    }
                    alt={gallery.title}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse-slow">
                      Featured Gallery
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {Array.isArray(gallery.images) ? gallery.images.length : 0} Photos
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                    {gallery.title}
                  </h3>

                  <Link
                    href={`/moments/${gallery.slug}`}
                    className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition duration-300 shadow-lg btn-political btn-animate hover-lift"
                  >
                    View Full Gallery
                    <svg
                      className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-12 animate-fade-in-up animate-delay-800">
          <Link
            href="/moments"
            className="inline-flex items-center bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition duration-300 shadow-lg btn-political btn-animate hover-lift"
          >
            View All Galleries
            <svg
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
