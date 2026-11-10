'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import Reveal from '@/components/motion/Reveal'
import { useReduziert } from '@/components/motion/useSichtbar'
import Browser from '@/components/ui/Browser'
import IPhone from '@/components/ui/IPhone'
import { referenz } from '@/lib/content'
import { asset } from '@/lib/utils'

/**
 * Die eine Website, die es wirklich gibt — mit dem meisten Raum auf der Seite.
 * Links das Browserfenster: darin die ganze Startseite als lange Aufnahme, die
 * beim Scrollen der Seite im Fenster mitscrollt (ein Transform, an den
 * Scroll-Fortschritt gekoppelt — die Website blaettert sich selbst durch).
 * Rechts Meta-Zeile, Titel, Text, belegte Fakten, Link und drei Kennzahlen,
 * die genau dieses Projekt beschreiben.
 */
export default function Referenz() {
  const reduziert = useReduziert()
  const karteRef = useRef<HTMLDivElement>(null)
  const rahmenRef = useRef<HTMLDivElement>(null)
  const bildRef = useRef<HTMLImageElement>(null)
  const [hub, setHub] = useState(0)

  const { scrollYProgress } = useScroll({ target: karteRef, offset: ['start 92%', 'end 12%'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -hub])

  // Wie weit das Bild im Rahmen fahren kann: seine Hoehe minus die des Rahmens.
  const messen = useCallback(() => {
    const bild = bildRef.current
    const rahmen = rahmenRef.current
    if (!bild || !rahmen) return
    setHub(Math.max(0, bild.offsetHeight - rahmen.offsetHeight))
  }, [])

  useEffect(() => {
    messen()
    const ro = new ResizeObserver(messen)
    if (rahmenRef.current) ro.observe(rahmenRef.current)
    return () => ro.disconnect()
  }, [messen])

  return (
    <section id="referenz" className="section">
      <div className="shell">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className="eyebrow eyebrow--slash">Referenz · Kunde live</p>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-balance">
                Eine Website, die es wirklich gibt.
              </h2>
            </div>
            <p className="max-w-measure text-lede text-ink/70 text-pretty md:col-span-5 md:pb-1">
              Keine Attrappe, kein «Beispielkunde»: Das Restaurant hat die Demo gesehen, bestellt
              und arbeitet heute damit.
            </p>
          </div>
        </Reveal>

        <div
          ref={karteRef}
          className="mt-12 grid overflow-hidden rounded-stage border border-hairline bg-paper shadow-stage md:mt-16 lg:grid-cols-12"
        >
          {/* Links fuellt das Browserfenster die ganze Hoehe der Karte; die
              Hoehe gibt die Textspalte rechts vor. */}
          <div className="relative flex flex-col bg-sunk p-5 pb-12 sm:p-8 sm:pb-16 lg:col-span-7 lg:p-10 lg:pb-10">
            <Browser url={referenz.anzeigeUrl} className="lg:flex lg:flex-1 lg:flex-col">
              <div
                ref={rahmenRef}
                className="relative aspect-[4/3] overflow-hidden sm:aspect-[1440/1000] lg:aspect-auto lg:min-h-[28rem] lg:flex-1"
              >
                <motion.img
                  ref={bildRef}
                  src={asset(`/websites/${referenz.slug}-desktop-lang.webp`)}
                  alt={`Die Website von ${referenz.name} am Computer, ganze Startseite`}
                  width={1440}
                  height={3600}
                  loading="lazy"
                  decoding="async"
                  onLoad={messen}
                  style={{ y: reduziert ? 0 : y }}
                  // Kein will-change: ein 1440×3600-Bild dauerhaft als eigene Ebene
                  // zu halten kostet GPU-Speicher; Framer setzt nur den Transform.
                  className="absolute left-0 top-0 h-auto w-full"
                />
              </div>
            </Browser>
            <IPhone
              className="absolute bottom-4 left-8 w-[24%] min-w-[5.5rem] max-w-[8.5rem] sm:left-12 lg:bottom-6"
              hintergrund={asset(`/websites/${referenz.slug}-mobile.webp`)}
              helleStatusleiste={referenz.hellerKopf}
            >
              <img
                src={asset(`/websites/${referenz.slug}-mobile.webp`)}
                alt={`Die Website von ${referenz.name} auf dem Handy`}
                width={390}
                height={844}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </IPhone>
          </div>

          <div className="flex flex-col p-7 sm:p-10 lg:col-span-5 lg:p-12">
            <Reveal>
              <p className="eyebrow eyebrow--box eyebrow--live">{referenz.eyebrow}</p>
              <h3 className="mt-6 font-display text-display-md font-semibold text-balance">{referenz.titel}</h3>
              <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-ink/75 text-pretty">{referenz.text}</p>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {referenz.fakten.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[0.9375rem] text-ink/85">
                    <svg
                      viewBox="0 0 16 16"
                      className="mt-[3px] h-4 w-4 shrink-0 text-kobalt"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 8.5l3 3 7-7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={referenz.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ink btn--klein mt-8 self-start"
              >
                {referenz.linkLabel}
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" />
                </svg>
                <span className="sr-only">(öffnet in neuem Tab)</span>
              </a>
            </Reveal>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-hairline pt-8 lg:mt-auto">
              {/* dt vor dd im DOM, visuell umgekehrt: die Zahl oben, das Etikett darunter. */}
              {referenz.kennzahlen.map((k, i) => (
                <Reveal key={k.label} delay={0.08 * i} className="flex flex-col-reverse">
                  <dt className="eyebrow mt-3 normal-case tracking-[0.06em]">{k.label}</dt>
                  <dd className="font-display tnum text-[2.25rem] font-semibold leading-none tracking-[-0.03em] sm:text-[2.75rem]">
                    {k.wert}
                    <span className="ml-1 text-base font-medium tracking-normal text-muted">{k.einheit}</span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
