'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

import Reveal from '@/components/motion/Reveal'
import { useMedia, useSichtbar } from '@/components/motion/useSichtbar'
import { erkennen } from '@/lib/content'
import { cn } from '@/lib/utils'

/**
 * Der Ausgangspunkt: duenne Ringe, die Headline in der Mitte, und fuenf Pillen,
 * die beim Scrollen nacheinander erscheinen — jede ein Grund, warum eine
 * Website veraltet wirkt. Auf grossen Bildschirmen klebt die Buehne, waehrend
 * die Section 170 vh lang ist; ein einziger Scroll-Fortschritt steuert alle
 * fuenf. Auf kleinen Bildschirmen und unter Bewegungsreduktion stehen die
 * Pillen im normalen Fluss und blenden nur beim Hereinscrollen ein.
 */
export default function Erkennen() {
  const reduziert = useReducedMotion()
  const gross = useMedia('(min-width: 1024px)')
  const klebt = gross && !reduziert
  const ref = useRef<HTMLElement>(null)
  const sichtbar = useSichtbar(ref)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section
      ref={ref}
      aria-labelledby="erkennen-titel"
      data-pausiert={!sichtbar}
      className={cn('relative border-t border-hairline', klebt ? 'h-[170vh]' : 'section overflow-hidden')}
    >
      <div
        className={cn(
          'relative flex flex-col items-center justify-center overflow-hidden',
          klebt ? 'sticky top-0 h-[100svh]' : 'min-h-[32rem] py-10',
        )}
      >
        {/* Die Ringe: drei Kreise, zwei davon mit Luecke und langsam drehend.
            Klasse «orbit» — «ring» waere Tailwinds box-shadow-Utility. */}
        <Ring groesse="min(120vw, 62rem)" dash still={reduziert ?? false} />
        <Ring groesse="min(100vw, 46rem)" dash gegen still={reduziert ?? false} />
        <Ring groesse="min(82vw, 32rem)" still />

        <div className="shell relative z-[1] flex flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow eyebrow--slash">{erkennen.eyebrow}</p>
            <h2 id="erkennen-titel" className="mx-auto mt-4 max-w-[16ch] font-display text-display-lg font-semibold text-balance">
              {erkennen.titel}
            </h2>
            <p className="mx-auto mt-5 max-w-measure text-lede text-ink/70 text-pretty">{erkennen.text}</p>
          </Reveal>

          {!klebt && (
            <ul className="mt-10 flex flex-wrap justify-center gap-3">
              {erkennen.punkte.map((p, i) => (
                <Reveal key={p} delay={0.07 * i}>
                  <li className="glass-lite inline-flex items-center gap-2.5 rounded-pill px-4 py-2.5 text-[0.9375rem] font-medium">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-pill bg-kobalt" />
                    {p}
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>

        {klebt && (
          <ul aria-label="Fünf Merkmale" className="absolute inset-0">
            {erkennen.punkte.map((p, i) => (
              <Pille key={p} text={p} index={i} fortschritt={scrollYProgress} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

const POSITIONEN = [
  'left-[7%] top-[31%]',
  'right-[6%] top-[27%]',
  'left-[12%] bottom-[25%]',
  'right-[9%] bottom-[31%]',
  'left-1/2 top-[13%]',
]

function Pille({ text, index, fortschritt }: { text: string; index: number; fortschritt: MotionValue<number> }) {
  const start = 0.12 + index * 0.13
  const opacity = useTransform(fortschritt, [start, start + 0.1], [0, 1])
  const y = useTransform(fortschritt, [start, start + 0.1], [14, 0])
  const scale = useTransform(fortschritt, [start, start + 0.1], [0.96, 1])

  // Framer setzt transform selbst — die Zentrierung der fuenften Pille laeuft
  // deshalb ueber x, nicht ueber eine Tailwind-Klasse (die wuerde ueberschrieben).
  return (
    <motion.li
      style={{ opacity, y, scale, x: index === 4 ? '-50%' : 0 }}
      className={cn(
        'glass-lite absolute inline-flex items-center gap-2.5 rounded-pill px-5 py-3 text-base font-medium shadow-lift',
        POSITIONEN[index],
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-pill bg-kobalt" />
      {text}
    </motion.li>
  )
}

function Ring({ groesse, dash, gegen, still }: { groesse: string; dash?: boolean; gegen?: boolean; still?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={cn('orbit text-ink/10', gegen && 'orbit--gegen', still && 'orbit--still')}
      style={{ width: groesse, height: groesse }}
    >
      <circle
        cx="50"
        cy="50"
        r="49.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.35"
        strokeDasharray={dash ? '200 60 80 40' : undefined}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
