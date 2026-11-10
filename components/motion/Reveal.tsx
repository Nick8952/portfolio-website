'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { useReduziert } from '@/components/motion/useSichtbar'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Verzoegerung in Sekunden — fuer gestaffelte Reihen. */
  delay?: number
  /** Weg in Pixeln, den das Element nach oben zuruecklegt. */
  weg?: number
}

/**
 * Die eine Einblendung der Seite: von leicht unten, einmalig, sobald das
 * Element zu einem Fuenftel im Bild ist. Unter Bewegungsreduktion steht der
 * Inhalt sofort — nichts ist erst nach einer Animation lesbar.
 */
export default function Reveal({ children, className, delay = 0, weg = 22 }: RevealProps) {
  const reduziert = useReduziert()

  return (
    <motion.div
      className={className}
      initial={reduziert ? false : { opacity: 0, y: weg }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
