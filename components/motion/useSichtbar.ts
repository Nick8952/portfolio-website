'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useState, type RefObject } from 'react'

/**
 * «Bewegung reduzieren» — hydrationssicher. Framers useReducedMotion liefert auf
 * dem Server null, im Browser aber schon beim ersten Rendern den echten Wert;
 * davon abhaengige initial-Props oder Startwerte ergaeben unterschiedliches
 * Markup. Dieser Hook sagt bis nach dem Mount «nein» (wie der Server) und erst
 * dann die Wahrheit. Die Animationen selbst schaltet MotionConfig
 * reducedMotion="user" ab (components/motion/BewegungsKonfig.tsx).
 */
export function useReduziert(): boolean {
  const reduziert = useReducedMotion()
  const [gemountet, setGemountet] = useState(false)
  useEffect(() => setGemountet(true), [])
  return gemountet ? Boolean(reduziert) : false
}

/**
 * Ob ein Element im Bild ist — und der Tab ueberhaupt sichtbar. Damit werden
 * Dauerbewegungen (Hero-Wand, Ringe, Branchen-Wechsel) angehalten, sobald
 * niemand hinsieht: Akku und Compositor haben dann frei.
 */
export function useSichtbar(ref: RefObject<HTMLElement | null>, rand = '0px'): boolean {
  const [imBild, setImBild] = useState(true)
  const [tabSichtbar, setTabSichtbar] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setImBild(e.isIntersecting), { rootMargin: rand })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rand])

  useEffect(() => {
    const beiWechsel = () => setTabSichtbar(document.visibilityState === 'visible')
    beiWechsel()
    document.addEventListener('visibilitychange', beiWechsel)
    return () => document.removeEventListener('visibilitychange', beiWechsel)
  }, [])

  return imBild && tabSichtbar
}

/** Eine Media-Query als Zustand — serverseitig `false`, damit nichts springt. */
export function useMedia(query: string): boolean {
  const [trifft, setTrifft] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const beiWechsel = () => setTrifft(mq.matches)
    beiWechsel()
    mq.addEventListener('change', beiWechsel)
    return () => mq.removeEventListener('change', beiWechsel)
  }, [query])
  return trifft
}
