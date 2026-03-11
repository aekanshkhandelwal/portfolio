import { useState, useEffect, cloneElement } from 'react';
import {
    Bot, Trello, Mail, BarChart3, Database, Eraser,
    PlayCircle, ShieldCheck, Gamepad, Folder,
    ExternalLink, Radio, Binary, Box, Crosshair,
    Cpu, Zap, Star, Activity, ArrowRight, Layers,
    Globe, Code2, Terminal, Settings, Wifi
} from 'lucide-react';
import useReveal from '../hooks/useReveal';
import './Projects.css';

const projects = [
    {
        title: "Personalized RAG BOT 🤖✨",
        tags: ['React', 'Gemini API', 'Pinecone', 'Node.js', 'Markdown'],
        accent: 'accent-teal',
        link: 'https://aekansh-ragbot.vercel.app/',
        image: '/previews/ragbot.mp4',
        poster: '/previews/ragbot.gif',
        desc: 'A beautiful, interactive Retrieval-Augmented Generation (RAG) chatbot application.',
        bullets: [
            'Retrieval-Augmented Generation using Google Gemini API and Pinecone Vector Database for context-aware responses.',
            'Features a fully CSS-animated "Golden Robot" companion that reacts to generation states.',
            'Premium glassmorphism UI with frosted effects, dynamic glow shadows, and mobile-first responsive design.',
            'Robust Markdown rendering with prompt caching for instantaneous results.',
        ],
        action: "SYNTHESIZE",
        metrics: [
            { val: 'RAG', label: 'Architecture' },
            { val: 'Gemini', label: 'Engine' },
            { val: 'Pinecone', label: 'DB' },
        ],
        icon: <Bot />
    },
    {
        title: 'Linear Clone - Project Management Tool',
        tags: ['Node.js', 'MongoDB', 'React', 'JWT', 'OAuth'],
        accent: 'accent-blue',
        link: 'https://linear-silk.vercel.app/',
        image: '/previews/linear.mp4',
        poster: '/previews/linear.gif',
        desc: 'A full-stack project management tool inspired by Linear, designed to help individuals and teams efficiently track issues, manage projects, and organize workspaces.',
        bullets: [
            'Built a complete issue and project management system with team-based workflows.',
            'Implemented secure authentication using JWT and Google OAuth with a scalable Node.js & MongoDB backend.',
            'Designed a premium, dark-themed UI with smooth animations and a customizable sidebar for enhanced experience.',
        ],
        action: "DEPLOY",
        metrics: [
            { val: 'MERN', label: 'Full Stack' },
            { val: 'JWT', label: 'Secure Auth' },
            { val: 'UI/UX', label: 'Premium' },
        ],
        icon: <Trello />
    },
    {
        title: 'SendWise.ai — AI Email Command Centre',
        tags: ['React', 'Gmail API', 'Groq LLM', 'OAuth'],
        accent: 'accent-purple',
        link: 'https://sendwise-ten.vercel.app/',
        image: '/previews/sendwise.mp4',
        poster: '/previews/sendwise.gif',
        desc: 'An AI-powered email command centre that transforms traditional inbox management into an intelligent, conversational workflow.',
        bullets: [
            'Built an agentic, client-first architecture integrating Groq LLMs with the Gmail API.',
            'Implemented smart inbox decoding, AI-powered summarization, and a daily digest.',
            'Ensured privacy-first design with local data management and secure OAuth authentication.',
        ],
        action: "DECODE",
        metrics: [
            { val: 'Groq', label: 'LLM Inference' },
            { val: 'Gmail', label: 'API Integration' },
            { val: 'Local', label: 'Privacy' },
        ],
        icon: <Mail />
    },
    {
        title: 'Retail Chain Insights Dashboard',
        tags: ['Power BI', 'SQL', 'Data Analytics'],
        accent: 'accent-blue',
        link: 'https://app.powerbi.com/view?r=eyJrIjoiMzdlMTEzMWMtMTFmYi00MWI3LTk3ZjEtM2E0YjkzZTk5NTc0IiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9',
        image: '/previews/retail.mp4',
        poster: '/previews/retail.gif',
        desc: 'Designed a dashboard to analyze sales, inventory, and customer insights for retail chains using Power BI and SQL.',
        bullets: [
            'Analyzed 15,000+ retail transactions across 5+ cities.',
            'Tracked business-critical KPIs boosting insight effectiveness by ~40%.',
            'Streamlined reporting cutting manual Excel tasks by 60%.',
        ],
        action: "ANALYZE",
        metrics: [
            { val: '15K+', label: 'Transactions' },
            { val: '5+', label: 'Cities' },
            { val: '60%', label: 'Time Saved' },
        ],
        icon: <BarChart3 />
    },
    {
        title: 'CTGAN — Privacy-Preserving Synthetic Data Generation',
        tags: ['CTGAN', 'Python', 'Machine Learning', 'Data Privacy'],
        accent: 'accent-teal',
        link: 'https://github.com/aekanshkhandelwal/Synthetic_Data_Generation/',
        desc: 'Developed an end-to-end ML pipeline using Conditional GANs (CTGAN) to generate high-fidelity, privacy-preserving synthetic fraud transaction datasets.',
        bullets: [
            'Implemented an agentic Generator-Discriminator architecture specifically optimized for mixed tabular data.',
            'Engineered sophisticated preprocessing including Mode-Specific Normalization using Variational Gaussian Mixture models.',
            'Achieved realistic data augmentation for imbalanced scam detection datasets while preserving statistical distributions.',
        ],
        action: "SIMULATE",
        metrics: [
            { val: 'CTGAN', label: 'Architecture' },
            { val: 'VGM', label: 'Normalization' },
            { val: 'Fraud', label: 'Augmentation' },
        ],
        icon: <Database />
    },
    {
        title: 'No-Code Data Cleaning Tool',
        tags: ['Python', 'Streamlit', 'Pandas', 'Data Cleaning'],
        accent: 'accent-purple',
        link: 'https://datacleaningapp-by-aekansh.streamlit.app/',
        image: '/previews/datacleaning.mp4',
        poster: '/previews/datacleaning.gif',
        desc: 'A powerful web-based utility designed to automate data preprocessing, enabling users to clean, transform, and analyze datasets without writing a single line of code.',
        bullets: [
            'Built a responsive web app using Streamlit and Pandas for real-time data manipulation.',
            'Implemented "Smart Clean" features including duplicate removal, missing value handling, and column formatting.',
            'Enabled instant file export, allowing users to download cleaned datasets as CSV files seamlessly.',
        ],
        action: "SCRUB",
        metrics: [
            { val: 'Python', label: 'Engine' },
            { val: 'Streamlit', label: 'Framework' },
            { val: 'No-Code', label: 'User Focus' },
        ],
        icon: <Eraser />
    },
    {
        title: 'Streaming Platform Netflix Analytics System',
        tags: ['SQL', 'Data Analysis', 'Netflix'],
        accent: 'accent-purple',
        link: 'https://github.com/aekanshkhandelwal/Netflix_Movie_Show_Analysis_Using_SQL',
        image: '/previews/Netflix.mp4',
        poster: '/previews/Netflix.gif',
        desc: 'Developed an analytics system for streaming platforms to track user engagement, ratings, and content popularity.',
        bullets: [
            'Revealed user engagement trends and genre preferences using 15+ optimized SQL queries.',
            'Identified high-impact content categories for data-backed strategy recommendations.',
        ],
        action: "QUERY",
        metrics: [
            { val: '10K+', label: 'Records' },
            { val: '15+', label: 'SQL Queries' },
            { val: '40%', label: 'Insight Boost' },
        ],
        icon: <PlayCircle />
    },
    {
        title: 'ML Model for Spam Detection',
        tags: ['Python', 'Machine Learning', 'AI', 'Streamlit'],
        accent: 'accent-blue',
        link: 'https://email-smsspam-classifier-by-aekansh.streamlit.app/',
        image: '/previews/spam.png',
        desc: 'Classified SMS/Emails into spam and ham using supervised learning techniques, deployed as an interactive Streamlit app.',
        bullets: [
            'Implemented multiple supervised learning algorithms for classification.',
            'Achieved high accuracy in detecting spam messages with a user-friendly interface.',
        ],
        action: "CLASSIFY",
        metrics: [
            { val: 'ML', label: 'Supervised' },
            { val: 'AI', label: 'Detection' },
        ],
        icon: <ShieldCheck />
    },
    {
        title: 'Video Games Sales Interactive Dashboard',
        tags: ['Power BI', 'Data Analysis', 'Excel'],
        accent: 'accent-purple',
        link: 'https://app.powerbi.com/view?r=eyJrIjoiZDQ3NmMyMjEtMzAwNC00N2UyLTgzODUtZmI5MjFkZGM4YjBhIiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9',
        image: '/previews/videogames.png',
        desc: 'An interactive Power BI dashboard visualizing global video game sales across different platforms, genres, and publishers over three decades.',
        bullets: [
            'Analyzed global sales reaching 8.82bn across multiple gaming eras (1980-2015).',
            'Visualized top-selling titles and publishers like Nintendo, Activision, and EA.',
            'Implemented interactive filters for Genre and Platform to uncover market trends.',
        ],
        action: "VISUALIZE",
        metrics: [
            { val: '8.82bn', label: 'Total Sales' },
            { val: '30Y', label: 'Time Span' },
            { val: 'Power BI', label: 'Visualization' },
        ],
        icon: <BarChart3 />
    },
    {
        title: 'Movie Recommender System',
        tags: ['Python', 'Machine Learning', 'ML Algorithms'],
        accent: 'accent-purple',
        link: 'https://github.com/aekanshkhandelwal/movie_recommendation_System',
        desc: 'Developed a personalized movie recommendation system to enhance user engagement using ML algorithms.',
        bullets: [
            'Analyzed user preferences and ratings to provide tailored recommendations.',
            'Utilized collaborative filtering and content-based techniques.',
        ],
        action: "RECOMMEND",
        metrics: [
            { val: 'ML', label: 'Recommended' },
            { val: 'UX', label: 'Engagement' },
        ],
        icon: <Star />
    },
    {
        title: 'Social Media Platform (Prototype)',
        tags: ['Python', 'UI Prototype'],
        accent: 'accent-blue',
        link: 'https://github.com/aekanshkhandelwal/social_media_platform/tree/main/social-media-website-main',
        desc: 'Built a 2-user Python app allowing photo sharing, likes, comments, and messaging.',
        bullets: [
            'Developed core social features including image uploads and communication.',
            'Created a prototype for user interaction testing.',
        ],
        action: "PROTOTYPE",
        metrics: [
            { val: '2', label: 'Users' },
            { val: 'Python', label: 'Prototype' },
        ],
        icon: <Globe />
    },
    {
        title: 'Library Management System',
        tags: ['Admin/Student Interface', 'Management System'],
        accent: 'accent-purple',
        link: 'https://github.com/aekanshkhandelwal/Library-Management-System-in-C',
        desc: 'Managed records of books and students with separate admin & student interfaces.',
        bullets: [
            'Organized inventory and tracking for book loans and returns.',
            'Implemented dual interfaces for distinct user roles.',
        ],
        action: "CATALOG",
        metrics: [
            { val: 'DB', label: 'Management' },
            { val: 'UI', label: 'Multi-role' },
        ],
        icon: <Folder />
    },
];

