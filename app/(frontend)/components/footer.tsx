'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif">Campaign Headquarters</h3>
            <p className="text-gray-300">
              82 Westlands Rd, Nairobi, Kenya
              <br />
              +254 746 900 027
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/pillars" className="block text-gray-300 hover:text-white">
                Pillars
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white">
                About Us
              </Link>

              <Link href="/donate" className="block text-gray-300 hover:text-white">
                Donate
              </Link>
              <Link href="/volunteer" className="block text-gray-300 hover:text-white">
                Join the Movement
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif">Follow Us</h3>
            <div className="space-y-2">
              {/* <a href="#" className="block text-gray-300 hover:text-white">
                Facebook
              </a> */}
              <a
                href="https://twitter.com/dkmaraga"
                className="block text-gray-300 hover:text-white"
              >
                Twitter
              </a>

              <a
                href="https://www.youtube.com/@dkmaraga"
                className="block text-gray-300 hover:text-white"
              >
                YouTube
              </a>
              <Link href="/moments" className="block text-gray-300 hover:text-white">
                Moments
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 David Maraga Presidential Campaign. All rights reserved. 🇰🇪
          </p>
        </div>
      </div>
    </footer>
  )
}
