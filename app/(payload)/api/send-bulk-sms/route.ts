/* eslint-disable */
import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'

export async function POST(req: NextRequest) {
  try {
    const { message, volunteerReasonIds, county } = await req.json()

    if (!message) {
      return NextResponse.json({ message: 'Message is required.' }, { status: 400 })
    }

    // Build query for volunteers
    const query: any = {
      _status: { equals: 'published' },
    }

    if (volunteerReasonIds && volunteerReasonIds.length > 0) {
      query['volunteering'] = { in: volunteerReasonIds }
    }

    if (county) {
      query['county'] = { equals: county }
    }

    const volunteers = await payload.find({
      collection: 'volunteers',
      where: query,
      limit: 9999, // Adjust limit as needed, or implement pagination
    })

    const phoneNumbers = volunteers.docs.map((volunteer) => volunteer.phone).filter(Boolean)

    if (phoneNumbers.length === 0) {
      return NextResponse.json(
        { message: 'No volunteers found matching the criteria.' },
        { status: 404 },
      )
    }

    // TODO: Integrate with an actual SMS gateway (e.g., Twilio, Africa's Talking)
    // Example: await smsGateway.send(phoneNumbers, message);

    return NextResponse.json({ message: 'SMS sending initiated.', sentTo: phoneNumbers.length })
  } catch (error: any) {
    console.error('Error sending bulk SMS:', error)
    return NextResponse.json(
      { message: error.message || 'Internal server error.' },
      { status: 500 },
    )
  }
}
