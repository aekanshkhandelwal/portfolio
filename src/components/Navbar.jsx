import { useEffect, useState, useRef } from 'react'
import './Navbar.css'

const links = ['about', 'skills', 'projects', 'certifications', 'education', 'contact']

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [visible, setVisible] = useState(true)
    const [active, setActive] = useState('')
    const lastScrollY = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Scrolled state for styling (glass effect)
            setScrolled(currentScrollY > 50)

            // Show only at top, hide when scrolled down
            if (!isOpen) {
                if (currentScrollY > 50) {
                    setVisible(false)
                } else {
                    setVisible(true)
                }
            }

            lastScrollY.current = currentScrollY
        }

        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id)
                }
            })
        }, observerOptions)

        links.forEach(id => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            observer.disconnect()
        }
    }, [isOpen])

    const scrollToTop = (e) => {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setActive('')
        setIsOpen(false)
    }

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${!visible ? 'hidden' : ''} ${isOpen ? 'menu-open' : ''}`}>
            <div className="nav-inner">
                <a href="#hero" className="nav-logo" onClick={scrollToTop}>
                    AK<span className="dot">.</span>
                </a>



                <ul className="nav-links">
                    {links.map((id, idx) => (
                        <li key={id} style={{ '--idx': idx }}>
                            <a
                                href={`#${id}`}
                                className={`nav-link ${active === id ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="resume-preview-wrap">
                    <a
                        href="https://drive.google.com/file/d/19gRBBPgUK3UpEXSJUnXEYG7WXx_LYpyb/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-resume-btn"
                    >
                        <span className="text">Resume</span>
                        <span className="icon-Container">
                            <svg width={16} height={19} viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="1.61321" cy="1.61321" r="1.5" fill="black" />
                                <circle cx="5.73583" cy="1.61321" r="1.5" fill="black" />
                                <circle cx="5.73583" cy="5.5566" r="1.5" fill="black" />
                                <circle cx="9.85851" cy="5.5566" r="1.5" fill="black" />
                                <circle cx="9.85851" cy="9.5" r="1.5" fill="black" />
                                <circle cx="13.9811" cy="9.5" r="1.5" fill="black" />
                                <circle cx="5.73583" cy="13.4434" r="1.5" fill="black" />
                                <circle cx="9.85851" cy="13.4434" r="1.5" fill="black" />
                                <circle cx="1.61321" cy="17.3868" r="1.5" fill="black" />
                                <circle cx="5.73583" cy="17.3868" r="1.5" fill="black" />
                            </svg>
                        </span>
                    </a>
                    <div className="resume-hover-preview">
                        <div className="resume-hover-preview-inner">
                            <a
                                href="https://drive.google.com/file/d/19gRBBPgUK3UpEXSJUnXEYG7WXx_LYpyb/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/resume.png" alt="Resume Preview" />
                            </a>
                        </div>
                    </div>
                </div>
                <button className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </button>
            </div>
        </nav>
    )
}
