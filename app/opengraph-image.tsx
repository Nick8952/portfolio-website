import { ImageResponse } from 'next/og'

import { getSettings } from '@/sanity/content'

export const alt = 'Portfolio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Erzeugt das Vorschaubild fürs Teilen aus Name und Jobtitel, falls im Studio
 * keines hinterlegt ist. Bewusst ohne nachgeladene Schrift: ein fehlgeschlagener
 * Font-Abruf würde sonst den ganzen Build kippen, und die Wirkung trägt hier
 * ohnehin die Farbfläche.
 */
export default async function Image() {
  const settings = await getSettings()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 80,
          backgroundColor: '#140A0C',
          backgroundImage:
            'radial-gradient(70% 70% at 50% 0%, #7B1023 0%, rgba(74,14,28,0.55) 45%, #140A0C 78%)',
          color: '#F2F0ED',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#E4667A',
          }}
        >
          {settings.role}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          {settings.name}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 32,
            maxWidth: 820,
            fontSize: 28,
            lineHeight: 1.4,
            color: 'rgba(242,240,237,0.7)',
          }}
        >
          {settings.seoDescription.slice(0, 130)}
        </div>
      </div>
    ),
    size,
  )
}
