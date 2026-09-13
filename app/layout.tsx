import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

import Cursor from '@/components/motion/Cursor'
import SmoothScroll from '@/components/motion/SmoothScroll'
import { person, seo } from '@/lib/content'
import { siteUrl } from '@/lib/utils'

import './globals.css'

/**
 * Zwei Schriften, beide beim Build selbst gehostet — kein Abruf bei Google
 * zur Laufzeit. Bricolage traegt die Headlines und hat eine optische Groesse:
 * bei Displaygrad wird sie enger und haerter, bei Textgrad offener.
 */
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz'],
  variable: '--font-display',
})

const sans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: seo.titel,
  description: seo.beschreibung,
  applicationName: person.name,
  authors: [{ name: person.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: siteUrl(),
    siteName: person.name,
    title: seo.titel,
    description: seo.beschreibung,
  },
  twitter: { card: 'summary_large_image', title: seo.titel, description: seo.beschreibung },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de-CH" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Zum Inhalt springen
        </a>
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  )
}
