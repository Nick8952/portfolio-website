'use client'

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Variants,
} from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import Magnetic from '@/components/motion/Magnetic'
import { hero, navigation, person } from '@/lib/content'
import { cn } from '@/lib/utils'

/**
 * Die Glas-Pille faltet sich beim Runterscrollen zu einem Kreis zusammen und
 * beim Hochscrollen wieder auf — federnd, die Links gestaffelt. Wer den Kreis
 * antippt, bekommt sie ebenfalls zurueck.
 *
 * Zusammengeklappt wird ab 150 px Scrolltiefe, sobald die Richtung nach unten
 * zeigt. Aufgeklappt, sobald es 80 px vom tiefsten Punkt zurueck nach oben
 * ging — die Schwelle verhindert, dass ein Wackeln auf dem Trackpad die Pille
 * flattern laesst. (Die Vorlage mass vom Punkt des Zuklappens aus und oeffnete
 * dadurch nur nahe dem Seitenanfang wieder.)
 *
 * Die Groesse der aufgeklappten Pille ist fix (48 rem); sie waechst beim
 * Scrollen nicht mehr.
 */

const ZUKLAPPEN_AB = 150
const AUFKLAPPEN_NACH = 80
const KREIS = '3.5rem' // = h-14, damit es ein Kreis wird

const feder = { type: 'spring', damping: 20, stiffness: 300 } as const

const huelle: Variants = {
  offen: {
    width: '100%',
    transition: { ...feder, staggerChildren: 0.06, delayChildren: 0.12 },
  },
  zu: {
    width: KREIS,
    transition: { ...feder, when: 'afterChildren', staggerChildren: 0.04, staggerDirection: -1 },
  },
}

const eintrag: Variants = {
  offen: { opacity: 1, x: 0, scale: 1, visibility: 'visible', transition: { type: 'spring', damping: 15 } },
  zu: { opacity: 0, x: -16, scale: 0.96, transition: { duration: 0.18 }, transitionEnd: { visibility: 'hidden' } },
}

const kreisSymbol: Variants = {
  offen: { opacity: 0, scale: 0.7, transition: { duration: 0.15 } },
  zu: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 300, delay: 0.12 } },
}

export default function Nav() {
  const [offen, setOffen] = useState(true)
  const [gescrollt, setGescrollt] = useState(false)
  const [menue, setMenue] = useState(false)
  const schliessenRef = useRef<HTMLButtonElement>(null)
  const oeffnenRef = useRef<HTMLButtonElement>(null)
  const reduziert = useReducedMotion()

  const { scrollY } = useScroll()
  const letzterY = useRef(0)
  const tiefsterY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const vorher = letzterY.current
    setGescrollt(y > 12)

    if (offen && y > vorher && y > ZUKLAPPEN_AB) {
      setOffen(false)
      tiefsterY.current = y
    } else if (!offen) {
      tiefsterY.current = Math.max(tiefsterY.current, y)
      if (y < vorher && tiefsterY.current - y > AUFKLAPPEN_NACH) setOffen(true)
    }
    letzterY.current = y
  })

  useEffect(() => {
    if (!menue) return
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
  }, [menue])

  const schliessen = useCallback(() => {
    setMenue(false)
    oeffnenRef.current?.focus()
  }, [])

  const zustand = offen ? 'offen' : 'zu'

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 md:pt-5">
      <div className="shell flex justify-center">
        <motion.nav
          aria-label="Hauptnavigation"
          initial={false}
          animate={zustand}
          variants={huelle}
          transition={reduziert ? { duration: 0 } : undefined}
          whileHover={!offen && !reduziert ? { scale: 1.08 } : undefined}
          whileTap={!offen && !reduziert ? { scale: 0.95 } : undefined}
          onClick={() => !offen && setOffen(true)}
          className={cn(
            'glass pointer-events-auto relative flex h-14 max-w-3xl items-center justify-between gap-4 overflow-hidden rounded-pill pl-5 pr-2',
            gescrollt && 'bg-paper/70 shadow-lift',
            !offen && 'cursor-pointer justify-center',
          )}
        >
          <motion.a
            variants={eintrag}
            href="#top"
            className="shrink-0 whitespace-nowrap font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink"
          >
            {person.name}
          </motion.a>

          <ul className="hidden items-center gap-1 md:flex">
            {navigation.map((e) => (
              <motion.li key={e.href} variants={eintrag}>
                <a
                  href={e.href}
                  className="inline-flex h-9 items-center whitespace-nowrap rounded-pill px-3.5 text-[0.9375rem] text-ink/80 transition-colors duration-200 ease-out hover:bg-ink/5 hover:text-ink"
                >
                  {e.label}
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.div variants={eintrag} className="flex shrink-0 items-center gap-2">
            <Magnetic staerke={0.25} className="hidden md:block">
              <a
                href="#anfrage"
                className="inline-flex h-10 items-center whitespace-nowrap rounded-pill bg-ink px-5 text-[0.9375rem] font-medium text-paper transition-colors duration-200 ease-out hover:bg-kobalt"
              >
                {hero.cta}
              </a>
            </Magnetic>
            <button
              ref={oeffnenRef}
              type="button"
              onClick={() => setMenue(true)}
              aria-expanded={menue}
              aria-controls="menue"
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill text-ink transition-colors duration-200 ease-out hover:bg-ink/5 md:hidden"
            >
              <span className="sr-only">Menü öffnen</span>
              <MenuIcon />
            </button>
          </motion.div>

          {/* Das Symbol im zusammengefalteten Kreis. Ein echter Knopf, damit es
              auch per Tastatur erreichbar ist — aber nur, solange der Kreis zu ist. */}
          <motion.button
            type="button"
            variants={kreisSymbol}
            aria-label="Navigation einblenden"
            tabIndex={offen ? -1 : 0}
            onClick={(e) => {
              e.stopPropagation()
              setOffen(true)
            }}
            className={cn(
              'absolute inset-0 flex items-center justify-center rounded-pill text-ink',
              offen && 'pointer-events-none',
            )}
          >
            <MenuIcon />
          </motion.button>
        </motion.nav>
      </div>

      <AnimatePresence>
        {menue && (
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
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 5l10 10M15 5 5 15" />
                  </svg>
                </button>
              </div>

              <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
                {navigation.map((e) => (
                  <li key={e.href}>
                    <a
                      href={e.href}
                      onClick={() => setMenue(false)}
                      className="block py-5 font-display text-3xl font-semibold tracking-[-0.02em]"
                    >
                      {e.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#anfrage"
                onClick={() => setMenue(false)}
                className="mb-8 mt-auto inline-flex h-14 items-center justify-center rounded-pill bg-ink text-base font-medium text-paper"
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

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M3 6.5h14M3 13.5h14" />
    </svg>
  )
}
