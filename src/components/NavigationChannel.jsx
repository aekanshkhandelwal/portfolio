import { useEffect, useState } from 'react';
import {
    Home,
    User,
    Cpu,
    Layers,
    Award,
    GraduationCap,
    MessageCircle,
    Linkedin,
    Github,
    ChevronRight
} from 'lucide-react';
import './NavigationChannel.css';
import { scrollToSection as scrollPageToSection } from '../lib/scroll';

const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Cpu, label: 'Skills' },
    { id: 'projects', icon: Layers, label: 'Projects' },
    { id: 'certifications', icon: Award, label: 'Certifications ' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'contact', icon: MessageCircle, label: 'Contact' }
];

export default function NavigationChannel() {
    const [activeSection, setActiveSection] = useState('hero');
    const [hoveredLabel, setHoveredLabel] = useState(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        navItems.forEach(item => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleScrollToSection = (id) => {
        scrollPageToSection(id, { duration: 1 });
    };

    return (
        <aside className="nav-channel">
            <div className="channel-inner">
                <div className="channel-glow" />

                <div className="nav-items-top">
                    {navItems.map((item) => (
                        <div
                            key={item.id}
                            className={`channel-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => handleScrollToSection(item.id)}
                            onMouseEnter={() => setHoveredLabel(item.label)}
                            onMouseLeave={() => setHoveredLabel(null)}
                        >
                            <div className="item-icon-wrap">
                                <item.icon size={20} strokeWidth={2.5} />
                            </div>
                            <span className={`item-tooltip ${hoveredLabel === item.label ? 'visible' : ''}`}>
                                {item.label}
                                <ChevronRight size={14} className="tooltip-arrow" />
                            </span>
                        </div>
                    ))}
                </div>

                <div className="channel-divider" />

                <div className="nav-items-bottom">
                    <a
                        href="https://www.linkedin.com/in/aekansh-khandelwal-780029231/"
                        target="_blank"
                        rel="noreferrer"
                        className="channel-item social"
                        title="LinkedIn"
                    >
                        <div className="item-icon-wrap">
                            <Linkedin size={20} strokeWidth={2} />
                        </div>
                    </a>
                    <a
                        href="https://github.com/aekanshkhandelwal"
                        target="_blank"
                        rel="noreferrer"
                        className="channel-item social"
                        title="GitHub"
                    >
                        <div className="item-icon-wrap">
                            <Github size={20} strokeWidth={2} />
                        </div>
                    </a>
                </div>
            </div>
        </aside>
    );
}
