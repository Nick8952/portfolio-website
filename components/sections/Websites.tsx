'use client'

import { useState } from 'react'

import Reveal from '@/components/motion/Reveal'
import Browser from '@/components/ui/Browser'
import IPhone from '@/components/ui/IPhone'
import { beispiele, beispieleSektion, type Website } from '@/lib/content'
import { asset } from '@/lib/utils'

/** Wie viele Beispiele ohne Klick zu sehen sind; der Rest kommt auf Wunsch. */
const SICHTBAR = 6

/**
 * Die Beispiele — ohne Auftrag entworfen, deshalb als Musterbetrieb: In den
 * Aufnahmen sind Name, Logo, Kontaktdaten und Fotos ersetzt (tools/anonymisieren.mjs),
 * die Karten tragen keinen Firmennamen und keinen Link. Was echt bleibt, ist
 * Nicks Gestaltung. Jede Karte ist ein Browserfenster mit der ganzen Startseite:
 * Maus darueber oder Antippen laesst die Website von oben bis unten durchlaufen.
 * Sechs sofort, die uebrigen nach einem Klick — damit die echte Referenz
 * darueber mehr wiegt als zehn gleichwertige Kacheln.
 */
export default function Websites() {
  const [alle, setAlle] = useState(false)
  const liste = alle ? beispiele : beispiele.slice(0, SICHTBAR)
  const rest = beispiele.length - SICHTBAR

  return (
    <section id="websites" className="section border-t border-hairline">
      <div className="shell">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className="eyebrow eyebrow--slash">{beispieleSektion.eyebrow}</p>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-balance">{beispieleSektion.titel}</h2>
              <p className="mt-5 max-w-measure text-lede text-ink/70 text-pretty">{beispieleSektion.text}</p>
            </div>
            <p className="text-base text-muted md:col-span-4 md:col-start-9 md:pb-1">{beispieleSektion.hinweis}</p>
          </div>
        </Reveal>

        <ul id="demo-raster" className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {liste.map((site, i) => (
            <li key={site.slug} className="cv-auto">
              <Reveal delay={(i % 3) * 0.06}>
                <BeispielKarte site={site} />
              </Reveal>
            </li>
          ))}
        </ul>

        {rest > 0 && (
          <div className="mt-10 flex justify-center">
            {/* Ein echter Umschalter: bleibt stehen, sagt seinen Zustand, steuert das Raster. */}
            <button
              type="button"
              onClick={() => setAlle((v) => !v)}
              aria-expanded={alle}
              aria-controls="demo-raster"
              className="btn btn--glas glass-lite"
            >
              {alle ? 'Weniger anzeigen' : `Weitere ${rest} Beispiele anzeigen`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function BeispielKarte({ site }: { site: Website }) {
  const [aktiv, setAktiv] = useState(false)

  return (
    <article
      data-aktiv={aktiv}
      className="demo-karte group overflow-hidden rounded-card border border-hairline bg-paper transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
    >
      {/* Die Aufnahme als Schaltflaeche: Antippen startet die Fahrt durch die Seite
          (mit Maus genuegt Hover). Kein Link — es gibt nichts zu oeffnen. */}
      <button
        type="button"
        onClick={() => setAktiv((v) => !v)}
        aria-pressed={aktiv}
        aria-label={`${beispieleSektion.knopf}: ${site.name}`}
        data-cursor="Scrollen"
        className="relative block w-full bg-sunk px-4 pt-4 text-left sm:px-5 sm:pt-5"
      >
        <Browser url={site.anzeigeUrl} className="rounded-b-none border-b-0 shadow-none">
          <div className="rahmen relative aspect-[16/11] overflow-hidden">
            <img
              src={asset(`/websites/${site.slug}-desktop-lang.webp`)}
              alt={`${site.name} am Computer, ganze Startseite — Musterangaben statt echter Namen`}
              width={1440}
              height={3600}
              loading="lazy"
              decoding="async"
              className="rahmen__bild absolute left-0 top-0 h-auto w-full"
            />
          </div>
        </Browser>
        <IPhone
          className="absolute bottom-0 left-7 w-[19%] min-w-[4.5rem] max-w-[6.5rem] translate-y-[14%] sm:left-9"
          hintergrund={asset(`/websites/${site.slug}-mobile.webp`)}
          helleStatusleiste={site.hellerKopf}
        >
          <img
            src={asset(`/websites/${site.slug}-mobile.webp`)}
            alt=""
            width={390}
            height={844}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </IPhone>
      </button>

      <div className="p-5 sm:p-6">
        <p className="eyebrow">
          Beispiel · {site.branche} · {site.ort}
        </p>
        <h3 className="mt-2.5 font-display text-xl font-semibold tracking-[-0.01em]">{site.name}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/75 text-pretty">{site.satz}</p>
        <p className="eyebrow mt-4 normal-case tracking-[0.05em]">Musterbetrieb · Name, Logo und Fotos ersetzt</p>
      </div>
    </article>
  )
}
