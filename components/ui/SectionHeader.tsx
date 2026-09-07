import type { ReactNode } from 'react'

import ReadingHeadline from '@/components/ui/ReadingHeadline'
import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  label: string
  headingLead: string
  headingTrail?: string
  intro?: string
  tone?: 'light' | 'dark'
  /** Grössenstufe der Headline. `manifesto` ist der Riesengrad der Zahlen-Section. */
  scale?: 'default' | 'manifesto'
  /** Zusätzliches Element unter dem Einleitungstext, z. B. eine Schaltfläche. */
  action?: ReactNode
  className?: string
}

/**
 * Der wiederkehrende Kopf einer Section: kleines Label links, zweifarbige
 * Headline darunter, Einleitungstext rechts. Dieselbe Anordnung in jeder
 * Section — der Leser lernt sie einmal und weiss danach immer, wo er ist.
 */
export default function SectionHeader({
  label,
  headingLead,
  headingTrail,
  intro,
  tone = 'light',
  scale = 'default',
  action,
  className,
}: SectionHeaderProps) {
  const isDark = tone === 'dark'

  return (
    <div className={cn('grid gap-8 lg:grid-cols-12 lg:gap-12', className)}>
      <div className={cn(intro || action ? 'lg:col-span-7' : 'lg:col-span-10')}>
        <Reveal>
          <p
            className={cn(
              'eyebrow mb-6 flex items-center gap-3',
              isDark ? 'text-ember-lift' : 'text-muted',
            )}
          >
            <span
              aria-hidden="true"
              className={cn('h-px w-8', isDark ? 'bg-ember/60' : 'bg-hairline')}
            />
            {label}
          </p>
        </Reveal>

        <ReadingHeadline
          lead={headingLead}
          trail={headingTrail}
          tone={tone}
          className={cn(
            scale === 'manifesto'
              ? 'display text-display-md'
              : 'font-display text-display-sm font-bold leading-[1.05] tracking-[-0.02em]',
          )}
        />
      </div>

      {(intro || action) && (
        <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9 lg:pt-2">
          {intro && (
            <Reveal delay={0.1}>
              <p className={cn('max-w-prose text-sm leading-relaxed', isDark ? 'text-paper/65' : 'text-muted')}>
                {intro}
              </p>
            </Reveal>
          )}
          {action && <Reveal delay={0.15}>{action}</Reveal>}
        </div>
      )}
    </div>
  )
}
