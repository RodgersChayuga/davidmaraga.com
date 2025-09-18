import type React from 'react'
import VolunteerForm from '../../components/VolunteerForm'
import { cache } from 'react'
import { prisma } from '@/lib/prisma'

const getVolunteerReasons = cache(async () => {
  const reasons = await prisma.volunteerReason.findMany({
    orderBy: { created_at: 'asc' },
  })
  return reasons
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
