'use client'

import React, { useState } from 'react'
import { createTransaction, checkVerificationStatus } from './actions'
import { Toaster, toast } from 'react-hot-toast'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const DonationForm: React.FC = () => {
  const donationOptions = [100, 1000, 5000, 10000, 50000]
  const [selectedAmount, setSelectedAmount] = useState<number | 'other'>(100)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [donatedName, setDonatedName] = useState('')

  const handleAmountChange = (amount: number | 'other') => {
    setSelectedAmount(amount)
    if (amount !== 'other') {
      setCustomAmount('')
    }
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!isNaN(Number(value)) || value === '') {
      setCustomAmount(value)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSuccess(false) // Reset success state on new submission
    const finalAmount = selectedAmount === 'other' ? Number(customAmount) : selectedAmount
    const data = {
      amount: finalAmount,
      ...formData,
    }

    try {
      const result = await createTransaction(data)
      if (result.success) {
        // Removed initial toast message
        while (true) {
          const success = await checkVerificationStatus(result.verifyID as string)

          if (success.success) {
            setIsLoading(false)
            setIsSuccess(true)
            setDonatedName(formData.name)
            setSelectedAmount(100)
            setCustomAmount('')
            setFormData({
              name: '',
              phone: '',
              email: '',
              message: '',
            })
            break
          }
          await new Promise((resolve) => setTimeout(resolve, 3000)) // Wait for 3 seconds before re-checking
        }
      } else {
        setIsLoading(false)
        toast.error(`Donation failed: ${result.message}`)
      }
    } catch (error) {
      console.error('Error creating transaction:', error)
      setIsLoading(false)
      toast.error('An unexpected error occurred during donation.')
    } finally {
      // Removed finally block as state is set within try/catch
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-100 bordert-t-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[500px] text-center">
        <h3 className="font-bold text-lg mb-2">Thank You, {donatedName}!</h3>
        <p>Your generous contribution has been successfully processed.</p>
        <p>We appreciate your support!</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 min-h-[700px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mb-4"></div>
        <p className="text-lg font-semibold text-gray-700 mb-2">Processing your donation...</p>
        <p className="text-gray-600 text-center">
          Please check your phone to complete the payment.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold text-green-600 mb-6 font-serif">
        Make your contribution with M-Pesa
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Choose Amount (KES)</label>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {donationOptions.map((amount) => (
              <button
                key={amount}
                type="button"
                className={`w-full px-5 py-2 rounded-lg border-2 ${selectedAmount === amount
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
                  } transition-colors duration-200`}
                onClick={() => handleAmountChange(amount)}
              >
                {amount.toLocaleString()}
              </button>
            ))}
            <button
              type="button"
              className={`w-full px-5 py-2 rounded-lg border-2 ${selectedAmount === 'other'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
                } transition-colors duration-200`}
              onClick={() => handleAmountChange('other')}
            >
              Other
            </button>
          </div>
          {selectedAmount === 'other' && (
            <div>
              <input
                type="text"
                name="customAmount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Enter custom amount"
                className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                required
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number (eg +254720123456)
          </label>
          <PhoneInput
            id="phone"
            international
            countries={['KE']}
            defaultCountry="KE"
            value={formData.phone}
            onChange={(value) => setFormData((prev) => ({ ...prev, phone: value || '' }))}
            required
            className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="+254 700 000 000"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
            Optional Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 w-full flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Processing...
            </div>
          ) : (
            'Donate Now'
          )}
        </button>
      </form>
    </div>
  )
}

export default DonationForm
