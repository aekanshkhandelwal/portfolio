import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AmbientBackground from './components/AmbientBackground'
import IntroScreen from './components/IntroScreen'

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
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Education />
          <Contact />
        </main>
        <Footer />
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
