import type React from 'react'
import VolunteerForm from '../components/VolunteerForm'
import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { VolunteerReason } from '@/payload-types'

const getVolunteerReasons = cache(async (): Promise<VolunteerReason[]> => {
  const payload = await getPayload({ config })
  const reasons = await payload.find({
    collection: "volunteer-reasons",
  })
  return reasons.docs
})

export default async function VolunteerPage() {
  const volunteerReasons = await getVolunteerReasons()

  return (
    <main>
      <section>
        <VolunteerForm volunteerReasons={volunteerReasons} />
      </section>
    </main>
  )
}
