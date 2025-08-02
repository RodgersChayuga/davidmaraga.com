const authUrl = process.env.MOOKHPAY_auth_url || 'https://mookhpay.com/api/login'
const transUrl = process.env.MOOKHPAY_trans_url || 'https://mookhpay.com/api/checkout/init/payment'

interface UserData {
  name: string
  phone: string
  email: string
  amount: number
}

export async function loginAndTransact(id: string, user_data: UserData, order_number: string) {
  try {
    // Login request
    const loginResponse = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        username: 'API-WWjRFg-2526@mookhpay.com',
        password: 'UadC74tUDM9v-233126',
      }),
    })

    if (!loginResponse.ok) {
      throw new Error('Failed to authenticate')
    }

    const loginData = await loginResponse.json()

    if (!loginData.status) {
      throw new Error('Authentication unsuccessful')
    }

    const token = loginData.token

    // Transaction request
    const transactionResponse = await fetch(transUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        payment_method: 'mpesa',
        currency: 'KES',
        amount: user_data.amount.toString(),
        customer_name: user_data.name,
        customer_phone: user_data.phone,
        customer_email: user_data.email,
        customer_address: null,
        order_number: 'MARAGA' + order_number,
        callback_url: 'https://www.davidmaraga.com/api/callback',
        ipn_url: 'https://www.davidmaraga.com/api/callback/' + id,
        callback_method: 'post',
        multiple_iframes: 1,
        checkout_mode: 1,
        custom_fields: [id],
      }),
    })
    const transactionData = await transactionResponse.json()
    console.log(transactionData)

    if (!transactionResponse.ok) {
      throw new Error('Transaction failed')
    }

    return transactionData
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
import { NextRequest, NextResponse } from 'next/server'

export function POST(req: NextRequest) {
  console.log(req.url)
  const urlParts = req.url.split('/')
  const internalId = urlParts[urlParts.length - 1]
  console.log(`Extracted internal ID: ${internalId}`)

  return NextResponse.json({ message: 'Callback received' })
}
