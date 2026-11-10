'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

import Magnetic from '@/components/motion/Magnetic'
import { useSichtbar } from '@/components/motion/useSichtbar'
import AnfrageKarte from '@/components/ui/AnfrageKarte'
import { branchen, hero, websites } from '@/lib/content'
import { asset, cn } from '@/lib/utils'

const TAKT_MS = 2600

/**
 * Der Hero in der Aufteilung einer Buehne: links die Etiketten, die Headline
 * mit dem wechselnden Wort, der Text, die Schaltflaechen und die kleine
 * Anfrage-Karte; rechts das Schaufenster — drei gekippte Spalten aus echten
 * Handy-Aufnahmen aller Websites, die langsam durchlaufen. Das ist kein
 * Stock-Video: Was da laeuft, ist die Arbeit.
 */
export default function Hero() {
  const [index, setIndex] = useState(0)
  const reduziert = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const sichtbar = useSichtbar(sectionRef)

  useEffect(() => {
    if (reduziert || !sichtbar) return
    const t = setInterval(() => setIndex((i) => (i + 1) % branchen.length), TAKT_MS)
    return () => clearInterval(t)
  }, [reduziert, sichtbar])

  const wort = branchen[index]
  const auf = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      <div aria-hidden="true" className="ambient" />

      <div className="shell relative z-[1] grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <ul className="flex flex-col gap-1.5">
            {hero.eyebrows.map((e, i) => (
              <motion.li
                key={e}
                className="eyebrow eyebrow--slash"
                initial={reduziert ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...auf, delay: 0.05 + i * 0.07 }}
              >
                {e}
              </motion.li>
            ))}
          </ul>

          <h1 className="mt-8 font-display text-display-xl font-semibold text-balance">
            <motion.span
              className="block"
              initial={reduziert ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...auf, delay: 0.2 }}
            >
              {hero.titelVor}
            </motion.span>

            {/* Das Wort, das wechselt. Die Hoehe ist fixiert, damit die Zeilen
                darunter beim Wechsel nicht springen. */}
            {/* Ohne mode="wait": das neue Wort schiebt sich herein, waehrend das alte
                hinausfaehrt — keine leere Zeile dazwischen. */}
            <span className="relative block h-[1.02em] overflow-hidden text-kobalt" aria-live="off">
              <AnimatePresence initial={false}>
                <motion.span
                  key={wort}
                  className="absolute inset-x-0 top-0 block"
                  initial={reduziert ? false : { y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduziert ? undefined : { y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], opacity: { duration: 0.3 } }}
                >
                  {wort}
                  <span className="text-ink">.</span>
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <motion.p
            className="mt-8 max-w-measure text-lede text-ink/70 text-pretty"
            initial={reduziert ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...auf, delay: 0.3 }}
          >
            <strong className="font-semibold text-ink">{hero.versprechen}</strong> {hero.text}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={reduziert ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...auf, delay: 0.38 }}
          >
            <Magnetic>
              <a href="#anfrage" className="btn btn--kobalt">
                {hero.cta}
              </a>
            </Magnetic>
            <a href="#referenz" className="btn btn--glas glass-lite">
              {hero.ctaSekundaer}
            </a>
          </motion.div>

          <motion.div
            initial={reduziert ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...auf, delay: 0.46 }}
          >
            <AnfrageKarte className="mt-10 max-w-[28rem]" />
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-6"
          initial={reduziert ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...auf, delay: 0.3 }}
        >
          <Wand pausiert={!sichtbar} />
          <p className="mt-4 text-center text-sm text-muted">{hero.wandLabel}</p>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Die Wand: elf Websites auf drei Spalten verteilt, jede Spalte verdoppelt fuer
 * die nahtlose Schleife; die mittlere laeuft in die Gegenrichtung. Antippen
 * fuehrt zu den Websites. Bewegung und Perspektive stehen in globals.css
 * (.wand) — samt den Regeln, wann sie stillsteht.
 */
function Wand({ pausiert }: { pausiert: boolean }) {
  const spalten = [0, 1, 2].map((s) => websites.filter((_, i) => i % 3 === s))
  const dauern = ['58s', '72s', '64s']

  return (
    <a
      href="#websites"
      aria-label="Zu den Websites"
      data-cursor="Ansehen"
      data-pausiert={pausiert}
      className="wand block h-[24rem] rounded-stage sm:h-[32rem] lg:h-[42rem]"
    >
      <div aria-hidden="true" className="wand__buehne">
        {spalten.map((spalte, s) => (
          <div
            key={s}
            className={cn('wand__spalte w-[8.5rem] sm:w-[10.5rem] lg:w-[11.75rem]', s === 1 && 'wand__spalte--ab')}
            style={{ '--dauer': dauern[s] } as CSSProperties}
          >
            {[...spalte, ...spalte].map((site, k) => (
              <div
                key={`${site.slug}-${k}`}
                className="overflow-hidden rounded-[1.1rem] border border-hairline bg-sunk shadow-lift"
              >
                <img
                  src={asset(`/websites/${site.slug}-mobile-klein.webp`)}
                  alt=""
                  width={390}
                  height={844}
                  loading={k < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </a>
  )
}
