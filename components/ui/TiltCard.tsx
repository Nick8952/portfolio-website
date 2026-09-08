'use client'

import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Maximaler Neigungswinkel in Grad. */
  staerke?: number
  /** Helles Glanzlicht auf dunklen Karten sichtbarer machen. */
  glanz?: 'hell' | 'dunkel'
}

/**
 * Neigt eine Karte in echter Perspektive zum Zeiger hin und legt ein Glanzlicht
 * darüber, das der Zeigerposition folgt. Das Glanzlicht ist dabei das
 * eigentliche Mittel — eine reine Drehung ohne wanderndes Licht liest sich
 * flach, weil dem Auge der Hinweis fehlt, woher die Beleuchtung kommt. Es ist
 * dasselbe Licht wie im Hero: warmes Bordeaux von schräg oben.
 *
 * Bewusst ohne State und ohne Framer Motion: bei jeder Zeigerbewegung eine
 * React-Aktualisierung auszulösen wäre bei sechs Karten nebeneinander spürbar.
 * Stattdessen werden zwei CSS-Variablen direkt am Knoten gesetzt, den Rest
 * erledigt der Compositor.
 *
 * Bei `prefers-reduced-motion` passiert nichts — die Abfrage steht in
 * globals.css als `@media`-Regel, die die Transition abschaltet, und die
 * Neigung selbst wird hier übersprungen.
 */
export default function TiltCard({
  children,
  className,
  staerke = 7,
  glanz = 'hell',
}: TiltCardProps) {
  const knotenRef = useRef<HTMLDivElement>(null)
  const darfNeigen = useRef(true)

  function beiBewegung(ereignis: ReactPointerEvent<HTMLDivElement>) {
    const knoten = knotenRef.current
    if (!knoten) return

    // Grobe Zeiger (Finger) bekommen keine Neigung: es gibt kein Schweben,
    // die Karte würde beim Antippen nur kurz zucken.
    if (ereignis.pointerType !== 'mouse') return

    if (darfNeigen.current) {
      darfNeigen.current = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!darfNeigen.current) return
    }

    const flaeche = knoten.getBoundingClientRect()
    const x = (ereignis.clientX - flaeche.left) / flaeche.width
    const y = (ereignis.clientY - flaeche.top) / flaeche.height

    knoten.style.setProperty('--neigung-x', `${(0.5 - y) * staerke * 2}deg`)
    knoten.style.setProperty('--neigung-y', `${(x - 0.5) * staerke * 2}deg`)
    knoten.style.setProperty('--glanz-x', `${x * 100}%`)
    knoten.style.setProperty('--glanz-y', `${y * 100}%`)
    knoten.style.setProperty('--glanz-staerke', '1')
  }

  function beiVerlassen() {
    const knoten = knotenRef.current
    if (!knoten) return

    knoten.style.setProperty('--neigung-x', '0deg')
    knoten.style.setProperty('--neigung-y', '0deg')
    knoten.style.setProperty('--glanz-staerke', '0')
  }

  return (
    <div
      ref={knotenRef}
      onPointerMove={beiBewegung}
      onPointerLeave={beiVerlassen}
      className={cn('tilt-card', className)}
    >
      {children}

      {/* Das Glanzlicht liegt über dem Inhalt, faengt aber keine Klicks ab. */}
      <span
        aria-hidden="true"
        className={cn('tilt-glanz', glanz === 'dunkel' && 'tilt-glanz--dunkel')}
      />
    </div>
  )
}
