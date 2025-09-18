import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { cache } from "react"
import React from "react"

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

            <div className="prose max-w-none">
              <div className="text-gray-800 leading-relaxed">
                {(() => {
                  // If content is a string, render it with proper paragraphs
                  if (typeof statement.content === 'string') {
                    return statement.content.split('\n\n').map((paragraph, index) =>
                      paragraph.trim() ? <p key={index} className="mb-4">{paragraph}</p> : null
                    );
                  }

                  // If content is an object, render the rich text structure with formatting
                  if (statement.content && typeof statement.content === 'object') {
                    const renderNode = (node: any, index: number = 0): React.ReactNode => {
                      if (typeof node === 'string') {
                        return node;
                      }

                      if (node?.text) {
                        return node.text;
                      }

                      // Handle different node types with their formatting
                      if (node?.type === 'p' && node?.children) {
                        return (
                          <p key={index} className="mb-4">
                            {node.children.map((child: any, childIndex: number) =>
                              renderNode(child, childIndex)
                            )}
                          </p>
                        );
                      }

                      if (node?.type === 'heading' && node?.children) {
                        const HeadingTag = `h${node.tag || 2}` as keyof JSX.IntrinsicElements;
                        return (
                          <HeadingTag key={index} className="font-bold text-xl mb-4 mt-6">
                            {node.children.map((child: any, childIndex: number) =>
                              renderNode(child, childIndex)
                            )}
                          </HeadingTag>
                        );
                      }

                      if (node?.type === 'text') {
                        let text = node.text || '';

                        // Apply text formatting
                        if (node.format) {
                          if (node.format & 1) text = <strong key={index}>{text}</strong>; // Bold
                          if (node.format & 2) text = <em key={index}>{text}</em>; // Italic
                          if (node.format & 8) text = <u key={index}>{text}</u>; // Underline
                          if (node.format & 16) text = <s key={index}>{text}</s>; // Strikethrough
                        }

                        return text;
                      }

                      if (node?.type === 'link' && node?.children) {
                        return (
                          <a
                            key={index}
                            href={node.url}
                            className="text-blue-600 hover:text-blue-800 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {node.children.map((child: any, childIndex: number) =>
                              renderNode(child, childIndex)
                            )}
                          </a>
                        );
                      }

                      if (node?.type === 'list' && node?.children) {
                        const ListTag = node.listType === 'bullet' ? 'ul' : 'ol';
                        return (
                          <ListTag key={index} className="mb-4 ml-6">
                            {node.children.map((child: any, childIndex: number) =>
                              renderNode(child, childIndex)
                            )}
                          </ListTag>
                        );
                      }

                      if (node?.type === 'listitem' && node?.children) {
                        return (
                          <li key={index} className="mb-2">
                            {node.children.map((child: any, childIndex: number) =>
                              renderNode(child, childIndex)
                            )}
                          </li>
                        );
                      }

                      if (node?.children && Array.isArray(node.children)) {
                        return node.children.map((child: any, childIndex: number) =>
                          renderNode(child, childIndex)
                        );
                      }

                      return null;
                    };

                    // If it has a root with children, render them
                    if (statement.content && typeof statement.content === 'object' && 'root' in statement.content && statement.content.root?.children) {
                      return statement.content.root.children.map((child: any, index: number) =>
                        renderNode(child, index)
                      );
                    }

                    // Fallback: extract all text and split by paragraphs
                    const extractText = (node: any): string => {
                      if (typeof node === 'string') return node;
                      if (node?.text) return node.text;
                      if (node?.children && Array.isArray(node.children)) {
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
                  }

                  // Fallback to excerpt
                  return <p className="mb-4">{statement.excerpt || "Content not available"}</p>;
                })()}
              </div>
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
