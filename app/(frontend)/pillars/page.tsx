'use client'

import { useState } from 'react'

export default function PlatformPage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  const platformItems = [
    {
      id: 'education',
      title: '1. Education, Youth, Innovation & Technology',
      content: `i. Basic, secondary and tertiary education
ii. Technology, technical training, innovation and skill development`,
    },
    {
      id: 'economy',
      title: '2. Economy & Sustainable Development',
      content: `i. Fiscal policy, financial and debt management
ii. Industry, manufacturing and trade
iii. Agriculture and food sovereignty
iv. Infrastructural renewal and development
v. Environment and industrial policy
vii. Land use policy and planning`,
    },
    {
      id: 'healthcare',
      title: '3. Healthcare, Equity and Social Justice',
      content: `i. Health policy and healthcare
ii. Housing
iii. Social welfare – pensions, old age,
iv. Gender, marginalized, minority and vulnerable groups
v. Diaspora affairs and welfare`,
    },
    {
      id: 'pan-africanism',
      title: '4. Pan-Africanism and International Relations',
      content: `i. Foreign policy
ii. Regional integration, solidarity and Pan-Africanism
iii. Foreign policy and international relations
iv. Multilateral institutions`,
    },
    {
      id: 'accountability',
      title: '5. Accountability, Rule of Law and Constitutionalism',
      content: `i. Constitutional institutional renewal and strengthening
ii. Integrity, leadership and accountability
iii. De-concentration, decentralization & inter-governmental relations
iv. Public service and professionalism
v. Public participation`,
    },
  ]

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  return (
    <main className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 font-serif leading-tight">
            Our Campaign Pillars
          </h1>
          <p className="text-xl text-gray-700  max-w-2xl mx-auto">
            Discover the core principles and detailed plans that will guide our mission to build a
            better future.
          </p>
        </div>

        <div className="space-y-8">
          {platformItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl"
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full px-8 py-6 text-left flex justify-between items-center bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
              >
                <h3 className="text-2xl font-semibold text-gray-800 font-serif">{item.title}</h3>
                <svg
                  className={`w-7 h-7 text-gray-600 transform transition-transform duration-300 ${
                    openAccordion === item.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openAccordion === item.id && (
                <div className="px-10 pb-10 animate-fade-in">
                  <div className="border-t border-gray-200 pt-6">
                    <div className="text-lg text-gray-700  whitespace-pre-line leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-24 bg-[#F1DFB8] text-black p-12 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold mb-4 font-serif">Join Our Movement!</h2>
          <p className="text-xl mb-8 ">
            Your support is crucial to achieving our vision for a better Kenya. Whether you
            volunteer your time or contribute financially, every effort makes a difference.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="/volunteer"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Volunteer With Us
            </a>
            <a
              href="/donate"
              className="bg-green-500 text-white hover:bg-green-600 px-8 py-4 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Donate Now
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
