import { useState, useEffect, useRef } from 'react';
import {
    Bot, Trello, Mail, BarChart3, Database, Eraser,
    PlayCircle, ShieldCheck, Star, Activity,
    Cpu, Terminal, Settings,
    BrainCircuit, ChevronDown, Clock, Maximize2, Sparkles,
    CheckCircle2, AlertCircle, LayoutGrid, Crosshair, Monitor, BookOpen, ExternalLink
} from 'lucide-react';
import useReveal from '../hooks/useReveal';
import GridView from './projects/views/GridView';
import HudView from './projects/views/HudView';
import DesktopView from './projects/views/DesktopView';
import GalleryView from './projects/views/image';
import DashboardView from './projects/views/DashboardView';
import './Projects.css';

const projects = [
    {
        title: "Personalized RAG BOT",
        tags: ['React', 'Gemini API', 'Pinecone', 'Node.js', 'Markdown'],
        accent: 'accent-teal',
        link: 'https://aekansh-ragbot.vercel.app/',
        image: '/previews/ragbot.mp4',
        poster: '/previews/ragbot.gif',
        desc: 'A beautiful, interactive Retrieval-Augmented Generation (RAG) chatbot application.',
        details: 'Built with a custom CSS-animated robot persona, this bot uses Gemini 1.5 Pro and Pinecone to provide context-aware responses with a premium glassmorphism UI.',
        bullets: [
            'Retrieval-Augmented Generation using Google Gemini API and Pinecone Vector Database for context-aware responses.',
            'Features a fully CSS-animated "Golden Robot" companion that reacts to generation states.',
            'Premium glassmorphism UI with frosted effects, dynamic glow shadows, and mobile-first responsive design.',
            'Robust Markdown rendering with prompt caching for instantaneous results.',
        ],
        action: "SYNTHESIZE",
        metrics: [{ label: "Architecture", val: "RAG" }, { label: "Engine", val: "Gemini" }, { label: "Database", val: "Pinecone" }],
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
        details: 'Implemented secure authentication using JWT and Google OAuth with a scalable Node.js & MongoDB backend. Designed for high-velocity teams.',
        bullets: [
            'Built a complete issue and project management system with team-based workflows.',
            'Implemented secure authentication using JWT and Google OAuth with a scalable Node.js & MongoDB backend.',
            'Designed a premium, dark-themed UI with smooth animations and a customizable sidebar for enhanced experience.',
        ],
        action: "DEPLOY",
        metrics: [{ label: "Stack", val: "MERN" }, { label: "Auth", val: "JWT" }, { label: "UI", val: "Premium" }],
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
        details: 'Built an agentic architecture integrating Groq LLMs with the Gmail API. Implemented smart decoding, summarization, and daily digests.',
        bullets: [
            'Built an agentic, client-first architecture integrating Groq LLMs with the Gmail API.',
            'Implemented smart inbox decoding, AI-powered summarization, and a daily digest.',
            'Ensured privacy-first design with local data management and secure OAuth authentication.',
        ],
        action: "DECODE",
        metrics: [{ label: "LPU", val: "Groq" }, { label: "API", val: "Gmail" }, { label: "Privacy", val: "High" }],
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
        details: 'Tracked business-critical KPIs boosting insight effectiveness by 40%. Streamlined reporting cutting manual Excel tasks by 60%.',
        bullets: [
            'Analyzed 15,000+ retail transactions across 5+ cities.',
            'Tracked business-critical KPIs boosting insight effectiveness by ~40%.',
            'Streamlined reporting cutting manual Excel tasks by 60%.',
        ],
        action: "ANALYZE",
        metrics: [{ label: "Transactions", val: "15K+" }, { label: "Cities", val: "5+" }, { label: "Time Saved", val: "60%" }],
        icon: <BarChart3 />
    },
    {
        title: 'CTGAN — Privacy-Preserving Synthetic Data Generation',
        tags: ['CTGAN', 'Python', 'Machine Learning', 'Data Privacy'],
        accent: 'accent-teal',
        link: 'https://github.com/aekanshkhandelwal/Synthetic_Data_Generation/',
        desc: 'Developed an end-to-end ML pipeline using Conditional GANs (CTGAN) to generate high-fidelity, privacy-preserving synthetic fraud transaction datasets.',
        details: 'Implemented an agentic Generator-Discriminator architecture optimized for mixed tabular data, achieving realistic data augmentation for imbalanced scam detection datasets.',
        bullets: [
            'Implemented an agentic Generator-Discriminator architecture specifically optimized for mixed tabular data.',
            'Engineered sophisticated preprocessing including Mode-Specific Normalization using Variational Gaussian Mixture models.',
            'Achieved realistic data augmentation for imbalanced scam detection datasets while preserving statistical distributions.',
        ],
        action: "SIMULATE",
        metrics: [{ label: "Model", val: "CTGAN" }, { label: "Normalization", val: "VGM" }, { label: "Accuracy", val: "98%" }],
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
        details: 'Built a responsive web app using Streamlit and Pandas for real-time data manipulation. Features "Smart Clean" automation and instant CSV export.',
        bullets: [
            'Built a responsive web app using Streamlit and Pandas for real-time data manipulation.',
            'Implemented "Smart Clean" features including duplicate removal, missing value handling, and column formatting.',
            'Enabled instant file export, allowing users to download cleaned datasets as CSV files seamlessly.',
        ],
        action: "SCRUB",
        metrics: [{ label: "Engine", val: "Python" }, { label: "UI", val: "Streamlit" }, { label: "Automation", val: "High" }],
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
        details: 'Optimized 15+ SQL queries to uncover genre trends and engagement patterns across 10K+ records. Provided data-backed content strategies.',
        bullets: [
            'Revealed user engagement trends and genre preferences using 15+ optimized SQL queries.',
            'Identified high-impact content categories for data-backed strategy recommendations.',
        ],
        action: "QUERY",
        metrics: [{ label: "Database", val: "10K+ Recs" }, { label: "Queries", val: "15+" }, { label: "Insight", val: "40%" }],
        icon: <PlayCircle />
    },
    {
        title: 'ML Model for Spam Detection',
        tags: ['Python', 'Machine Learning', 'AI', 'Streamlit'],
        accent: 'accent-blue',
        link: 'https://email-smsspam-classifier-by-aekansh.streamlit.app/',
        image: '/previews/spam.png',
        desc: 'Classified SMS/Emails into spam and ham using supervised learning techniques, deployed as an interactive Streamlit app.',
        details: 'Implemented multiple supervised learning algorithms achieving high precision in spam detection. Deployed as a real-time classification tool.',
        bullets: [
            'Implemented multiple supervised learning algorithms for classification.',
            'Achieved high accuracy in detecting spam messages with a user-friendly interface.',
        ],
        action: "CLASSIFY",
        metrics: [{ label: "Type", val: "Supervised" }, { label: "Model", val: "ML" }, { label: "Precision", val: "98%" }],
        icon: <ShieldCheck />
    },
    {
        title: 'Video Games Sales Interactive Dashboard',
        tags: ['Power BI', 'Data Analysis', 'Excel'],
        accent: 'accent-purple',
        link: 'https://app.powerbi.com/view?r=eyJrIjoiZDQ3NmMyMjEtMzAwNC00N2UyLTgzODUtZmI5MjFkZGM4YjBhIiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9',
        image: '/previews/videogames.png',
        desc: 'An interactive Power BI dashboard visualizing global video game sales across different platforms, genres, and publishers over three decades.',
        details: 'Analyzed 8.82bn in global sales (1980-2015). Visualized top-selling publishers like Nintendo and Activision with interactive filters.',
        bullets: [
            'Analyzed global sales reaching 8.82bn across multiple gaming eras (1980-2015).',
            'Visualized top-selling titles and publishers like Nintendo, Activision, and EA.',
            'Implemented interactive filters for Genre and Platform to uncover market trends.',
        ],
        action: "VISUALIZE",
        metrics: [{ label: "Global Sales", val: "8.82bn" }, { label: "Timeline", val: "35Y" }, { label: "Platform", val: "Cross" }],
        icon: <BarChart3 />
    },
    {
        title: 'Movie Recommender System',
        tags: ['Python', 'Machine Learning', 'ML Algorithms'],
        accent: 'accent-purple',
        link: 'https://github.com/aekanshkhandelwal/movie_recommendation_System',
        desc: 'Developed a personalized movie recommendation system to enhance user engagement using ML algorithms.',
        details: 'Utilized collaborative filtering and content-based techniques to provide tailored recommendations based on user ratings and metadata.',
        bullets: [
            'Analyzed user preferences and ratings to provide tailored recommendations.',
            'Utilized collaborative filtering and content-based techniques.',
        ],
        action: "RECOMMEND",
        metrics: [{ label: "Method", val: "Collab" }, { label: "Filtering", val: "Content" }, { label: "Accuracy", val: "85%" }],
        icon: <Star />
    },
    {
        title: 'Social Media Platform (Prototype)',
        tags: ['Python', 'UI Prototype'],
        accent: 'accent-blue',
        link: 'https://github.com/aekanshkhandelwal/social_media_platform/tree/main/social-media-website-main',
        desc: 'Built a 2-user Python app allowing photo sharing, likes, comments, and messaging.',
        details: 'Developed core social features including image uploads and communication in a lightweight Python environment for UX testing.',
        bullets: [
            'Developed core social features including image uploads and communication.',
            'Created a prototype for user interaction testing.',
        ],
        action: "PROTOTYPE",
        metrics: [{ label: "Users", val: "Multi" }, { label: "Features", val: "Full" }, { label: "Build", val: "Python" }],
        icon: <Bot />
    },
    {
        title: 'Library Management System',
        tags: ['Admin/Student Interface', 'Management System'],
        accent: 'accent-purple',
        link: 'https://github.com/aekanshkhandelwal/Library-Management-System-in-C',
        desc: 'Managed records of books and students with separate admin & student interfaces.',
        details: 'Organized inventory and tracking for book loans and returns using a dual-interface architecture for distinct user roles.',
        bullets: [
            'Organized inventory and tracking for book loans and returns.',
            'Implemented dual interfaces for distinct user roles.',
        ],
        action: "CATALOG",
        metrics: [{ label: "Architecture", val: "Dual" }, { label: "Database", val: "SQL" }, { label: "Language", val: "C" }],
        icon: <Database />
    },
];

