'use client'

import { motion } from 'framer-motion'
import type { PointerEvent as ReactPointerEvent } from 'react'

import Reveal from '@/components/motion/Reveal'
import { useReduziert } from '@/components/motion/useSichtbar'
import { betrieb, preise } from '@/lib/content'
import { chf, cn } from '@/lib/utils'

/**
 * Die Preistafel: drei Karten, der Regelfall als schwarze Karte in der Mitte
 * und etwas hoeher gesetzt — wie die hervorgehobene Stufe bei jeder guten
 * Preistafel. Grosse Zahlen, Mono-Meta, Haekchen in Kobalt.
 *
 * Beim Hereinscrollen federn die Karten nacheinander hoch. Hover hebt die
 * Karte, legt einen Kobalt-Saum darum und laesst ein Glanzlicht dem Zeiger
 * folgen; die Nachbarn treten zurueck (CSS in globals.css, .preisraster).
 * Nur mit Maus — auf Touch bleibt alles ruhig.
 */

function glanzFolgen(e: ReactPointerEvent<HTMLDivElement>) {
  if (e.pointerType !== 'mouse') return
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`)
  e.currentTarget.style.setProperty('--gy', `${((e.clientY - r.top) / r.height) * 100}%`)
}

export default function Preise() {
  const reduziert = useReduziert()

  return (
    <section id="preise" className="section relative overflow-hidden border-t border-hairline">
      <div aria-hidden="true" className="ambient ambient--mitte" />

      <div className="shell relative z-[1]">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className="eyebrow eyebrow--slash">Preise</p>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-balance">
                Preise, die ich vorher sage.
              </h2>
            </div>
            <p className="max-w-measure text-lede text-ink/70 text-pretty md:col-span-5 md:pb-1">
              Richtwerte. Was Ihr Betrieb genau braucht, sehen wir nach der Demo — und dann steht
              die Zahl schriftlich fest, bevor Sie etwas zahlen.
            </p>
          </div>
        </Reveal>

        <div className="preisraster mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:items-start">
          {preise.map((stufe, i) => {
            const regelfall = Boolean(stufe.hervorheben)

            return (
              <motion.div
                key={stufe.name}
                initial={reduziert ? false : { y: 36, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { type: 'spring', stiffness: 120, damping: 24, delay: 0.1 + i * 0.09 },
                }}
                whileHover={reduziert ? undefined : { y: -10, scale: 1.015, zIndex: 20 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onPointerMove={glanzFolgen}
                className={cn(
                  'preiskarte relative flex flex-col rounded-card p-7 sm:p-8',
                  regelfall ? 'preiskarte--regelfall bg-ink text-paper' : 'glass-lite text-ink',
                  !regelfall && 'md:mt-8',
                )}
              >
                <span aria-hidden="true" className="preisglanz" />

                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.01em]">{stufe.name}</h3>
                  {regelfall && (
                    <span className="rounded-pill bg-kobalt px-2.5 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-paper">
                      Der Regelfall
                    </span>
                  )}
                </div>

                <p className={cn('eyebrow mt-2', regelfall ? 'text-paper/55' : 'text-muted')}>
                  {stufe.umfang} · einmalig
                </p>

                {/* «ab» ist Teil des Preises, nicht Kleingedrucktes. */}
                <p className="mt-8 flex items-baseline gap-2 font-display tnum">
                  <span className={cn('text-lg font-semibold', regelfall ? 'text-kobalt-lift' : 'text-kobalt')}>
                    ab
                  </span>
                  <span className={cn('text-lg font-medium', regelfall ? 'text-paper/60' : 'text-muted')}>
                    CHF
                  </span>
                  <span className="text-[3.25rem] font-semibold leading-none tracking-[-0.035em] sm:text-[3.5rem]">
                    {chf(stufe.ab)}
                  </span>
                </p>

                <p
                  className={cn(
                    'mt-5 text-[0.9375rem] leading-relaxed text-pretty',
                    regelfall ? 'text-paper/75' : 'text-ink/75',
                  )}
                >
                  {stufe.fuer}
                </p>

                <ul
                  className={cn(
                    'mt-7 flex flex-col gap-3 border-t pt-6',
                    regelfall ? 'border-paper/15' : 'border-hairline',
                  )}
                >
                  {stufe.punkte.map((punkt) => (
                    <li
                      key={punkt}
                      className={cn(
                        'flex items-start gap-2.5 text-[0.9375rem]',
                        regelfall ? 'text-paper/85' : 'text-ink/85',
                      )}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className={cn('mt-[3px] h-4 w-4 shrink-0', regelfall ? 'text-kobalt-lift' : 'text-kobalt')}
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

                <a
                  href="#anfrage"
                  className={cn(
                    'btn mt-8 h-12 w-full text-[0.9375rem]',
                    regelfall ? 'bg-kobalt text-paper hover:bg-paper hover:text-ink' : 'bg-ink text-paper hover:bg-kobalt',
                  )}
                >
                  Demo anfragen
                </a>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-10 grid gap-4 border-t border-hairline pt-8 md:grid-cols-12 md:gap-8">
          <p className="text-base leading-relaxed text-ink/80 text-pretty md:col-span-7">{betrieb.satz}</p>
          <p className="text-sm leading-relaxed text-muted text-pretty md:col-span-5">{betrieb.hinweis}</p>
        </div>
      </div>
    </section>
  )
}
