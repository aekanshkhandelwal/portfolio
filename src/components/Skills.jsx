import { useEffect, useMemo, useState } from 'react';
import {
    Brain,
    Cpu,
    Activity,
    BarChart3,
    Binary,
    Zap,
    Layers,
    Network,
    Workflow,
    Code2,
    Globe,
    Rocket,
    Shield,
} from 'lucide-react';
import useReveal from '../hooks/useReveal';
import './Skills.css';

// Import Views
import LandscapeView from './skills/views/LandscapeView';
import MatrixView from './skills/views/MatrixView';
import IdeView from './skills/views/IdeView';
import SuperView from './skills/views/SuperView';

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


const palette = {
    magenta: '#c026d3',
    cyan: '#06b6d4',
    rose: '#f43f5e',
    amber: '#fbbf24',
    emerald: '#10b981',
    indigo: '#6366f1',
};

const pickColor = (idx) => [palette.magenta, palette.cyan, palette.rose, palette.amber, palette.emerald, palette.indigo][idx % 6];

const scoreSkill = (groupIdx, skillIdx, featured) => {
    const seed = groupIdx * 97 + skillIdx * 31;
    const base = 82 + (seed % 12);
    const boost = featured ? 6 : 0;
    return Math.min(99, base + boost);
};

const pickNeuralIcon = (name) => {
    const n = String(name || '').toLowerCase();
    if (n.includes('ctgan')) return <Network size={14} />;
    if (n.includes('vgm')) return <Activity size={14} />;
    if (n.includes('supervised')) return <Shield size={14} />;
    if (n.includes('predict')) return <Zap size={14} />;
    if (n.includes('fraud')) return <Shield size={14} />;
    if (n.includes('augment')) return <Brain size={14} />;
    return <Cpu size={14} />;
};

const pickOrbitIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('n8n') || n.includes('automation')) return <Zap className="w-4 h-4" />;
    if (n.includes('groq') || n.includes('llm')) return <Cpu className="w-4 h-4" />;
    if (n.includes('streamlit')) return <Layers className="w-4 h-4" />;
    if (n.includes('vercel') || n.includes('deploy')) return <Rocket className="w-4 h-4" />;
    if (n.includes('git')) return <Code2 className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
};

/* ── Component ─────────────────────────────────────────── */
const Skills = () => {
    const [viewMode, setViewMode] = useState('landscape');
    const [activeFileIdx, setActiveFileIdx] = useState(0);

    // Matrix view state (only active in viewMode === 'matrix')
    const [activePillar, setActivePillar] = useState(null);
    const [rotation, setRotation] = useState(0);
    useReveal([viewMode]);

    useEffect(() => {
        if (viewMode !== 'matrix') return undefined;

        const orbit = setInterval(() => setRotation(prev => (prev + 0.4) % 360), 30);
        return () => {
            clearInterval(orbit);
        };
    }, [viewMode]);

    const renderContent = () => {
        switch (viewMode) {
            case 'landscape':
                return <LandscapeView skillGroups={skillGroups} />;
            case 'matrix':
                return (
                    <MatrixView 
                        skillGroups={skillGroups}
                        activePillar={activePillar}
                        setActivePillar={setActivePillar}
                        rotation={rotation}
                        palette={palette}
                        scoreSkill={scoreSkill}
                        pickNeuralIcon={pickNeuralIcon}
                        pickOrbitIcon={pickOrbitIcon}
                        pickColor={pickColor}
                    />
                );
            case 'ide':
                return (
                    <IdeView 
                        skillGroups={skillGroups}
                        activeFileIdx={activeFileIdx}
                        setActiveFileIdx={setActiveFileIdx}
                        setViewMode={setViewMode}
                    />
                );
            case 'super':
                return <SuperView skillGroups={skillGroups} />;
            default:
                return null;
        }
    };

    const views = [
        { id: 'landscape', title: 'Landscape', icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 4a6 6 0 1 1 0 12A6 6 0 0 1 12 6zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
        { id: 'matrix', title: 'Matrix', icon: 'M4 4h16v16H4zM8 4v16M16 4v16M4 8h16M4 16h16' },
        { id: 'ide', title: 'IDE', icon: 'M7 8l-4 4 4 4M17 8l4 4-4 4M13 4l-2 16' },
        { id: 'super', title: 'Super', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
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
                    {renderContent()}
                </div>
            </div>
        </section>
    );
};

export default Skills;
