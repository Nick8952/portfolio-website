'use client'

import { useState } from 'react'

import Reveal from '@/components/motion/Reveal'
import Browser from '@/components/ui/Browser'
import IPhone from '@/components/ui/IPhone'
import { demos, type Website } from '@/lib/content'
import { asset } from '@/lib/utils'

/** Wie viele Demos ohne Klick zu sehen sind; der Rest kommt auf Wunsch. */
const SICHTBAR = 6

/**
 * Die Demos — alle ohne Auftrag gebaut, alle oeffentlich. Jede Karte ist ein
 * Browserfenster mit der ganzen Startseite: Wer mit der Maus darueber faehrt,
 * sieht die Website von oben bis unten durchlaufen (CSS, nur mit Maus); auf
 * Touch steht der erste Bildschirm. Dazu das Handy, Name, Branche, ein Satz
 * und der Link. Sechs sofort, die uebrigen nach einem Klick — damit die echte
 * Referenz darueber mehr wiegt als zehn gleichwertige Kacheln.
 */
export default function Websites() {
  const [alle, setAlle] = useState(false)
  const liste = alle ? demos : demos.slice(0, SICHTBAR)
  const rest = demos.length - SICHTBAR

  return (
    <section id="websites" className="section border-t border-hairline">
      <div className="shell">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
            <div className="md:col-span-7">
              <p className="eyebrow eyebrow--slash">Demos · ohne Auftrag gebaut</p>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-balance">
                Zehn Websites, die niemand bestellt hat.
              </h2>
              <p className="mt-5 max-w-measure text-lede text-ink/70 text-pretty">
                Jede entstand als Vorschlag für einen Betrieb, dessen alte Seite es besser verdient
                hatte. Alle Adressen sind echt und öffentlich.
              </p>
            </div>
            <p className="text-base text-muted md:col-span-4 md:col-start-9 md:pb-1">
              Mit der Maus über eine Karte: die Website scrollt. Antippen öffnet sie.
            </p>
          </div>
        </Reveal>

        <ul id="demo-raster" className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {liste.map((site, i) => (
            <li key={site.slug} className="cv-auto">
              <Reveal delay={(i % 3) * 0.06}>
                <DemoKarte site={site} />
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
              {alle ? 'Weniger anzeigen' : `Weitere ${rest} Websites anzeigen`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function DemoKarte({ site }: { site: Website }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Öffnen"
      className="demo-karte group block overflow-hidden rounded-card border border-hairline bg-paper transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift focus-visible:-translate-y-1"
    >
      <div className="relative bg-sunk px-4 pt-4 sm:px-5 sm:pt-5">
        <Browser url={site.anzeigeUrl} className="rounded-b-none border-b-0 shadow-none">
          <div className="rahmen relative aspect-[16/11] overflow-hidden">
            <img
              src={asset(`/websites/${site.slug}-desktop-lang.webp`)}
              alt={`${site.name} am Computer, ganze Startseite`}
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
      </div>

      <div className="p-5 sm:p-6">
        <p className="eyebrow">
          {site.branche} · {site.ort} · {site.jahr}
        </p>
        <h3 className="mt-2.5 font-display text-xl font-semibold tracking-[-0.01em]">{site.name}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/75 text-pretty">{site.satz}</p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-200 group-hover:text-kobalt">
          Website öffnen
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
        </p>
      </div>
    </a>
  )
}
