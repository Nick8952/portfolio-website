import type Lenis from 'lenis'

declare global {
  interface Window {
    /** Gesetzt von components/motion/SmoothScroll.tsx, solange Lenis laeuft. */
    __lenis?: Lenis
  }
}

export {}
