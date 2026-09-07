import Image from 'next/image'

import { urlForImage } from '@/sanity/image'
import type { PortfolioImage } from '@/types/content'
import { cn } from '@/lib/utils'

type PictureProps = {
  image?: PortfolioImage
  /** Breite, in der das Bild tatsächlich dargestellt wird — steuert den CDN-Zuschnitt. */
  width: number
  height: number
  sizes: string
  className?: string
  priority?: boolean
}

/**
 * Verbirgt den Unterschied zwischen einem Sanity-Asset und einer lokalen
 * Platzhalterdatei (AE-1 in CLAUDE.md). Die Sections müssen nicht wissen, woher
 * ihr Bild kommt.
 */
export default function Picture({
  image,
  width,
  height,
  sizes,
  className,
  priority = false,
}: PictureProps) {
  if (!image) return null

  const remote = image.asset ? urlForImage(image.asset, { width, height }) : null
  const src = remote ?? image.fallbackSrc

  if (!src) return null

  return (
    <Image
      src={src}
      alt={image.alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      // Die Platzhalter sind SVGs. Next' Bildoptimierung verweigert SVG ohne
      // `dangerouslyAllowSVG` — das wollen wir nicht global aufmachen, nur um
      // vier lokale Dateien auszuliefern. Sie gehen deshalb unverändert raus.
      unoptimized={src.endsWith('.svg')}
      className={cn('h-full w-full object-cover', className)}
    />
  )
}
