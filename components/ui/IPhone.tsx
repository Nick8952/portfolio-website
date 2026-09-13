import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type IPhoneProps = {
  /** Der Bildschirminhalt — ein <img> oder ein animierter Wechsel davon. */
  children: ReactNode
  /** Adresse desselben Bildes — wird hinter der Statusleiste weichgezeichnet wiederholt. */
  hintergrund?: string
  /** Helle Website oben → dunkle Statusglyphen, wie iOS es auch macht. */
  helleStatusleiste?: boolean
  className?: string
}

/**
 * Ein iPhone aus reiner Geometrie: Titanrahmen mit Lichtkante, Dynamic Island,
 * Lautstaerke- und Aktionstaste links, Seitentaste rechts, innen abgerundeter
 * Bildschirm mit Statusleiste. Kein Foto, keine SVG-Illustration — nur Formen,
 * die sich exakt angeben lassen. Alle Masse sind Prozent, damit dasselbe Geraet
 * im Hero gross und im Sheet als kleines Overlay funktioniert.
 *
 * Die Statusleiste ist der Unterschied zwischen «Rahmen mit Loch» und «iPhone»:
 * iOS schiebt jede Website unter sie, die Island liegt also nie auf dem Inhalt.
 * Damit die Leiste die Farbe der jeweiligen Website traegt, wird deren oberer
 * Rand dahinter weichgezeichnet wiederholt — wie die durchscheinende Leiste von iOS.
 *
 * Seitenverhaeltnis 71,6 : 147,6 mm entspricht dem echten Gehaeuse. 9:41 ist die
 * Uhrzeit, die Apple seit dem ersten iPhone auf jedem Bild zeigt.
 */
export default function IPhone({
  children,
  hintergrund,
  helleStatusleiste = false,
  className,
}: IPhoneProps) {
  const glyph = helleStatusleiste ? 'text-ink' : 'text-paper'

  return (
    // container-type: alle inneren Masse (Statusschrift, Blur) haengen an der
    // Geraetebreite (cqi), nicht an der geerbten Schriftgroesse. Sonst waere die
    // Uhr im 7rem-Overlay des Sheets groesser als die Island.
    <div className={cn('relative aspect-[716/1476] [container-type:inline-size]', className)}>
      <span aria-hidden="true" className="iphone-taste left-[-1.6%] top-[17.5%] h-[3.4%]" />
      <span aria-hidden="true" className="iphone-taste left-[-1.6%] top-[24.5%] h-[6.2%]" />
      <span aria-hidden="true" className="iphone-taste left-[-1.6%] top-[32.2%] h-[6.2%]" />
      <span aria-hidden="true" className="iphone-taste right-[-1.6%] top-[27%] h-[9.6%]" />

      <div className="iphone-rahmen absolute inset-0 rounded-[15.5%/7.5%]">
        <div className="absolute inset-x-[2.4%] inset-y-[1.165%] flex flex-col overflow-hidden rounded-[13.5%/6.6%] bg-ink">
          {/* Statusleiste */}
          <div
            aria-hidden="true"
            className={cn(
              'relative flex h-[6.2%] shrink-0 items-center justify-between overflow-hidden px-[8%] font-sans text-[4.4cqi] font-semibold tracking-[-0.01em]',
              glyph,
            )}
          >
            {hintergrund && (
              <img
                src={hintergrund}
                alt=""
                className="absolute inset-0 h-full w-full scale-[1.06] object-cover object-top blur-[1cqi]"
              />
            )}
            <span className="relative tnum">9:41</span>
            <span className="relative flex items-center gap-[0.3em]">
              {/* Mobilfunk */}
              <svg viewBox="0 0 16 12" className="h-[0.75em] w-auto" fill="currentColor">
                <rect x="0" y="8" width="3" height="4" rx="0.6" />
                <rect x="4.3" y="5.5" width="3" height="6.5" rx="0.6" />
                <rect x="8.6" y="3" width="3" height="9" rx="0.6" />
                <rect x="12.9" y="0" width="3" height="12" rx="0.6" />
              </svg>
              {/* WLAN */}
              <svg viewBox="0 0 16 12" className="h-[0.75em] w-auto" fill="currentColor">
                <path d="M8 2.2c2.6 0 5 1 6.8 2.7l-1.3 1.4A7.8 7.8 0 0 0 8 4.1a7.8 7.8 0 0 0-5.5 2.2L1.2 4.9A9.6 9.6 0 0 1 8 2.2zm0 3.6c1.7 0 3.2.6 4.4 1.7l-1.3 1.4A4.6 4.6 0 0 0 8 7.7c-1.2 0-2.3.4-3.1 1.2L3.6 7.5A6.4 6.4 0 0 1 8 5.8zm0 3.6c.8 0 1.5.3 2 .8L8 12 6 10.2c.5-.5 1.2-.8 2-.8z" />
              </svg>
              {/* Batterie */}
              <svg viewBox="0 0 27 12" className="h-[0.75em] w-auto" fill="none" stroke="currentColor">
                <rect x="0.5" y="0.5" width="22" height="11" rx="3" strokeOpacity="0.4" />
                <rect x="2" y="2" width="19" height="8" rx="1.8" fill="currentColor" stroke="none" />
                <path d="M24.5 4v4a2 2 0 0 0 0-4z" fill="currentColor" stroke="none" fillOpacity="0.4" />
              </svg>
            </span>
          </div>

          {/* Bildschirminhalt */}
          <div className="relative flex-1 overflow-hidden">{children}</div>

          {/* Dynamic Island */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[1.55%] h-[3.5%] w-[31%] -translate-x-1/2 rounded-pill bg-black shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]"
          />
        </div>
      </div>
    </div>
  )
}
