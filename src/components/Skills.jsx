import { useState, cloneElement } from 'react';
import { Cpu, BarChart3, Binary, Zap, ArrowRight, Layers } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import './Skills.css';

/* ── Data ─────────────────────────────────────────────── */
const skillGroups = [
    {
        title: 'Data Science & AI',
        icon: '🤖',
        skills: [
            { name: 'Machine Learning', icon: '🧠', featured: true },
            { name: 'CTGAN Architecture', icon: '🧬', featured: true },
            { name: 'VGM Normalization', icon: '📊' },
            { name: 'Supervised Learning', icon: '🎯' },
            { name: 'Predictive Modeling', icon: '🔮', featured: true },
            { name: 'Fraud Detection AI', icon: '🕵️' },
            { name: 'Data Augmentation', icon: '📈' },
        ],
    },
    {
        title: 'Dashboarding & Visuals',
        icon: '📊',
        skills: [
            { name: 'Power BI', icon: '📊', featured: true },
            { name: 'Tableau', icon: '📈', featured: true },
            { name: 'Advanced SQL Querying', icon: '🗄️', featured: true },
            { name: 'KPI Monitoring', icon: '💡' },
            { name: 'Data Storytelling', icon: '📖' },
            { name: 'Excel (VBA/Macros)', icon: '📅' },
            { name: 'Business Analytics', icon: '🏢' },
        ],
    },
    {
        title: 'Core Engineering',
        icon: '💻',
        skills: [
            { name: 'Python', icon: '🐍', featured: true },
            { name: 'MongoDB', icon: '🍃', featured: true },
            { name: 'React.js', icon: '⚛️', featured: true },
            { name: 'C / C++ (OOPS)', icon: '⚡' },
            { name: 'REST & Gmail APIs', icon: '🌐' },
            { name: 'Node.js', icon: '🟢' },
            { name: 'JWT & OAuth', icon: '🔐' },
        ],
    },
    {
        title: 'Modern Ecosystem',
        icon: '⚒️',
        skills: [
            { name: 'n8n Automation', icon: '🔗', featured: true },
            { name: 'Groq LLM Integration', icon: '🧠', featured: true },
            { name: 'Streamlit Framework', icon: '🌊', featured: true },
            { name: 'Pandas & NumPy', icon: '🐼' },
            { name: 'Data Preprocessing', icon: '🧹' },
            { name: 'Git & Version Control', icon: '🗂️' },
            { name: 'Vercel Deployment', icon: '🚀' },
        ],
    },
];

const comicSections = [
    {
        id: 'PANEL 01',
        category: 'DATA SCIENCE & AI',
        icon: <Cpu />,
        title: 'THE INTELLIGENCE CORE',
        skills: [
            'Machine Learning', 'CTGAN Architecture', 'VGM Normalization',
            'Supervised Learning', 'Predictive Modeling', 'Fraud Detection AI',
            'Data Augmentation', 'Neural Networks',
        ],
        actionWord: 'COMPUTING!',
        colSpan: 'col-7',
        rotation: 'rot-neg',
    },
    {
        id: 'PANEL 02',
        category: 'VISUALS',
        icon: <BarChart3 />,
        title: 'DATA NARRATIVE',
        skills: [
            'Power BI', 'Tableau', 'Advanced SQL', 'KPI Monitoring',
            'Data Storytelling', 'Excel (VBA)', 'Analytics', 'UX Design',
        ],
        actionWord: 'RENDER!',
        colSpan: 'col-5',
        rotation: 'rot-pos',
    },
    {
        id: 'PANEL 03',
        category: 'ENGINEERING',
        icon: <Binary />,
        title: 'SYSTEM ARCHITECTURE',
        skills: [
            'Python', 'MongoDB', 'React.js', 'C / C++',
            'REST APIs', 'Node.js', 'JWT & OAuth', 'System Design',
        ],
        actionWord: 'EXECUTE!',
        colSpan: 'col-5',
        rotation: 'rot-neg',
    },
    {
        id: 'PANEL 04',
        category: 'ECOSYSTEM',
        icon: <Zap />,
        title: 'FUTURE AUTOMATION',
        skills: [
            'n8n Automation', 'Groq LLM', 'Streamlit', 'Pandas & NumPy',
            'Data Preprocessing', 'Git & GitHub', 'Vercel Deploy', 'Cloud Arch',
        ],
        actionWord: 'BOOM!',
        colSpan: 'col-7',
        rotation: 'rot-pos',
    },
];

