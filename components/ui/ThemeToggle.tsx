'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

const SCHLUESSEL = 'design'

/**
 * Hell/dunkel umschalten. Das Attribut data-theme am <html> setzt schon das
 * Inline-Skript in layout.tsx (vor dem ersten Rendern, aus localStorage oder der
 * Systemeinstellung); dieser Schalter aendert es und merkt sich die Wahl.
 *
 * Beide Symbole stehen im Markup, CSS zeigt das passende (.nur-hell/.nur-dunkel):
 * so rendern Server und Client dasselbe, ohne auf den Zustand zu warten. Nur
 * aria-label und aria-pressed kommen nach dem Mount — ein Screenreader liest
 * vorher den neutralen Text.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const [dunkel, setDunkel] = useState<boolean | null>(null)

  useEffect(() => {
    setDunkel(document.documentElement.dataset.theme === 'dark')
  }, [])

  function umschalten() {
    const neu = !(dunkel ?? document.documentElement.dataset.theme === 'dark')
    document.documentElement.dataset.theme = neu ? 'dark' : 'light'
    try {
      localStorage.setItem(SCHLUESSEL, neu ? 'dark' : 'light')
    } catch {
      // Privater Modus o. ae.: dann gilt die Wahl nur bis zum naechsten Laden.
    }
    // Browser-Chrome (Adressleiste) mitziehen — das Meta folgt sonst nur der Systemeinstellung.
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', neu ? '#0b0b0c' : '#ffffff'))
    setDunkel(neu)
  }

  return (
    <button
      type="button"
      onClick={umschalten}
      // Stabiler Name + Zustand: ein Umschalter heisst immer gleich, nur aria-pressed wechselt.
      aria-pressed={dunkel ?? false}
      aria-label="Dunkles Design"
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-pill border border-hairline text-ink transition-colors duration-200 ease-out hover:bg-ink/5',
        className,
      )}
    >
      {/* Mond: erscheint im hellen Design (= «dunkel einschalten») */}
      <svg viewBox="0 0 20 20" className="nur-hell h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16.5 12.2A6.8 6.8 0 0 1 7.8 3.5a6.8 6.8 0 1 0 8.7 8.7Z" />
      </svg>
      {/* Sonne: erscheint im dunklen Design (= «hell einschalten») */}
      <svg viewBox="0 0 20 20" className="nur-dunkel h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="10" r="3.4" />
        <path d="M10 2.5v1.8M10 15.7v1.8M2.5 10h1.8M15.7 10h1.8M4.7 4.7l1.3 1.3M14 14l1.3 1.3M4.7 15.3 6 14M14 6l1.3-1.3" />
      </svg>
    </button>
  )
}
