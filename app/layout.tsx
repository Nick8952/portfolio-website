import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

import Cursor from '@/components/motion/Cursor'
import LensSupport from '@/components/motion/LensSupport'
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
        <LensSupport />
        {children}
        {/* Verzerrungsquelle fuer das Liquid Glass (globals.css). Sehr weiche,
            grosse Wellen mit kleiner Auslenkung — der Hintergrund biegt sich am
            Glas leicht, wie hinter einer Linse. Nur Chrome/Edge werten es aus. */}
        <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
          <filter id="liquid-lens" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="1" seed="4" result="welle" />
            <feDisplacementMap in="SourceGraphic" in2="welle" scale="9" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      </body>
    </html>
  )
}
