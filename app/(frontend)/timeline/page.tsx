import EventTimeline from '../components/EventTimeline'
import { getPayload } from 'payload'
import config from '@/payload.config'

async function getTimelineEvents() {
  const payload = await getPayload({ config })
  const events = await payload.find({
    collection: 'timeline',
    limit: 100, // Adjust limit as needed
  })
  return events.docs
}

export default async function TimelinePage() {
  const events = await getTimelineEvents()

  return (
    <main className="py-0 bg-gray-50">
      <div className="relative h-[200px] bg-green-700 mb-16 flex items-center justify-center">
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 font-serif">
            Timeline
          </h1>
        </div>
      </div>
      <EventTimeline events={events} />
    </main>
  )
}
