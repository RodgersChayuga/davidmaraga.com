'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 animate-slide-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center animate-fade-in-left">
            <Image
              src="/logo.jpg"
              alt="Maraga 2027"
              width={300}
              height={100}
              className="h-12 w-auto hover-scale transition duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 animate-fade-in">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 font-medium transition duration-300 hover-lift animate-fade-in animate-delay-100"
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsAboutDropdownOpen(true)}
              onMouseLeave={() => setIsAboutDropdownOpen(false)}
            >
              <button className="text-gray-700 hover:text-green-600 font-medium transition cursor-pointer pb-4 duration-300 hover-lift animate-fade-in animate-delay-200 focus:outline-none">
                About Maraga
                <svg
                  className={`w-4 h-4 inline-block ml-1 transform transition-transform duration-200 ${
                    isAboutDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isAboutDropdownOpen && (
                <div className="absolute left-0  w-48 bg-white rounded-md shadow-lg py-1 z-20 animate-fade-in animate-delay-100">
                  <Link
                    href="/moments"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                    onClick={() => setIsAboutDropdownOpen(false)}
                  >
                    Maraga&apos;s Moments
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                    onClick={() => setIsAboutDropdownOpen(false)}
                  >
                    Leadership Profile
                  </Link>
                  <Link
                    href="/pillars"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600"
                    onClick={() => setIsAboutDropdownOpen(false)}
                  >
                    Campaign Pillars
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/press"
              className="text-gray-700 hover:text-green-600 font-medium transition duration-300 hover-lift animate-fade-in animate-delay-300"
            >
              Press
            </Link>

            <Link
              href="/volunteer"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium transition duration-300 btn-animate hover-lift animate-fade-in animate-delay-400"
            >
              Join the Movement
            </Link>
            <Link
            href="https://donate.davidmaraga.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium transition duration-300 btn-animate hover-lift animate-fade-in-delay-500"
          >
            Donate
          </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden transition duration-300 hover:scale-110 animate-fade-in-right"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 font-medium py-2 px-2 transition duration-300 hover:translate-x-2 animate-fade-in-left animate-delay-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <button
              className="text-gray-700 hover:text-green-600 font-medium cursor-pointer py-2 px-2 transition duration-300 hover:translate-x-2 animate-fade-in-left animate-delay-200 text-left"
              onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
            >
              About Maraga
              <svg
                className={`w-4 h-4 inline-block ml-1 transform transition-transform duration-200 ${
                  isAboutDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isAboutDropdownOpen && (
              <div className="flex flex-col pl-4 space-y-2 animate-fade-in animate-delay-100">
                <Link
                  href="/moments"
                  className="text-gray-700 hover:text-green-600 font-medium py-2 px-2 transition duration-300 hover:translate-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Maraga&apos;s Moments
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-green-600 font-medium py-2 px-2 transition duration-300 hover:translate-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Leadership Profile
                </Link>
                <Link
                  href="/pillars"
                  className="text-gray-700 hover:text-green-600 font-medium py-2 px-2 transition duration-300 hover:translate-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Campaign Pillars
                </Link>
              </div>
            )}
            <Link
              href="/press"
              className="text-gray-700 hover:text-green-600 font-medium py-2 px-2 transition duration-300 hover:translate-x-2 animate-fade-in-left animate-delay-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Press
            </Link>
            <Link
              href="/volunteer"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium inline-block text-center transition duration-300 btn-animate hover-lift animate-fade-in-left animate-delay-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Join the Movement
            </Link>
            <Link
              href="/donate"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium inline-block text-center transition duration-300 btn-animate hover-lift animate-fade-in-left animate-delay-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
