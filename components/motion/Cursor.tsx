'use client'

import { useEffect, useRef } from 'react'

/**
 * Der Kobalt-Ring, der dem Zeiger folgt. Der einzige Ort, an dem die Akzentfarbe
 * sich bewegt — deshalb faellt sie auf.
 *
 * Ueber Links und Schaltflaechen weitet sich der Ring; ueber den Websites wird
 * er zum Etikett «Ansehen». Nur auf Geraeten mit feinem Zeiger, nie unter
 * Bewegungsreduktion, und der Systemzeiger bleibt als Punkt darunter erhalten,
 * damit niemand die Orientierung verliert.
 *
 * Bewusst ohne React-State: Position und Zustand werden direkt am Knoten
 * gesetzt. Ein Re-Render pro Mausbewegung waere die teuerste Art, einen Kreis
 * zu verschieben.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const punktRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fein = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fein || reduziert) return

    const ring = ringRef.current
    const punkt = punktRef.current
    if (!ring || !punkt) return

    document.documentElement.classList.add('has-cursor')

    let zielX = -100
    let zielY = -100
    let ringX = -100
    let ringY = -100
    let frame = 0

    const bewerten = (element: Element | null) => {
      const ziel = element?.closest<HTMLElement>('a, button, [role="button"], [data-cursor]')
      const etikett = ziel?.dataset.cursor
      ring.dataset.state = etikett ? 'label' : ziel ? 'hover' : 'idle'
      ring.textContent = etikett ?? ''
    }

    const beiBewegung = (e: PointerEvent) => {
      zielX = e.clientX
      zielY = e.clientY
      punkt.style.transform = `translate(${zielX}px, ${zielY}px) translate(-50%, -50%)`
      bewerten(e.target as Element)
    }

    // Nach einem Klick kann sich unter dem stillstehenden Zeiger alles aendern
    // (ein Sheet geht auf) — dann neu nachsehen, was jetzt darunter liegt.
    const beiKlick = () => {
      requestAnimationFrame(() => bewerten(document.elementFromPoint(zielX, zielY)))
    }

    // Der Ring laeuft dem Punkt nach — das Nachziehen ist der ganze Reiz.
    const tick = () => {
      ringX += (zielX - ringX) * 0.18
      ringY += (zielY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const beiVerlassen = () => {
      ring.dataset.state = 'hidden'
    }
    const beiEintritt = () => {
      ring.dataset.state = 'idle'
    }

    window.addEventListener('pointermove', beiBewegung, { passive: true })
    window.addEventListener('click', beiKlick, { passive: true })
    document.documentElement.addEventListener('pointerleave', beiVerlassen)
    document.documentElement.addEventListener('pointerenter', beiEintritt)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', beiBewegung)
      window.removeEventListener('click', beiKlick)
      document.documentElement.removeEventListener('pointerleave', beiVerlassen)
      document.documentElement.removeEventListener('pointerenter', beiEintritt)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div
        ref={punktRef}
        aria-hidden="true"
        className="cursor-dot"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        data-state="hidden"
        className="cursor-ring"
      />
    </>
  )
}
