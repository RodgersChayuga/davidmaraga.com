import { notFound } from "next/navigation"
import { getPayload } from "payload"
import config from "@/payload.config"
import { cache } from "react"
import { PressStatement } from "@/payload-types"
import serialize from "./serializer"

const getPressStatementBySlug = cache(async (slug: string): Promise<PressStatement | null> => {
  const payload = await getPayload({ config })
  const pressStatements = await payload.find({
    collection: "press-statements",
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return pressStatements.docs[0] || null
})

export default async function PressStatementPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const statement = await getPressStatementBySlug(slug)

  if (!statement) {
    return notFound()
  }

  // Check if content exists and has the expected structure
  const hasContent = statement.content &&
    statement.content.root &&
    statement.content.root.children &&
    Array.isArray(statement.content.root.children)

  return (
    <main className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="text-lg text-green-600 font-medium">
                {new Date(statement.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4 font-serif">
                {statement.title}
              </h1>
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Press Release
              </span>
            </div>

            <div className="prose prose-lg max-w-none mx-auto text-gray-800">
              {hasContent ? (
                serialize(statement.content.root.children)
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    {statement.excerpt || "Content not available"}
                  </p>
                  {!statement.excerpt && (
                    <p className="text-gray-500 text-sm mt-2">
                      This press statement is being prepared.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}

// Add revalidation - pages will regenerate every 60 seconds
export const revalidate = 60

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const pressStatements = await payload.find({
    collection: "press-statements",
    limit: 100, // Adjust limit as needed
  })

  return pressStatements.docs.map((p) => ({
    slug: p.slug,
  }))
}
