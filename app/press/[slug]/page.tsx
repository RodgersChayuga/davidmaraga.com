import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { cache } from "react"
import React from "react"
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
                try {
                  // Use the same approach as admin dashboard but with better list handling
                  const renderContent = (content: any): string => {
                    if (typeof content === 'string') {
                      return content;
                    }

                    if (content && content.root && content.root.children) {
                      // Extract text from Lexical format (same as admin dashboard)
                      const extractTextFromNode = (node: any): string => {
                        if (node.text) {
                          return node.text;
                        }
                        if (node.children) {
                          return node.children.map(extractTextFromNode).join('');
                        }
                        return '';
                      };

                      return content.root.children.map(extractTextFromNode).join('\n\n');
                    }

                    return '';
                  };

                  const contentText = renderContent(statement.content);

                  if (contentText) {
                    // Process the content to handle lists and formatting better
                    const processContent = (text: string) => {
                      // First split by double newlines to get major sections
                      const sections = text.split('\n\n');
                      let elementIndex = 0;

                      return sections.map((section) => {
                        const trimmed = section.trim();
                        if (!trimmed) return null;

                        // Check if this section contains numbered list items (separated by single newlines)
                        const lines = trimmed.split('\n');
                        const hasNumberedItems = lines.some(line => /^\d+\.\s/.test(line.trim()));

                        if (hasNumberedItems) {
                          // This section contains a numbered list
                          return (
                            <div key={elementIndex++} className="mb-6">
                              {lines.map((line, lineIndex) => {
                                const lineTrimmed = line.trim();
                                if (!lineTrimmed) return null;

                                const listItemMatch = lineTrimmed.match(/^(\d+)\.\s*(.+)$/);
                                if (listItemMatch) {
                                  const [, number, content] = listItemMatch;
                                  return (
                                    <div key={lineIndex} className="mb-2 flex">
                                      <span className="font-semibold text-gray-700 mr-3 min-w-[2rem]">{number}.</span>
                                      <span className="flex-1">{content}</span>
                                    </div>
                                  );
                                }

                                // Handle malformed list items (like "$. Lewis Ngunyi")
                                const malformedListItemMatch = lineTrimmed.match(/^([^\d])\s*(.+)$/);
                                if (malformedListItemMatch) {
                                  const [, , content] = malformedListItemMatch;
                                  return (
                                    <div key={lineIndex} className="mb-2 flex">
                                      <span className="font-semibold text-gray-700 mr-3 min-w-[2rem]">3.</span>
                                      <span className="flex-1">{content}</span>
                                    </div>
                                  );
                                }

                                // Regular line within a list section
                                return <p key={lineIndex} className="mb-2">{lineTrimmed}</p>;
                              })}
                            </div>
                          );
                        }

                        // Check if this section contains bullet points
                        const hasBulletItems = lines.some(line => /^[•\-*]\s/.test(line.trim()));
                        if (hasBulletItems) {
                          return (
                            <div key={elementIndex++} className="mb-6">
                              {lines.map((line, lineIndex) => {
                                const lineTrimmed = line.trim();
                                if (!lineTrimmed) return null;

                                if (lineTrimmed.startsWith('•') || lineTrimmed.startsWith('-') || lineTrimmed.startsWith('*')) {
                                  return (
                                    <div key={lineIndex} className="mb-2 flex">
                                      <span className="mr-3 min-w-[1rem]">•</span>
                                      <span className="flex-1">{lineTrimmed.substring(1).trim()}</span>
                                    </div>
                                  );
                                }

                                return <p key={lineIndex} className="mb-2">{lineTrimmed}</p>;
                              })}
                            </div>
                          );
                        }

                        // Regular paragraph section
                        return <p key={elementIndex++} className="mb-4">{trimmed}</p>;
                      });
                    };

                    return processContent(contentText);
                  }

                  // Fallback to excerpt
                  return <p className="mb-4">{statement.excerpt || "Content not available"}</p>;
                } catch (error) {
                  console.error('Error rendering press statement content:', error);
                  return <p className="mb-4 text-red-600">Error loading content. Please try again later.</p>;
                }
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
    .filter((p: { slug: string | null }): p is { slug: string } => p.slug !== null)
    .map((p: { slug: string }) => ({
      slug: p.slug,
    }))
}
