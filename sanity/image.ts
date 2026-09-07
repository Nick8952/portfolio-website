import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

import { dataset, isSanityConfigured, projectId } from './env'

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null

type UrlOptions = {
  width?: number
  height?: number
  quality?: number
}

/**
 * Baut eine CDN-URL für ein Sanity-Bild. `fit: 'crop'` zusammen mit `auto: 'format'`
 * respektiert den im Studio gesetzten Hotspot — ohne das würden Portraits beim
 * Zuschneiden regelmässig geköpft.
 */
export function urlForImage(source: SanityImageSource, options: UrlOptions = {}): string | null {
  if (!builder) return null

  let image = builder.image(source).auto('format').fit('crop')

  if (options.width) image = image.width(options.width)
  if (options.height) image = image.height(options.height)
  image = image.quality(options.quality ?? 82)

  return image.url()
}