export default function Projects() {
    const [viewMode, setViewMode] = useState('grid');
    useReveal([viewMode]);
    const [filter, setFilter] = useState('All');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [dashboardActiveIdx, setDashboardActiveIdx] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));

    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

    useEffect(() => {
        if (filteredProjects.length === 0) {
            setDashboardActiveIdx(0);
            return;
        }

        if (dashboardActiveIdx >= filteredProjects.length) {
            setDashboardActiveIdx(filteredProjects.length - 1);
        }
    }, [dashboardActiveIdx, filteredProjects]);

    const handleMouseMove = (e) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleOpenWindow = (idx) => {
        setSelectedProjectIndex(idx);
        setViewMode('desktop');
    };

    // (State for Grid/Dashboard/Comic views remain)






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

    return (
        <section id="projects" className="projects-section">
            <div className="projects-container">
                <div className="section-header">
                    <div className="header-content">
                        <h2 className="section-title" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 950, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>Project & <span className="gradient-text">Work</span></h2>
                        <div className="view-switcher">
                            <button
                                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Grid View"
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'swipe' ? 'active' : ''}`}
                                onClick={() => setViewMode('swipe')}
                                title="Tactical HUD"
                            >
                                <Crosshair size={18} />
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'desktop' ? 'active' : ''}`}
                                onClick={() => setViewMode('desktop')}
                                title="Desktop View"
                            >
                                <Monitor size={18} />
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setViewMode('dashboard')}
                                title="Data Dashboard"
                            >
                                <BarChart3 size={18} />
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'gallery' ? 'active' : ''}`}
                                onClick={() => setViewMode('gallery')}
                                title="Premium Gallery"
                            >
                                <Sparkles size={18} />
                            </button>
                        </div>
                    </div>

                </div>

                <div className="projects-viewport">
                    {viewMode === 'grid' && (
                        <GridView
                            projects={projects}
                            filteredProjects={filteredProjects}
                            handleMouseMove={handleMouseMove}
                            handleOpenWindow={(idx) => handleOpenWindow(idx)}
                        />
                    )}

                    {viewMode === 'swipe' && (
                        <HudView
                            filteredProjects={filteredProjects}
                            currentIndex={dashboardActiveIdx}
                            setCurrentIndex={setDashboardActiveIdx}
                        />
                    )}

                    {viewMode === 'desktop' && (
                        <DesktopView
                            projects={projects}
                            initialProjectIndex={selectedProjectIndex ?? dashboardActiveIdx}
                            onCloseSelected={() => setSelectedProjectIndex(null)}
                        />
                    )}
                    {viewMode === 'dashboard' && (
                        <DashboardView
                            projects={projects}
                            filteredProjects={filteredProjects}
                            dashboardActiveIdx={dashboardActiveIdx}
                            setDashboardActiveIdx={setDashboardActiveIdx}
                        />
                    )}
                    {viewMode === 'gallery' && <GalleryView projects={projects} />}
                </div>
            </div>
        </section>
    );
}
