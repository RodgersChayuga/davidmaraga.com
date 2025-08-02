'use client'

import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Inline styles to avoid import map issues
const styles = {
  graphContainer: {
    padding: '1rem',
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    marginBottom: '1rem',
  },
  heading: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  // ... (rest of the styles are the same)
}

interface CountyData {
  county: string
  count: number
}

interface Volunteer {
  county: string
}

const VolunteersInCountiesGraph: React.FC = () => {
  const [data, setData] = useState<CountyData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query VolunteersByCounty {
                Volunteers(limit: 1000) {
                  docs {
                    county
                  }
                }
              }
            `,
          }),
        })
        const json = await res.json()
        const volunteers = json.data.Volunteers.docs

        const countsByCounty = volunteers.reduce(
          (acc: Record<string, number>, volunteer: Volunteer) => {
            const county = volunteer.county || 'Unknown'
            acc[county] = (acc[county] || 0) + 1
            return acc
          },
          {} as Record<string, number>,
        )

        const chartData: CountyData[] = Object.entries(countsByCounty).map(([county, count]) => ({
          county,
          count: count as number,
        }))

        // Sort data from highest to lowest
        chartData.sort((a, b) => b.count - a.count)

        setData(chartData)
      } catch (error) {
        console.error('Error fetching volunteer data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={styles.graphContainer}>
      <h2 style={styles.heading}>Volunteers by County</h2>
      {/* <h3 style={{ ...styles.heading, fontSize: '1rem', color: '#6b7280' }}>
        {data.length} {data.length === 1 ? 'county' : 'counties'} with volunteers
      </h3> */}

      {loading ? (
        <p>Loading graph data...</p>
      ) : data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="county" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No volunteer data available.</p>
      )}

      {/* {countiesWithoutVolunteers.length > 0 && (
        <div>
          <h3 style={{...styles.heading, marginTop: '2rem'}}>
            {countiesWithoutVolunteers.length} {countiesWithoutVolunteers.length === 1 ? 'county' : 'counties'} without volunteers:
          </h3>
          <ul>
            {countiesWithoutVolunteers.map(county => (
              <li key={county}>{county}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  )
}

export default VolunteersInCountiesGraph