/* ── Component ─────────────────────────────────────────── */
const Skills = () => {
    const [viewMode, setViewMode] = useState('landscape');
    const [activeFileIdx, setActiveFileIdx] = useState(0);
    useReveal([viewMode]);

    /* ────── Landscape View ────── */
    const renderLandscapeContent = () => (
        <>
            <div className="graph-axis axis-x" />
            <div className="graph-axis axis-y" />
            <div className="graph-origin" />
            <div className="skills-quadrants-grid">
                {skillGroups.map((group, qIdx) => (
                    <div className={`skill-quadrant q-${qIdx + 1}`} key={qIdx}>
                        <div className="quadrant-info">
                            <span className="q-icon" aria-hidden="true">{group.icon}</span>
                            <h3 className="q-title">{group.title}</h3>
                        </div>
                        <div className="bubble-arena">
                            {group.skills.map((skill, sIdx) => (
                                <div
                                    className={`skill-bubble ${skill.featured ? 'is-featured' : ''}`}
                                    key={sIdx}
                                    style={{
                                        '--float-delay': `${sIdx * 0.2}s`,
                                        '--float-duration': `${12 + (sIdx % 4)}s`,
                                        '--color-idx': sIdx + qIdx * 7,
                                        '--tx': `${(Math.random() - 0.5) * 40}px`,
                                        '--ty': `${(Math.random() - 0.5) * 40}px`,
                                        '--reveal-delay': `${sIdx * 0.1}s`,
                                    }}
                                >
                                    <span className="b-icon" aria-hidden="true">{skill.icon}</span>
                                    <span className="b-name">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    /* ────── IDE View ────── */
    const renderIdeContent = () => {
        const activeGroup = skillGroups[activeFileIdx];
        return (
            <div className="ide-container">
                <div className="ide-header">
                    <div className="ide-dots">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                    </div>
                    <div className="ide-tab">
                        {activeGroup.title.replace(/\s+/g, '')}.json
                    </div>
                </div>

                <div className="ide-body">
                    <div className="ide-sidebar">
                        <div className="sidebar-group-label">PROJECT EXPLORER</div>
                        {skillGroups.map((group, i) => (
                            <div
                                key={i}
                                className={`side-item ${activeFileIdx === i ? 'active' : ''}`}
                                onClick={() => { setViewMode('ide'); setActiveFileIdx(i); }}
                            >
                                <span className="side-icon">{group.icon}</span>
                                <span className="side-label">{group.title.replace(/\s+/g, '')}.json</span>
                            </div>
                        ))}
                    </div>

                    <div className="ide-main">
                        <div className="ide-content">
                            <div className="ide-breadcrumbs">
                                <span className="folder-icon">📂</span>
                                <span className="path">src</span>
                                <span className="sep">/</span>
                                <span className="path">skills</span>
                                <span className="sep">/</span>
                                <span className="path active-file">
                                    {activeGroup.title.replace(/\s+/g, '')}.json
                                </span>
                            </div>
                            <div className="code-editor-area">
                                <div className="line-numbers">
                                    {[...Array(20)].map((_, i) => <span key={i}>{i + 1}</span>)}
                                </div>
                                <pre className="code-block">
                                    <code>
                                        <span className="syntax-keyword">const</span>{' '}
                                        <span className="syntax-variable">
                                            {activeGroup.title.replace(/\s+/g, '')}
                                        </span>{' '}= {'{'}<br />
                                        <div className="code-line">
                                            &nbsp;&nbsp;<span className="syntax-property">"skills"</span>: [<br />
                                            {activeGroup.skills.map((skill, sIdx) => (
                                                <div key={sIdx} className="code-line-nested">
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="syntax-string">"{skill.name}"</span>
                                                    {sIdx < activeGroup.skills.length - 1 ? ',' : ''}
                                                </div>
                                            ))}<br />
                                            &nbsp;&nbsp;]<br />
                                        </div>
                                        {'}'};
                                    </code>
                                </pre>
                            </div>
                        </div>

                        <div className="ide-terminal">
                            <div className="terminal-header">
                                <div className="terminal-tabs">
                                    <span className="t-tab active">TERMINAL</span>
                                    <span className="t-tab">OUTPUT</span>
                                    <span className="t-tab">DEBUG CONSOLE</span>
                                </div>
                                <div className="terminal-actions">
                                    <span className="action-ic">×</span>
                                </div>
                            </div>
                            <div className="terminal-body">
                                <div className="t-line">
                                    <span className="t-prompt">aekansh@portfolio</span>
                                    :<span className="t-path">~/skills</span>$
                                    <span className="t-cmd"> cat {activeGroup.title.replace(/\s+/g, '')}.json</span>
                                </div>
                                <div className="t-line t-output">
                                    {activeFileIdx === 0 && '> Scanning Data Science libraries... CTGAN initialized.'}
                                    {activeFileIdx === 1 && '> Fetching visualization modules... PowerBI connected.'}
                                    {activeFileIdx === 2 && '> Python 3.10.12 detected. All core modules ready.'}
                                    {activeFileIdx === 3 && '> n8n & Groq integrations verified. Automations active.'}
                                </div>
                                <div className="t-line">
                                    <span className="t-prompt">aekansh@portfolio</span>
                                    :<span className="t-path">~/skills</span>$&nbsp;
                                    <span className="t-cursor">_</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ide-footer">
                    <div className="footer-left">
                        <span>Ln 1, Col 1</span>
                        <span>Spaces: 4</span>
                        <span>UTF-8</span>
                    </div>
                    <div className="footer-right">
                        <span>JavaScript ES6 &nbsp;&nbsp; Go live &nbsp;&nbsp; Prettier ✔</span>
                    </div>
                </div>
            </div>
        );
    };

    /* ────── Magazine View ────── */
    const renderMagazineContent = () => (
        <div className="magazine-layout">
            <div className="mag-masthead">
                <span className="vol">VOL. 01</span>
                <span className="iss">ISSUE 04</span>
                <span className="date">Q1 2026</span>
            </div>
            <div className="mag-header">
                <h2 className="line-1">TECHNICAL</h2>
                <h2 className="line-2">SKILLS</h2>
            </div>
            <div className="mag-grid">
                {skillGroups.map((group, i) => (
                    <div key={i} className={`mag-article item-${i}`}>
                        <div className="mag-category">{group.title}</div>
                        <div className="mag-skills-list">
                            {group.skills.map((skill, j) => (
                                <span key={j} className={`mag-skill ${skill.featured ? 'bold' : ''}`}>
                                    {skill.name}{j < group.skills.length - 1 ? ' • ' : ''}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mag-footer-note">
                * ALL SKILLS VERIFIED VIA CORE ENGINEERING STACK
            </div>
        </div>
    );

    /* ────── Comic View ────── */
    const renderComicContent = () => (
        <div className="comic-layout">
            <main className="comic-grid">
                {comicSections.map((section, idx) => (
                    <div
                        key={idx}
                        className={`comic-panel-wrapper ${section.colSpan} ${section.rotation}`}
                    >
                        <div className="comic-panel-internal">
                            {/* Starburst callout */}
                            <div className="action-burst">
                                <div className="burst-container">
                                    <svg width="110" height="110" viewBox="0 0 100 100">
                                        <path
                                            fill="white" stroke="black" strokeWidth="3"
                                            d="M50 5 L61 35 L93 28 L74 52 L93 72 L61 65 L50 95 L39 65 L7 72 L26 52 L7 28 L39 35 Z"
                                        />
                                    </svg>
                                    <span className="burst-text">{section.actionWord}</span>
                                </div>
                            </div>

                            {/* Main content */}
                            <div className="panel-content">
                                <div className="speed-lines" />

                                <div className="panel-header">
                                    <div className="panel-tag">
                                        <div className="tag-dot" />
                                        {section.category}
                                    </div>
                                    <div className="panel-id-badge">{section.id}</div>
                                </div>

                                <h3 className="panel-title-text">{section.title}</h3>

                                <div className="skill-grid-comic">
                                    {section.skills.map((skill, sIdx) => (
                                        <div key={sIdx} className="skill-item-comic">
                                            <div className="skill-bullet-comic" />
                                            <span className="skill-name-comic">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Breakout icon */}
                            <div className="breakout-icon">
                                <div className="icon-wrapper">
                                    {cloneElement(section.icon, { className: 'lucide-icon-comic' })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            {/* Footer */}
            <footer className="comic-footer">
                <div className="footer-status-panel">
                    <div className="status-flex-container">
                        <div className="status-icon-box">
                            <Layers className="lucide-icon-status" />
                        </div>
                        <div className="status-text-box">
                            <h4 className="status-title">Status: Active</h4>
                            <p className="status-subtitle">Mission Ready // Vol. 01</p>
                        </div>
                    </div>
                </div>

                <div className="footer-actions-panel">
                    {['ANALYZE', 'BUILD', 'DEPLOY', 'REPEAT'].map(word => (
                        <button key={word} className="comic-action-btn">{word}</button>
                    ))}
                </div>

                <a href="#contact" className="footer-connect-panel">
                    <span className="connect-text">CONNECT</span>
                    <ArrowRight className="lucide-icon-connect" />
                </a>
            </footer>
        </div>
    );

    /* ────── Render ────── */
    const views = [
        { id: 'landscape', title: 'Landscape', icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 4a6 6 0 1 1 0 12A6 6 0 0 1 12 6zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
        { id: 'ide', title: 'IDE', icon: 'M7 8l-4 4 4 4M17 8l4 4-4 4M13 4l-2 16' },
        { id: 'magazine', title: 'Magazine', icon: 'M4 4h16v16H4zM9 4v16M4 9h16' },
        { id: 'comic', title: 'Comic', icon: 'M4 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM14 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z' },
    ];

    return (
        <section className={`skills-section ${viewMode}-mode`} id="skills">
            <div className="skills-graph-grid" />

            <div className="container">
                {/* Header + switcher */}
                <div className="section-header reveal">
                    <div className="header-content">
                        <h2 className="section-title">
                            Technical <span className="gradient-text">Landscape</span>
                        </h2>
                        <div className="view-switcher">
                            {views.map(v => (
                                <button
                                    key={v.id}
                                    className={`view-btn ${viewMode === v.id ? 'active' : ''}`}
                                    onClick={() => setViewMode(v.id)}
                                    title={v.title}
                                >
                                    <svg
                                        width="20" height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d={v.icon} />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Viewport */}
                <div className={`skills-viewport reveal view-${viewMode}`}>
                    {viewMode === 'landscape' && renderLandscapeContent()}
                    {viewMode === 'ide' && renderIdeContent()}
                    {viewMode === 'magazine' && renderMagazineContent()}
                    {viewMode === 'comic' && renderComicContent()}
                </div>
            </div>
        </section>
    );
};

export default Skills;
