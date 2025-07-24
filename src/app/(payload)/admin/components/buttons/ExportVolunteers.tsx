'use client'

import React from 'react'

interface Volunteer {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  county: string;
  constituency: string;
  ward: string;
  pollingStation: string;
  additionalInfo: string;
}

const ExportVolunteersButton: React.FC = () => {
  const handleExport = async () => {
    try {
      const initialResponse = await fetch('/api/volunteers?limit=1')
      if (!initialResponse.ok) {
        throw new Error(`HTTP error! status: ${initialResponse.status}`)
      }

      const initialData = await initialResponse.json()
      const totalRecords = initialData.totalDocs

      const response = await fetch(`/api/volunteers?limit=${totalRecords}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const volunteers = await response.json()

      const csvContent = [
        [
          'First Name',
          'Last Name',
          'Phone',
          'Email',
          'County',
          'Constituency',
          'Ward',
          'Polling Station',
          'Additional Info',
        ],
        ...volunteers.docs.map((v: Volunteer) => [
          v.firstName,
          v.lastName,
          v.phone,
          v.email,
          v.county,
          v.constituency,
          v.ward,
          v.pollingStation,
          v.additionalInfo,
        ]),
      ]
        .map((e) => e.join(','))
        .join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      if (link.href) {
        URL.revokeObjectURL(link.href)
      }
      const url = URL.createObjectURL(blob)
      link.href = url
      link.setAttribute('download', 'volunteers.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting volunteers:', error)
      alert('Failed to export volunteers. Please check the console for details.')
    }
  }

  return (
    <button onClick={handleExport} className="">
      Export Volunteers
    </button>
  )
}

export default ExportVolunteersButton
