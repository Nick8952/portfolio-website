'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * Die WebGL-Ebene hinter der Hero-Typografie.
 *
 * Gestalterisch führt sie das Konzept der Seite fort: Bordeaux ist hier keine
 * Farbfläche, sondern eine Lichtquelle. Ein Gitter aus schmalen Stäben, über das
 * eine langsame Welle läuft, wird von genau einem warmen Licht gestreift — die
 * Kämme fangen das Licht, die Täler bleiben schwarz. Das ergibt Struktur und
 * Rhythmus statt eines rotierenden Objekts, und es bleibt dunkel genug, um der
 * Schrift davor nicht die Aufmerksamkeit zu nehmen.
 *
 * Leistung:
 *   - Ein einziges InstancedMesh, also ein Draw-Call für alle Stäbe.
 *   - Pixelverhältnis auf 1.5 gedeckelt; auf Retina-Displays sonst vierfache
 *     Füllrate ohne sichtbaren Gewinn.
 *   - Rendert nur, solange der Hero im Bild ist (IntersectionObserver).
 *   - Bei `prefers-reduced-motion` wird ein Standbild gerendert und danach
 *     nicht mehr animiert.
 */

const SPALTEN = 36
const REIHEN = 16
const ABSTAND = 0.5

// Wiederverwendete Hilfsobjekte. Pro Frame neu anzulegen wuerde den Garbage
// Collector unnoetig beschaeftigen.
const hilfsObjekt = new THREE.Object3D()

function StabGitter({ bewegt }: { bewegt: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const positionen = useMemo(() => {
    const liste: Array<{ x: number; z: number; abstandVomZentrum: number }> = []

    for (let spalte = 0; spalte < SPALTEN; spalte += 1) {
      for (let reihe = 0; reihe < REIHEN; reihe += 1) {
        const x = (spalte - (SPALTEN - 1) / 2) * ABSTAND
        const z = (reihe - (REIHEN - 1) / 2) * ABSTAND

        // Radialer Abfall: zum Rand hin werden die Stäbe flacher, damit das
        // Gitter ausfranst statt als harte Rechteckkante zu enden.
        const abstandVomZentrum = Math.sqrt((x / 9) ** 2 + (z / 5) ** 2)

        liste.push({ x, z, abstandVomZentrum })
      }
    }

    return liste
  }, [])

  const zeichne = (zeit: number) => {
    const mesh = meshRef.current
    if (!mesh) return

    positionen.forEach((punkt, index) => {
      // Zwei überlagerte Wellen mit unterschiedlicher Richtung und Frequenz —
      // eine einzelne Sinuswelle sähe sofort nach Muster aus.
      const welleA = Math.sin(punkt.x * 0.42 + zeit * 0.55)
      const welleB = Math.cos(punkt.z * 0.38 - zeit * 0.34)
      const kamm = (welleA * 0.5 + 0.5) * (welleB * 0.5 + 0.5)

      const abfall = Math.max(0, 1 - punkt.abstandVomZentrum)
      const hoehe = 0.08 + kamm * 1.15 * abfall * abfall

      hilfsObjekt.position.set(punkt.x, hoehe / 2, punkt.z)
      hilfsObjekt.scale.set(1, Math.max(hoehe, 0.02), 1)
      hilfsObjekt.updateMatrix()
      mesh.setMatrixAt(index, hilfsObjekt.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true
  }

  // Standbild für den Fall, dass nicht animiert werden darf.
  useEffect(() => {
    if (!bewegt) zeichne(2.4)
    // `zeichne` haengt nur an `positionen`, das sich nie aendert.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bewegt])

  useFrame((state) => {
    if (bewegt) zeichne(state.clock.elapsedTime)
  })

  return (
    <instancedMesh
      ref={meshRef}
      position={[0, -2.6, -2.2]}
      args={[undefined, undefined, SPALTEN * REIHEN]}
      castShadow={false}
      receiveShadow={false}
    >
      <boxGeometry args={[0.1, 1, 0.1]} />
      <meshStandardMaterial color="#2A0B14" roughness={0.5} metalness={0.15} />
    </instancedMesh>
  )
}

/** Sanfte Kameraverschiebung mit dem Zeiger — gibt dem Gitter Tiefe. */
function ZeigerParallaxe({ aktiv }: { aktiv: boolean }) {
  const ziel = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!aktiv) return

    const beiBewegung = (ereignis: PointerEvent) => {
      ziel.current.x = (ereignis.clientX / window.innerWidth - 0.5) * 2
      ziel.current.y = (ereignis.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('pointermove', beiBewegung, { passive: true })
    return () => window.removeEventListener('pointermove', beiBewegung)
  }, [aktiv])

  useFrame((state) => {
    if (!aktiv) return

    // Nachlaufende Interpolation statt harter Zuweisung: die Kamera zieht der
    // Maus weich hinterher, statt zu springen.
    state.camera.position.x += (ziel.current.x * 1.5 - state.camera.position.x) * 0.03
    state.camera.position.y += (1.4 - ziel.current.y * 0.5 - state.camera.position.y) * 0.03
    state.camera.lookAt(0, -2, 0)
  })

  return null
}

export default function HeroScene() {
  const [imBild, setImBild] = useState(true)
  const [darfBewegen, setDarfBewegen] = useState(true)
  const huelleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const abfrage = window.matchMedia('(prefers-reduced-motion: reduce)')
    const anwenden = () => setDarfBewegen(!abfrage.matches)

    anwenden()
    abfrage.addEventListener('change', anwenden)
    return () => abfrage.removeEventListener('change', anwenden)
  }, [])

  // Sobald der Hero aus dem Bild gescrollt ist, wird nicht weitergerendert.
  // Ohne das liefe die Szene die ganze Seite lang im Hintergrund weiter.
  useEffect(() => {
    const knoten = huelleRef.current
    if (!knoten) return

    const beobachter = new IntersectionObserver(
      ([eintrag]) => setImBild(eintrag.isIntersecting),
      { rootMargin: '100px' },
    )

    beobachter.observe(knoten)
    return () => beobachter.disconnect()
  }, [])

  const laeuft = imBild && darfBewegen

  return (
    <div ref={huelleRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.4, 13], fov: 30 }}
        dpr={[1, 1.5]}
        frameloop={laeuft ? 'always' : 'demand'}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        // Der Hero-Verlauf liegt im CSS darunter und soll durchscheinen.
        style={{ background: 'transparent' }}
      >
        {/* Nebel in der Grundfarbe: das Gitter verliert sich nach hinten und zu
            den Seiten im Dunkel, statt an einer sichtbaren Kante aufzuhoeren. */}
        <fog attach="fog" args={['#140A0C', 8, 20]} />

        {/* Sehr wenig Grundhelligkeit — die Täler des Gitters sollen schwarz
            bleiben, damit die Kämme überhaupt als Licht lesbar sind. */}
        <ambientLight intensity={0.22} color="#4A0E1C" />

        {/* Das eine warme Licht. Streift von links oben über das Gitter. */}
        <directionalLight position={[-4, 7, 4]} intensity={2.0} color="#C2364B" />

        {/* Ein kühler, sehr schwacher Gegenpol; ohne ihn wirken die
            abgewandten Seiten der Stäbe tot. */}
        <directionalLight position={[6, 2, -3]} intensity={0.35} color="#8891A8" />

        <StabGitter bewegt={laeuft} />
        <ZeigerParallaxe aktiv={laeuft} />
      </Canvas>
    </div>
  )
}
