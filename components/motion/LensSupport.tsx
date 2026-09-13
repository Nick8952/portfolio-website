'use client'

import { useEffect } from 'react'

/**
 * Schaltet die Linsenverzerrung des Liquid Glass frei — nur in Chromium.
 *
 * Ein @supports-Test taugt hier nicht: Safari 18+ akzeptiert die Syntax
 * `backdrop-filter: url(#…)`, rendert SVG-Backdrop-Filter aber nicht und
 * verwirft dabei die ganze Filterkette samt Weichzeichnung. Auf dem iPhone
 * waere das Glas dann keines mehr. Deshalb die Erkennung ueber den Browser.
 */
export default function LensSupport() {
  useEffect(() => {
    const ua = navigator.userAgent
    // Auch Chromes UA endet mit «Safari/537.36». Echtes Safari erkennt man am
    // «Version/»-Token, das Chromium nie setzt.
    const chromium = /Chrome\/|Chromium\/|Edg\//.test(ua) && !/Version\//.test(ua)
    const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (chromium && !reduziert) document.documentElement.classList.add('has-lens')
    return () => document.documentElement.classList.remove('has-lens')
  }, [])
  return null
}
