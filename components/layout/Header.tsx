'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import type { SiteSettings } from '@/types/content'

type HeaderProps = {
  settings: SiteSettings
}

/**
 * Schwebende Pillen-Navigation. Über dem Hero ist sie transparent und lässt den
 * Lichtschein durch; sobald gescrollt wird, legt sie sich auf einen abgedunkelten
 * Grund, damit die Beschriftungen auf den hellen Sections lesbar bleiben.
 */
export default function Header({ settings }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    // Der Fokus muss zurück auf den auslösenden Knopf — sonst landet er nach dem
    // Schliessen wieder am Seitenanfang.
    toggleButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }

    document.addEventListener('keydown', onKeyDown)
    // Hintergrund festhalten, solange das Menü offen ist.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen, closeMenu])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-4 sm:pt-6">
      <div className="shell">
        <nav
          aria-label="Hauptnavigation"
          className={cn(
            'pointer-events-auto flex items-center justify-between gap-4 rounded-pill border px-4 py-2.5 transition-all duration-300 ease-soft sm:px-5',
            scrolled
              ? 'border-paper/15 bg-ink/85 shadow-[0_10px_40px_-16px_rgb(0_0_0/0.6)] backdrop-blur-xl'
              : 'border-paper/15 bg-ink/35 backdrop-blur-md',
          )}
        >
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2.5 rounded-pill text-paper"
          >
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-full bg-oxblood font-display text-sm font-black text-paper"
            >
              {settings.name.replace(/[^\p{L}]/gu, '').charAt(0).toUpperCase() || 'P'}
            </span>
            <span className="text-sm font-medium tracking-tight">{settings.name}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {settings.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex cursor-pointer rounded-pill px-3.5 py-2 text-sm text-paper/70 transition-colors duration-200 ease-soft hover:bg-paper/10 hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={settings.headerCta.href}
              className="hidden cursor-pointer rounded-pill bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200 ease-soft hover:bg-ember hover:text-paper sm:inline-flex"
            >
              {settings.headerCta.label}
            </a>

            <button
              ref={toggleButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-paper/20 text-paper transition-colors duration-200 ease-soft hover:bg-paper/10 lg:hidden"
            >
              <span className="sr-only">Menü öffnen</span>
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <path d="M3 6h14M3 13h14" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="pointer-events-auto fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl lg:hidden"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="shell flex h-full flex-col pb-10 pt-4 sm:pt-6">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-sm font-medium text-paper">{settings.name}</span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-paper/20 text-paper transition-colors duration-200 ease-soft hover:bg-paper/10"
                >
                  <span className="sr-only">Menü schliessen</span>
                  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                    <path d="M5 5l10 10M15 5 5 15" />
                  </svg>
                </button>
              </div>

              <ul className="mt-10 flex flex-col gap-1">
                {settings.navLinks.map((link, index) => (
                  <li key={link.href} className="border-b border-paper/10">
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex cursor-pointer items-baseline gap-4 py-4 font-display text-3xl font-bold tracking-tight text-paper transition-colors duration-200 ease-soft hover:text-ember-lift"
                    >
                      <span className="font-mono text-xs text-paper/40">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={settings.headerCta.href}
                onClick={() => setMenuOpen(false)}
                className="mt-auto inline-flex cursor-pointer items-center justify-center rounded-pill bg-oxblood px-6 py-4 text-sm font-medium text-paper transition-colors duration-200 ease-soft hover:bg-ember"
              >
                {settings.headerCta.label}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
