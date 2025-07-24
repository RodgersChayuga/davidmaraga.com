'use client'

import React, { useState } from 'react'
import stationsData from '../../../../stations.json'
import toast, { Toaster } from 'react-hot-toast'
import 'react-phone-number-input/style.css'
import { createVolunteer } from './actions'
import { useReCaptcha } from 'next-recaptcha-v3'
import type { VolunteerReason } from '@/payload-types'

interface PollingStation {
  name: string
}

interface Ward {
  name: string
  pollingStations: PollingStation[]
}

interface Constituency {
  name: string
  wards: Ward[]
}

interface County {
  name: string
  constituencies: Constituency[]
}

const initialFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  volunteering: [] as number[],
  additionalInfo: '',
  county: '',
  constituency: '',
  ward: '',
  pollingStation: '',
}

export default function VolunteerForm({
  volunteerReasons,
}: {
  volunteerReasons: VolunteerReason[]
}) {
  const { executeRecaptcha } = useReCaptcha()
  const [formData, setFormData] = useState(initialFormData)
  const [selectedCounty, setSelectedCounty] = useState<County | null>(null)
  const [selectedConstituency, setSelectedConstituency] = useState<Constituency | null>(null)
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null)
  const [submittingForm, setSubmittingForm] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarType, setSnackbarType] = useState<'success' | 'error' | ''>('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countyName = e.target.value
    const county = stationsData.find((c) => c.name === countyName)
    setSelectedCounty(county || null)
    setSelectedConstituency(null)
    setSelectedWard(null)
    setFormData((prev) => ({
      ...prev,
      county: countyName,
      constituency: '',
      ward: '',
      pollingStation: '',
    }))
  }

  const handleConstituencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const constituencyName = e.target.value
    const constituency = selectedCounty?.constituencies.find(
      (c: Constituency) => c.name === constituencyName,
    )
    setSelectedConstituency(constituency || null)
    setSelectedWard(null)
    setFormData((prev) => ({
      ...prev,
      constituency: constituencyName,
      ward: '',
      pollingStation: '',
    }))
  }

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const wardName = e.target.value
    const ward = selectedConstituency?.wards.find((w: Ward) => w.name === wardName)
    setSelectedWard(ward || null)
    setFormData((prev) => ({
      ...prev,
      ward: wardName,
      pollingStation: '',
    }))
  }

  const handleVolunteeringChange = (reasonId: number, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      volunteering: checked
        ? [...prev.volunteering, reasonId]
        : prev.volunteering.filter((id) => id !== reasonId),
    }))
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    setSnackbarMessage(message)
    setSnackbarType(type)
    setShowSnackbar(true)
    setTimeout(() => {
      setShowSnackbar(false)
      setSnackbarMessage('')
      setSnackbarType('')
    }, 3000) // Hide after 3 seconds
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittingForm(true)

    if (!formData.phone) {
      toast.error('Please enter your phone number.')
      setSubmittingForm(false)
      return
    }

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }

    const token = await executeRecaptcha('volunteer_form_submit')

    try {
      const result = await createVolunteer(formData, token)

      if (result.success) {
        //showNotification('Thank you for signing up! We'll be in touch soon.', 'success')
        toast.success("Thank you for signing up! We'll be in touch soon.", { duration: 5000 })
        // Track volunteer event with county, constituency, ward, and polling station
        if (window.umami) {
          window.umami.track('Volunteer', {
            county: formData.county,
            constituency: formData.constituency,
            ward: formData.ward,
            pollingStation: formData.pollingStation,
          })
        }

        // setFormData(initialFormData) // Clear form
        setSelectedCounty(null)
        setSelectedConstituency(null)
        setSelectedWard(null)
        setShowSuccessMessage(true)
        // Update total volunteers after successful submission
      } else {
        showNotification('Something went wrong. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      showNotification('Something went wrong. Please try again.', 'error')
    } finally {
      setSubmittingForm(false)
    }
  }

  if (showSuccessMessage) {
    return (
      <section
        id="volunteer-form"
        className="py-20 bg-green-600 text-white relative overflow-hidden "
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in">
              Thank You!
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 animate-fade-in-up animate-delay-200">
              {`Asante ${formData.firstName} `}
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
              Your commitment to our movement is invaluable. We&apos;ll be in touch soon with more
              information on how you can make a difference.
            </p>
            <p className="text-xl text-green-100 max-w-3xl mx-auto animate-fade-in-up animate-delay-300 mt-8">
              Please consider supporting our cause by making a donation.
            </p>
            <a
              href="/donate"
              className="mt-4 inline-block px-6 py-3 bg-white text-green-600 rounded-md shadow-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Donate Now
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="volunteer-form"
      className="py-20 bg-green-600 text-white relative overflow-hidden "
    >
      <Toaster position="top-right" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-shimmer"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in">
            Get Involved
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 animate-fade-in-up animate-delay-200">
            Join Our Movement
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
            Be part of the change Kenya needs. Your voice and action can help Reset, Restore, and
            Rebuild our nation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-scale-in animate-delay-400">
          <div className="bg-white/95 backdrop-blur-sm text-gray-900 p-8 md:p-12 rounded-xl shadow-2xl hover-lift">
            <h3 className="text-3xl font-serif font-bold mb-6 text-green-600 text-center animate-fade-in">
              Volunteer with Us
            </h3>
            <p className="text-gray-600 mb-8 text-center animate-fade-in animate-delay-200">
              Fill out the form below to join thousands of Kenyans working to bring positive change
              to our country.
            </p>
            {/*
            <div
              className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
              role="alert"
            >
              <p className="font-bold">Please note</p>
              <p>The volunteer form is currently disabled. We will be open soon.</p>
            </div> */}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <fieldset>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 font-serif">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                        }
                        required
                        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                        }
                        required
                        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        📞 Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="text"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        required
                        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        ✉️ Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        required
                        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2 font-serif">
                    📍 Location Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="county" className="block text-sm font-medium text-gray-700">
                        County *
                      </label>
                      <select
                        id="county"
                        value={formData.county}
                        onChange={handleCountyChange}
                        required
                        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                      >
                        <option value="">Select county</option>
                        {stationsData.map((county) => (
                          <option key={county.name} value={county.name}>
                            {county.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="constituency"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Constituency *
                      </label>
                      <select
                        id="constituency"
                        value={formData.constituency}
                        onChange={handleConstituencyChange}
                        disabled={!selectedCounty}
                        required
                        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Select constituency</option>
                        {selectedCounty?.constituencies.map((constituency: Constituency) => (
                          <option key={constituency.name} value={constituency.name}>
                            {constituency.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="ward" className="block text-sm font-medium text-gray-700">
                        Ward *
                      </label>
                      <select
                        id="ward"
                        value={formData.ward}
                        onChange={handleWardChange}
                        disabled={!selectedConstituency}
                        required
                        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Select ward</option>
                        {selectedConstituency?.wards.map((ward: Ward) => (
                          <option key={ward.name} value={ward.name}>
                            {ward.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="pollingStation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Polling Station
                      </label>
                      <select
                        value={formData.pollingStation}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, pollingStation: e.target.value }))
                        }
                        disabled={!selectedWard}
                        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Select a polling station</option>
                        {selectedWard?.pollingStations.map((station) => (
                          <option key={station.name} value={station.name}>
                            {station.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Volunteering Interests */}
                <div className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 font-serif">
                    🤝 Volunteering Interests
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {volunteerReasons.map((reason) => (
                      <div
                        key={reason.id}
                        className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          id={reason.id.toString()}
                          checked={formData.volunteering.includes(reason.id)}
                          onChange={(e) => handleVolunteeringChange(reason.id, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={reason.id.toString()}
                          className="cursor-pointer flex-1 text-sm font-medium text-gray-700"
                        >
                          {reason.reason}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 font-serif">
                    💬 Additional Information
                  </h3>
                  <div className="space-y-2">
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tell us more about yourself (optional)
                    </label>
                    <textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))
                      }
                      placeholder="Share any additional information, skills, or experience that might be relevant to your volunteer work..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={submittingForm}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-red-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingForm ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Join as Volunteer 🚀'
                )}
                {/* Change button text when submitting */}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Snackbar Notification */}
      {showSnackbar && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-lg shadow-lg text-white transition-all duration-300 ease-in-out
            ${snackbarType === 'success' ? 'bg-green-500' : 'bg-red-500'}
            ${showSnackbar ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          onClick={() => setShowSnackbar(false)}
          style={{ zIndex: 9999 }}
        >
          <div className="flex items-center justify-between">
            <span>{snackbarMessage}</span>
            <button
              type="button"
              onClick={() => setShowSnackbar(false)}
              className="text-white hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
