'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { kennzahlen } from '@/lib/content'

/**
 * Vier Zahlen in einer Reihe aus Hairline-Kacheln. Jede ist belegt (siehe
 * content.ts); die Fussnote sagt, worauf sie sich bezieht. Beim ersten
 * Hereinscrollen zaehlen sie kurz hoch — unter Bewegungsreduktion stehen sie.
 */
export default function Kennzahlen() {
  return (
    // Hairlines zwischen den Kacheln: ein 1px-Raster auf Hairline-Grund, die
    // Kacheln selbst in Papier. dt vor dd im DOM, visuell umgekehrt.
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-hairline bg-hairline lg:grid-cols-4">
      {kennzahlen.map((k, i) => (
        <div key={k.label} className="flex flex-col-reverse bg-paper p-6 sm:p-8">
          <dt className="mt-4 text-[0.9375rem] font-medium text-ink">
            {k.label}
            <span className="eyebrow mt-1.5 block normal-case tracking-[0.05em]">{k.fussnote}</span>
          </dt>
          <dd className="font-display tnum text-[2.75rem] font-semibold leading-none tracking-[-0.03em] sm:text-[3.25rem]">
            <Zahl bis={k.wert} prefix={k.prefix} suffix={k.suffix} verzoegerung={i * 0.08} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

function Zahl({
  bis,
  prefix,
  suffix,
  verzoegerung,
}: {
  bis: number
  prefix: string
  suffix: string
  verzoegerung: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const imBild = useInView(ref, { once: true, margin: '-60px' })
  const reduziert = useReducedMotion()
  const [wert, setWert] = useState(reduziert ? bis : 0)

  useEffect(() => {
    if (reduziert) {
      setWert(bis)
      return
    }
    if (!imBild) return
    const steuerung = animate(0, bis, {
      duration: 1.1,
      delay: verzoegerung,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setWert(Math.round(v)),
    })
    return () => steuerung.stop()
  }, [imBild, bis, reduziert, verzoegerung])

  return (
    <span ref={ref}>
      {prefix && <span className="text-[0.5em] font-medium tracking-normal text-muted">{prefix}</span>}
      {wert}
      {suffix && <span className="text-kobalt">{suffix}</span>}
    </span>
  )
}