export default function Projects() {
    const [viewMode, setViewMode] = useState('grid'); // 'grid', 'swipe', 'desktop', 'comic'
    useReveal([viewMode]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [filter, setFilter] = useState('All');
    const [showStartMenu, setShowStartMenu] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    const nextProject = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
        setIsFlipped(false);
    };

    const prevProject = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
        setIsFlipped(false);
    };

    // --- Gemini Canvas Multi-Window State ---
    const [openWindows, setOpenWindows] = useState([]); // Array of project indices
    const [activeWindow, setActiveWindow] = useState(null); // Current focused index
    const [windowPositions, setWindowPositions] = useState({}); // { [idx]: { x, y } }
    const [windowViews, setWindowViews] = useState({}); // { [idx]: 'folder' | 'desc' }
    const [windowZ, setWindowZ] = useState(100);
    const [maximizedWindows, setMaximizedWindows] = useState([]);
    const [minimizedWindows, setMinimizedWindows] = useState([]);
    const [monitorStatus, setMonitorStatus] = useState('on'); // 'on' | 'off' | 'booting' | 'shutting-down'

    const handlePowerToggle = (e) => {
        if (e) e.stopPropagation();
        if (monitorStatus === 'on') {
            setMonitorStatus('shutting-down');
            setTimeout(() => {
                setMonitorStatus('off');
            }, 1000);
        } else if (monitorStatus === 'off') {
            setMonitorStatus('booting');
            setTimeout(() => {
                setMonitorStatus('on');
            }, 1500);
        }
    };

    const bringToFront = (idx) => {
        setActiveWindow(idx);
        setWindowZ(prev => prev + 1);
    };

    const handleIconClick = (idx) => {
        bringToFront(idx);
        // On mobile, single click opens the window
        if (window.innerWidth <= 768) {
            handleOpenWindow(idx);
        }
    };

    const handleOpenWindow = (idx) => {
        if (!openWindows.includes(idx)) {
            setOpenWindows(prev => [...prev, idx]);
            // Initial position offset slightly for each window
            setWindowPositions(prev => ({
                ...prev,
                [idx]: { x: 50 + (openWindows.length * 20), y: 50 + (openWindows.length * 20) }
            }));
            setWindowViews(prev => ({ ...prev, [idx]: 'folder' }));
        }
        setMinimizedWindows(prev => prev.filter(id => id !== idx));
        bringToFront(idx);
    };

    const handleCloseWindow = (e, idx) => {
        e.stopPropagation();
        setOpenWindows(prev => prev.filter(id => id !== idx));
        setMaximizedWindows(prev => prev.filter(id => id !== idx));
        setMinimizedWindows(prev => prev.filter(id => id !== idx));
        if (activeWindow === idx) setActiveWindow(null);
    };

    const toggleWindowView = (idx, view) => {
        setWindowViews(prev => ({ ...prev, [idx]: view }));
    };

    const handleMaximize = (e, idx) => {
        e.stopPropagation();
        setMaximizedWindows(prev =>
            prev.includes(idx) ? prev.filter(id => id !== idx) : [...prev, idx]
        );
        bringToFront(idx);
    };

    const handleMinimize = (e, idx) => {
        e.stopPropagation();
        setMinimizedWindows(prev =>
            prev.includes(idx) ? prev.filter(id => id !== idx) : [...prev, idx]
        );
        if (activeWindow === idx) setActiveWindow(null);
    };

    // Unified Dragging Logic for Mouse and Touch
    const startDrag = (e, idx) => {
        const isTouch = e.type === 'touchstart';
        const startX = isTouch ? e.touches[0].clientX : e.clientX;
        const startY = isTouch ? e.touches[0].clientY : e.clientY;
        const initialX = windowPositions[idx]?.x || 50;
        const initialY = windowPositions[idx]?.y || 50;

        const onMove = (moveE) => {
            const currentX = isTouch ? moveE.touches[0].clientX : moveE.clientX;
            const currentY = isTouch ? moveE.touches[0].clientY : moveE.clientY;
            const dx = currentX - startX;
            const dy = currentY - startY;

            setWindowPositions(prev => ({
                ...prev,
                [idx]: { x: initialX + dx, y: initialY + dy }
            }));
        };

        const onEnd = () => {
            if (isTouch) {
                document.removeEventListener('touchmove', onMove);
                document.removeEventListener('touchend', onEnd);
            } else {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onEnd);
            }
        };

        if (isTouch) {
            document.addEventListener('touchmove', onMove, { passive: false });
            document.addEventListener('touchend', onEnd);
        } else {
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onEnd);
        }
        bringToFront(idx);
    };

    const getIconForProject = (project) => {
        if (project.title.toLowerCase().includes('rag') || project.title.toLowerCase().includes('bot')) return 'fa-robot';
        if (project.title.toLowerCase().includes('linear') || project.title.toLowerCase().includes('management')) return 'fa-tasks';
        if (project.title.toLowerCase().includes('email') || project.title.toLowerCase().includes('sendwise')) return 'fa-envelope-open-text';
        if (project.title.toLowerCase().includes('retail') || project.title.toLowerCase().includes('insights')) return 'fa-chart-pie';
        if (project.title.toLowerCase().includes('synthetic') || project.title.toLowerCase().includes('ctgan')) return 'fa-database';
        if (project.title.toLowerCase().includes('cleaning')) return 'fa-broom';
        if (project.title.toLowerCase().includes('netflix') || project.title.toLowerCase().includes('streaming')) return 'fa-play-circle';
        if (project.title.toLowerCase().includes('spam')) return 'fa-shield-virus';
        if (project.title.toLowerCase().includes('game') || project.title.toLowerCase().includes('video')) return 'fa-gamepad';
        return 'fa-folder';
    };

    const renderHudContent = () => {
        const active = filteredProjects[currentIndex];
        if (!active) return null;

        return (
            <div className="hud-view-container">
                {/* Background HUD Layers */}
                <div className="hud-bg-grid" />
                <div className="hud-bg-scanlines" />

                {/* Main Command Console Layout */}
                <div className="hud-console-layout">

                    {/* LEFT: MISSION SELECTION COLUMN */}
                    <aside className="hud-aside selection-col scrollbar-hide">
                        <div className="hud-mission-log-header">
                            MISSION_LOG_V24.0
                        </div>
                        <div className="hud-mission-list">
                            {filteredProjects.map((proj, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`hud-mission-btn ${currentIndex === idx ? 'active' : ''}`}
                                >
                                    <div className="hud-btn-header">
                                        <span className="hud-mission-id">
                                            Mission_{idx < 9 ? `0${idx + 1}` : idx + 1}
                                        </span>
                                        {currentIndex === idx && <div className="hud-active-pulse" />}
                                    </div>
                                    <h3 className="hud-mission-title">
                                        {proj.title}
                                    </h3>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* CENTER: MISSION BRIEFING PANEL */}
                    <main className="hud-main-briefing">
                        <div className="hud-briefing-window">
                            {/* Briefing Textures */}
                            <div className="hud-texture-top-right" />
                            <div className="hud-glow-line-bottom" />

                            {/* Header Area */}
                            <div className="hud-briefing-header">
                                <div className="hud-header-info">
                                    <h2 className="hud-glitch-title">BRIEFING</h2>
                                    <p className="hud-subtitle">Tactical Blueprint</p>
                                </div>
                                <div className="hud-icon-box">
                                    {active.icon && cloneElement(active.icon, { className: "hud-icon" })}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="hud-briefing-content">
                                <div className="hud-project-info">
                                    <div className="hud-tag-cloud">
                                        {active.tags.map(tag => (
                                            <span key={tag} className="hud-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <h4 className="hud-active-title">
                                        {active.title}
                                    </h4>
                                    <div className="hud-desc-container">
                                        <p className="hud-desc">
                                            {active.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Large Stat Callouts */}
                                <div className="hud-metrics-grid">
                                    {active.metrics.map((m, i) => (
                                        <div key={i} className="hud-metric-box">
                                            <div className="hud-metric-id">Stat_{i + 1}</div>
                                            <p className="hud-metric-label">{m.label}</p>
                                            <p className="hud-metric-val">{m.val}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Launch Action */}
                            <a
                                href={active.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hud-launch-btn"
                            >
                                INITIALIZE_{active.action || 'LAUNCH'} <ExternalLink size={24} />
                            </a>
                        </div>
                    </main>

                    {/* RIGHT: SYSTEM LOGS & PROJECT TELEMETRY */}
                    <aside className="hud-aside telemetry-col">
                        {/* Status HUD */}
                        <div className="hud-status-panel">
                            <div className="hud-status-header">
                                <div className="hud-status-icon-box">
                                    <Radio className="hud-radio-icon" />
                                </div>
                                <div className="hud-status-text">
                                    <p className="hud-small-cap">System Status</p>
                                    <p className="hud-status-val">Operational</p>
                                </div>
                            </div>

                            <div className="hud-efficiency-module">
                                <p className="hud-small-cap tracking-widest">Global Efficiency</p>
                                <div className="hud-progress-track">
                                    <div className="hud-progress-fill" style={{ width: '92%' }} />
                                </div>
                                <div className="hud-progress-labels">
                                    <span>0%</span>
                                    <span>DATA_STREAM_STABLE</span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>

                        {/* PROJECT RESOURCES TELEMETRY */}
                        <div className="hud-telemetry-panel">
                            <div className="hud-telemetry-bg-effect" />

                            <h4 className="hud-telemetry-header">
                                <Binary size={12} /> Mission Resources
                            </h4>

                            <div className="hud-resource-list">
                                {active.tags.map((tag, i) => (
                                    <div key={tag} className="hud-resource-item">
                                        <div className="hud-resource-info">
                                            <span className="hud-resource-name">
                                                {tag}
                                            </span>
                                            <span className="hud-resource-hex">
                                                0x0{i + 1}_LOADED
                                            </span>
                                        </div>
                                        <div className="hud-resource-bar">
                                            <div
                                                className="hud-resource-fill"
                                                style={{ width: `${60 + (i * 12)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}

                                {/* Tactical Footer */}
                                <div className="hud-tactical-footer">
                                    <div className="hud-diagnostic-row">
                                        <span>Diagnostic Link</span>
                                        <span className="text-purple-500">Encrypted</span>
                                    </div>
                                    <div className="hud-bars-viz">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                            <div key={i} className="hud-viz-bar" style={{ height: `${Math.random() * 8 + 4}px` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Background Decoration */}
                            <div className="hud-deco-icon">
                                <Box size={96} />
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Comic Branding Footer */}
                <footer className="hud-footer">
                    <div className="hud-footer-left">
                    </div>
                    <div className="hud-footer-right">

                    </div>
                </footer>
            </div>
        );
    };

    const renderComicContent = () => {
        const impactTags = ['POW!', 'ZAP!', 'BOOM!', 'WHAM!', 'BANG!', 'KAPOW!'];
        const impactClasses = ['impact-pow', 'impact-zap', 'impact-boom', 'impact-wham', 'impact-bang'];

        return (
            <div className="comic-page">
                <div className="comic-header-panel reveal">
                    <div className="comic-issue-tag">Issue #24</div>
                    <h2 className="comic-main-title tracking-tighter">Featured <span>Projects</span></h2>
                    <p className="comic-sub-title">"A collection of my latest high-stakes missions and experimental builds!"</p>
                </div>

                {filteredProjects.map((project, idx) => {
                    const impactTag = impactTags[idx % impactTags.length];
                    const impactClass = impactClasses[idx % impactClasses.length];

                    // Assign randomized spans and tilts based on index
                    let panelClass = 'comic-panel reveal';
                    if (idx === 0) panelClass += ' span-2-1';
                    else if (idx % 3 === 0) panelClass += ' span-2-1';
                    else if (idx % 4 === 0) panelClass += ' row-span-2';

                    const rotationClass = idx % 2 === 0 ? 'rot-pos-slight' : 'rot-neg-slight';
                    panelClass += ` ${rotationClass}`;

                    return (
                        <div
                            className={panelClass}
                            key={idx}
                            style={{ '--panel-accent': `var(--${project.accent || 'accent-purple'})` }}
                        >
                            <div className="comic-panel-image">
                                <div className={`comic-tag-impact ${impactClass}`}>{impactTag}</div>
                                {project.poster ? (
                                    <img src={project.poster} alt={project.title} className="comic-image-asset" />
                                ) : (
                                    <div className="w-full h-full bg-slate-800" />
                                )}
                            </div>
                            <div className="comic-panel-content">
                                <div className="comic-speech-bubble">
                                    <h3 className="comic-title">{project.title}</h3>
                                    <div className="comic-chips">
                                        {project.tags.slice(0, 3).map((tag, tIdx) => (
                                            <span className="comic-chip" key={tIdx}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="comic-desc">{project.desc}</p>

                                {project.bullets && project.bullets.length > 0 && (
                                    <ul className="comic-bullets">
                                        {project.bullets.map((bullet, bIdx) => (
                                            <li key={bIdx} className="comic-bullet-item">{bullet}</li>
                                        ))}
                                    </ul>
                                )}

                                <div className="comic-footer">
                                    <i className={`fas ${getIconForProject(project)} text-purple-500 font-bold`}></i>
                                    {project.link ? (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="comic-link">
                                            Read Mission Log
                                        </a>
                                    ) : (
                                        <span className="comic-link">Classified Mission</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderDesktopContent = () => {
        const time = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const date = currentTime.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' });

        return (
            <div className="monitor-view-wrapper reveal">
                <div className="monitor-container animate-monitor">
                    <div className="monitor-backglow"></div>
                    <div className="monitor-frame">
                        <div className={`monitor-screen ${monitorStatus}`}>
                            {(monitorStatus === 'on' || monitorStatus === 'booting' || monitorStatus === 'shutting-down') && (
                                <div className="screen-reflection"></div>
                            )}

                            {monitorStatus === 'booting' && (
                                <div className="boot-screen">
                                    <div className="boot-logo">
                                        <svg viewBox="0 0 24 24" className="w-16 h-16 fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                                            <path d="M0 0h11.4v11.4H0V0zm12.6 0H24v11.4H12.6V0zM0 12.6h11.4V24H0V12.6zm12.6 0H24V24H12.6V12.6z" />
                                        </svg>
                                    </div>
                                    <div className="boot-loader">
                                        <div className="loader-bar"></div>
                                    </div>
                                    <div className="boot-text">Welcome</div>
                                </div>
                            )}

                            {monitorStatus === 'shutting-down' && (
                                <div className="shutdown-screen">
                                    <div className="shutdown-content">
                                        <div className="shutdown-spinner"></div>
                                        <div className="shutdown-text">Shutting Down</div>
                                    </div>
                                </div>
                            )}

                            {monitorStatus === 'on' && (
                                <div className="desktop-env win11 consolidated">
                                    <div className="os-desktop-workspace">
                                        {/* Project Folders */}
                                        {projects.map((project, idx) => (
                                            <div
                                                key={idx}
                                                className="os-icon-container"
                                                onDoubleClick={() => handleOpenWindow(idx)}
                                                onClick={() => handleIconClick(idx)}
                                            >
                                                <div className="os-folder-visual">
                                                    <i className={`fas ${getIconForProject(project)}`}></i>
                                                </div>
                                                <span className="os-icon-label">{project.title}</span>
                                            </div>
                                        ))}

                                        {/* About Me Folder */}
                                        <div
                                            className="os-icon-container"
                                            onDoubleClick={() => handleOpenWindow('about')}
                                            onClick={() => handleIconClick('about')}
                                        >
                                            <div className="os-folder-visual" style={{ background: '#ffd43b' }}>
                                                <i className="fas fa-user" style={{ color: 'rgba(66, 32, 6, 0.4)' }}></i>
                                            </div>
                                            <span className="os-icon-label">My Profile</span>
                                        </div>
                                    </div>

                                    {/* Render Open Windows */}
                                    {openWindows.map((id) => {
                                        const isAbout = id === 'about';
                                        const isSkills = id === 'skills';
                                        const isEdu = id === 'education';
                                        const isSys = id === 'about_sys';
                                        const isSystem = isAbout || isSkills || isEdu || isSys;
                                        
                                        const project = isSystem ? null : projects[id];
                                        const pos = windowPositions[id] || { x: 100, y: 100 };
                                        const view = windowViews[id] || 'folder';
                                        const isActive = activeWindow === id;
                                        
                                        let title = project?.title || 'System Window';
                                        if (isAbout) title = 'My Profile';
                                        if (isSkills) title = 'Technical Skills';
                                        if (isEdu) title = 'Academic History';
                                        if (isSys) title = 'About System';

                                        const isMaximized = maximizedWindows.includes(id);
                                        const isMinimized = minimizedWindows.includes(id);

                                        if (isMinimized) return null;

                                        return (
                                            <div
                                                key={id}
                                                className={`os-window-canvas ${isActive ? 'active' : ''} ${isMaximized ? 'maximized' : ''}`}
                                                style={isMaximized ? {
                                                    left: 0,
                                                    top: 0,
                                                    width: '100%',
                                                    height: 'calc(100% - 48px)',
                                                    zIndex: isActive ? windowZ : 100 + openWindows.indexOf(id),
                                                    borderRadius: 0,
                                                    display: 'flex'
                                                } : {
                                                    left: pos.x,
                                                    top: pos.y,
                                                    zIndex: isActive ? windowZ : 100 + openWindows.indexOf(id),
                                                    display: 'flex'
                                                }}
                                                onClick={() => bringToFront(id)}
                                            >
                                                <div 
                                                    className="os-window-header" 
                                                    onMouseDown={(e) => startDrag(e, id)}
                                                    onTouchStart={(e) => startDrag(e, id)}
                                                >
                                                    <div className="px-4 flex items-center gap-2 h-full">
                                                        {view === 'desc' && (
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); toggleWindowView(id, 'folder'); }}
                                                                className="mr-2 text-slate-400 hover:text-blue-600 cursor-pointer"
                                                            >
                                                                <i className="fas fa-arrow-left text-xs"></i>
                                                            </button>
                                                        )}
                                                        <i className="fas fa-folder text-yellow-500 text-xs"></i>
                                                        <span className="text-[11px] font-semibold text-slate-300">
                                                            {title}
                                                        </span>
                                                    </div>
                                                    <div className="os-window-controls h-full">
                                                        <div className="os-control-btn" onClick={(e) => handleMinimize(e, id)} title="Minimize">
                                                            <i className="fas fa-minus"></i>
                                                        </div>
                                                        <div className="os-control-btn" onClick={(e) => handleMaximize(e, id)} title={maximizedWindows.includes(id) ? "Restore" : "Maximize"}>
                                                            <i className={`far ${maximizedWindows.includes(id) ? 'fa-clone' : 'fa-square'}`}></i>
                                                        </div>
                                                        <div className="os-control-btn close" onClick={(e) => handleCloseWindow(e, id)} onTouchEnd={(e) => handleCloseWindow(e, id)} title="Close">
                                                            <i className="fas fa-times"></i>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Windows Address Bar */}
                                                <div className="os-address-bar">
                                                    <div className="os-nav-actions">
                                                        <i className="fas fa-arrow-left" onClick={(e) => { e.stopPropagation(); toggleWindowView(id, 'folder'); }}></i>
                                                        <i className="fas fa-arrow-right"></i>
                                                        <i className="fas fa-arrow-up"></i>
                                                        <i className="fas fa-redo"></i>
                                                    </div>
                                                    <div className="os-breadcrumb-bar">
                                                        <i className="fas fa-desktop text-[10px]"></i>
                                                        <span>This PC</span>
                                                        <i className="fas fa-chevron-right text-[8px]"></i>
                                                        <span>Projects</span>
                                                        <i className="fas fa-chevron-right text-[8px]"></i>
                                                        <span>{title}</span>
                                                    </div>
                                                    <div className="os-search-bar">
                                                        <i className="fas fa-search"></i>
                                                        <span>Search {title}</span>
                                                    </div>
                                                </div>

                                                {view === 'folder' ? (
                                                    <div className="os-file-explorer">
                                                        {isSystem ? (
                                                            <>
                                                                <div className="os-file-item" onClick={() => toggleWindowView(id, 'desc')}>
                                                                    <i className={`fas ${isAbout ? 'fa-id-card' : isSkills ? 'fa-terminal' : isEdu ? 'fa-certificate' : 'fa-cog'} text-blue-400`}></i>
                                                                    <span className="os-file-name">{isAbout ? 'Bio.html' : isSkills ? 'Skills.exe' : isEdu ? 'Degree.pdf' : 'Info.sys'}</span>
                                                                </div>
                                                                <div className="os-file-item" onClick={() => window.location.href = '#contact'}>
                                                                    <i className="fas fa-envelope text-amber-400"></i>
                                                                    <span className="os-file-name">Contact.lnk</span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="os-file-item" onClick={() => toggleWindowView(id, 'desc')}>
                                                                    <i className="fas fa-file-alt text-blue-400"></i>
                                                                    <span className="os-file-name">Description.txt</span>
                                                                </div>
                                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="os-file-item" onClick={(e) => e.stopPropagation()}>
                                                                    <i className="fas fa-external-link-alt text-emerald-400"></i>
                                                                    <span className="os-file-name">Launch_App.exe</span>
                                                                </a>
                                                            </>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="os-txt-content window-content">
                                                        {isSystem ? (
                                                            <div className="text-center py-4">
                                                                {isAbout && (
                                                                    <>
                                                                        <img src="https://ui-avatars.com/api/?name=Aekansh+Khandelwal&background=020617&color=fff" className="w-16 h-16 rounded-full mx-auto mb-4 border border-white/10" alt="Avatar" />
                                                                        <h3 className="font-bold text-white text-lg">Aekansh Khandelwal</h3>
                                                                        <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">Full Stack Developer & AI Enthusiast. Building high-performance, intelligent web applications with a focus on seamless user experiences.</p>
                                                                    </>
                                                                )}
                                                                {isSkills && (
                                                                    <div className="grid grid-cols-2 gap-4 text-left px-8">
                                                                        <div>
                                                                            <h4 className="text-blue-400 font-bold mb-2 text-xs uppercase tracking-wider">Frontend</h4>
                                                                            <ul className="text-xs text-slate-300 space-y-1">
                                                                                <li>React / Next.js</li>
                                                                                <li>TypeScript</li>
                                                                                <li>Tailwind CSS</li>
                                                                            </ul>
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="text-purple-400 font-bold mb-2 text-xs uppercase tracking-wider">Backend</h4>
                                                                            <ul className="text-xs text-slate-300 space-y-1">
                                                                                <li>Node.js / Express</li>
                                                                                <li>Python / Django</li>
                                                                                <li>PostgreSQL</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {isEdu && (
                                                                    <div className="text-left px-8">
                                                                        <div className="mb-4">
                                                                            <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Bachelor of Science</h4>
                                                                            <p className="text-white text-sm">Computer Science & Engineering</p>
                                                                            <p className="text-slate-500 text-[10px]">2020 — 2024</p>
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider">Certifications</h4>
                                                                            <p className="text-white text-sm">Advanced Machine Learning (Coursera)</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {isSys && (
                                                                    <div className="text-xs text-slate-400 space-y-4 px-8">
                                                                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                                                            <p className="text-white font-bold mb-1">Portfolio OS v1.2</p>
                                                                            <p>Built with React & Vite</p>
                                                                        </div>
                                                                        <p>"The only way to do great work is to love what you do."</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <h2 className="gradient-text text-xl font-bold mb-4">{project.title}</h2>
                                                                <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.desc}</p>
                                                                <div className="mb-4">
                                                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Key Highlights:</h4>
                                                                    <ul className="text-xs text-slate-400 space-y-1">
                                                                        {project.bullets.map((b, i) => <li key={i}>• {b}</li>)}
                                                                    </ul>
                                                                </div>
                                                                <div className="flex gap-2 flex-wrap">
                                                                    {project.tags.map((tag, i) => (
                                                                        <span key={i} className="px-2 py-1 bg-white/5 text-[10px] rounded text-slate-400 border border-white/5">{tag}</span>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}

                                    {/* Start Menu Popup */}
                                    {showStartMenu && (
                                        <div className="os-start-menu">
                                            <div className="start-search">
                                                <i className="fas fa-search search-icon"></i>
                                                <input type="text" placeholder="Type to search..." autoFocus />
                                            </div>

                                            <div className="os-start-content scrollbar-hide">
                                                {/* Pinned Section */}
                                                <div className="start-section">
                                                    <div className="start-section-header">
                                                        <span>Pinned</span>
                                                        <button className="start-all-apps">All apps <i className="fas fa-chevron-right text-[8px]"></i></button>
                                                    </div>
                                                    <div className="os-start-apps-grid">
                                                        <div className="start-app-item" onClick={() => { handleOpenWindow('about'); setShowStartMenu(false); }}>
                                                            <div className="start-app-icon bg-blue-500/20"><i className="fas fa-user text-blue-400"></i></div>
                                                            <span>Profile</span>
                                                        </div>
                                                        <div className="start-app-item" onClick={() => { handleOpenWindow('skills'); setShowStartMenu(false); }}>
                                                            <div className="start-app-icon bg-purple-500/20"><i className="fas fa-code text-purple-400"></i></div>
                                                            <span>Skills</span>
                                                        </div>
                                                        <div className="start-app-item" onClick={() => { handleOpenWindow('about_sys'); setShowStartMenu(false); }}>
                                                            <div className="start-app-icon bg-slate-500/20"><i className="fas fa-info-circle text-slate-300"></i></div>
                                                            <span>About</span>
                                                        </div>
                                                        <div className="start-app-item" onClick={() => { handleOpenWindow('education'); setShowStartMenu(false); }}>
                                                            <div className="start-app-icon bg-emerald-500/20"><i className="fas fa-graduation-cap text-emerald-400"></i></div>
                                                            <span>Education</span>
                                                        </div>
                                                        {projects.slice(0, 8).map((p, i) => (
                                                            <div key={i} className="start-app-item" onClick={() => { handleOpenWindow(i); setShowStartMenu(false); }}>
                                                                <div className="start-app-icon bg-yellow-500/20"><i className={`fas ${getIconForProject(p)} text-yellow-500`}></i></div>
                                                                <span>{p.title.split(' ')[0]}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Recommended Section */}
                                                <div className="start-section mt-4">
                                                    <div className="start-section-header">
                                                        <span>Recommended</span>
                                                    </div>
                                                    <div className="start-recommended-list">
                                                        <div className="rec-item" onClick={() => window.open('https://github.com/aekanshkhandelwal', '_blank')}>
                                                            <div className="rec-icon bg-emerald-500/20"><i className="fab fa-github text-emerald-400"></i></div>
                                                            <div className="rec-info">
                                                                <p className="rec-name">Portfolio Source</p>
                                                                <p className="rec-date">Recently updated</p>
                                                            </div>
                                                        </div>
                                                        <div className="rec-item">
                                                            <div className="rec-icon bg-amber-500/20"><i className="fas fa-file-pdf text-amber-400"></i></div>
                                                            <div className="rec-info">
                                                                <p className="rec-name">Resume_Final_2024.pdf</p>
                                                                <p className="rec-date">10m ago</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Start Footer */}
                                            <div className="os-start-footer">
                                                <div className="start-user">
                                                    <div className="user-avatar">
                                                        <i className="fas fa-user-circle"></i>
                                                    </div>
                                                    <span className="user-name">Aekansh Khandelwal</span>
                                                </div>
                                                <button
                                                    className="start-power-btn"
                                                    onClick={(e) => { handlePowerToggle(e); setShowStartMenu(false); }}
                                                    onTouchEnd={(e) => { handlePowerToggle(e); setShowStartMenu(false); }}
                                                    title="Power Options"
                                                >
                                                    <i className="fas fa-power-off"></i>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Taskbar */}
                                    <div
                                        className="os-taskbar-glass"
                                        onClick={(e) => { if (e.target === e.currentTarget || !e.currentTarget.querySelector('.start-btn')?.contains(e.target)) { if (showStartMenu) setShowStartMenu(false); } }}
                                    >
                                        {/* Centered App Group */}
                                        <div className="os-taskbar-apps">
                                            <button
                                                className={`os-taskbar-item start-btn ${showStartMenu ? 'active' : ''}`}
                                                onClick={(e) => { e.stopPropagation(); setShowStartMenu(s => !s); }}
                                                title="Start"
                                                style={{ touchAction: 'manipulation', background: 'none', border: 'none', cursor: 'pointer' }}
                                            >
                                                <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', fill: '#3b82f6', display: 'block' }}>
                                                    <path d="M0 0h11.4v11.4H0V0zm12.6 0H24v11.4H12.6V0zM0 12.6h11.4V24H0V12.6zm12.6 0H24V24H12.6V12.6z" />
                                                </svg>
                                            </button>

                                            <div className="os-taskbar-item text-slate-400" title="Search">
                                                <i className="fas fa-search text-lg"></i>
                                            </div>

                                            <div className="w-px h-6 bg-white/10 mx-1"></div>

                                            {openWindows.map(id => {
                                                const isAbout = id === 'about';
                                                const project = isAbout ? null : projects[id];
                                                const icon = isAbout ? 'fa-user-circle' : getIconForProject(project);
                                                const iconColor = isAbout ? 'text-slate-300' : 'text-yellow-500';

                                                return (
                                                    <div
                                                        key={id}
                                                        className={`os-taskbar-item ${activeWindow === id ? 'active' : ''}`}
                                                        onClick={() => bringToFront(id)}
                                                        title={isAbout ? 'My Profile' : projects[id].title}
                                                    >
                                                        <i className={`fas ${icon} ${iconColor} text-lg`}></i>
                                                        <div className="os-dot-indicator" style={{ display: 'block' }}></div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="os-taskbar-tray" onClick={(e) => e.stopPropagation()}>
                                            <div className="os-tray-icons">
                                                <i className="fas fa-chevron-up text-[10px]"></i>
                                                <i className="fas fa-wifi"></i>
                                                <i className="fas fa-volume-up"></i>
                                                <i className="fas fa-battery-three-quarters"></i>
                                                <i className="far fa-bell"></i>
                                            </div>
                                            <div className="os-tray-time">
                                                <span>{time}</span>
                                                <span>{date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="monitor-hardware-ui">
                            <div className={`monitor-status-light ${monitorStatus}`}></div>
                            <button
                                className={`monitor-power-btn ${monitorStatus}`}
                                onClick={(e) => handlePowerToggle(e)}
                                onTouchEnd={(e) => handlePowerToggle(e)}
                                title={monitorStatus === 'on' ? "Power Off" : "Power On"}
                                style={{ touchAction: 'manipulation', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                <i className="fas fa-power-off"></i>
                            </button>
                        </div>
                        <div className="monitor-brand">PORTFOLIO OS</div>
                    </div>
                    <div className="monitor-stand">
                        <div className="stand-joint"></div>
                        <div className="stand-neck"></div>
                        <div className="stand-base"></div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className={`section projects-section view-${viewMode}`} id="projects">
            <div className="container">
                <div className="section-header reveal">
                    <div className="header-content">
                        <div className="header-left">
                            <h2 className="section-title">
                                Featured <span className="gradient-text">Projects</span>
                            </h2>
                            <p className="section-subtitle reveal">Tactical Blueprint & Mission Briefings</p>
                        </div>
                        <div className="view-switcher">
                            {[
                                { id: 'grid', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z', title: 'Grid' },
                                { id: 'desktop', icon: 'M4 4h16v12H4z M4 20h16 M10 20l-1-4 M14 20l1-4', title: 'Desktop' },
                                { id: 'swipe', icon: 'M3 3h18v18H3z M7 12h10 M7 8h10 M7 16h10', title: 'HUD' },
                                { id: 'comic', icon: 'M3 3h18v18H3z M7 7h10 M7 11h10 M14 15h3 M7 15h4', title: 'Comic' }
                            ].map(view => (
                                <button
                                    key={view.id}
                                    className={`view-btn ${viewMode === view.id ? 'active' : ''}`}
                                    onClick={() => setViewMode(view.id)}
                                    title={view.title}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d={view.icon} />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`projects-container ${viewMode}-view spotlight-parent`}>
                    {viewMode === 'swipe' && renderHudContent()}

                    {viewMode === 'grid' && (
                        <div className="projects-grid">
                            {filteredProjects.map((project, idx) => (
                                <div
                                    className="reveal"
                                    key={idx}
                                    onMouseMove={handleMouseMove}
                                    onMouseEnter={(e) => e.currentTarget.classList.add('visible')}
                                >
                                    {project.link ? (
                                        <div className="project-card-wrapper">
                                            <div className="project-card-click-area" onClick={() => { setViewMode('desktop'); handleOpenWindow(idx); }}>
                                                <div className="project-card">
                                                    <div className="card-glow" />
                                                    <div className="pc-preview">
                                                        <div className="preview-visual">
                                                            {project.image && project.image.endsWith('.mp4') ? (
                                                                <video src={project.image} autoPlay muted loop playsInline className="pc-image" />
                                                            ) : project.image ? (
                                                                <img src={project.image} alt={project.title} className="pc-image" />
                                                            ) : (
                                                                <div className="pc-image-placeholder"><Bot /></div>
                                                            )}
                                                        </div>
                                                        <div className="preview-overlay">
                                                            <div className="preview-text">BOOT_INTERACE.sys</div>
                                                        </div>
                                                    </div>
                                                    <div className="pc-content">
                                                        <div className="pc-tags">
                                                            {project.tags.slice(0, 3).map(tag => (
                                                                <span key={tag} className="pc-tag">{tag}</span>
                                                            ))}
                                                        </div>
                                                        <h3 className="pc-title">{project.title}</h3>
                                                        <p className="pc-desc">{project.desc}</p>
                                                        <div className="pc-footer">
                                                            <div className="pc-metrics">
                                                                {project.metrics.slice(0, 2).map((m, i) => (
                                                                    <div key={i} className="pcm-item">
                                                                        <span className="pcm-val">{m.val}</span>
                                                                        <span className="pcm-label">{m.label}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="external-launch-link" onClick={(e) => e.stopPropagation()}>
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    ) : (
                                        <ProjectCard project={project} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {viewMode === 'desktop' && renderDesktopContent()}
                    {viewMode === 'comic' && renderComicContent()}
                </div>
            </div>
        </section>
    );
}

// Sub-component for the card content to keep Projects.jsx clean
function ProjectCard({ project, isFlipped, onNext }) {
    return (
        <article className={`project-card ${project.accent} ${isFlipped ? 'is-flipped' : ''}`}>
            <div className="card-glow"></div>
            <div className="pc-preview">
                <div className="preview-overlay">
                    <span className="preview-text">View Project <span>↗</span></span>
                </div>
                <div className="preview-visual">
                    {project.image ? (
                        project.image.endsWith('.mp4') ? (
                            <video
                                src={project.image}
                                poster={project.poster}
                                className="pc-image"
                                autoPlay
                                loop
                                muted
                                playsInline
                                aria-label={project.title}
                            />
                        ) : (
                            <img src={project.image} alt={project.title} className="pc-image" loading="lazy" />
                        )
                    ) : ['Movie Recommender', 'Social Media', 'Library Management'].some(keyword => project.title.includes(keyword)) ? (
                        <div className={`text-visual ${project.accent}`}>
                            <div className="text-visual-content">
                                {project.title.split(' ').map((word, i) => (
                                    <span key={i} className="visual-word" style={{ animationDelay: `${i * 0.1}s` }}>
                                        {word}
                                    </span>
                                ))}
                            </div>
                            <div className="text-visual-bg"></div>
                        </div>
                    ) : project.title.includes('CTGAN') ? (
                        <div className="gan-visual">
                            <div className="gan-nodes">
                                <div className="gan-node generator">
                                    <span className="gan-node-label">Gen</span>
                                </div>

                                <div className="gan-connector">
                                    <div className="gan-arrow">
                                        <svg viewBox="0 0 100 20" fill="none">
                                            <path d="M0 10 H90" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="path-line" />
                                            <path d="M85 5 L95 10 L85 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="path-head" />
                                        </svg>
                                    </div>
                                    <div className="flow-particle"></div>
                                </div>

                                <div className="gan-node discriminator">
                                    <span className="gan-node-label">Disc</span>
                                </div>
                            </div>

                            <div className="gan-particles">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="gan-particle"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            animationDelay: `${Math.random() * 5}s`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className={`visual-mockup ${project.accent}`}>
                            <div className="mock-chart"></div>
                            <div className="mock-lines"></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="pc-content">
                <div className="pc-header">
                    <div className="pc-tags">
                        {project.tags.map((tag) => (
                            <span className="pc-tag" key={tag}>{tag}</span>
                        ))}
                    </div>
                </div>
                <h3 className="pc-title">{project.title}</h3>
                <p className="pc-desc">{project.desc}</p>

                <ul className="pc-bullets">
                    {project.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                    ))}
                </ul>

                <div className="pc-footer">
                    {project.metrics && (
                        <div className="pc-metrics">
                            {project.metrics.map((metric, mIdx) => (
                                <div className="pcm" key={mIdx}>
                                    <span className="pcm-val">{metric.val}</span>
                                    <span className="pcm-label">{metric.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {onNext && (
                        <button
                            className="card-next-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onNext();
                            }}
                        >
                            <span>Next Project</span>
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
