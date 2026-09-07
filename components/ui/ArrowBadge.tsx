import { cn } from '@/lib/utils'

type ArrowBadgeProps = {
  tone?: 'onLight' | 'onDark'
  className?: string
}

/**
 * Der runde Pfeil in der Ecke von Karten und Projektkacheln. Auf der ganzen
 * Seite bedeutet er dasselbe: hier geht es woanders weiter.
 *
 * Rein dekorativ — die eigentliche Verlinkung liegt immer auf der umgebenden
 * Karte, damit Screenreader nicht zweimal dasselbe Ziel vorgelesen bekommen.
 */
export default function ArrowBadge({ tone = 'onLight', className }: ArrowBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ease-soft',
        tone === 'onLight'
          ? 'border-ink/15 text-ink group-hover:border-ink group-hover:bg-ink group-hover:text-paper'
          : 'border-paper/25 text-paper group-hover:border-ember group-hover:bg-ember group-hover:text-paper',
        className,
      )}
    >
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4 transition-transform duration-200 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 11.5 11.5 4.5" />
        <path d="M6 4.5h5.5V10" />
      </svg>
    </span>
  )
}
