'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import Magnetic from '@/components/motion/Magnetic'
import { hero, navigation, person } from '@/lib/content'
import { cn } from '@/lib/utils'

/**
 * Eine vollbreite Leiste mit Hairline — wie ein Fensterrahmen ueber der Seite:
 * Name links, Ziele in der Mitte, Uhr und Schaltflaeche rechts. Beim Scrollen
 * wird sie etwas flacher. Das einzige fixierte Element mit backdrop-filter.
 */
export default function Nav() {
  const [gescrollt, setGescrollt] = useState(false)
  const [offen, setOffen] = useState(false)
  const schliessenRef = useRef<HTMLButtonElement>(null)
  const oeffnenRef = useRef<HTMLButtonElement>(null)
  const reduziert = useReducedMotion()

  useEffect(() => {
    const beiScroll = () => setGescrollt(window.scrollY > 24)
    beiScroll()
    window.addEventListener('scroll', beiScroll, { passive: true })
    return () => window.removeEventListener('scroll', beiScroll)
  }, [])

  useEffect(() => {
    if (!offen) return
    const beiTaste = (e: KeyboardEvent) => e.key === 'Escape' && schliessen()
    document.addEventListener('keydown', beiTaste)
    const vorher = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    schliessenRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', beiTaste)
      document.body.style.overflow = vorher
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offen])

  function schliessen() {
    setOffen(false)
    oeffnenRef.current?.focus()
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Hauptnavigation"
        className={cn(
          'navleiste transition-[height] duration-500 ease-out',
          gescrollt ? 'h-14 md:h-16' : 'h-16 md:h-20',
        )}
      >
        <div className="shell flex h-full items-center justify-between gap-6">
          <a href="#top" className="font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">
            {person.name}
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((eintrag) => (
              <li key={eintrag.href}>
                <a
                  href={eintrag.href}
                  className="inline-flex h-9 items-center rounded-pill px-3.5 text-[0.9375rem] text-ink/80 transition-colors duration-200 ease-out hover:bg-ink/5 hover:text-ink"
                >
                  {eintrag.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 md:gap-5">
            <Uhr />

            <Magnetic staerke={0.25} className="hidden md:block">
              <a href="#anfrage" className="btn btn--ink h-10 px-5 text-[0.9375rem]">
                {hero.cta}
              </a>
            </Magnetic>

            <button
              ref={oeffnenRef}
              type="button"
              onClick={() => setOffen(true)}
              aria-expanded={offen}
              aria-controls="menue"
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-hairline text-ink transition-colors duration-200 ease-out hover:bg-ink/5 lg:hidden"
            >
              <span className="sr-only">Menü öffnen</span>
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M3 6.5h14M3 13.5h14" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {offen && (
          <motion.div
            id="menue"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="glass-strong fixed inset-0 z-50 lg:hidden"
            initial={reduziert ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduziert ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="shell flex h-full flex-col">
              <div className="flex h-16 items-center justify-between">
                <span className="font-display text-[1.0625rem] font-semibold">{person.name}</span>
                <button
                  ref={schliessenRef}
                  type="button"
                  onClick={schliessen}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-hairline"
                >
                  <span className="sr-only">Menü schliessen</span>
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M5 5l10 10M15 5 5 15" />
                  </svg>
                </button>
              </div>

              <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
                {navigation.map((eintrag, i) => (
                  <li key={eintrag.href}>
                    <a
                      href={eintrag.href}
                      onClick={() => setOffen(false)}
                      className="flex items-baseline gap-4 py-4 font-display text-3xl font-semibold tracking-[-0.02em]"
                    >
                      <span className="eyebrow tnum w-7">{String(i + 1).padStart(2, '0')}</span>
                      {eintrag.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a href="#anfrage" onClick={() => setOffen(false)} className="btn btn--ink mb-8 mt-auto w-full">
                {hero.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/**
 * Die Uhr: Schweizer Zeit, Sekunden inklusive. Sie schreibt direkt in den Knoten,
 * statt pro Sekunde ein React-Rendering der Navigation auszuloesen; sie ist
 * fuer Screenreader unsichtbar (keine Live-Region, die jede Sekunde spricht),
 * daneben steht ein stabiler Text. Der Server rendert einen Platzhalter, damit
 * die Hydration nicht an der Uhrzeit scheitert.
 */
function Uhr() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const format = new Intl.DateTimeFormat('de-CH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Europe/Zurich',
    })
    let timer = 0
    const schreiben = () => {
      if (ref.current) ref.current.textContent = format.format(new Date())
    }
    const starten = () => {
      schreiben()
      window.clearInterval(timer)
      timer = window.setInterval(schreiben, 1000)
    }
    const beiSichtbarkeit = () => {
      if (document.visibilityState === 'visible') starten()
      else window.clearInterval(timer)
    }
    starten()
    document.addEventListener('visibilitychange', beiSichtbarkeit)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', beiSichtbarkeit)
    }
  }, [])

  return (
    <p className="hidden items-baseline gap-2 sm:flex">
      <span className="eyebrow">Schweiz</span>
      <span ref={ref} aria-hidden="true" className="font-mono text-sm tabular-nums text-ink">
        ––:––:––
      </span>
      <span className="sr-only">Ortszeit Schweiz</span>
    </p>
  )
}
