import { laufband } from '@/lib/content'

/**
 * Eine Reihe Text, die langsam zieht: fuer wen schon gebaut wurde. Kein Logo-
 * Band — Logos gehoeren den Betrieben, und die Demos sind ohne Auftrag
 * entstanden. Die zweite Liste ist die Kopie fuer die Schleife (aria-hidden).
 */
export default function Laufband() {
  const Reihe = ({ versteckt }: { versteckt?: boolean }) => (
    <ul className="laufband__spur" aria-hidden={versteckt || undefined}>
      {laufband.eintraege.map((e) => (
        <li key={e} className="flex items-center gap-6 pr-6 font-display text-xl font-medium tracking-[-0.01em] text-ink/80 sm:text-2xl">
          {e}
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-pill bg-kobalt" />
        </li>
      ))}
    </ul>
  )

  return (
    <section aria-label={laufband.label} className="border-y border-hairline py-6">
      <div className="shell mb-4">
        <p className="eyebrow eyebrow--slash">{laufband.label}</p>
      </div>
      <div className="laufband flex">
        <Reihe />
        <Reihe versteckt />
      </div>
    </section>
  )
}
