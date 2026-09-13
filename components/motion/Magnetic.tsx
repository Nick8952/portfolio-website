'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'

type MagneticProps = {
  children: ReactNode
  /** Wie weit das Element dem Zeiger entgegenkommt, 0–1. */
  staerke?: number
  className?: string
}

/**
 * Zieht ein Element leicht zum Zeiger, sobald er in der Naehe ist. Fuer die
 * zwei, drei Schaltflaechen, die zaehlen — nicht fuer jeden Link. Auf Touch
 * gibt es keinen Zeiger, also auch keinen Effekt.
 */
export default function Magnetic({ children, staerke = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduziert = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const federX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const federY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  function beiBewegung(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduziert || e.pointerType !== 'mouse') return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - (r.left + r.width / 2)) * staerke)
    y.set((e.clientY - (r.top + r.height / 2)) * staerke)
  }

  function beiVerlassen() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={beiBewegung}
      onPointerLeave={beiVerlassen}
      style={{ x: federX, y: federY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
