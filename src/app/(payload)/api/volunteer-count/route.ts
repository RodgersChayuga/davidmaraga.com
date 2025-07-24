import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest) {
  try {
    const payload = await getPayload({
      config,
    })

    const volunteers = await payload.find({
      collection: 'volunteers',
      limit: 1, // Only need totalDocs, so limit to 1
    })

    return NextResponse.json({
      totalVolunteers: volunteers.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching volunteer count:', error)
    return NextResponse.json(
      { error: 'Failed to fetch volunteer count' },
      { status: 500 }
    )
  }
}