import type React from 'react'
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import './globals.css'
import Header from '../components/header'
import Footer from '../components/footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'David Maraga 2027 - Reset. Restore. Rebuild.',
  description:
    "Join David Maraga's presidential campaign for 2027. Together, we can build a Kenya that works for everyone through justice, integrity, and inclusive development.",

  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="7f015361-4e0b-4301-a965-735570a35c97"
        ></script>
        <meta property="og:title" content="David Maraga 2027 - Reset. Restore. Rebuild." />
        <meta
          property="og:description"
          content="Join David Maraga's presidential campaign for 2027. Together, we can build a Kenya that works for everyone through justice, integrity, and inclusive development."
        />
        <meta property="og:image" content="/MARAGA.jpg" />
        <meta property="og:url" content="https://davidmaraga.com" />
        <meta property="og:type" content="website" />
      </head>
      <body className="font-sans">
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
          <div className="min-h-screen bg-white">
            <NextTopLoader color="#34D399" />
            <Header />
            {children}
            <Footer />
          </div>
        </ReCaptchaProvider>
      </body>
    </html>
  )
}
