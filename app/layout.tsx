import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Geist_Mono, Instrument_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

import BewegungsKonfig from '@/components/motion/BewegungsKonfig'
import Cursor from '@/components/motion/Cursor'
import { person, seo } from '@/lib/content'
import { istSpiegel, kanonischeUrl, siteUrl } from '@/lib/utils'

import './globals.css'

/**
 * Drei Schriften, alle beim Build selbst gehostet — kein Abruf bei Google zur
 * Laufzeit. Bricolage traegt die Headlines und hat eine optische Groesse: bei
 * Displaygrad wird sie enger und haerter, bei Textgrad offener. Instrument Sans
 * ist der Fliesstext. Geist Mono ist das Etikett-System: Eyebrows, Meta-Zeilen,
 * die Uhr in der Navigation, Kennzahl-Labels — nie Fliesstext.
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

const mono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0c' },
  ],
  colorScheme: 'light dark',
}

// Der GitHub-Pages-Spiegel zeigt per Canonical auf Vercel und wird nicht indexiert.
const kanonisch = `${kanonischeUrl()}/`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: seo.titel,
  description: seo.beschreibung,
  applicationName: person.name,
  authors: [{ name: person.name }],
  alternates: { canonical: kanonisch },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: kanonisch,
    siteName: person.name,
    title: seo.titel,
    description: seo.beschreibung,
  },
  twitter: { card: 'summary_large_image', title: seo.titel, description: seo.beschreibung },
  robots: { index: !istSpiegel(), follow: true },
}

/**
 * Setzt das Design (hell/dunkel) VOR dem ersten Rendern, damit nichts aufblitzt:
 * gespeicherte Wahl aus localStorage («design»), sonst die Systemeinstellung.
 * Laeuft als blockierendes Inline-Skript am Anfang des Bodys. Das Attribut
 * entsteht erst im Browser — deshalb suppressHydrationWarning am <html>.
 */
const DESIGN_SKRIPT = `(function(){try{var g=localStorage.getItem('design');var d=g?g==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=d?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})()`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de-CH" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: DESIGN_SKRIPT }} />
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Zum Inhalt springen
        </a>
        <BewegungsKonfig>
          <Cursor />
          {children}
        </BewegungsKonfig>
      </body>
    </html>
  )
}
