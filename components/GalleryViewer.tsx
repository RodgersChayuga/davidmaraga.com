/* eslint-disable */
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface GalleryImage {
  image: {
    url: string
    alt?: string
    filename?: string
  }
}

interface Gall {
  id: number
  title: string
  slug?: string | null
  images?: any
}

interface GalleryViewerProps {
  gallery: Gall
}

export default function GalleryViewer({ gallery }: GalleryViewerProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const imagesPerPage = 12

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage !== null) {
        switch (event.key) {
          case "Escape":
            closeLightbox()
            break
          case "ArrowLeft":
            prevImage()
            break
          case "ArrowRight":
            nextImage()
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage])

  const images = Array.isArray(gallery.images) ? gallery.images : []
  const totalPages = Math.ceil(images.length / imagesPerPage)
  const startIndex = (currentPage - 1) * imagesPerPage
  const endIndex = startIndex + imagesPerPage
  const currentImages = images.slice(startIndex, endIndex)

  const openLightbox = (imageIndex: number) => {
    setSelectedImage(startIndex + imageIndex)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
 
      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {currentImages.map((item, index) => (
          <div
            key={`${startIndex}-${index}`}
            className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer group hover-lift transition duration-300"
            onClick={() => openLightbox(index)}
          >
            
            <Image
              src={(
                typeof item === 'string' 
                  ? item
                  : typeof item === 'object' && item && 'url' in item
                    ? (item as any).url
                    : "/placeholder.svg"
              )}
              alt={(
                typeof item === 'string' 
                  ? `Gallery image ${startIndex + index + 1}`
                  : typeof item === 'object' && item && 'alt' in item
                    ? (item as any).alt
                    : `Gallery image ${startIndex + index + 1}`
              )}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition duration-200"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded-lg transition duration-200 ${
                currentPage === page ? "bg-maraga-green text-white" : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition duration-200"
          >
            Next
          </button>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative">
            <Image
                src={(
                  typeof images[selectedImage] === 'string' 
                    ? images[selectedImage]
                    : typeof images[selectedImage] === 'object' && images[selectedImage] && 'url' in images[selectedImage]
                      ? (images[selectedImage] as any).url
                      : "/placeholder.svg"
                )}
                alt={(
                  typeof images[selectedImage] === 'string' 
                    ? `Gallery image ${selectedImage + 1}`
                    : typeof images[selectedImage] === 'object' && images[selectedImage] && 'alt' in images[selectedImage]
                      ? (images[selectedImage] as any).alt
                      : `Gallery image ${selectedImage + 1}`
                )}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain"
              />

              {/* Navigation arrows */}
              {selectedImage > 0 && (
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {selectedImage < images.length - 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            <div className="text-center text-white mt-4">
              <p className="text-sm">
                {selectedImage + 1} of {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
