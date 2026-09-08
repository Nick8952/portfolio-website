import type { Metadata, Viewport } from 'next'
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google'
import type { ReactNode } from 'react'

import { siteUrl } from '@/lib/utils'
import { getSettings } from '@/sanity/content'
import { urlForImage } from '@/sanity/image'

import './globals.css'

/**
 * Drei Schriftrollen (siehe Abschnitt 6 der CLAUDE.md). `display: 'swap'` sorgt
 * dafür, dass Text sofort sichtbar ist — bei einer Seite, deren Hero fast nur
 * aus Typografie besteht, wäre eine unsichtbare Ladephase besonders teuer.
 */
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const viewport: Viewport = {
  themeColor: '#140A0C',
  colorScheme: 'light',
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const base = siteUrl()

  const ogFromCms = settings.ogImage?.asset
    ? urlForImage(settings.ogImage.asset, { width: 1200, height: 630 })
    : null

  return {
    metadataBase: new URL(base),
    title: {
      default: settings.seoTitle,
      // Unterseiten hängen sich hier an; die Startseite nutzt den Default.
      template: `%s — ${settings.name}`,
    },
    description: settings.seoDescription,
    applicationName: settings.name,
    authors: [{ name: settings.name }],
    creator: settings.name,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'de_CH',
      url: base,
      siteName: settings.name,
      title: settings.seoTitle,
      description: settings.seoDescription,
      ...(ogFromCms
        ? { images: [{ url: ogFromCms, width: 1200, height: 630, alt: settings.ogImage?.alt ?? settings.name }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.seoTitle,
      description: settings.seoDescription,
      ...(ogFromCms ? { images: [ogFromCms] } : {}),
    },
    // Passend zu app/robots.ts: die Platzhalter-Vorschau bleibt aus dem Index.
    robots:
      process.env.NEXT_PUBLIC_NOINDEX === 'true'
        ? { index: false, follow: false }
        : {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
          },
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="de"
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Erster Tabstopp der Seite. Wer mit der Tastatur navigiert, überspringt
            damit die Navigation, statt sich durch sie hindurchzuarbeiten. */}
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  )
}
