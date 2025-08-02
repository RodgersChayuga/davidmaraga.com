'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#ffffff',
          border: '1px solid #d3d3d3',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          color: '#4a5568',
          transition: 'background-color 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        id="menu-button"
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        <svg
          style={{
            width: '20px',
            height: '20px',
            fill: '#4a5568',
          }}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 6h18a1 1 0 100-2H3a1 1 0 100 2zM3 12h18a1 1 0 100-2H3a1 1 0 100 2zM3 18h18a1 1 0 100-2H3a1 1 0 100 2z" />
        </svg>
      </button>

      <div
        style={{
          position: 'absolute',
          right: 0,
          marginTop: '8px',
          width: '224px',
          borderRadius: '4px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0,0,0,0.1)',
          transform: isOpen ? 'scale(1)' : 'scale(0.95)',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'all 0.2s ease-in-out',
          zIndex: 1000,
        }}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div
          style={{
            padding: '8px 0',
          }}
          role="none"
        >
          <Link
            href="/admin"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              fontSize: '14px',
              color: '#4a5568',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
              width: '100%',
            }}
            role="menuitem"
            id="menu-item-0"
          >
            <svg
              style={{
                width: '20px',
                height: '20px',
                fill: '#a0aec0',
              }}
              viewBox="0 0 20 20"
            >
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5h-5a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            Admin Home
          </Link>
          <Link
            href="/admin/analytics"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              fontSize: '14px',
              color: '#4a5568',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
              width: '100%',
            }}
            role="menuitem"
            id="menu-item-1"
          >
            <svg
              style={{
                width: '20px',
                height: '20px',
                fill: '#a0aec0',
              }}
              viewBox="0 0 20 20"
            >
              <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" />
            </svg>
            Analytics
          </Link>
          <Link
            href="/admin/account"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              fontSize: '14px',
              color: '#4a5568',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
              width: '100%',
            }}
            role="menuitem"
            id="menu-item-2"
          >
            <svg
              style={{
                width: '20px',
                height: '20px',
                fill: '#a0aec0',
              }}
              viewBox="0 0 20 20"
            >
              <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" />
            </svg>
            Account
          </Link>
          <Link
            href="/admin/logout"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              fontSize: '14px',
              color: '#4a5568',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
              width: '100%',
            }}
            role="menuitem"
            id="menu-item-3"
          >
            <svg
              style={{
                width: '20px',
                height: '20px',
                fill: '#a0aec0',
              }}
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                clipRule="evenodd"
              />
            </svg>
            Logout
          </Link>
        </div>
      </div>
    </div>
  )
}
