const DEFAULT_SCROLL_OFFSET = 24

function getLenis() {
  if (typeof window === 'undefined') return null
  return window.__portfolioLenis ?? null
}

export function scrollToTarget(target, options = {}) {
  if (typeof window === 'undefined' || target == null) return

  const lenis = getLenis()
  const scrollOptions = {
    offset: options.offset ?? DEFAULT_SCROLL_OFFSET,
    duration: options.duration,
    immediate: options.immediate,
    lock: options.lock,
    force: options.force,
    onComplete: options.onComplete,
  }

  if (lenis) {
    lenis.scrollTo(target, scrollOptions)
    return
  }

  if (typeof target === 'number') {
    const y = target - (scrollOptions.offset ?? DEFAULT_SCROLL_OFFSET)
    window.scrollTo({
      top: Math.max(0, y),
      behavior: options.immediate ? 'auto' : 'smooth',
    })
    return
  }

  const element =
    typeof target === 'string'
      ? document.querySelector(target)
      : target

  if (!element) return

  const y =
    element.getBoundingClientRect().top +
    window.scrollY -
    (scrollOptions.offset ?? DEFAULT_SCROLL_OFFSET)

  window.scrollTo({
    top: y,
    behavior: options.immediate ? 'auto' : 'smooth',
  })
}

export function scrollToSection(id, options = {}) {
  scrollToTarget(`#${id}`, options)
}

export function scrollToTop(options = {}) {
  scrollToTarget(0, { offset: 0, ...options })
}
