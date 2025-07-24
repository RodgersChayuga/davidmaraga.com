/* eslint-disable */
'use client'

import React, { useState, useEffect } from 'react'

import './BulkSMSButton.css' // Scoped CSS for this component

interface VolunteerReason {
  id: string
  name: string
}

interface County {
  name: string
}

const BulkSMSButton: React.FC<{ collection: any; data: any }> = ({ collection, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [message, setMessage] = useState('')
  const [volunteerReasons, setVolunteerReasons] = useState<VolunteerReason[]>([])
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])
  const [counties, setCounties] = useState<County[]>([])
  const [selectedCounty, setSelectedCounty] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Volunteer Reasons
        const reasonsRes = await fetch('/api/volunteer-reasons')
        const reasonsData = await reasonsRes.json()
        setVolunteerReasons(reasonsData.docs)

        // Fetch Counties from counties.json
        const countiesRes = await fetch('/counties.json')
        const countiesData = await countiesRes.json()
        setCounties(countiesData)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load filtering options.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleReasonChange = (reasonId: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reasonId) ? prev.filter((id) => id !== reasonId) : [...prev, reasonId],
    )
  }

  const handleSendSMS = async () => {
    setSending(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/send-bulk-sms', { // You'll need to create this API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          volunteerReasonIds: selectedReasons,
          county: selectedCounty,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to send SMS.')
      }

      setSuccess('SMS sent successfully!')
      setMessage('')
      setSelectedReasons([])
      setSelectedCounty('')
      setIsModalOpen(false)
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <button type="button" className="button button--primary" onClick={() => setIsModalOpen(true)}>
        Send Bulk SMS
      </button>

      {isModalOpen && (
        <div className="modal bulk-sms-modal">
          <div className="bulk-sms-modal-content">
            <h2>Send Bulk SMS to Volunteers</h2>
            {loading && <p>Loading filters...</p>}
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <div className="form-group">
              <label htmlFor="sms-message">Message:</label>
              <textarea
                id="sms-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="form-group">
              <label>Filter by Volunteer Reason:</label>
              <div className="checkbox-group">
                {volunteerReasons.map((reason) => (
                  <label key={reason.id}>
                    <input
                      type="checkbox"
                      checked={selectedReasons.includes(reason.id)}
                      onChange={() => handleReasonChange(reason.id)}
                    />
                    {reason.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="county-select">Filter by County:</label>
              <select
                id="county-select"
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
              >
                <option value="">Select a County</option>
                {counties.map((county) => (
                  <option key={county.name} value={county.name}>
                    {county.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-actions">
              <button type="button" className="button button--secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="button button--primary"
                onClick={handleSendSMS}
                disabled={sending || !message.trim()}
              >
                {sending ? 'Sending...' : 'Send SMS'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BulkSMSButton