import type { Metadata } from 'next'

import Rechtsseite from '@/components/layout/Rechtsseite'
import { datenschutz } from '@/lib/datenschutz'
import { kanonischeUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: `${datenschutz.titel} · Nick Holzbecher`,
  description: 'Welche Personendaten Nick Holzbecher bearbeitet und wofür.',
  alternates: { canonical: `${kanonischeUrl()}/datenschutz/` },
}

/** Die Datenschutz-URL steht im Meta-Sofortformular — Pfad nicht aendern. */
export default function Datenschutz() {
  return (
    <Rechtsseite
      titel={datenschutz.titel}
      stand={datenschutz.stand}
      einleitung={datenschutz.einleitung}
      abschnitte={datenschutz.abschnitte}
      pfad="/datenschutz/"
    />
  )
}
