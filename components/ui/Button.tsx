import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Variant = 'primary' | 'onDark' | 'onLight' | 'quiet'

/**
 * Vier Varianten, mehr braucht die Seite nicht:
 *
 * - `primary`  gefülltes Bordeaux — die eine Handlung, die zählt
 * - `onDark`   heller Umriss auf dunklem Grund
 * - `onLight`  gefülltes Ink auf hellem Grund
 * - `quiet`    nur Text mit Pfeil, für nachrangige Wege
 */
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-oxblood text-paper hover:bg-ember',
  onDark: 'border border-paper/25 text-paper hover:border-paper/60 hover:bg-paper/5',
  onLight: 'bg-ink text-paper hover:bg-oxblood',
  quiet: 'text-ink hover:text-oxblood',
}

const BASE =
  'group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-pill ' +
  'font-medium transition-colors duration-200 ease-soft disabled:cursor-not-allowed disabled:opacity-50'

const SIZES = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-[0.9375rem]',
} as const

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: keyof typeof SIZES
  className?: string
  /** Der schräge Pfeil, der auf der ganzen Seite „führt woanders hin" bedeutet. */
  withArrow?: boolean
}

type ButtonAsLink = CommonProps & {
  href: string
  download?: boolean | string
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & {
    href?: undefined
  }

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-3.5 w-3.5 transition-transform duration-200 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.5 11.5 4.5" />
      <path d="M6 4.5h5.5V10" />
    </svg>
  )
}

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    withArrow = false,
    ...rest
  } = props

  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)

  if ('href' in rest && rest.href) {
    const { href, download, ...linkRest } = rest as Omit<ButtonAsLink, keyof CommonProps>
    const isExternal = /^https?:\/\//.test(href)

    // Downloads und externe Ziele umgehen den Client-Router bewusst: next/link
    // würde bei einem PDF nur einen leeren Navigationsversuch auslösen.
    if (isExternal || download) {
      return (
        <a
          href={href}
          className={classes}
          download={download}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...linkRest}
        >
          {children}
          {withArrow && <Arrow />}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
        {withArrow && <Arrow />}
      </Link>
    )
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof CommonProps>

  return (
    <button className={classes} {...buttonRest}>
      {children}
      {withArrow && <Arrow />}
    </button>
  )
}
