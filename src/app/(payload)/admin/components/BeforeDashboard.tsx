'use client'
import React, { useEffect, useState } from 'react'
import VolunteersInCountiesGraph from './VolunteersInCountiesGraph'
import styled from 'styled-components'

interface Donation {
  amount: number
}

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
  padding: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const StatCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
`

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CardText = styled.div`
  flex: 1;
`

const CardLabel = styled.h3`
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`

const CardNumber = styled.p`
  color: #1f2937;
  font-size: 24px;
  font-weight: 700;
  margin: 8px 0 0;
`

const IconCircle = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  padding: 12px;
`

const Icon = styled.svg`
  width: 24px;
  height: 24px;
  fill: none;
`

const BeforeDashboard = () => {
  const [totalVolunteers, setTotalVolunteers] = useState<number | null>(null)
  const [donationStats, setDonationStats] = useState({ total: 0, largest: 0, average: 0, count: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [volunteersRes, donationsRes] = await Promise.all([
          fetch('/api/volunteers?limit=1'),
          fetch('/api/donations?limit=10000'), // Adjust limit as needed
        ])

        const volunteersData = await volunteersRes.json()
        setTotalVolunteers(volunteersData.totalDocs)

        const donationsData = await donationsRes.json()
        if (donationsData.docs && donationsData.docs.length > 0) {
          const amounts = donationsData.docs.map((d: Donation) => d.amount)
          const total = amounts.reduce((acc: number, cur: number) => acc + cur, 0)
          const largest = Math.max(...amounts)
          const average = total / amounts.length
          const count = donationsData.totalDocs
          setDonationStats({ total, largest, average, count })
        } else {
          setDonationStats({ total: 0, largest: 0, average: 0, count: 0 })
        }
      } catch (error) {
        console.error('Error fetching data for dashboard:', error)
        setTotalVolunteers(0)
        setDonationStats({ total: 0, largest: 0, average: 0, count: 0 })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div style={{ padding: '16px' }}>Loading...</div>
  }

  return (
    <Container>
      <StatsGrid>
        {/* Volunteers Card */}
        <StatCard>
          <CardContent>
            <CardText>
              <CardLabel>Total Volunteers</CardLabel>
              <CardNumber>{totalVolunteers}</CardNumber>
            </CardText>
            <IconCircle color="#e0f2fe">
              <Icon viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="#1d4ed8"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </Icon>
            </IconCircle>
          </CardContent>
        </StatCard>

        {/* Number of Contributions Card */}
        <StatCard>
          <CardContent>
            <CardText>
              <CardLabel># Contributions</CardLabel>
              <CardNumber>{donationStats.count}</CardNumber>
            </CardText>
            <IconCircle color="#dcfce7">
              <Icon viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="#10b981"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </Icon>
            </IconCircle>
          </CardContent>
        </StatCard>

        {/* Donations Card */}
        <StatCard>
          <CardContent>
            <CardText>
              <CardLabel>Total Contributions</CardLabel>
              <CardNumber>Ksh {donationStats.total.toLocaleString()}</CardNumber>
            </CardText>
            <IconCircle color="#dcfce7">
              <Icon viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="#10b981"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </Icon>
            </IconCircle>
          </CardContent>
        </StatCard>

        {/* Largest Donation Card */}
        <StatCard>
          <CardContent>
            <CardText>
              <CardLabel>Largest Contribution</CardLabel>
              <CardNumber>Ksh {donationStats.largest.toLocaleString()}</CardNumber>
            </CardText>
            <IconCircle color="#dcfce7">
              <Icon viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="#10b981"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </Icon>
            </IconCircle>
          </CardContent>
        </StatCard>

        {/* Average Donation Card */}
        <StatCard>
          <CardContent>
            <CardText>
              <CardLabel>Average Contribution</CardLabel>
              <CardNumber>
                Ksh{' '}
                {donationStats.average.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </CardNumber>
            </CardText>
            <IconCircle color="#dcfce7">
              <Icon viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="#10b981"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </Icon>
            </IconCircle>
          </CardContent>
        </StatCard>

        {/* Impact Stats */}
        {/* <StatCard>
          <CardContent>
            <CardText>
              <CardLabel>Events</CardLabel>
              <CardNumber>42</CardNumber>
            </CardText>
            <IconCircle color="#ede9fe">
              <Icon viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="#9333ea"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </Icon>
            </IconCircle>
          </CardContent>
        </StatCard> */}

        {/* <StatCard>
          <CardContent>
            <CardText>
              <CardLabel>Event Attendees</CardLabel>
              <CardNumber>120,500</CardNumber>
            </CardText>
            <IconCircle color="#fef3c7">
              <Icon viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="#d97706"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707"
                />
              </Icon>
            </IconCircle>
          </CardContent>
        </StatCard> */}

        {/*
       <BulkSMSButton /> */}
      </StatsGrid>
      <VolunteersInCountiesGraph />
    </Container>
  )
}

export default BeforeDashboard
