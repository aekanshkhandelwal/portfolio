import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AmbientBackground from './components/AmbientBackground'
import IntroScreen from './components/IntroScreen'
import NavigationChannel from './components/NavigationChannel'
import useSmoothScroll from './hooks/useSmoothScroll'
import { scrollToTarget } from './lib/scroll'


// Lazy-load all below-the-fold sections so they don't block the initial render
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Certifications = lazy(() => import('./components/Certifications'))
const Education = lazy(() => import('./components/Education'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const showTopRef = useRef(false)
  const sectionIdsRef = useRef([
    'hero',
    'about',
    'skills',
    'projects',
    'certifications',
    'education',
    'contact',
  ])

  useSmoothScroll(introComplete)

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 400
      if (shouldShow !== showTopRef.current) {
        showTopRef.current = shouldShow
        setShowTop(shouldShow)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!introComplete) return undefined

    const SECTION_OFFSET = 24
    const GRID_ROW_OFFSET = 0
    const GRID_ANCHOR_OFFSET = 180

    const isTypingTarget = (target) => {
      if (!(target instanceof HTMLElement)) return false

      const tagName = target.tagName
      return (
        target.isContentEditable ||
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT'
      )
    }

    const getSections = () => (
      sectionIdsRef.current
        .map((id) => document.getElementById(id))
        .filter(Boolean)
    )

    const getSectionTop = (section) => {
      const rect = section.getBoundingClientRect()
      return rect.top + window.scrollY
    }

    const getGridRowStops = (gridSelector, itemSelector) => {
      const grid = document.querySelector(gridSelector)
      if (!(grid instanceof HTMLElement)) return []

      const items = Array.from(grid.children).filter(
        (item) => item instanceof HTMLElement && item.matches(itemSelector),
      )
      if (items.length === 0) return []

      const gridTop = getSectionTop(grid)
      const rowTops = []

      items.forEach((item) => {
        const rowTop = gridTop + item.offsetTop
        const exists = rowTops.some((top) => Math.abs(top - rowTop) < 16)
        if (!exists) {
          rowTops.push(rowTop)
        }
      })

      return rowTops.sort((a, b) => a - b)
    }

    const getGridRowTarget = (sectionId, direction) => {
      const section = document.getElementById(sectionId)
      if (!(section instanceof HTMLElement)) return null

      const sectionTop = getSectionTop(section)
      const sectionBottom = sectionTop + section.offsetHeight
      const anchor = window.scrollY + GRID_ANCHOR_OFFSET

      if (anchor < sectionTop || anchor > sectionBottom) return null

      const rowConfig = {
        projects: {
          gridSelector: '.projects-section.view-grid .projects-grid',
          itemSelector: '.reveal',
        },
        certifications: {
          gridSelector: '.certs-section .certs-grid',
          itemSelector: '.cert-card-container',
        },
      }[sectionId]

      if (!rowConfig) return null

      const rowStops = getGridRowStops(rowConfig.gridSelector, rowConfig.itemSelector)
      if (rowStops.length <= 1) return null

      let currentRowIndex = 0

      rowStops.forEach((top, index) => {
        if (top <= anchor + 8) {
          currentRowIndex = index
        }
      })

      if (direction === 'down' && currentRowIndex < rowStops.length - 1) {
        return rowStops[currentRowIndex + 1]
      }

      if (direction === 'up' && currentRowIndex > 0) {
        return rowStops[currentRowIndex - 1]
      }

      return null
    }

    const getScrollStops = (sections) => {
      const stops = []

      sections.forEach((section) => {
        stops.push({ top: getSectionTop(section), element: section })
      })

      return stops
        .sort((a, b) => a.top - b.top)
        .filter((stop, index, array) => {
          if (index === 0) return true
          return Math.abs(stop.top - array[index - 1].top) > 24
        })
    }

    const handleKeyDown = (event) => {
      if (event.defaultPrevented || isTypingTarget(event.target)) return
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return

      const sections = getSections()
      if (sections.length === 0) return

      const gridRowTarget =
        event.key === 'ArrowDown'
          ? getGridRowTarget('projects', 'down')
            ?? getGridRowTarget('certifications', 'down')
          : getGridRowTarget('certifications', 'up')
            ?? getGridRowTarget('projects', 'up')

      if (typeof gridRowTarget === 'number') {
        event.preventDefault()
        scrollToTarget(gridRowTarget, { duration: 1.1, lock: true, offset: GRID_ROW_OFFSET })
        return
      }

      const stops = getScrollStops(sections)
      if (stops.length === 0) return

      const currentY = window.scrollY
      const threshold = 120
      const targetStop =
        event.key === 'ArrowDown'
          ? stops.find((stop) => stop.top > currentY + threshold) ?? null
          : [...stops].reverse().find((stop) => stop.top < currentY - threshold) ?? null

      if (!targetStop) return

      event.preventDefault()
      scrollToTarget(targetStop.top, { duration: 1.1, lock: true, offset: SECTION_OFFSET })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [introComplete])

  return (
    <>
      {/* Intro overlay — fixed z-9999, covers everything. No need to hide the site. */}
      {!introComplete && (
        <IntroScreen onComplete={() => setIntroComplete(true)} />
      )}

      {/* Site content — always rendered so FLIP can measure Hero name rect.
          intro-complete class triggers staggered CSS animations on hero elements. */}
      <div className={`site-content${introComplete ? ' intro-complete' : ''}`}>
        <AmbientBackground />
        <NavigationChannel />
        <div className="page">
          <Navbar />

          <main className="stack-main">
            {/* Hero loads immediately — it is above the fold */}
            <Hero />

            {/* Everything else is lazy-loaded; Suspense shows nothing while loading */}
            <Suspense fallback={null}>
              <div className="stack-scroll-stage">
                <div className="stack-panel" style={{ '--stack-index': 1 }}>
                  <div className="stack-panel-inner">
                    <About />
                  </div>
                </div>
                <div className="stack-panel" style={{ '--stack-index': 2 }}>
                  <div className="stack-panel-inner">
                    <Skills />
                  </div>
                </div>
                <div className="stack-panel" style={{ '--stack-index': 3 }}>
                  <div className="stack-panel-inner">
                    <Projects />
                  </div>
                </div>
                <div className="stack-panel" style={{ '--stack-index': 4 }}>
                  <div className="stack-panel-inner">
                    <Certifications />
                  </div>
                </div>
                <div className="stack-panel" style={{ '--stack-index': 5 }}>
                  <div className="stack-panel-inner">
                    <Education />
                  </div>
                </div>
                <div className="stack-panel" style={{ '--stack-index': 6 }}>
                  <div className="stack-panel-inner">
                    <Contact />
                  </div>
                </div>
              </div>
            </Suspense>
          </main>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>

        <a
          href="https://aekansh-ragbot.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={`scroll-top ${showTop ? 'visible' : ''}`}
          aria-label="Chat with my AI"
        >
          <div className="robot-mascot">
            <div className="robot-head">
              <div className="robot-visor">
                <div className="robot-eyes">
                  <div className="eye left"></div>
                  <div className="eye right"></div>
                </div>
                <div className="robot-mouth"></div>
              </div>
            </div>
            <div className="robot-body">
              <div className="robot-arm left"></div>
              <div className="robot-arm right"></div>
            </div>
          </div>
        </a>
      </div>
    </>
  )
}

export default App
