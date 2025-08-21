/* eslint-disable */
'use client'

import React, { useState, useEffect } from 'react'
import countiesData from '@/counties.json'

// Inline styles to avoid import map issues
const styles = {
  bulkSmsModal: {
    position: 'fixed' as const,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  bulkSmsModalContent: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '90%',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative' as const,
  },
  modalHeading: {
    fontSize: '1.5em',
    marginBottom: '20px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#555',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box' as const,
    fontSize: '1em',
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box' as const,
    fontSize: '1em',
  },
  checkboxGroup: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '10px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'normal',
    color: '#333',
  },
  checkbox: {
    marginRight: '5px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
  },
  buttonPrimary: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  buttonPrimaryDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
    color: 'white',
  },
  errorMessage: {
    color: '#e74c3c',
    marginBottom: '10px',
  },
  successMessage: {
    color: '#27ae60',
    marginBottom: '10px',
  },
}

interface VolunteerReason {
  id: string
  name: string
}

interface County {
  county_name: string
}

const BulkSMSButton: React.FC = () => {
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

        // Set Counties from imported data
        setCounties(countiesData as County[])
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
      <button type="button" style={{ ...styles.button, ...styles.buttonPrimary }} onClick={() => setIsModalOpen(true)}>
        Send Bulk SMS
      </button>

      {isModalOpen && (
        <div style={styles.bulkSmsModal}>
          <div style={styles.bulkSmsModalContent}>
            <h2 style={styles.modalHeading}>Send Bulk SMS to Volunteers</h2>
            {loading && <p>Loading filters...</p>}
            {error && <p style={styles.errorMessage}>{error}</p>}
            {success && <p style={styles.successMessage}>{success}</p>}

            <div style={styles.formGroup}>
              <label htmlFor="sms-message" style={styles.label}>Message:</label>
              <textarea
                id="sms-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
                style={styles.textarea}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Filter by Volunteer Reason:</label>
              <div style={styles.checkboxGroup}>
                {volunteerReasons.map((reason) => (
                  <label key={reason.id} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedReasons.includes(reason.id)}
                      onChange={() => handleReasonChange(reason.id)}
                      style={styles.checkbox}
                    />
                    {/* @ts-ignore */}
                    {(reason.reason)}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="county-select" style={styles.label}>Filter by County:</label>
              <select
                id="county-select"
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                style={styles.select}
              >
                <option value="">Select a County</option>
                {counties.map((county) => (
                  <option key={county.county_name} value={county.county_name}>
                    {county.county_name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.modalActions}>
              <button type="button" style={{ ...styles.button, ...styles.buttonSecondary }} onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                style={{ ...styles.button, ...styles.buttonPrimary, ...(sending || !message.trim() ? styles.buttonPrimaryDisabled : {}) }}
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
