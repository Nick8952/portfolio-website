'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react'

import { betrieb, preise } from '@/lib/content'
import { chf, cn } from '@/lib/utils'

/**
 * Drei Karten nebeneinander, die mittlere hervorgehoben: Nicks Vorlage.
 * Die aeusseren Karten stehen leicht zurueck (kleiner, um 10 Grad nach innen
 * gedreht), die mittlere ein Stueck hoeher — beim Hereinscrollen federt das
 * Ganze in Position. Auf dem Handy stehen die Karten schlicht untereinander.
 *
 * Kein Monatlich/Jaehrlich-Schalter: die Preise sind einmalig, es gibt nichts
 * umzuschalten.
 *
 * Hover: die Karte richtet sich auf, hebt sich, bekommt einen Kobalt-Saum, die
 * Nachbarn treten zurueck (CSS, .preisraster), und ein Glanzlicht folgt dem
 * Zeiger ueber das Glas — die Position geht als CSS-Variable direkt an den
 * Knoten, kein React-State pro Mausbewegung.
 */

function glanzFolgen(e: ReactPointerEvent<HTMLDivElement>) {
  if (e.pointerType !== 'mouse') return
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`)
  e.currentTarget.style.setProperty('--gy', `${((e.clientY - r.top) / r.height) * 100}%`)
}

function useDesktop(): boolean {
  const [ist, setIst] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const anwenden = () => setIst(mq.matches)
    anwenden()
    mq.addEventListener('change', anwenden)
    return () => mq.removeEventListener('change', anwenden)
  }, [])
  return ist
}

export default function Preise() {
  const desktop = useDesktop()
  const reduziert = useReducedMotion()

  return (
    <section id="preise" className="section bg-ink text-paper">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-display-lg font-semibold text-balance">
            Preise, die ich vorher sage.
          </h2>
          <p className="mx-auto mt-5 max-w-measure text-lede text-paper/70 text-pretty">
            Richtwerte. Was Ihr Betrieb genau braucht, sehen wir nach der Demo — und dann steht die
            Zahl schriftlich fest, bevor Sie etwas zahlen.
          </p>
        </div>

        <div className="preisraster mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-4 [perspective:1400px]">
          {preise.map((stufe, i) => {
            const aussen = i === 0 || i === 2
            const ziel =
              desktop && !reduziert
                ? {
                    y: stufe.hervorheben ? -20 : 0,
                    x: i === 2 ? -24 : i === 0 ? 24 : 0,
                    scale: aussen ? 0.94 : 1,
                    rotateY: i === 0 ? 10 : i === 2 ? -10 : 0,
                    opacity: 1,
                  }
                : { y: 0, x: 0, scale: 1, rotateY: 0, opacity: 1 }

            return (
              <motion.div
                key={stufe.name}
                initial={reduziert ? false : { y: 50, opacity: 0 }}
                whileInView={{
                  ...ziel,
                  // Der Einzug hat die Verzoegerung, der Hover nicht.
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 30,
                    delay: 0.15 + i * 0.1,
                    opacity: { duration: 0.5 },
                  },
                }}
                whileHover={
                  desktop && !reduziert
                    ? { y: -18, x: 0, scale: 1.04, rotateY: 0, zIndex: 20 }
                    : undefined
                }
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onPointerMove={glanzFolgen}
                style={{ transformStyle: 'preserve-3d' }}
                className={cn(
                  'preiskarte relative flex flex-col rounded-card p-7 text-center',
                  stufe.hervorheben
                    ? 'glass-dark-lite z-10 border border-kobalt-lift/60'
                    : 'glass-dark-lite z-0 md:mt-5',
                  i === 0 && 'origin-right',
                  i === 2 && 'origin-left',
                )}
              >
                <span aria-hidden="true" className="preisglanz" />

                {stufe.hervorheben && (
                  <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl rounded-tr-card bg-kobalt px-2.5 py-1 text-paper">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                      <path d="M8 1.5l1.9 4.1 4.5.5-3.3 3.1.9 4.4L8 11.4l-4 2.2.9-4.4L1.6 6.1l4.5-.5z" />
                    </svg>
                    <span className="text-sm font-semibold">Der Regelfall</span>
                  </div>
                )}

                <p className="text-base font-semibold text-paper/60">{stufe.name}</p>

                <div className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="font-display text-5xl font-semibold tracking-[-0.02em] tnum">
                    <span className="mr-1.5 align-top text-[0.5em] font-medium text-paper/60">CHF</span>
                    {chf(stufe.ab)}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-paper/55">
                  ab · einmalig · {stufe.umfang}
                </p>

                <ul className="mt-6 flex flex-col gap-2.5 text-left">
                  {stufe.punkte.map((punkt) => (
                    <li key={punkt} className="flex items-start gap-2 text-[0.9375rem] text-paper/85">
                      <svg
                        viewBox="0 0 16 16"
                        className="mt-1 h-4 w-4 shrink-0 text-kobalt-lift"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8.5l3 3 7-7" />
                      </svg>
                      {punkt}
                    </li>
                  ))}
                </ul>

                <hr className="my-6 w-full border-paper/15" />

                <a
                  href="#anfrage"
                  className={cn(
                    'inline-flex h-12 w-full items-center justify-center rounded-pill text-base font-semibold tracking-[-0.01em] transition-colors duration-200 ease-out',
                    stufe.hervorheben
                      ? 'bg-kobalt text-paper hover:bg-paper hover:text-ink'
                      : 'border border-paper/25 text-paper hover:border-paper hover:bg-paper hover:text-ink',
                  )}
                >
                  Demo anfragen
                </a>
                <p className="mt-5 text-xs leading-5 text-paper/55 text-pretty">{stufe.fuer}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-base leading-relaxed text-paper/80 text-pretty">{betrieb.satz}</p>
          <p className="mt-3 text-sm leading-relaxed text-paper/55 text-pretty">{betrieb.hinweis}</p>
        </div>
      </div>
    </section>
  )
}
