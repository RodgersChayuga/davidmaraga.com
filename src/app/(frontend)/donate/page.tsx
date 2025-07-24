'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import DonationForm from '../components/DonationForm'

export default function DonatePage() {
  const [selectedTab, setSelectedTab] = useState('mpesa')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://donorbox.org/widget.js'
    script.async = true
    script.onload = () => {}
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <main className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Support Our Campaign</h1>
          <p className="text-xl text-gray-600">
            Your contribution helps us Reset, Restore, and Rebuild Kenya
          </p>
        </div>

        <div className="lg:hidden mb-4 border-b border-gray-200">
          <div className="flex -mb-px">
            <button
              onClick={() => setSelectedTab('mpesa')}
              className={`w-1/2 py-4 px-1 text-center font-medium text-sm border-b-2 ${
                selectedTab === 'mpesa'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              M-Pesa
            </button>
            <button
              onClick={() => setSelectedTab('diaspora')}
              className={`w-1/2 py-4 px-1 text-center font-medium text-sm border-b-2 ${
                selectedTab === 'diaspora'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Diaspora/Card/Paypal
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className={`${selectedTab !== 'mpesa' && 'hidden'} lg:block`}>
            <DonationForm />
          </div>

          {/* Diaspora Section */}
          <div className={`${selectedTab !== 'diaspora' && 'hidden'} lg:block`}>
            <div className="bg-white shadow-md p-8 max-h-[800px]">
              <h2 className="text-2xl font-bold text-green-600 mb-6 font-serif">
                Diaspora, Credit Card, Paypal etc
              </h2>
              <div className="relative w-full max-w-[500px] mx-auto">
                <iframe
                  src="https://donorbox.org/embed/friends-of-maraga?"
                  name="donorbox"
                  seamless={true}
                  frameBorder="0"
                  scrolling="no"
                  height="900px"
                  width="100%"
                  style={{ maxHeight: 'none !important' }}
                  allow="payment"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Why Donate Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-bold text-green-600 mb-4 font-serif">
            Why Your Support Matters
          </h3>
          <div className="space-y-4 text-gray-700">
            <p>
              Your contribution directly supports our mission to Reset, Restore, and Rebuild Kenya
              through constitutional governance and transformative leadership.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-600 mr-2 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Fund grassroots organizing and community outreach
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-600 mr-2 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Support campaign events and town halls
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-600 mr-2 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Enable digital outreach and communication
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-600 mr-2 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Build a nationwide network of supporters
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
