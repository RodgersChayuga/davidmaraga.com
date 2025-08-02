

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Town Hall Meeting - Nairobi",
      date: "2024-02-15",
      time: "6:00 PM",
      location: "Kenyatta International Conference Centre",
      description: "Join David Maraga for an open discussion on constitutional governance and economic transformation.",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Youth Forum - Mombasa",
      date: "2024-02-20",
      time: "2:00 PM",
      location: "Mombasa Sports Club",
      description: "Engaging with young Kenyans on education, employment, and digital economy opportunities.",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Agricultural Summit - Nakuru",
      date: "2024-02-25",
      time: "9:00 AM",
      location: "Nakuru Agricultural Show Grounds",
      description: "Discussing agricultural transformation and food security with farmers and stakeholders.",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Business Leaders Breakfast - Kisumu",
      date: "2024-01-30",
      time: "8:00 AM",
      location: "Imperial Hotel Kisumu",
      description: "Roundtable discussion on economic policies and business environment improvements.",
      status: "past",
    },
  ]

  const upcomingEvents = events.filter((event) => event.status === "upcoming")
  const pastEvents = events.filter((event) => event.status === "past")

  return (
    <main className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Campaign Events</h1>
          <p className="text-xl text-gray-600">Join us at upcoming events and see where we&apos;ve been</p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-600 mb-6 font-serif">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Upcoming
                    </span>
                    <span className="text-gray-500 text-sm">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-serif">{event.title}</h3>
                  <div className="text-gray-600 mb-2">
                    <p className="flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {event.time}
                    </p>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </p>
                  </div>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition duration-200">
                    Register to Attend
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-6 font-serif">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden opacity-75">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Past Event
                    </span>
                    <span className="text-gray-500 text-sm">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-serif">{event.title}</h3>
                  <div className="text-gray-600 mb-2">
                    <p className="flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {event.time}
                    </p>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </p>
                  </div>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
