import { useEffect, useState, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AmbientBackground from './components/AmbientBackground'
import IntroScreen from './components/IntroScreen'

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

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        <div className="page">
          <Navbar />
          <main>
            {/* Hero loads immediately — it is above the fold */}
            <Hero />

            {/* Everything else is lazy-loaded; Suspense shows nothing while loading */}
            <Suspense fallback={null}>
              <About />
              <Skills />
              <Projects />
              <Certifications />
              <Education />
              <Contact />
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
