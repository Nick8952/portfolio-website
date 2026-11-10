'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Framer Motion respektiert damit die Systemeinstellung «Bewegung reduzieren»
 * zur Laufzeit: Transform-Animationen entfallen, Deckkraft bleibt. Das greift
 * beim Abspielen, nicht beim Rendern — und laesst Server und Client dasselbe
 * Markup erzeugen (siehe useReduziert in useSichtbar.ts).
 */
export default function BewegungsKonfig({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
