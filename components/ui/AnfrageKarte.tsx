import Magnetic from '@/components/motion/Magnetic'
import { hero, person } from '@/lib/content'
import { asset, cn } from '@/lib/utils'

/**
 * Die kleine Karte, die zur Anfrage fuehrt — wie eine Terminbuchung, nur ohne
 * Termin: Portrait, Titel, Mono-Zeile mit den Konditionen, Schaltflaeche.
 * Steht im Hero und neben den Fragen. Auf schmalen Bildschirmen rueckt die
 * Schaltflaeche in eine eigene Zeile, damit der Text nicht gequetscht wird.
 */
export default function AnfrageKarte({ className }: { className?: string }) {
  return (
    <div className={cn('glass-lite flex flex-wrap items-center gap-4 rounded-card p-3 sm:flex-nowrap sm:pr-4', className)}>
      <img
        src={asset(person.portrait)}
        alt=""
        width={96}
        height={96}
        className="h-16 w-16 shrink-0 rounded-[10px] object-cover object-[50%_28%]"
      />
      <div className="min-w-0 flex-1">
        <p className="font-display text-[1.0625rem] font-semibold leading-tight">{hero.karte.titel}</p>
        <p className="eyebrow mt-1.5">{hero.karte.meta}</p>
        <p className="mt-1 text-sm text-ink/70">{hero.karte.text}</p>
      </div>
      <Magnetic staerke={0.2} className="w-full shrink-0 sm:w-auto">
        <a href="#anfrage" className="btn btn--ink btn--klein w-full sm:w-auto">
          Anfragen
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 3 5 5-5 5" />
          </svg>
        </a>
      </Magnetic>
    </div>
  )
}
