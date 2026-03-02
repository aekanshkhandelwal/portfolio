import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import './Projects.css';

const projects = [
    {
        title: "Personalized RAG BOT 🤖✨",
        tags: ['React', 'Gemini API', 'Pinecone', 'Node.js', 'Markdown'],
        accent: 'accent-teal',
        link: 'https://aekansh-ragbot.vercel.app/',
        image: '/previews/ragbot.gif',
        desc: 'A beautiful, interactive Retrieval-Augmented Generation (RAG) chatbot application.',
        bullets: [
            'Retrieval-Augmented Generation using Google Gemini API and Pinecone Vector Database for context-aware responses.',
            'Features a fully CSS-animated "Golden Robot" companion that reacts to generation states.',
            'Premium glassmorphism UI with frosted effects, dynamic glow shadows, and mobile-first responsive design.',
            'Robust Markdown rendering with prompt caching for instantaneous results.',
        ],
        metrics: [
            { val: 'RAG', label: 'Architecture' },
            { val: 'Gemini', label: 'Engine' },
            { val: 'Pinecone', label: 'DB' },
        ],
    },
    {
        title: 'Linear Clone - Project Management Tool',
        tags: ['Node.js', 'MongoDB', 'React', 'JWT', 'OAuth'],
        accent: 'accent-blue',
        link: 'https://linear-silk.vercel.app/',
        image: '/previews/linear.gif',
        desc: 'A full-stack project management tool inspired by Linear, designed to help individuals and teams efficiently track issues, manage projects, and organize workspaces.',
        bullets: [
            'Built a complete issue and project management system with team-based workflows.',
            'Implemented secure authentication using JWT and Google OAuth with a scalable Node.js & MongoDB backend.',
            'Designed a premium, dark-themed UI with smooth animations and a customizable sidebar for enhanced experience.',
        ],
        metrics: [
            { val: 'MERN', label: 'Full Stack' },
            { val: 'JWT', label: 'Secure Auth' },
            { val: 'UI/UX', label: 'Premium' },
        ],
    },
    {
        title: 'SendWise.ai — AI Email Command Centre',
        tags: ['React', 'Gmail API', 'Groq LLM', 'OAuth'],
        accent: 'accent-purple',
        link: 'https://sendwise-ten.vercel.app/',
        image: '/previews/sendwise.gif',
        desc: 'An AI-powered email command centre that transforms traditional inbox management into an intelligent, conversational workflow.',
        bullets: [
            'Built an agentic, client-first architecture integrating Groq LLMs with the Gmail API.',
            'Implemented smart inbox decoding, AI-powered summarization, and a daily digest.',
            'Ensured privacy-first design with local data management and secure OAuth authentication.',
        ],
        metrics: [
            { val: 'Groq', label: 'LLM Inference' },
            { val: 'Gmail', label: 'API Integration' },
            { val: 'Local', label: 'Privacy' },
        ],
    },
    {
        title: 'Retail Chain Insights Dashboard',
        tags: ['Power BI', 'SQL', 'Data Analytics'],
        accent: 'accent-blue',
        link: 'https://app.powerbi.com/view?r=eyJrIjoiMzdlMTEzMWMtMTFmYi00MWI3LTk3ZjEtM2E0YjkzZTk5NTc0IiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9',
        image: '/previews/retail.gif',
        desc: 'Designed a dashboard to analyze sales, inventory, and customer insights for retail chains using Power BI and SQL.',
        bullets: [
            'Analyzed 15,000+ retail transactions across 5+ cities.',
            'Tracked business-critical KPIs boosting insight effectiveness by ~40%.',
            'Streamlined reporting cutting manual Excel tasks by 60%.',
        ],
        metrics: [
            { val: '15K+', label: 'Transactions' },
            { val: '5+', label: 'Cities' },
            { val: '60%', label: 'Time Saved' },
        ],
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
        metrics: [
            { val: 'CTGAN', label: 'Architecture' },
            { val: 'VGM', label: 'Normalization' },
            { val: 'Fraud', label: 'Augmentation' },
        ],
    },
    {
        title: 'No-Code Data Cleaning Tool',
        tags: ['Python', 'Streamlit', 'Pandas', 'Data Cleaning'],
        accent: 'accent-purple',
        link: 'https://datacleaningapp-by-aekansh.streamlit.app/',
        image: '/previews/datacleaning.gif',
        desc: 'A powerful web-based utility designed to automate data preprocessing, enabling users to clean, transform, and analyze datasets without writing a single line of code.',
        bullets: [
            'Built a responsive web app using Streamlit and Pandas for real-time data manipulation.',
            'Implemented "Smart Clean" features including duplicate removal, missing value handling, and column formatting.',
            'Enabled instant file export, allowing users to download cleaned datasets as CSV files seamlessly.',
        ],
        metrics: [
            { val: 'Python', label: 'Engine' },
            { val: 'Streamlit', label: 'Framework' },
            { val: 'No-Code', label: 'User Focus' },
        ],
    },
    {
        title: 'Streaming Platform Netflix Analytics System',
        tags: ['SQL', 'Data Analysis', 'Netflix'],
        accent: 'accent-purple',
        link: 'https://github.com/aekanshkhandelwal/Netflix_Movie_Show_Analysis_Using_SQL',
        image: '/previews/Netflix.gif',
        desc: 'Developed an analytics system for streaming platforms to track user engagement, ratings, and content popularity.',
        bullets: [
            'Revealed user engagement trends and genre preferences using 15+ optimized SQL queries.',
            'Identified high-impact content categories for data-backed strategy recommendations.',
        ],
        metrics: [
            { val: '10K+', label: 'Records' },
            { val: '15+', label: 'SQL Queries' },
            { val: '40%', label: 'Insight Boost' },
        ],
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
        metrics: [
            { val: 'ML', label: 'Supervised' },
            { val: 'AI', label: 'Detection' },
        ],
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
        metrics: [
            { val: '8.82bn', label: 'Total Sales' },
            { val: '30Y', label: 'Time Span' },
            { val: 'Power BI', label: 'Visualization' },
        ],
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
        metrics: [
            { val: 'ML', label: 'Recommended' },
            { val: 'UX', label: 'Engagement' },
        ],
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
        metrics: [
            { val: '2', label: 'Users' },
            { val: 'Python', label: 'Prototype' },
        ],
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
        metrics: [
            { val: 'DB', label: 'Management' },
            { val: 'UI', label: 'Multi-role' },
        ],
    },
];

