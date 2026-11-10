'use client'

import { useRef } from 'react'

import { useSichtbar } from '@/components/motion/useSichtbar'
import { laufband } from '@/lib/content'

/**
 * Eine Reihe Text, die langsam zieht: fuer wen schon gebaut wurde. Kein Logo-
 * Band — Logos gehoeren den Betrieben, und die Demos sind ohne Auftrag
 * entstanden. Beide Listen liegen in EINER Spur; die Spur faehrt um -50 % (also
 * genau eine Liste) und springt deshalb nahtlos. Die zweite Liste ist die Kopie
 * (aria-hidden). Pausiert ausserhalb des Bildes und bei verborgenem Tab.
 */
export default function Laufband() {
  const ref = useRef<HTMLElement>(null)
  const sichtbar = useSichtbar(ref)

  const Liste = ({ versteckt }: { versteckt?: boolean }) => (
    <ul className="laufband__liste" aria-hidden={versteckt || undefined}>
      {laufband.eintraege.map((e) => (
        <li
          key={e}
          className="flex items-center gap-6 pr-6 font-display text-xl font-medium tracking-[-0.01em] text-ink/80 sm:text-2xl"
        >
          {e}
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-pill bg-kobalt" />
        </li>
      ))}
    </ul>
  )

  return (
    <section ref={ref} aria-label={laufband.label} data-pausiert={!sichtbar} className="border-y border-hairline py-6">
      <div className="shell mb-4">
        <p className="eyebrow eyebrow--slash">{laufband.label}</p>
      </div>
      <div className="laufband">
        <div className="laufband__spur">
          <Liste />
          <Liste versteckt />
        </div>
      </div>
    </section>
  )
}
