import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReducedMotion.matches) return undefined

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: false,
      wheelMultiplier: isTouchDevice ? 0.9 : 0.78,
      touchMultiplier: 0.95,
      lerp: 0.085,
    })

    window.__portfolioLenis = lenis

    let frameId = 0

    const raf = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(raf)
    }

    frameId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(frameId)
      lenis.destroy()
      if (window.__portfolioLenis === lenis) {
        delete window.__portfolioLenis
      }
    }
  }, [enabled])
}
