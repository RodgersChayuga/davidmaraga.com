"use client"

import Image from 'next/image'
import { useEffect } from 'react'

export default function HeroSection() {
  // Scroll reveal effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    const scrollElements = document.querySelectorAll(".scroll-reveal")
    scrollElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative bg-green-300 text-white py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=800&width=1200"
          alt="David Maraga Campaign"
          fill
          className="object-cover opacity-20 animate-fade-in"
          priority
        />
        <div className="absolute inset-0 bg-green-800 text-shadow-md"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-left">
            <div className="mb-6">
              <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-slide-in-down animate-delay-200">
                Presidential Campaign 2027
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight animate-fade-in-up animate-delay-300">
              Reset.
              <br />
              Restore.
              <br />
              <span className="text-yellow-300 animate-pulse-slow">Rebuild.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed font-light animate-fade-in-up animate-delay-400">
              Join David Maraga&apos;s vision for a better Kenya. Together, we can restore
              integrity, rebuild our institutions, and reset our nation&apos;s course toward
              prosperity and justice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-500">
              <a
                href="/volunteer"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 text-center transition duration-300 shadow-lg btn-political btn-animate hover-lift"
              >
                Join Our Movement
              </a>
              {/* <a
                href="/platform"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 text-center transition duration-300 shadow-lg btn-political btn-animate hover-lift"
              >
                View Our Platform
              </a> */}
              <a
                href="https://donations.davidmaraga.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 text-center transition duration-300 shadow-lg btn-political btn-animate hover-lift"
              >
                Contribute Now
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-right animate-delay-600">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl hover-lift animate-float">
              <Image
                src="/MARAGA.jpg"
                alt="David Maraga - Presidential Candidate 2027"
                fill
                className="object-cover transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 animate-slide-in-down animate-delay-800">
                <div className="bg-white/95 backdrop-blur-sm text-gray-900 p-6 rounded-xl hover-glow transition duration-300">
                  <h3 className="text-xl font-serif font-bold text-green-600 mb-2">David Maraga</h3>
                  <p className="text-gray-700 text-sm">Former Chief Justice of Kenya</p>
                  <p className="text-gray-600 text-sm">Presidential Candidate 2027</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
