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

  // Der Basispfad muss hier von Hand davor. `next/image` ergaenzt ihn zwar bei
  // der eigenen Bildoptimierung, aber die Platzhalter laufen mit `unoptimized`
  // daran vorbei und wuerden auf GitHub Pages unter /placeholder/... statt
  // /portfolio-website/placeholder/... gesucht — und dort mit 404 enden.
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const lokal = image.fallbackSrc ? `${basePath}${image.fallbackSrc}` : undefined

  const src = remote ?? lokal

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
