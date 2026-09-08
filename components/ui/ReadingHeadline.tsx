'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

import { cn, splitWords } from '@/lib/utils'

/**
 * Das Signature-Element der Seite.
 *
 * Zweifarbige Headlines gibt es überall — hier ist die Tongrenze aber nicht
 * festgelegt, sondern wandert beim Scrollen Wort für Wort durch den Satz, als
 * würde jemand mitlesen. Der erste Teil (`lead`) steht dabei durchgehend im
 * kräftigen Ton, der zweite (`trail`) hellt von hinten nach vorne auf.
 *
 * Unter `prefers-reduced-motion` bleibt die statische Zweifarbigkeit übrig —
 * die Headline sieht dann aus wie in der Vorlage, nur eben unbewegt.
 */

const TONES = {
  light: { dim: '#8A8480', bright: '#140A0C' },
  dark: { dim: '#7E7370', bright: '#F2F0ED' },
} as const

type Tone = keyof typeof TONES

/**
 * Bewusst eine enge Auswahl statt `ElementType`: Letzteres ist die Vereinigung
 * *aller* Elementtypen, auch solcher ohne Kinder (etwa `br`). TypeScript
 * schneidet die Props dieser Vereinigung und landet bei `never` — die Komponente
 * liesse sich dann gar nicht mehr mit Inhalt aufrufen. Die vier Tags hier teilen
 * dieselbe Prop-Form und decken jeden Einsatz auf der Seite ab.
 */
type HeadlineTag = 'h1' | 'h2' | 'h3' | 'p'

type ReadingHeadlineProps = {
  lead: string
  trail?: string
  /** Auf welchem Grund die Headline sitzt — bestimmt beide Farbtöne. */
  tone?: Tone
  as?: HeadlineTag
  className?: string
  id?: string
}

function ReadingWord({
  word,
  progress,
  range,
  tone,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
  tone: Tone
}) {
  // useTransform klemmt ausserhalb des Bereichs ab: vor `range[0]` bleibt das
  // Wort gedimmt, nach `range[1]` ist es endgültig eingefärbt.
  const color = useTransform(progress, range, [TONES[tone].dim, TONES[tone].bright])

  return (
    <motion.span style={{ color }} className="transition-none">
      {word}{' '}
    </motion.span>
  )
}

export default function ReadingHeadline({
  lead,
  trail,
  tone = 'light',
  as: tag = 'h2',
  className,
  id,
}: ReadingHeadlineProps) {
  // Alle erlaubten Tags nehmen dieselben Props entgegen; die Festlegung auf
  // einen konkreten Typ erspart TypeScript die Vereinigung über die Variante.
  const Tag = tag as 'h2'
  const ref = useRef<HTMLHeadingElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Startet, wenn der Kopf der Headline auf 85 % Viewporthöhe steht, und ist
  // durch, wenn er 40 % erreicht — etwa die Strecke, die man beim Lesen scrollt.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.4'],
  })

  const trailWords = trail ? splitWords(trail) : []
  const step = trailWords.length > 0 ? 1 / trailWords.length : 1

  return (
    <Tag ref={ref} id={id} className={cn('text-balance', className)}>
      <span style={{ color: TONES[tone].bright }}>{lead} </span>

      {trailWords.length > 0 &&
        (prefersReducedMotion ? (
          <span style={{ color: TONES[tone].dim }}>{trail}</span>
        ) : (
          trailWords.map((word, index) => (
            <ReadingWord
              key={`${word}-${index}`}
              word={word}
              progress={scrollYProgress}
              range={[index * step, index * step + step]}
              tone={tone}
            />
          ))
        ))}
    </Tag>
  )
}
