"use client"

import { useState } from "react"

export default function YouTubeSection({ videos }: { videos: { id: string; title: string; thumbnail: string; description: string; publishedAt: string }[] }) {
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set())

  const handleVideoLoad = (videoId: string) => {
    setLoadedVideos((prev) => new Set(prev).add(videoId))
  }

  return (
    <section className="py-20 bg-[#001E41] text-white relative overflow-hidden scroll-reveal">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-shimmer"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in">
            Latest Updates
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 animate-fade-in-up animate-delay-200">
            From Our YouTube Channel
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
            Stay connected with our latest speeches, policy discussions, and campaign updates directly from the field
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/15 transition duration-300 hover-lift animate-fade-in-up animate-delay-${400 + index * 200}`}
            >
              <div className="relative">
                <div className="relative w-full h-0 pb-[56.25%]">
                  {loadedVideos.has(video.id) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full rounded-t-xl"
                    />
                  ) : (
                    <div
                      className="absolute top-0 left-0 w-full h-full bg-gray-900 rounded-t-xl cursor-pointer group"
                      onClick={() => handleVideoLoad(video.id)}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${video.thumbnail})` }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition duration-300 animate-pulse-slow">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">Click to Play</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif font-bold mb-3 leading-tight">{video.title}</h3>
                <p className="text-green-100/80 text-sm mb-4 leading-relaxed line-clamp-3">{video.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-100/60 text-xs">
                    {new Date(video.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-maraga-red hover:text-red-400 transition duration-200 group"
                  >
                    <span className="text-sm font-medium">Watch on YouTube</span>
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up animate-delay-800">
          <a
            href="https://www.youtube.com/@dkmaraga" // Replace with actual channel URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition duration-300 shadow-lg btn-political btn-animate hover-lift"
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe to Our Channel
            <svg
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
