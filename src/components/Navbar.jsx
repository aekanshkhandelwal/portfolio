import { useEffect, useState } from 'react'
import './Navbar.css'

const links = ['about', 'skills', 'projects', 'certifications', 'education', 'contact']

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [visible, setVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [active, setActive] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Scrolled state for styling
            setScrolled(currentScrollY > 50)

            // Hide on scroll down, show on scroll up
            if (!isOpen) { // Only hide/show if menu is closed
                if (currentScrollY > lastScrollY && currentScrollY > 150) {
                    setVisible(false)
                } else {
                    setVisible(true)
                }
            }

            setLastScrollY(currentScrollY)
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

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            observer.disconnect()
        }
    }, [lastScrollY, isOpen])

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

                <button className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </button>

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
            </div>
        </nav>
    )
}
