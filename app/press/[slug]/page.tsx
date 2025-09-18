import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { cache } from "react"
import React from "react"
import serialize from "./serializer"
import Link from "next/link"

const getPressStatementBySlug = cache(async (slug: string) => {
  const statement = await prisma.pressStatement.findUnique({
    where: { slug },
  })
  return statement
})

export default async function PressStatementPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const statement = await getPressStatementBySlug(slug)

  if (!statement) {
    return notFound()
  }

  return (
    <main className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/press"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <span className="text-lg">←</span>
            <span className="text-sm font-medium">Back to Press Statements</span>
          </Link>
        </div>

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
              {(() => {
                // If content is a string, render it with proper paragraphs
                if (typeof statement.content === 'string') {
                  return statement.content.split('\n\n').map((paragraph, index) =>
                    paragraph.trim() ? <p key={index} className="mb-4">{paragraph}</p> : null
                  );
                }

                // If content is an object with root.children (Lexical format), use serializer
                if (statement.content && typeof statement.content === 'object' && 'root' in statement.content) {
                  const contentObj = statement.content as { root: { children: any[] } };
                  if (contentObj.root?.children) {
                    return serialize(contentObj.root.children);
                  }
                }

                // Fallback: extract all text and split by paragraphs
                const extractText = (node: any): string => {
                  if (typeof node === 'string') return node;
                  if (node?.text) return node.text;
                  if (node && typeof node === 'object' && 'children' in node && Array.isArray(node.children)) {
                    return node.children.map(extractText).join('');
                  }
                  return '';
                };

                const text = extractText(statement.content);
                if (text) {
                  return text.split('\n\n').map((paragraph, index) =>
                    paragraph.trim() ? <p key={index} className="mb-4">{paragraph}</p> : null
                  );
                }

                // Fallback to excerpt
                return <p className="mb-4">{statement.excerpt || "Content not available"}</p>;
              })()}
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
  const pressStatements = await prisma.pressStatement.findMany({
    select: { slug: true },
    take: 100,
  })

  return pressStatements
    .filter((p: any): p is { slug: string } => p.slug !== null)
    .map((p: { slug: string }) => ({
      slug: p.slug,
    }))
}
