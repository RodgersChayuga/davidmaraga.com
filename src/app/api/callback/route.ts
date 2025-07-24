import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config })

  // const internalId = urlParts[urlParts.length - 1]
  // console.log(`Extracted internal ID: ${internalId}`)

  const mookh_response = await req.json()
  // const internalId = mookh_response.custom_fields[0]

  console.log(mookh_response.status)

  await payload.create({
    collection: 'logs',
    data: {
      title: 'Callback Received',
      log: JSON.stringify(mookh_response),
    },
  })

  // console.log('Log entry created:', logEntry)

  // const transactionRequest = await payload.find({
  //   collection: 'transaction-request-payloads',

  //   where: {
  //     internal_id: {
  //       equals: internalId,
  //     },
  //   },
  // })

  // const updatedTransactionRequest = await payload.update({
  //   collection: 'transaction-request-payloads',
  //   id: transactionRequest.docs[0].id,
  //   data: {
  //     callback_data: mookh_response,
  //   },
  // })

  // console.log('Transaction request updated with callback data:', updatedTransactionRequest)

  // if (transactionRequest.docs.length > 0) {
  //   console.log(
  //     `Transaction request found for internal ID: ${internalId}`,
  //     transactionRequest.docs[0],
  //   )
  //   const transaction = transactionRequest.docs[0]
  //   console.log(typeof transaction.user_data)
  //   const user = (transaction.user_data as User) || {
  //     name: '',
  //     email: '',
  //     phone: '',
  //     amount: 0,
  //     message: '',
  //   }

  //   const donation = {
  //     amount: user.amount,
  //     name: user.name,
  //     email: user.email,
  //     phone: user.phone,
  //     message: user.message,
  //     verify_id: transaction.verify_id,
  //   }

  //   const newDonation = await payload.create({
  //     collection: 'donations',
  //     data: {
  //       name: donation.name,
  //       email: donation.email,
  //       phone: donation.phone,
  //       verify_id: donation.verify_id ?? '',
  //       amount: donation.amount,
  //       message: donation.message,
  //     },
  //   })

  //   console.log('New donation created:', newDonation)
  // } else {
  //   console.warn(`No transaction request found for internal ID: ${internalId}`)
  //   return NextResponse.json(
  //     { message: 'No transaction request found for this internal ID' },
  //     { status: 404 },
  //   )
  // }
  //return NextResponse.json({ message: 'Callback received' })

  return NextResponse.json({ message: 'Callback received' })
}