export default function Projects() {
    const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'swipe'
    useReveal([viewMode]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    const nextProject = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <section className={`section projects-section view-${viewMode}`} id="projects">
            <div className="container">
                <div className="section-header reveal">
                    <div className="header-content">
                        <h2 className="section-title">
                            Featured <span className="gradient-text">Projects</span>
                        </h2>
                        <div className="view-switcher">
                            <button
                                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                aria-label="Grid View"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                                </svg>
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                aria-label="List View"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                                    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                                </svg>
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'swipe' ? 'active' : ''}`}
                                onClick={() => setViewMode('swipe')}
                                aria-label="Swipe View"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <path d="M7 12h10M7 8h10M7 16h10" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`projects-container ${viewMode}-view spotlight-parent`}>
                    {viewMode === 'swipe' ? (
                        <div className="swipe-wrapper">
                            <button className="swipe-nav prev" onClick={prevProject} aria-label="Previous Project">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>

                            <div className="swipe-card-container">
                                {projects.map((project, idx) => (
                                    <div
                                        className={`swipe-card-item ${idx === currentIndex ? 'active' : ''} ${idx < currentIndex ? 'prev' : ''} ${idx > currentIndex ? 'next' : ''}`}
                                        key={idx}
                                        onMouseMove={handleMouseMove}
                                    >
                                        <div className="reveal visible">
                                            {project.link ? (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-wrapper">
                                                    <ProjectCard project={project} />
                                                </a>
                                            ) : (
                                                <ProjectCard project={project} />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="swipe-nav next" onClick={nextProject} aria-label="Next Project">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>

                            <div className="swipe-dots">
                                {projects.map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`swipe-dot ${idx === currentIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentIndex(idx)}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className={viewMode === 'grid' ? 'projects-grid' : 'projects-list'}>
                            {projects.map((project, idx) => (
                                <div
                                    className="reveal"
                                    key={idx}
                                    onMouseMove={handleMouseMove}
                                >
                                    {project.link ? (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-wrapper">
                                            <ProjectCard project={project} />
                                        </a>
                                    ) : (
                                        <ProjectCard project={project} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

// Sub-component for the card content to keep Projects.jsx clean
function ProjectCard({ project }) {
    return (
        <div className={`project-card ${project.accent}`}>
            <div className="card-glow"></div>
            <div className="pc-preview">
                <div className="preview-overlay">
                    <span className="preview-text">View Project <span>↗</span></span>
                </div>
                <div className="preview-visual">
                    {project.image ? (
                        <img src={project.image} alt={project.title} className="pc-image" />
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
                </div>
            </div>
        </div>
    );
}
