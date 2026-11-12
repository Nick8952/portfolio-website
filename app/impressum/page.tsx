import type { Metadata } from 'next'

import Rechtsseite from '@/components/layout/Rechtsseite'
import { impressum } from '@/lib/impressum'
import { kanonischeUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: `${impressum.titel} · Nick Holzbecher`,
  description: 'Betreiber dieser Website, Kontaktadresse, Haftung und Urheberrecht.',
  alternates: { canonical: `${kanonischeUrl()}/impressum/` },
}

export default function Impressum() {
  return (
    <Rechtsseite
      titel={impressum.titel}
      stand={impressum.stand}
      einleitung={impressum.einleitung}
      abschnitte={impressum.abschnitte}
      pfad="/impressum/"
    />
  )
}
