'use client'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import Image from 'next/image'

interface Timeline {
  id: number
  title: string
  date: Date
  description?: string | null
  link?: string | null
  label?: string | null
  media?: Array<{
    id: number
    url?: string
    alt?: string
  }>
}

const EventTimeline = ({ events }: { events: Timeline[] }) => {
  return (
    <VerticalTimeline lineColor="green">
      {events.map((event) => {
        const media = event.media?.[0]
        return (
          <VerticalTimelineElement
            key={event.id}
            className="vertical-timeline-element--work"
            contentStyle={{
              background: 'white',
              color: 'black',
              borderTopColor: 'green',
              borderTopWidth: '2px',
              borderStyle: 'solid',
            }}
            contentArrowStyle={{ borderRight: '7px solid  green' }}
            date={new Date(event.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
            iconStyle={{ background: 'green', color: 'white' }}
          >
            <h3 className="vertical-timeline-element-title text-2xl">{event.title}</h3>
            {event.description && <p className="font-thin">{event.description}</p>}
            {media && media.url && (
              <Image
                src={media.url}
                alt={media.alt || 'Timeline Image'}
                width={500}
                height={300}
                className="w-full h-auto mt-4"
              />
            )}
            {event.link && event.label && (
              <a href={event.link} className="text-blue-300 hover:underline mt-4 inline-block">
                {event.label}
              </a>
            )}
          </VerticalTimelineElement>
        )
      })}
    </VerticalTimeline>
  )
}

export default EventTimeline
