'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import IPhone from '@/components/ui/IPhone'
import { websites, type Website } from '@/lib/content'
import { asset, cn } from '@/lib/utils'

/**
 * Die Websites als Dock: eine Reihe kleiner Glas-Kacheln, an der man in
 * Sekunden vorbei ist. Wer eine antippt, bekommt ein Sheet mit der ganzen
 * Website — Desktop, Handy, ein Satz, der Link. Wer nicht will, scrollt weiter.
 *
 * Frueher war das ein Stapel aus sechs Vollbild-Panels, an dem niemand vorbei-
 * kam. Das war ein Zwang. Jetzt ist es ein Angebot.
 */
export default function Websites() {
  const [offen, setOffen] = useState<number | null>(null)
  const ausloeserRef = useRef<HTMLElement | null>(null)

  const oeffnen = useCallback((index: number, ausloeser: HTMLElement) => {
    ausloeserRef.current = ausloeser
    setOffen(index)
  }, [])

  const schliessen = useCallback(() => {
    setOffen(null)
    // Fokus zurueck auf die Kachel, die das Sheet geoeffnet hat.
    requestAnimationFrame(() => ausloeserRef.current?.focus())
  }, [])

  return (
    <section id="websites" className="section">
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <h2 className="font-display text-display-lg font-semibold text-balance">
              Sechs Websites, die es gibt.
            </h2>
            <p className="mt-5 max-w-measure text-lede text-ink/70 text-pretty">
              Die meisten davon habe ich gebaut, ohne dass jemand danach gefragt hat — als Demo für
              einen Betrieb, dessen alte Seite es besser verdient hatte.
            </p>
          </div>
          <p className="text-base text-muted md:col-span-4 md:col-start-9 md:pb-1">
            Antippen zum Ansehen. Jede Adresse ist echt und öffentlich.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-16 lg:grid-cols-6">
          {websites.map((site, i) => (
            <li key={site.slug}>
              <button
                type="button"
                onClick={(e) => oeffnen(i, e.currentTarget)}
                data-cursor="Ansehen"
                aria-haspopup="dialog"
                className="glass-lite group block w-full rounded-card p-2 text-left transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="block aspect-[16/10] overflow-hidden rounded-[10px] bg-sunk">
                  <img
                    src={asset(`/websites/${site.slug}-desktop.jpg`)}
                    alt=""
                    width={1440}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </span>
                <span className="block px-2 pb-1.5 pt-3">
                  <span className="block truncate text-[0.9375rem] font-medium text-ink">{site.name}</span>
                  <span className="block truncate text-sm text-muted">{site.branche}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Sheet index={offen} onClose={schliessen} onWechsel={setOffen} />
    </section>
  )
}

/**
 * Das Sheet: Glas ueber der abgedunkelten Seite, wie ein iOS-Sheet. Esc
 * schliesst, Pfeiltasten blaettern, der Fokus bleibt drin, der Hintergrund
 * scrollt nicht mit.
 */
function Sheet({
  index,
  onClose,
  onWechsel,
}: {
  index: number | null
  onClose: () => void
  onWechsel: (i: number) => void
}) {
  const reduziert = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const site: Website | null = index === null ? null : websites[index]

  useEffect(() => {
    if (index === null) return

    const beiTaste = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onWechsel((index + 1) % websites.length)
      if (e.key === 'ArrowLeft') onWechsel((index - 1 + websites.length) % websites.length)
      if (e.key === 'Tab' && panelRef.current) {
        // Fokus im Sheet halten.
        const fokussierbar = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        )
        const erstes = fokussierbar[0]
        const letztes = fokussierbar[fokussierbar.length - 1]
        if (e.shiftKey && document.activeElement === erstes) {
          e.preventDefault()
          letztes?.focus()
        } else if (!e.shiftKey && document.activeElement === letztes) {
          e.preventDefault()
          erstes?.focus()
        }
      }
    }

    document.addEventListener('keydown', beiTaste)
    const vorher = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('button')?.focus())

    return () => {
      document.removeEventListener('keydown', beiTaste)
      document.body.style.overflow = vorher
    }
  }, [index, onClose, onWechsel])

  return (
    <AnimatePresence>
      {site && index !== null && (
        <motion.div
          key="sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-titel"
          className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={reduziert ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduziert ? undefined : { opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Abdunkelung + Weichzeichnung der Seite dahinter */}
          <button
            type="button"
            aria-label="Schliessen"
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            className="glass-strong relative flex max-h-[100svh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[1.75rem] sm:max-h-[92svh] sm:rounded-[1.75rem]"
            initial={reduziert ? false : { y: 40, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={reduziert ? undefined : { y: 24, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between gap-4 px-5 pt-4 sm:px-8 sm:pt-6">
              <p className="text-sm text-muted tnum">
                {String(index + 1).padStart(2, '0')} / {String(websites.length).padStart(2, '0')}
              </p>
              <div className="flex items-center gap-2">
                <RundKnopf
                  label="Vorherige Website"
                  onClick={() => onWechsel((index - 1 + websites.length) % websites.length)}
                >
                  <path d="M10 4 6 8l4 4" />
                </RundKnopf>
                <RundKnopf
                  label="Nächste Website"
                  onClick={() => onWechsel((index + 1) % websites.length)}
                >
                  <path d="m6 4 4 4-4 4" />
                </RundKnopf>
                <RundKnopf label="Schliessen" onClick={onClose}>
                  <path d="M4 4l8 8M12 4l-8 8" />
                </RundKnopf>
              </div>
            </div>

            <div className="overflow-y-auto px-5 pb-6 pt-4 sm:px-8 sm:pb-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={site.slug}
                  className="grid gap-8 lg:grid-cols-12 lg:gap-8"
                  initial={reduziert ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduziert ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="lg:col-span-4">
                    <h3 id="sheet-titel" className="font-display text-display-md font-semibold">
                      {site.name}
                    </h3>
                    <p className="mt-2 text-base text-ink/70">
                      {site.branche} · {site.ort}
                    </p>
                    <p className="mt-5 max-w-[36ch] text-base leading-relaxed text-ink/80 text-pretty">
                      {site.satz}
                    </p>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex h-12 items-center gap-2 rounded-pill bg-ink px-6 text-[0.9375rem] font-medium text-paper transition-colors duration-200 ease-out hover:bg-kobalt"
                    >
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
                    </a>
                  </div>

                  <div className="relative lg:col-span-8">
                    <div className="overflow-hidden rounded-card border border-hairline bg-sunk shadow-lift">
                      <div aria-hidden="true" className="flex h-8 items-center gap-1.5 border-b border-hairline px-3.5">
                        <span className="h-2 w-2 rounded-pill bg-hairline" />
                        <span className="h-2 w-2 rounded-pill bg-hairline" />
                        <span className="h-2 w-2 rounded-pill bg-hairline" />
                      </div>
                      <div className="aspect-[1440/900] overflow-hidden">
                        <img
                          src={asset(`/websites/${site.slug}-desktop.jpg`)}
                          alt={`${site.name} am Computer`}
                          width={1440}
                          height={900}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    </div>
                    <IPhone
                      className="absolute bottom-4 left-5 w-[21%] min-w-[4.75rem] max-w-[7.5rem]"
                      hintergrund={asset(`/websites/${site.slug}-mobile.jpg`)}
                      helleStatusleiste={site.hellerKopf}
                    >
                      <img
                        src={asset(`/websites/${site.slug}-mobile.jpg`)}
                        alt={`${site.name} auf dem Handy`}
                        width={390}
                        height={844}
                        className="h-full w-full object-cover object-top"
                      />
                    </IPhone>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function RundKnopf({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-pill bg-ink/5 text-ink transition-colors duration-200 ease-out hover:bg-ink/10',
      )}
    >
      <span className="sr-only">{label}</span>
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </button>
  )
}
