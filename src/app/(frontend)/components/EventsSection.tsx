/* eslint-disable */
import Image from "next/image"

const events = [
  {
    date: "Feb 15, 2024",
    title: "Town Hall Meeting - Nairobi",
    time: "6:00 PM - 8:00 PM",
    location: "KICC, Nairobi",
    description: "Join David Maraga for an open discussion on constitutional governance and economic transformation.",
    image: "/nairobi-event.jpg",
  },
  {
    date: "Feb 20, 2024",
    title: "Youth Forum - Mombasa",
    time: "2:00 PM - 5:00 PM",
    location: "Mombasa Sports Club",
    description: "Engaging with young Kenyans on education, employment, and digital economy opportunities.",
    image: "/mombasa-event.jpg",
  },
  {
    date: "Feb 25, 2024",
    title: "Agricultural Summit - Nakuru",
    time: "9:00 AM - 4:00 PM",
    location: "Nakuru Agricultural Show Grounds",
    description: "Discussing agricultural transformation and food security with farmers and stakeholders.",
    image: "/nakuru-event.jpg",
  },
]

export default function EventsSection() {
  return (
    <section className="py-20 bg-gray-50 scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in">
            Campaign Schedule
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 animate-fade-in-up animate-delay-200">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
            Join us at these upcoming campaign events across Kenya as we engage with communities and share our vision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={event.title}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 hover-lift animate-fade-in-up animate-delay-${index * 200}`}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse-slow">
                    Upcoming
                  </span>
                  <span className="text-gray-500 text-sm font-medium">{event.date}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-600 animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {event.time}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-600 animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    {event.location}
                  </p>
                </div>
                <p className="text-gray-700 text-sm mb-6 leading-relaxed">{event.description}</p>
                <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-800 transition duration-300 font-semibold btn-political btn-animate hover-lift">
                  Register to Attend
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up animate-delay-600">
          <a
            href="/events"
            className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition duration-300 shadow-lg btn-political btn-animate hover-lift"
          >
            View All Events
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
