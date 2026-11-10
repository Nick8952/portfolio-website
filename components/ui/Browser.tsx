import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type BrowserProps = {
  /** Die Adresse in der Zeile, ohne Protokoll. */
  url: string
  children: ReactNode
  className?: string
}

/**
 * Ein Browserfenster aus Geometrie: drei Punkte, eine Adresszeile in Mono, darunter
 * die Aufnahme. Dasselbe Fenster traegt die Referenz gross und jede Demo-Karte klein.
 */
export default function Browser({ url, children, className }: BrowserProps) {
  return (
    <div className={cn('overflow-hidden rounded-card border border-hairline bg-paper shadow-lift', className)}>
      <div aria-hidden="true" className="flex h-9 items-center gap-3 border-b border-hairline bg-sunk px-3.5">
        <span className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-pill bg-hairline" />
          <span className="h-2.5 w-2.5 rounded-pill bg-hairline" />
          <span className="h-2.5 w-2.5 rounded-pill bg-hairline" />
        </span>
        <span className="mx-auto flex h-6 min-w-0 max-w-[65%] items-center rounded-pill bg-paper px-3 font-mono text-[0.68rem] text-muted">
          <span className="truncate">{url}</span>
        </span>
        <span className="w-[2.6rem] shrink-0" />
      </div>
      {children}
    </div>
  )
}
