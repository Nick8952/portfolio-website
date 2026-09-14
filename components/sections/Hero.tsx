'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import Magnetic from '@/components/motion/Magnetic'
import IPhone from '@/components/ui/IPhone'
import { branchen, hero, websites } from '@/lib/content'
import { asset } from '@/lib/utils'

/**
 * Welche Website zu welcher Branche im Hero gezeigt wird. Das Wort und das
 * Bild wechseln gemeinsam — die Bewegung zeigt etwas, sie schmueckt nicht.
 */
const BRANCHE_ZU_SLUG: Record<(typeof branchen)[number], string> = {
  Fahrschule: 'fahrschul-center',
  Elektrobetrieb: 'altec-elektro',
  Restaurant: 'gusto-campano',
  Reinigungsfirma: 'clean-express',
  Hauswartung: 'hg-dienstleistungen',
}

const TAKT_MS = 2600

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [imBild, setImBild] = useState(true)
  const reduziert = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Wer beim Formular ist, braucht keinen Hero, der im Hintergrund weiterschaltet.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setImBild(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduziert || !imBild) return
    const t = setInterval(() => setIndex((i) => (i + 1) % branchen.length), TAKT_MS)
    return () => clearInterval(t)
  }, [reduziert, imBild])

  const branche = branchen[index]
  const site = websites.find((w) => w.slug === BRANCHE_ZU_SLUG[branche]) ?? websites[0]

  const auf = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <section ref={sectionRef} id="top" className="relative pb-20 pt-32 md:pb-28 md:pt-40">
      <div aria-hidden="true" className="ambient" />
      <div className="shell relative z-[1] grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h1 className="font-display text-display-xl font-semibold text-balance">
            <motion.span
              className="block"
              initial={reduziert ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={auf}
            >
              {hero.titelVor}
            </motion.span>

            {/* Das Wort, das wechselt. Die Hoehe ist fixiert, damit die Zeilen
                darunter beim Wechsel nicht springen. */}
            <span className="relative block h-[1.02em] overflow-hidden text-kobalt" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={branche}
                  className="absolute inset-x-0 top-0 block"
                  initial={reduziert ? false : { y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduziert ? undefined : { y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {branche}
                  <span className="text-ink">.</span>
                </motion.span>
              </AnimatePresence>
            </span>

          </h1>

          <motion.p
            className="mt-8 max-w-measure text-lede text-ink/70 text-pretty"
            initial={reduziert ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...auf, delay: 0.18 }}
          >
            <strong className="font-semibold text-ink">{hero.versprechen}</strong> {hero.text}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={reduziert ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...auf, delay: 0.26 }}
          >
            <Magnetic>
              <a
                href="#anfrage"
                className="inline-flex h-13 items-center rounded-pill bg-kobalt px-7 text-base font-medium text-paper transition-colors duration-200 ease-out hover:bg-ink"
              >
                {hero.cta}
              </a>
            </Magnetic>
            <a
              href="#websites"
              className="glass-lite inline-flex h-13 items-center rounded-pill px-7 text-base font-medium text-ink transition-shadow duration-200 ease-out hover:shadow-lift"
            >
              {hero.ctaSekundaer}
            </a>
          </motion.div>
        </div>

        {/* Das iPhone zeigt die Website der Branche, die gerade im Titel steht. */}
        <motion.div
          className="relative mx-auto w-[min(78vw,17rem)] lg:col-span-5 lg:mx-0 lg:ml-auto lg:w-[19rem]"
          initial={reduziert ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...auf, delay: 0.3 }}
        >
          <IPhone
            hintergrund={asset(`/websites/${site.slug}-mobile.jpg`)}
            helleStatusleiste={site.hellerKopf}
          >
            {/* Aus, dann ein: eine Ueberblendung belichtet kurz beide Screenshots doppelt. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={site.slug}
                src={asset(`/websites/${site.slug}-mobile.jpg`)}
                alt={`${site.name} auf dem Handy`}
                width={390}
                height={844}
                className="absolute inset-0 h-full w-full object-cover object-top"
                initial={reduziert ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduziert ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
          </IPhone>
          <p className="mt-4 text-center text-sm text-muted">
            {site.name} · {site.branche}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
