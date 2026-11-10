'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useId, useState } from 'react'

import Reveal from '@/components/motion/Reveal'
import AnfrageKarte from '@/components/ui/AnfrageKarte'
import { faq } from '@/lib/content'
import { cn } from '@/lib/utils'

/**
 * Sechs Fragen, die Betriebe vor der Demo stellen. Links klebt die Headline mit
 * der kleinen Anfrage-Karte, rechts das Akkordeon: Schaltflaeche mit
 * aria-expanded und aria-controls, die Antwort als zugeordnete Region. Die
 * Hoehe animiert auf «auto» — nichts wird abgeschnitten; unter
 * Bewegungsreduktion klappt es sofort.
 */
export default function Faq() {
  const [offen, setOffen] = useState<number | null>(0)
  const reduziert = useReducedMotion()
  const id = useId()

  return (
    <section id="fragen" className="section border-t border-hairline">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow eyebrow--slash">{faq.eyebrow}</p>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-balance">{faq.titel}</h2>
              <AnfrageKarte className="mt-10 max-w-[28rem]" />
            </Reveal>
          </div>
        </div>

        <ul className="lg:col-span-7">
          {faq.eintraege.map((e, i) => {
            const istOffen = offen === i
            const knopfId = `${id}-f-${i}`
            const panelId = `${id}-a-${i}`
            return (
              <li key={e.frage} className="border-t border-hairline last:border-b">
                <h3>
                  <button
                    type="button"
                    id={knopfId}
                    aria-expanded={istOffen}
                    aria-controls={panelId}
                    onClick={() => setOffen(istOffen ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-kobalt"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="eyebrow tnum w-7 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-display text-xl font-semibold tracking-[-0.01em] sm:text-2xl">{e.frage}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border border-hairline transition-transform duration-300 ease-out',
                        istOffen && 'rotate-45 border-kobalt text-kobalt',
                      )}
                    >
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {istOffen && (
                    <motion.div
                      key="antwort"
                      id={panelId}
                      role="region"
                      aria-labelledby={knopfId}
                      initial={reduziert ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduziert ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-measure pb-7 pl-11 text-base leading-relaxed text-ink/75 text-pretty">{e.antwort}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
