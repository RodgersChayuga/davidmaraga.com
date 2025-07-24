import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  const payload = await getPayload({
    config,
  })

  const volunteerReasons = await payload.find({
    collection: 'volunteer-reasons',
  })

  return Response.json(volunteerReasons)
}
