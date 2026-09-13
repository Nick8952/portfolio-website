import type { Config } from 'tailwindcss'

/**
 * Drei Farben, mehr nicht: Papier, Tinte, Kobalt. Alles Graue ist eine Ableitung
 * aus Tinte und wird hier nur benannt, damit es im Code nicht als Hex auftaucht.
 * Die Werte selbst stehen als CSS-Variablen in app/globals.css.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        kobalt: 'rgb(var(--kobalt) / <alpha-value>)',
        // Kobalt auf dunklem Grund: aufgehellt, damit es als Text 6,4:1 erreicht.
        'kobalt-lift': 'rgb(var(--kobalt-lift) / <alpha-value>)',
        // Ableitungen aus Tinte
        muted: 'rgb(var(--muted) / <alpha-value>)',
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        sunk: 'rgb(var(--sunk) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display bleibt unter 6rem (Craft-Floor). Laufweite nie enger als -0.03em.
        'display-xl': ['clamp(2.75rem, 7.2vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4.25rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3.4vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        lede: ['clamp(1.125rem, 1.6vw, 1.375rem)', { lineHeight: '1.45' }],
      },
      maxWidth: {
        shell: '84rem',
        // 65–75 Zeichen Zeilenlaenge fuer Fliesstext.
        measure: '38rem',
      },
      spacing: {
        13: '3.25rem',
        section: 'clamp(6rem, 12vw, 11rem)',
        gutter: 'clamp(1.25rem, 4vw, 3.5rem)',
      },
      borderRadius: {
        // Karten 12–16px, Pillen nur fuer kleine Bedienelemente.
        card: '1rem',
        pill: '999px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        // Ein Schatten mit Versatz und weichem Verlauf — kein Halo.
        lift: '0 18px 40px -18px rgb(10 10 10 / 0.35)',
      },
    },
  },
  plugins: [],
}

export default config
