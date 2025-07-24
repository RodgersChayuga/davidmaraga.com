import Link from 'next/link'
import type { PressStatement } from '@/payload-types'

export default function PressStatementsSection({
  pressStatements,
}: {
  pressStatements: PressStatement[]
}) {
  return (
    <section className="py-20 bg-white scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in">
            Official Communications
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 animate-fade-in-up animate-delay-200">
            Latest Press Statements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
            Stay informed with our latest official statements and policy positions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pressStatements.slice(-3).map((statement, index) => (
            <div
              key={statement.title}
              className={`bg-white rounded-xl shadow-lg ellipsis overflow-hidden hover:shadow-xl transition duration-300 hover-lift animate-fade-in-up animate-delay-${index * 200}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Press Release
                  </span>
                  <span className="text-gray-500 text-sm font-medium">
                    {new Date(statement.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-3">
                  {statement.title}
                </h3>
                <p className="text-gray-700 text-sm mb-6 leading-relaxed line-clamp-3">
                  {statement.excerpt}
                </p>
                <Link
                  href={`/press/${statement.slug}`}
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-300 btn-political btn-animate hover-lift"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up animate-delay-600">
          <Link
            href="/press"
            className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition duration-300 shadow-lg btn-political btn-animate hover-lift"
          >
            View All Press Statements
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
