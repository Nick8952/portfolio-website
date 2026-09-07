import type { Config } from 'tailwindcss'

/**
 * Die Farbwerte stehen als CSS-Variablen in app/globals.css und werden hier nur
 * gespiegelt. Einzige Quelle der Wahrheit bleibt damit das Stylesheet — so kann
 * das Studio (das kein Tailwind lädt) dieselben Tokens verwenden.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        wine: 'rgb(var(--c-wine) / <alpha-value>)',
        oxblood: 'rgb(var(--c-oxblood) / <alpha-value>)',
        ember: 'rgb(var(--c-ember) / <alpha-value>)',
        // Aufgehellter Akzent für Kleintext auf dunklem Grund — `ember` selbst
        // erreicht dort nur 3,7:1 und ist damit auf Grossschrift beschränkt.
        'ember-lift': 'rgb(var(--c-ember-lift) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        chalk: 'rgb(var(--c-chalk) / <alpha-value>)',
        // Abgestufte Neutraltöne. Bewusst knapp gehalten: Bordeaux ist die einzige
        // gesättigte Farbe der Seite, alles andere bleibt neutral.
        'paper-sunk': 'rgb(var(--c-paper-sunk) / <alpha-value>)',
        'ink-soft': 'rgb(var(--c-ink-soft) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        smoke: 'rgb(var(--c-smoke) / <alpha-value>)',
        hairline: 'rgb(var(--c-hairline) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Archivo', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fliessende Display-Skala. Die Riesengrade skalieren mit der Viewport-Breite,
        // damit "ENGINEER" auf jedem Gerät bündig in der Spalte sitzt.
        // Die Zeilenhöhen sind bewusst weniger eng als bei einer englischen
        // Vorlage: Umlaute brauchen Kopfraum, und Archivos Versal-J reicht unter
        // die Grundlinie. Bei 0.92 stossen die Ü-Punkte der Folgezeile in das J
        // der Zeile darüber.
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        'display-sm': ['clamp(2rem, 6vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.75rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(3.5rem, 13vw, 10rem)', { lineHeight: '0.94', letterSpacing: '-0.04em' }],
        'display-xl': ['clamp(4rem, 19vw, 16rem)', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
      },
      spacing: {
        section: 'clamp(5rem, 11vw, 9.5rem)',
        gutter: 'clamp(1.25rem, 4vw, 4rem)',
      },
      borderRadius: {
        card: '1.5rem',
        pill: '999px',
      },
      maxWidth: {
        shell: '90rem',
        prose: '34rem',
      },
      transitionTimingFunction: {
        // Ein einziges Easing für die ganze Seite hält die Bewegung zusammenhängend.
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
