'use client'

export default function NewsPage() {
  const newsItems = [
    {
      id: 1,
      title: "Former CJ Maraga Announces Presidential Bid",
      source: "The Standard",
      date: "2024-06-25",
      url: "https://www.standardmedia.co.ke",
      excerpt:
        "Former Chief Justice David Maraga has officially announced his intention to run for President in 2027...",
    },
    {
      id: 2,
      title: "Maraga Calls for Constitutional Governance",
      source: "Daily Nation",
      date: "2024-06-22",
      url: "https://www.nation.co.ke",
      excerpt:
        "Speaking at a legal forum, David Maraga emphasized the need for full implementation of the 2010 Constitution...",
    },
    {
      id: 3,
      title: "Legal Expert Maraga Proposes Judicial Reforms",
      source: "The Star",
      date: "2024-06-20",
      url: "https://www.the-star.co.ke",
      excerpt: "Former Chief Justice outlines comprehensive reforms needed to strengthen Kenya's judicial system...",
    },
    {
      id: 4,
      title: "Maraga: Kenya Needs Reset, Restore, Rebuild Approach",
      source: "Business Daily",
      date: "2024-06-18",
      url: "https://www.businessdailyafrica.com",
      excerpt: "Presidential hopeful David Maraga unveils his three-pillar strategy for national transformation...",
    },
    {
      id: 5,
      title: "Former CJ Addresses Youth on Leadership",
      source: "Citizen TV",
      date: "2024-06-15",
      url: "https://www.citizentv.co.ke",
      excerpt:
        "David Maraga engages with university students on the importance of ethical leadership and good governance...",
    },
    {
      id: 6,
      title: "Maraga Proposes Economic Recovery Plan",
      source: "KTN News",
      date: "2024-06-12",
      url: "https://www.ktnnews.com",
      excerpt:
        "Presidential candidate outlines comprehensive economic strategy focusing on job creation and SME support...",
    },
  ]

  return (
    <main className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">In the News</h1>
          <p className="text-xl text-gray-600">
            Latest media coverage and news about David Maraga&apos;s presidential campaign
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green-600 font-medium text-sm">{item.source}</span>
                  <span className="text-gray-500 text-sm">{new Date(item.date).toLocaleDateString()}</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight font-serif">{item.title}</h3>

                <p className="text-gray-700 mb-4 leading-relaxed">{item.excerpt}</p>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition duration-200"
                >
                  Read Full Article
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
