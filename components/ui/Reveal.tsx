'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Versatz in Sekunden, um Elemente einer Gruppe nacheinander erscheinen zu lassen. */
  delay?: number
  className?: string
}

/**
 * Einheitlicher Auftritt beim Hereinscrollen: ein kurzer Weg von unten, keine
 * Skalierung, kein Blur. Eine einzige Bewegungsart für die ganze Seite hält den
 * Eindruck ruhig — vier verschiedene Effekte wirken schnell zusammengewürfelt.
 *
 * `once: true`, weil Elemente, die bei jedem Vorbeiscrollen neu einfliegen,
 * beim zweiten Mal nur noch stören.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
