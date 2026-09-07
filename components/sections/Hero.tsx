import type { CSSProperties } from 'react'

import Button from '@/components/ui/Button'
import Picture from '@/components/ui/Picture'
import type { Hero as HeroContent, SiteSettings } from '@/types/content'

type HeroProps = {
  hero: HeroContent
  settings: SiteSettings
}

/**
 * Der Startbereich als These der Seite: der Jobtitel in einem Grad, den man
 * nicht überliest, von hinten angeleuchtet statt flach weiss gefüllt, und ein
 * Portrait, das über die Schrift ragt.
 *
 * Die Ebenen liegen bewusst gestapelt (Typo hinten, Portrait davor, Text
 * darüber) — die Überlappung ist der ganze Effekt. Unterhalb von `md` wird sie
 * aufgelöst, weil sich auf 375 Pixel Breite nichts sinnvoll überlagern lässt.
 */
export default function Hero({ hero, settings }: HeroProps) {
  const cvHref = settings.cvUrl ?? hero.primaryCta?.href

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink bg-hero-bloom text-paper"
    >
      {/* Ebene 1 — die grosse Typo */}
      <div className="pointer-events-none absolute inset-x-0 top-[23%] z-0 md:top-[19%]">
        <div className="shell">
          <p className="display text-center text-[clamp(0.9rem,3.1vw,2.4rem)] leading-none tracking-[0.34em] text-paper/75">
            {hero.displayLead}
          </p>

          {/* Die Zeichenzahl geht als CSS-Variable an die Breitenrechnung in
              globals.css — nur so kann das Wort die Spalte exakt füllen. */}
          <div
            className="fit-word mt-3 md:mt-4"
            style={{ '--chars': hero.displayMain.length } as CSSProperties}
          >
            <h1 className="display text-lit text-center leading-[0.82] tracking-[-0.05em] text-paper">
              {hero.displayMain}
            </h1>
          </div>
          {/* Die Linie aus der Vorlage. Sie schneidet die Grossbuchstaben auf
              Höhe der Grundlinie und gibt dem Portrait eine Kante zum Stehen. */}
          <div className="mx-auto mt-6 h-px w-full max-w-[92%] bg-paper/20 md:mt-8" />
        </div>
      </div>

      {/* Ebene 2 — Portrait */}
      {hero.portrait && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center">
          <div className="relative h-[min(66svh,32rem)] w-[min(84vw,26rem)] md:h-[min(74svh,44rem)] md:w-[min(52vw,34rem)]">
            <Picture
              image={hero.portrait}
              width={720}
              height={900}
              sizes="(max-width: 768px) 84vw, (max-width: 1280px) 52vw, 34rem"
              priority
              className="object-contain object-bottom"
            />
          </div>
        </div>
      )}

      {/* Ebene 3 — Text und Handlungsaufforderungen */}
      <div className="relative z-20 mt-auto">
        {/* Ein Verlauf, damit die Schrift unten nicht auf dem Portrait steht.
            Ohne ihn wird der Text vor hellen Bildbereichen unlesbar. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[130%] bg-gradient-to-t from-ink via-ink/85 to-transparent"
        />

        <div className="shell grid gap-8 pb-10 pt-24 sm:pb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4 text-ember-lift">{hero.eyebrow}</p>
            <p className="max-w-prose text-sm leading-relaxed text-paper/70">{hero.intro}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:col-start-9 lg:justify-end">
            {hero.primaryCta && (
              <Button
                href={cvHref ?? '#kontakt'}
                variant="primary"
                size="lg"
                // Ein echtes PDF wird heruntergeladen; ein Anker bleibt ein Sprung.
                download={settings.cvUrl ? '' : undefined}
              >
                {hero.primaryCta.label}
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2.5v9" />
                  <path d="m4.5 8 3.5 3.5L11.5 8" />
                  <path d="M3 13.5h10" />
                </svg>
              </Button>
            )}

            {hero.secondaryCta && (
              <Button href={hero.secondaryCta.href} variant="onDark" size="lg" withArrow>
                {hero.secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
