import Link from "next/link"
import { getPayload } from "payload"
import config from "@/payload.config"
import { PressStatement } from "@/payload-types"

const getPressStatements = async (): Promise<PressStatement[]> => {
  const payload = await getPayload({ config })
  const pressStatements = await payload.find({
    collection: "press-statements",
    sort: "-date",
  })
  return pressStatements.docs
}

// Revalidate every 60 seconds
export const revalidate = 60

export default async function PressPage() {
  const pressStatements = await getPressStatements()

  return (
    <main className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Press Statements</h1>
          <p className="text-xl text-gray-600">
            Official statements and communications from the David Maraga Campaign
          </p>
        </div>

        <div className="space-y-8">
          {pressStatements.map((statement) => (
            <article key={statement.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green-600 font-medium">
                    {new Date(statement.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Press Release</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
                  <Link href={`/press/${statement.slug}`} className="hover:text-green-600 transition duration-200">
                    {statement.title}
                  </Link>
                </h2>

                <p className="text-gray-700 mb-6 leading-relaxed">{statement.excerpt}</p>

                <Link
                  href={`/press/${statement.slug}`}
                  className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition duration-200"
                >
                  Read Full Statement
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
