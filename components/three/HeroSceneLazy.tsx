'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

/**
 * Lädt die WebGL-Szene erst im Browser und erst nach dem übrigen Seiteninhalt.
 *
 * Das ist der Grund für diese Zwischendatei: `ssr: false` ist in einer Server
 * Component nicht erlaubt, und die Hero-Section ist eine. Ausserdem hat three.js
 * gebündelt rund 150 kB — die dürfen den Aufbau der Seite nicht aufhalten. Bis
 * die Szene da ist, trägt der CSS-Lichtschein aus globals.css den Hintergrund
 * allein, und wenn sie nie kommt, bleibt es einfach dabei.
 */
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

/** Ohne WebGL würde der Canvas beim Anlegen des Kontexts werfen. */
function hatWebGL(): boolean {
  try {
    const leinwand = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (leinwand.getContext('webgl2') || leinwand.getContext('webgl')),
    )
  } catch {
    return false
  }
}

export default function HeroSceneLazy() {
  const [zeigen, setZeigen] = useState(false)

  useEffect(() => {
    setZeigen(hatWebGL())
  }, [])

  if (!zeigen) return null

  return <HeroScene />
}
