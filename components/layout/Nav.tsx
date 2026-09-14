'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import Magnetic from '@/components/motion/Magnetic'
import { hero, navigation, person } from '@/lib/content'
import { cn } from '@/lib/utils'

/**
 * Schwebende Glas-Pille, wie Apple sie ueber Inhalt legt: Name links, Ziele
 * in der Mitte, eine Schaltflaeche rechts. Das Glas ist hier kein Schmuck —
 * die Pille liegt beim Scrollen ueber Headlines und Screenshots, und die
 * Weichzeichnung haelt die Links lesbar, ohne den Inhalt zu verdecken.
 */
export default function Nav() {
  const [gescrollt, setGescrollt] = useState(false)
  const [offen, setOffen] = useState(false)
  const schliessenRef = useRef<HTMLButtonElement>(null)
  const oeffnenRef = useRef<HTMLButtonElement>(null)
  const reduziert = useReducedMotion()

  useEffect(() => {
    const beiScroll = () => setGescrollt(window.scrollY > 12)
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 md:pt-5">
      <div className="shell">
        <nav
          aria-label="Hauptnavigation"
          className={cn(
            // Oben kompakt, beim Scrollen waechst die Pille nach aussen auf die
            // volle Spaltenbreite. max-width und Hoehe werden animiert; die
            // Pille selbst bleibt dieselbe, sie dehnt sich nur.
            'glass pointer-events-auto mx-auto flex items-center justify-between gap-4 rounded-pill pl-5 pr-2',
            // Nur max-width und Schatten: die Hoehe konstant zu halten spart 1,2 s
            // Layout-Arbeit pro Aufweitung, und will-change auf max-width bringt nichts.
            'h-14 transition-[max-width,box-shadow] duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
            // Gescrollt liegt die Pille auch ueber der schwarzen Preis-Section: 70 %
            // Fuellung halten die Links dort bei ueber 4,5:1 (38 % ergaeben 2,6:1).
            gescrollt ? 'max-w-shell bg-paper/70 shadow-lift' : 'max-w-3xl',
          )}
        >
          <a
            href="#top"
            className="font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink"
          >
            {person.name}
          </a>

          <ul className="hidden items-center gap-1 md:flex">
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

          <div className="flex items-center gap-2">
            <Magnetic staerke={0.25} className="hidden md:block">
              <a
                href="#anfrage"
                className="inline-flex h-10 items-center rounded-pill bg-ink px-5 text-[0.9375rem] font-medium text-paper transition-colors duration-200 ease-out hover:bg-kobalt"
              >
                {hero.cta}
              </a>
            </Magnetic>

            <button
              ref={oeffnenRef}
              type="button"
              onClick={() => setOffen(true)}
              aria-expanded={offen}
              aria-controls="menue"
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill text-ink transition-colors duration-200 ease-out hover:bg-ink/5 md:hidden"
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
        </nav>
      </div>

      <AnimatePresence>
        {offen && (
          <motion.div
            id="menue"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="glass-strong pointer-events-auto fixed inset-0 z-50 md:hidden"
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
                {navigation.map((eintrag) => (
                  <li key={eintrag.href}>
                    <a
                      href={eintrag.href}
                      onClick={() => setOffen(false)}
                      className="block py-5 font-display text-3xl font-semibold tracking-[-0.02em]"
                    >
                      {eintrag.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#anfrage"
                onClick={() => setOffen(false)}
                className="mt-auto mb-8 inline-flex h-14 items-center justify-center rounded-pill bg-ink text-base font-medium text-paper"
              >
                {hero.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
