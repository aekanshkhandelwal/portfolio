import { useEffect, useRef, useState } from 'react'
import './Hero.css'

export default function Hero() {
    const [paletteIndex, setPaletteIndex] = useState(0);
    const [isShuffling, setIsShuffling] = useState(false);
    const shuffleBagRef = useRef([]);
    const shuffleTimeoutRef = useRef(null);
    const hexToRgba = (hex, alpha) => {
        const normalized = hex.replace('#', '');
        const bigint = parseInt(normalized.length === 3
            ? normalized.split('').map((char) => char + char).join('')
            : normalized, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const themeIdeas = [
        { id: 1, name: 'Obsidian', header: '#1A1A1B', body: '#0F0F0F', text: '#E0E0E0', highlight: '#4F46E5' },
        { id: 2, name: 'Midnight Teal', header: '#0D1B1E', body: '#020808', text: '#B2D8D8', highlight: '#20B2AA' },
        { id: 3, name: 'Blood Moon', header: '#1A0F0F', body: '#0A0505', text: '#FADADA', highlight: '#FF4D4D' },
        { id: 4, name: 'Carbon', header: '#262626', body: '#171717', text: '#EDEDED', highlight: '#F59E0B' },
        { id: 5, name: 'Deep Forest', header: '#0F1A11', body: '#050A06', text: '#D1FAE5', highlight: '#10B981' },
        { id: 6, name: 'Space Gray', header: '#1F2937', body: '#111827', text: '#F3F4F6', highlight: '#60A5FA' },
        { id: 7, name: 'Purple Haze', header: '#1E1B4B', body: '#0F172A', text: '#E0E7FF', highlight: '#C084FC' },
        { id: 8, name: 'Dark Slate', header: '#1E293B', body: '#0F172A', text: '#CBD5E1', highlight: '#38BDF8' },
        { id: 9, name: 'Blackout Gold', header: '#111111', body: '#000000', text: '#FFFFFF', highlight: '#D4AF37' },
        { id: 10, name: 'Vampire', header: '#2D0000', body: '#1A0000', text: '#EEEEEE', highlight: '#FF0000' },
        { id: 11, name: 'Cyber Lime', header: '#1B262C', body: '#0F4C75', text: '#BBE1FA', highlight: '#32FF7E' },
        { id: 12, name: 'Synthwave', header: '#2B213A', body: '#241B2F', text: '#FF79C6', highlight: '#8BE9FD' },
        { id: 13, name: 'Matrix', header: '#001A00', body: '#000D00', text: '#00FF41', highlight: '#008F11' },
        { id: 14, name: 'Electric Blue', header: '#0A1931', body: '#185ADB', text: '#EFEFEF', highlight: '#FFC947' },
        { id: 15, name: 'Hot Pink Dark', header: '#3D155F', body: '#4831D4', text: '#CCF381', highlight: '#F900BF' },
        { id: 16, name: 'Radical', header: '#141321', body: '#242238', text: '#A9FEF7', highlight: '#FE4450' },
        { id: 17, name: 'Neon Tokyo', header: '#1F1D2B', body: '#2D2B55', text: '#A599E9', highlight: '#FFD580' },
        { id: 18, name: 'Laser Beam', header: '#181818', body: '#212121', text: '#EBDBB2', highlight: '#8EC07C' },
        { id: 19, name: 'Overdrive', header: '#090909', body: '#121212', text: '#FFFFFF', highlight: '#FFEE00' },
        { id: 20, name: 'Voltage', header: '#000000', body: '#1A1A1D', text: '#C3073F', highlight: '#950740' },
        { id: 21, name: 'Nordic Ice', header: '#3B4252', body: '#2E3440', text: '#ECEFF4', highlight: '#88C0D0' },
        { id: 22, name: 'Terracotta', header: '#4A2C2A', body: '#2D1B1A', text: '#F2E9E4', highlight: '#E07A5F' },
        { id: 23, name: 'Sage Garden', header: '#3D405B', body: '#2D3047', text: '#F4F1DE', highlight: '#81B29A' },
        { id: 24, name: 'Sandstone', header: '#D4A373', body: '#FAEDCD', text: '#5E503F', highlight: '#CCD5AE' },
        { id: 25, name: 'Matcha Tea', header: '#283618', body: '#606C38', text: '#FEFAE0', highlight: '#DDA15E' },
        { id: 26, name: 'Coffee Bean', header: '#3C2A21', body: '#1A120B', text: '#E7DEC8', highlight: '#D5CEA3' },
        { id: 27, name: 'Dracula', header: '#44475A', body: '#282A36', text: '#F8F8F2', highlight: '#BD93F9' },
        { id: 28, name: 'Evergreen', header: '#064E3B', body: '#065F46', text: '#ECFDF5', highlight: '#FDE047' },
        { id: 29, name: 'Autumn', header: '#78350F', body: '#92400E', text: '#FEF3C7', highlight: '#F59E0B' },
        { id: 30, name: 'Oasis', header: '#1E3A8A', body: '#1E40AF', text: '#DBEAFE', highlight: '#F97316' },
        { id: 31, name: 'Paperback', header: '#F5F5F5', body: '#FFFFFF', text: '#333333', highlight: '#007ACC' },
        { id: 32, name: 'Soft Gray', header: '#E5E7EB', body: '#F9FAFB', text: '#374151', highlight: '#6366F1' },
        { id: 33, name: 'Rose Quartz', header: '#FAE1DD', body: '#FDF0EF', text: '#4A4E69', highlight: '#C9184A' },
        { id: 34, name: 'Creamy Latte', header: '#F3E9DC', body: '#FBF5F3', text: '#5E503F', highlight: '#A9927D' },
        { id: 35, name: 'Sky High', header: '#E0F2FE', body: '#F0F9FF', text: '#0369A1', highlight: '#0EA5E9' },
        { id: 36, name: 'Lavender', header: '#EDE9FE', body: '#F5F3FF', text: '#5B21B6', highlight: '#8B5CF6' },
        { id: 37, name: 'Mint Fresh', header: '#D1FAE5', body: '#ECFDF5', text: '#065F46', highlight: '#10B981' },
        { id: 38, name: 'Solarized Light', header: '#EEE8D5', body: '#FDF6E3', text: '#586E75', highlight: '#268BD2' },
        { id: 39, name: 'Ghost', header: '#F8F9FA', body: '#E9ECEF', text: '#212529', highlight: '#ADB5BD' },
        { id: 40, name: 'Blueprint', header: '#004080', body: '#0059B3', text: '#FFFFFF', highlight: '#FFD700' },
        { id: 41, name: '80s Arcade', header: '#2D3436', body: '#000000', text: '#D63031', highlight: '#FDCB6E' },
        { id: 42, name: 'Classic Terminal', header: '#000000', body: '#000000', text: '#00FF00', highlight: '#32CD32' },
        { id: 43, name: 'Gruvbox Dark', header: '#3C3836', body: '#282828', text: '#EBDBB2', highlight: '#FABD2F' },
        { id: 44, name: 'One Dark', header: '#2C313A', body: '#21252B', text: '#ABB2BF', highlight: '#61AFEF' },
        { id: 45, name: 'Sunset', header: '#400D51', body: '#D800A6', text: '#FFD372', highlight: '#FF7700' },
        { id: 46, name: 'Deep Sea', header: '#14213D', body: '#000000', text: '#E5E5E5', highlight: '#FCA311' },
        { id: 47, name: 'Miami', header: '#240046', body: '#3C096C', text: '#FF9E00', highlight: '#FF006E' },
        { id: 48, name: 'Cyber Grape', header: '#582F0E', body: '#7F4F24', text: '#EDE0D4', highlight: '#A68A64' },
        { id: 49, name: 'Royal Gold', header: '#1B1B1B', body: '#262626', text: '#E2E2E2', highlight: '#CFB53B' },
        { id: 50, name: 'Starlight', header: '#0B1026', body: '#121420', text: '#E0E2DB', highlight: '#FFD700' },
    ];

    const palettes = themeIdeas.map((theme) => ({
        name: theme.name,
        accent: theme.highlight,
        glow: hexToRgba(theme.highlight, 0.28),
        headerBg: hexToRgba(theme.header, 0.92),
        bodyBg: hexToRgba(theme.body, 0.94),
        noiseTint: hexToRgba(theme.highlight, 0.08),
        cardBg: hexToRgba(theme.body, 0.86),
        textColor: theme.text,
        kwColor: theme.highlight,
        strColor: hexToRgba(theme.text, 0.82),
        dots: [theme.highlight, theme.text, theme.header],
    }));

    const refillShuffleBag = (excludeIndex) => {
        const nextBag = palettes
            .map((_, index) => index)
            .filter((index) => index !== excludeIndex);

        for (let i = nextBag.length - 1; i > 0; i -= 1) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [nextBag[i], nextBag[randomIndex]] = [nextBag[randomIndex], nextBag[i]];
        }

        shuffleBagRef.current = nextBag;
    };

    const cyclePalette = () => {
        if (!shuffleBagRef.current.length) {
            refillShuffleBag(paletteIndex);
        }

        const nextIndex = shuffleBagRef.current.pop();
        if (nextIndex == null) return;

        setIsShuffling(true);
        setPaletteIndex(nextIndex);

        window.clearTimeout(shuffleTimeoutRef.current);
        shuffleTimeoutRef.current = window.setTimeout(() => {
            setIsShuffling(false);
        }, 480);
    };

    const [isSpotlightVisible, setIsSpotlightVisible] = useState(false);
    const heroContentRef = useRef(null);

    useEffect(() => {
        refillShuffleBag(paletteIndex);

        return () => {
            if (shuffleTimeoutRef.current) {
                window.clearTimeout(shuffleTimeoutRef.current);
            }
        };
    }, []);

    const handleHeroMouseMove = (e) => {
        if (!heroContentRef.current) return;
        const rect = heroContentRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        heroContentRef.current.style.setProperty('--hero-mouse-x', `${x}px`);
        heroContentRef.current.style.setProperty('--hero-mouse-y', `${y}px`);
    };

    const handleMouseMove = (e) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section className="hero" id="hero">
            {/* High-Fidelity Data Stream Background */}
            <div className="hero-data-stream">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`stream-line line-${i + 1}`}></div>
                ))}
            </div>

            <div className="container hero-inner">
                <div 
                    className="hero-content"
                    ref={heroContentRef}
                    onMouseMove={handleHeroMouseMove}
                    onMouseEnter={() => setIsSpotlightVisible(true)}
                    onMouseLeave={() => setIsSpotlightVisible(false)}
                >
                    {/* The Spotlight Overlay */}
                    <div className={`hero-content-spotlight ${isSpotlightVisible ? 'visible' : ''}`}>
                        <h1 className="hero-title">
                            <span className="title-reveal-part prefix">Hi, I'm</span> <span className="gradient-text spotlight-name">Aekansh</span><br />
                            <span className="title-reveal-part suffix">Data Analyst &amp; Software Developer</span>
                        </h1>
                        <p className="hero-subtitle">
                            Building intelligent agentic systems and automating complex workflows.
                            Specializing in AI-driven automation, <strong>Advanced Data Analytics</strong>, and high-impact software solutions.
                        </p>
                        <div className="hero-actions">
                            <a href="#projects" className="btn cssbuttons-io">
                                <span>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z" fill="currentColor" />
                                    </svg>
                                    View Projects
                                </span>
                            </a>
                            <a
                                href="https://aekansh-ragbot.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn cssbuttons-io"
                            >
                                <span>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" fill="currentColor" />
                                        <circle cx="8" cy="10" r="1.5" fill="currentColor" />
                                        <circle cx="16" cy="10" r="1.5" fill="currentColor" />
                                    </svg>
                                    Chat with AI
                                </span>
                            </a>
                            <a href="#contact" className="btn cssbuttons-io">
                                <span>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
                                    </svg>
                                    Get In Touch
                                </span>
                            </a>
                        </div>
                    </div>

                    <h1 className="hero-title">
                        <span className="title-reveal-part prefix">Hi, I'm</span> <span id="flip-target" className="gradient-text text-glow">Aekansh</span><br />
                        <span className="title-reveal-part suffix">Data Analyst &amp; Software Developer</span>
                    </h1>
                    <p className="hero-subtitle">
                        Building intelligent agentic systems and automating complex workflows.
                        Specializing in AI-driven automation, <strong>Advanced Data Analytics</strong>, and high-impact software solutions.
                    </p>
                    <div className="hero-actions">
                        <a href="#projects" className="btn cssbuttons-io magnetic-btn">
                            <span>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z" fill="currentColor" />
                                </svg>
                                View Projects
                            </span>
                        </a>
                        <a
                            href="https://aekansh-ragbot.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn cssbuttons-io magnetic-btn"
                        >
                            <span>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" fill="currentColor" />
                                    <circle cx="8" cy="10" r="1.5" fill="currentColor" />
                                    <circle cx="16" cy="10" r="1.5" fill="currentColor" />
                                </svg>
                                Chat with AI
                            </span>
                        </a>
                        <a href="#contact" className="btn cssbuttons-io magnetic-btn">
                            <span>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
                                </svg>
                                Get In Touch
                            </span>
                        </a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div 
                        className="visual-container"
                        style={{
                            '--tc-accent': palettes[paletteIndex].accent,
                            '--tc-glow': palettes[paletteIndex].glow,
                            '--tc-header-bg': palettes[paletteIndex].headerBg,
                            '--tc-body-bg': palettes[paletteIndex].bodyBg,
                            '--tc-noise-tint': palettes[paletteIndex].noiseTint,
                            '--tc-card-bg': palettes[paletteIndex].cardBg,
                            '--tc-text-color': palettes[paletteIndex].textColor,
                            '--tc-syntax-kw': palettes[paletteIndex].kwColor,
                            '--tc-syntax-str': palettes[paletteIndex].strColor
                        }}
                    >
                        <div className="skill-sphere s1" onMouseMove={handleMouseMove}>Power BI</div>
                        <div className="skill-sphere s2" onMouseMove={handleMouseMove}>Python</div>
                        <div className="skill-sphere s3" onMouseMove={handleMouseMove}>SQL</div>
                        <div className="skill-sphere s4" onMouseMove={handleMouseMove}>ML</div>
                        <div className="skill-sphere s5" onMouseMove={handleMouseMove}>AI</div>

                        <div
                            className={`terminal-card ${isShuffling ? 'is-shuffling' : ''}`}
                            onMouseMove={handleMouseMove}
                            onClick={cyclePalette}
                            title={`Click to shuffle theme (Current: ${palettes[paletteIndex].name})`}
                        >
                            <div className="card-noise"></div>
                            <div className="card-glow"></div>
                            <div className="tc-header">
                                <div className="tc-dots">
                                    <span style={{ background: palettes[paletteIndex].dots[0] }}></span>
                                    <span style={{ background: palettes[paletteIndex].dots[1] }}></span>
                                    <span style={{ background: palettes[paletteIndex].dots[2] }}></span>
                                </div>
                                <div className="tc-tab">analytics.py</div>
                                <div className="tc-theme-name">{palettes[paletteIndex].name}</div>
                            </div>
                            <div className="tc-body">
                                <div className="coding-content">
                                    <div className="code-line" style={{ '--l-idx': 0 }}>
                                        <span className="sh-kw">import</span> pandas <span className="sh-kw">as</span> pd
                                    </div>
                                    <div className="code-line" style={{ '--l-idx': 1 }}>
                                        <span className="sh-kw">import</span> plotly.express <span className="sh-kw">as</span> px
                                    </div>
                                    <div className="code-line" style={{ '--l-idx': 2 }}></div>
                                    <div className="code-line" style={{ '--l-idx': 3 }}>
                                        df = pd.read_csv(<span className="sh-str">'insights.csv'</span>)
                                    </div>
                                    <div className="code-line" style={{ '--l-idx': 4 }}>
                                        kpis = df.groupby(<span className="sh-str">'segment'</span>).sum()
                                    </div>
                                    <div className="code-line" style={{ '--l-idx': 5 }}></div>
                                    <div className="code-line" style={{ '--l-idx': 6 }}>
                                        fig = px.bar(kpis, title=<span className="sh-str">'ROI Analyzed'</span>)
                                    </div>
                                    <div className="code-line" style={{ '--l-idx': 7 }}>
                                        fig.show()
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
