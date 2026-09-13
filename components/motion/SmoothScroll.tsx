'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

/**
 * Traeges, physikalisches Scrollen. Kein Effekt fuer sich — es sorgt dafuer,
 * dass die gestapelten Websites weich uebereinander gleiten statt zu ruckeln.
 *
 * Unter Bewegungsreduktion oder auf Touch-Geraeten wird es nicht gestartet:
 * Dort ist das native Scrollen besser als jede Nachahmung.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const grob = window.matchMedia('(pointer: coarse)').matches
    if (reduziert || grob) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let frame = 0
    const tick = (zeit: number) => {
      lenis.raf(zeit)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    // Ankerlinks laufen ueber Lenis, damit der Sprung dieselbe Physik hat.
    const beiKlick = (ereignis: MouseEvent) => {
      const ziel = (ereignis.target as HTMLElement).closest('a[href^="#"]')
      if (!ziel) return
      const id = ziel.getAttribute('href')
      if (!id || id === '#') return
      const knoten = document.querySelector(id)
      if (!knoten) return
      ereignis.preventDefault()
      lenis.scrollTo(knoten as HTMLElement, { offset: -80 })
    }
    document.addEventListener('click', beiKlick)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', beiKlick)
      lenis.destroy()
    }
  }, [])

  return null
}
