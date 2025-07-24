import Image from 'next/image'
import type { HomePage } from '@/payload-types'

export default function AboutSection({ homePage }: { homePage: HomePage }) {
  const { title, description, image, attributes } = homePage
  const candidateInfo = {
    title,
    description,
    image: {
      id: typeof image === 'object' && image ? image.id : 0,
      url: typeof image === 'object' && image ? image.url : '',
      alt: typeof image === 'object' && image ? image.alt : '',
    },
    keyPoints: attributes
      ? attributes.map(({ title, description }) => ({
          title,
          description,
        }))
      : [],
  }

  return (
    <section className="py-20 bg-[#F1DFB8] scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Candidate Image */}
          <div className="relative animate-fade-in-left">
            {candidateInfo && candidateInfo.image && candidateInfo.image.url ? (
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl hover-lift">
                <Image
                  src={candidateInfo.image.url}
                  alt={candidateInfo.image.alt || 'David Maraga - Presidential Candidate 2027'}
                  fill
                  className="object-cover transition duration-500 hover:scale-105 shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            ) : (
              <div className="h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <div className="loading-skeleton" />
              </div>
            )}
            {candidateInfo && (
              <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-xl shadow-lg animate-float hover-glow">
                <div className="text-center">
                  <div className="text-2xl font-bold">2027</div>
                  <div className="text-sm">Presidential Candidate</div>
                </div>
              </div>
            )}
          </div>

          {/* About Content */}
          <div className="animate-fade-in-right">
            {candidateInfo ? (
              <>
                <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                  Leadership
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 animate-fade-in-up animate-delay-200">
                  {candidateInfo.title}
                </h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed animate-fade-in-up animate-delay-300">
                  {candidateInfo.description}
                </p>

                <div className="space-y-4 mb-8">
                  {candidateInfo.keyPoints.slice(0, 3).map((point, index) => {
                    if (!point || !point.title) return null
                    return (
                      <div
                        key={point.title}
                        className={`flex items-start gap-4 p-4 bg-gray-50 rounded-xl transition duration-300 hover:bg-gray-100 animate-fade-in-up animate-delay-${index * 200 + 400}`}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            {point.title}
                          </h4>
                          <p className="text-gray-600">{point.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <a
                  href="/about"
                  className="inline-flex items-center bg-green-600 text-white mr-5 px-8 py-7 rounded-lg font-semibold hover:bg-green-800 transition duration-300 shadow-lg btn-political btn-animate hover-lift animate-fade-in-up animate-delay-600"
                >
                  Learn More About Maraga
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
                </a>
                <a
                  href="/pillars"
                  className="inline-flex items-center text-green-600 bg-white px-8  py-7 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition duration-300 shadow-lg btn-political btn-animate hover-lift animate-fade-in-up animate-delay-600"
                >
                  Campaigns Pillars
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
                </a>
              </>
            ) : (
              <div className="h-96 lg:h-auto rounded-2xl overflow-hidden shadow-2xl">
                <div className="loading-skeleton" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
