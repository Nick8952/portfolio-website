'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { websites, type Website } from '@/lib/content'
import { asset, cn } from '@/lib/utils'

/**
 * Der eine inszenierte Moment der Seite.
 *
 * Jede Website ist ein Panel, das am oberen Rand haften bleibt, waehrend das
 * naechste darueber schiebt. Kein Raster, keine Kacheln: jede Arbeit bekommt
 * den ganzen Bildschirm, und wer scrollt, blaettert durch einen Stapel.
 * Das Panel darunter schrumpft leicht und dunkelt ab, damit die Tiefe lesbar
 * wird — ohne diesen Schritt saehe es aus, als wuerde der Inhalt einfach
 * abgeschnitten.
 *
 * Das Haften gibt es nur auf grossen Bildschirmen und ohne Bewegungsreduktion.
 * Auf dem Handy ist ein Panel hoeher als der Viewport — das naechste wuerde den
 * Screenshot zudecken, bevor man ihn gesehen hat. Dort stehen die Panels
 * schlicht untereinander.
 */
function useStapel(): boolean {
  const reduziert = useReducedMotion()
  const [gross, setGross] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const anwenden = () => setGross(mq.matches)
    anwenden()
    mq.addEventListener('change', anwenden)
    return () => mq.removeEventListener('change', anwenden)
  }, [])
  return gross && !reduziert
}

export default function Websites() {
  const sticky = useStapel()

  return (
    <section id="websites" className="section pb-0">
      <div className="shell">
        <h2 className="font-display text-display-lg font-semibold text-balance max-w-[22ch]">
          Sechs Websites. Alle echt, alle online.
        </h2>
        <p className="mt-5 max-w-measure text-lede text-ink/70 text-pretty">
          Die meisten davon habe ich gebaut, ohne dass jemand danach gefragt hat — als Demo für einen
          Betrieb, dessen alte Seite es besser verdient hatte. Genau so würde ich es bei Ihnen machen.
        </p>
      </div>

      <div className="mt-16 md:mt-24">
        {websites.map((site, i) => (
          <Panel key={site.slug} site={site} index={i} letzte={i === websites.length - 1} sticky={sticky} />
        ))}
      </div>
    </section>
  )
}

function Panel({
  site,
  index,
  letzte,
  sticky,
}: {
  site: Website
  index: number
  letzte: boolean
  sticky: boolean
}) {
  const ref = useRef<HTMLElement>(null)

  // Fortschritt, mit dem das naechste Panel dieses hier ueberdeckt.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const abdunkeln = useTransform(scrollYProgress, [0, 1], [0, 0.35])

  return (
    <article
      ref={ref}
      className={cn('relative', sticky && 'sticky top-20')}
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={sticky && !letzte ? { scale } : undefined}
        className="origin-top border-t border-hairline bg-paper"
      >
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Ansehen"
          className="shell group grid gap-8 py-10 text-ink md:py-14 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:items-center lg:gap-8"
        >
          <div className="lg:col-span-4">
            <p className="text-sm text-muted tnum">
              {String(index + 1).padStart(2, '0')} / {String(websites.length).padStart(2, '0')}
            </p>
            <h3 className="mt-6 font-display text-display-md font-semibold">{site.name}</h3>
            <p className="mt-2 text-base text-ink/70">
              {site.branche} · {site.ort}
            </p>
            <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-ink/80 text-pretty">{site.satz}</p>

            <span className="mt-8 inline-flex items-center gap-2 text-base font-medium text-ink">
              <span className="link">Website ansehen</span>
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" />
              </svg>
            </span>

          </div>

          {/* Desktop-Ansicht im Browserrahmen, Handy-Ansicht davor. */}
          <div className="relative lg:col-span-8">
            <div className="overflow-hidden rounded-card border border-hairline bg-sunk shadow-lift">
              <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-hairline px-4">
                <span className="h-2.5 w-2.5 rounded-pill bg-hairline" />
                <span className="h-2.5 w-2.5 rounded-pill bg-hairline" />
                <span className="h-2.5 w-2.5 rounded-pill bg-hairline" />
                <span className="ml-3 h-4 flex-1 rounded-[4px] bg-hairline/60" />
              </div>
              <div className="aspect-[1440/900] overflow-hidden">
                <img
                  src={asset(`/websites/${site.slug}-desktop.jpg`)}
                  alt={`${site.name} am Computer`}
                  width={1440}
                  height={900}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 w-[22%] min-w-[5.5rem] max-w-[8rem] overflow-hidden rounded-[1.1rem] border-[3px] border-ink bg-ink shadow-lift md:bottom-6 md:left-6">
              <div className="aspect-[390/844]">
                <img
                  src={asset(`/websites/${site.slug}-mobile.jpg`)}
                  alt=""
                  width={390}
                  height={844}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </a>

        {/* Abdunkelung waehrend das naechste Panel darueber gleitet. */}
        {sticky && !letzte && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: abdunkeln }}
            className="pointer-events-none absolute inset-0 bg-ink"
          />
        )}
      </motion.div>
    </article>
  )
}
