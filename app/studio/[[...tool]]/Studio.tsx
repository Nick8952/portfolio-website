'use client'

import { NextStudio } from 'next-sanity/studio'

import config from '@/sanity.config'

/**
 * Das Studio muss im Browser laufen. Es liegt deshalb in einer eigenen
 * Client-Komponente, damit die Server-Komponente daneben vorher prüfen kann,
 * ob überhaupt ein Sanity-Projekt konfiguriert ist.
 */
export default function Studio() {
  return <NextStudio config={config} />
}
