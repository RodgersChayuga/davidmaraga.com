import { getPayload } from 'payload'
import { cache } from 'react'
import config from '@/payload.config'
import { PressStatement } from '@/payload-types'

const getPressStatements = cache(async (): Promise<PressStatement[]> => {
  const payload = await getPayload({ config })
  const pressStatements = await payload.find({
    collection: 'press-statements',
    sort: '-date',
  })
  return pressStatements.docs
})

export const revalidate = 60

export default async function NewsPage() {
  const pressStatements = await getPressStatements()

  return (
    <main className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">In the News</h1>
          <p className="text-xl text-gray-600">
            Latest press statements and official communications from David Maraga&apos;s presidential campaign
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pressStatements.map((statement) => (
            <article
              key={statement.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green-600 font-medium text-sm">Press Release</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(statement.date).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight font-serif">
                  {statement.title}
                </h3>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {statement.excerpt || 'Read the full press statement for more details...'}
                </p>

                <a
                  href={`/press/${statement.slug}`}
                  className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition duration-200"
                >
                  Read Full Statement
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want to feature our campaign in your publication?</p>
          <a
            href="mailto:press@maraga2027.com"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition duration-200"
          >
            Contact Press Team
          </a>
        </div>
      </div>
    </main>
  )
}
