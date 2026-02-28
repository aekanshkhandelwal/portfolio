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

function App() {
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
    </>
  )
}

export default App
