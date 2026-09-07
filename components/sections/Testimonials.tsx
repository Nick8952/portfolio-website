import type { CSSProperties } from 'react'

import Picture from '@/components/ui/Picture'
import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import type { SectionCopy, Testimonial } from '@/types/content'

type TestimonialsProps = {
  copy: SectionCopy['testimonials']
  testimonials: Testimonial[]
}

/**
 * Die Komposition aus der Vorlage: das Section-Wort im Riesengrad im Hintergrund,
 * davor versetzte Kreiskarten.
 *
 * Kreise sind für Fliesstext ein schlechter Container — deshalb greift die runde
 * Form erst ab `lg`, wo genug Fläche da ist. Darunter stehen ganz normale
 * abgerundete Karten. Die Vorlage nachzubauen ist kein Grund, ein Zitat auf dem
 * Handy unlesbar zu machen.
 */
export default function Testimonials({ copy, testimonials }: TestimonialsProps) {
  // Der versetzte Stand der Karten. Ab `lg` greift der vertikale Versatz, der
  // der Reihe ihre Bewegung gibt.
  const OFFSETS = ['lg:mt-0', 'lg:mt-24', 'lg:mt-10']

  return (
    <section id="stimmen" className="section overflow-hidden bg-paper">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-3 text-muted">
            <span aria-hidden="true" className="h-px w-8 bg-hairline" />
            {copy.label}
          </p>
        </Reveal>

        <h2 className="sr-only">
          {copy.headingLead} {copy.headingTrail}
        </h2>

        <div className="relative">
          {/* Das Wort im Hintergrund. Rein visuell — die echte Überschrift steht
              oben als sr-only, damit Screenreader einen Satz hören und nicht ein
              gesperrtes Einzelwort.

              Es nutzt dieselbe Breitenbindung wie das Hero-Wort: nur wenn es die
              volle Spalte füllt, ragt es links und rechts über die Kreise hinaus
              und ist überhaupt lesbar. */}
          <div
            aria-hidden="true"
            className="fit-word pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none"
            style={{ '--chars': copy.label.length, '--cap': '22rem' } as CSSProperties}
          >
            <p className="display text-center leading-none text-ink/15">{copy.label}</p>
          </div>

          <ul className="relative grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:py-16">
            {testimonials.map((item, index) => (
              <li key={item._id} className={cn(OFFSETS[index % OFFSETS.length])}>
                <Reveal delay={index * 0.1}>
                  <figure
                    className={cn(
                      'flex h-full flex-col justify-center rounded-card p-7 text-center',
                      'lg:aspect-square lg:rounded-full lg:p-12',
                      item.featured
                        ? 'bg-wine text-paper'
                        : 'bg-paper-sunk text-ink-soft ring-1 ring-hairline',
                    )}
                  >
                    <blockquote
                      className={cn(
                        'text-sm leading-relaxed lg:text-[0.9375rem]',
                        item.featured ? 'text-paper/85' : 'text-ink-soft',
                      )}
                    >
                      {item.quote}
                    </blockquote>

                    <figcaption className="mt-6 flex flex-col items-center gap-3">
                      {item.photo && (
                        <span className="h-11 w-11 overflow-hidden rounded-full bg-paper/20">
                          <Picture
                            image={item.photo}
                            width={88}
                            height={88}
                            sizes="44px"
                          />
                        </span>
                      )}
                      <span>
                        <span
                          className={cn(
                            'block text-sm font-medium',
                            item.featured ? 'text-paper' : 'text-ink',
                          )}
                        >
                          {item.author}
                        </span>
                        <span
                          className={cn(
                            'mt-0.5 block font-mono text-[0.6875rem] uppercase tracking-[0.12em]',
                            item.featured ? 'text-paper/60' : 'text-muted',
                          )}
                        >
                          {item.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
