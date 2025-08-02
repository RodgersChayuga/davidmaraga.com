/* eslint-disable */
import Image from "next/image"
import Link from "next/link"

const newsArticles = [
  {
    date: "Dec 28, 2024",
    title: "Former CJ Maraga Announces Presidential Bid for 2027",
    excerpt: "Former Chief Justice David Maraga has officially announced his intention to run for President in the 2027 general elections, promising to restore integrity and constitutional governance...",
    source: "The Standard",
    sourceColor: "bg-blue-600",
    image: "/maraga-campaign.jpg",
    link: "https://standardmedia.co.ke",
  },
  {
    date: "Dec 25, 2024",
    title: "Maraga Calls for Constitutional Governance in Nairobi Rally",
    excerpt: "Speaking to thousands of supporters in Nairobi, David Maraga outlined his vision for constitutional reforms and strengthening democratic institutions across Kenya...",
    source: "Daily Nation",
    sourceColor: "bg-red-600",
    image: "/maraga-rally.jpg",
    link: "https://nation.africa",
  },
  {
    date: "Dec 22, 2024",
    title: "Maraga's Economic Blueprint Gains Traction Among Economists",
    excerpt: "Economic experts praise David Maraga's detailed economic transformation plan, highlighting job creation strategies and comprehensive support for small and medium enterprises...",
    source: "Business Daily",
    sourceColor: "bg-green-600",
    image: "/maraga-economics.jpg",
    link: "https://businessdailyafrica.com",
  },
]

export default function NewsCoverageSection() {
  return (
    <section className="py-20 bg-gray-100 scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in">
            Media Coverage
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 animate-fade-in-up animate-delay-200">
            In the News
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
            See how major media outlets are covering David Maraga&apos;s presidential campaign and policy positions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <article
              key={article.title}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 hover-lift animate-fade-in-up animate-delay-${index * 200}`}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`${article.sourceColor} text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse-slow`}
                  >
                    {article.source}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500 text-sm font-medium">{article.date}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">{article.excerpt}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition duration-200 group"
                >
                  Read Full Article
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
            </article>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up animate-delay-600">
          <a
            href="/news"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg btn-political btn-animate hover-lift"
          >
            View All News Coverage
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
