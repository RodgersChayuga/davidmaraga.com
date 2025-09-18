import Link from 'next/link'

interface PressStatement {
  id: number
  title: string
  date: Date
  content: any
  slug?: string | null
  excerpt?: string | null
}

export default function LatestStatement({
  pressStatements,
}: {
  pressStatements: PressStatement[]
}) {
  const latestStatement = pressStatements[0]

  if (!latestStatement) {
    return null
  }

  return (
    <section className="py-20 bg-green-600 text-white relative overflow-hidden scroll-reveal">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-shimmer"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in">
            Latest Communication
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 animate-fade-in-up animate-delay-200 font-serif">
            Our Voice on Critical Issues
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
            Stay informed with our latest positions on the issues that matter most to Kenya
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-scale-in animate-delay-400">
          <div className="bg-white text-gray-900 rounded-xl shadow-2xl p-8 md:p-12 hover-lift transition duration-300">
            <div className="flex items-center justify-between mb-6">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
                Official Statement
              </span>
              <span className="text-gray-500 text-sm font-medium animate-fade-in animate-delay-100">
                {new Date(latestStatement.date).toLocaleDateString('en-KE', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-serif font-bold text-green-600 mb-6 leading-tight animate-fade-in-up animate-delay-200">
              {latestStatement.title}
            </h3>

            <p className="text-gray-700 mb-8 leading-relaxed text-lg animate-fade-in-up animate-delay-300">
              {latestStatement.excerpt || latestStatement.excerpt + '...'}
            </p>

            <Link
              href={`/press/${latestStatement.slug}`}
              className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition duration-300 shadow-lg btn-political btn-animate hover-lift animate-fade-in-up animate-delay-400"
            >
              Read Complete Statement
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
    </section>
  )
}
