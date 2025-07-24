'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const quotes = [
    {
      title: 'A leader embraced by all Kenyan generations',
      content:
        '“Maraga is the only leader who has ever stood for truth … We trust him because he has no blood on his hands.” - Linda Atieno, 22 year‑old student at Rongo University, 2025',
    },
    {
      title: 'An elder of outstanding courage who stands with youth under fire',
      content:
        '“We paid a courtesy call on @dkmaraga. We updated him on the movement’s struggle for good governance, the rule of law and constitutionalism… we inducted him into the movement; he sang with us as we welcomed him to the struggle to liberate Kenya.” – Nyamisa Chelagat, Youth Activist, 2025',
    },
    {
      title: 'A lifetime of experience and excellence in times of vengeful politics',
      content:
        '“A seasoned jurist like Maraga…the media owes it to the country to listen…As Chief Justice, he endured vilification from the executive branch after he annulled the 2017 presidential election. This was an act of institutional courage virtually unseen on the continent.” – Brian Obara, Lawyer and media practitioner, 2025',
    },
    {
      title: 'A voice that stood unbowed against crime and cartels in government.',
      content:
        "“We have to appreciate this great man, the retired chief justice. He feared no one, and his decision during the 2017 presidential elections petition set the pace for how transparent elections have been. Otherwise, we'd have had a very chaotic election.” – Kenyan on Redit, 2022",
    },
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 7000) // Change quote every 7 seconds
    return () => clearInterval(interval)
  }, [quotes.length])

  const currentQuote = quotes[currentQuoteIndex]

  return (
    <main className="py-0 bg-gray-50">
      <div className="relative h-[500px] bg-green-700 mb-16 flex items-center justify-center">
        <Image
          src="/MARAGA.jpg"
          alt="Chief Justice Maraga"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 font-serif">
            David Maraga
          </h1>
          <p className="text-xl md:text-3xl  max-w-4xl mx-auto">
            “A man of integrity for a time that demands character.”
          </p>
          <p className="text-lg md:text-xl  max-w-3xl mx-auto mt-4">
            “The greatness of any nation lies in its fidelity to the constitution and adherence to
            the rule of law and above all respect to God.” – Chief Justice Maraga, Supreme Court
            ruling, 2017
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl p-8 mb-16">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 ">
              David Kenani Maraga was born 12 January 1951 in Nyamira County, Kenya. He was the 14th
              Chief Justice and President of the Supreme Court of Kenya from October 2016 until his
              retirement in January 2021.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 ">
              He achieved his Bachelor of Laws degree from the University of Nairobi; holds a
              post-graduate diploma awarded by the Kenya School of Law; and obtained a Master of
              Laws from the University of Nairobi.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 ">
              David Maraga is celebrated for a trailblazing judicial career marked by landmark
              achievements in integrity, reform, and constitutionalism. He is famously known for
              annulling the 2017 presidential election – the first such ruling in Africa –
              demonstrating unmatched judicial courage and independence. He reinforced
              constitutional accountability by advising the President to dissolve Parliament over
              its failure to meet the gender rule, setting a powerful precedent for legal fidelity.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 ">
              Under his leadership, the judiciary introduced major reforms, including digital case
              e-filing, the Judiciary Committee on Elections, and clearing significant case
              backlogs. He personally authored over 1,250 Court of Appeal judgments. He strengthened
              access to justice through mobile courts in remote areas and pushed for internal
              anti-corruption systems to increase transparency and accountability.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed ">
              Post-retirement, Maraga has remained active in civic life, mentoring youth, promoting
              ethical leadership, and speaking on democracy and governance. His unwavering
              commitment to the rule of law, personal integrity, and empathetic leadership has
              cemented his legacy as one of Kenya’s most principled and effective judicial
              reformers.
            </p>
          </div>
        </div>

        <div className="relative h-64 flex items-center justify-center mb-8">
          <div
            key={currentQuoteIndex}
            className="absolute inset-0 bg-white rounded-xl shadow-lg p-5 border-l-4 border-gray-300 flex flex-col justify-center transition-opacity duration-1000 ease-in-out"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-serif text-center">
              {currentQuote.title}
            </h3>
            <p className="text-base text-gray-600 italic leading-relaxed text-center ">
              {currentQuote.content}
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-16">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuoteIndex(index)}
              className={`block w-3 h-3 cursor-pointer rounded-full ${currentQuoteIndex === index ? 'bg-green-600' : 'bg-gray-300'} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
            ></button>
          ))}
        </div>

        <div className="text-center mt-24 bg-[#F1DFB8] text-black p-12 mb-5 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold mb-4 font-serif">Join Our Movement!</h2>
          <p className="text-xl mb-8 font-light">
            Your support is crucial to achieving our vision for a better Kenya. Whether you
            volunteer your time or contribute financially, every effort makes a difference.
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              href="/volunteer"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Volunteer With Us
            </Link>
            <Link
              href="/donate"
              className="bg-green-500 text-white hover:bg-green-600 px-8 py-4 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
