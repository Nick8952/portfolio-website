import type { ServiceIconKey } from '@/types/content'

/**
 * Kleiner eigener Icon-Satz für die Leistungskarten. Bewusst als Inline-SVG und
 * nicht als Emoji oder Icon-Font: gleiche Strichstärke wie der Rest der Seite,
 * kein zusätzlicher Netzwerkabruf, und die Farbe folgt `currentColor`.
 */
const PATHS: Record<ServiceIconKey, React.ReactNode> = {
  code: (
    <>
      <path d="M9 8 4.5 12.5 9 17" />
      <path d="M15 8l4.5 4.5L15 17" />
      <path d="M13.5 5.5 10.5 19" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6.5" rx="7" ry="2.75" />
      <path d="M5 6.5v11c0 1.52 3.13 2.75 7 2.75s7-1.23 7-2.75v-11" />
      <path d="M5 12c0 1.52 3.13 2.75 7 2.75s7-1.23 7-2.75" />
    </>
  ),
  testing: (
    <>
      <path d="M10 3.5h4" />
      <path d="M11 3.5v6.2L6.4 18a1.8 1.8 0 0 0 1.55 2.7h8.1A1.8 1.8 0 0 0 17.6 18L13 9.7V3.5" />
      <path d="M8.2 14.5h7.6" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5a4 4 0 0 1-.4-7.98 5.5 5.5 0 0 1 10.65-1.3A3.75 3.75 0 0 1 17.5 18.5z" />
      <path d="M12 12v5" />
      <path d="m9.75 14.25 2.25-2.25 2.25 2.25" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2.75" width="10" height="18.5" rx="2.25" />
      <path d="M10.75 18.25h2.5" />
    </>
  ),
  performance: (
    <>
      <path d="M12 20.5a8.5 8.5 0 1 1 8.5-8.5" />
      <path d="M12 12l4.75-3.25" />
      <circle cx="12" cy="12" r="1.35" />
    </>
  ),
}

type ServiceIconProps = {
  name: ServiceIconKey
  className?: string
}

export default function ServiceIcon({ name, className }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name] ?? PATHS.code}
    </svg>
  )
}
