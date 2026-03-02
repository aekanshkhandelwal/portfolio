import useReveal from '../hooks/useReveal';
import './Skills.css';

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

const Skills = () => {
    useReveal();

    return (
        <section className="skills-section" id="skills">
            <div className="skills-graph-grid"></div>

            <div className="container">
                <div className="section-header reveal">

                    <h2 className="section-title">
                        Technical <span className="gradient-text">Landscape</span>
                    </h2>
                </div>

                <div className="skills-viewport reveal">
                    <div className="graph-axis axis-x"></div>
                    <div className="graph-axis axis-y"></div>
                    <div className="graph-origin"></div>

                    <div className="skills-quadrants-grid">
                        {skillGroups.map((group, qIdx) => (
                            <div className={`skill-quadrant q-${qIdx + 1}`} key={qIdx}>
                                <div className="quadrant-info">
                                    <span className="q-icon">{group.icon}</span>
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
                                                '--color-idx': sIdx + (qIdx * 7),
                                                '--tx': `${(Math.random() - 0.5) * 40}px`,
                                                '--ty': `${(Math.random() - 0.5) * 40}px`,
                                                '--reveal-delay': `${sIdx * 0.22}s`
                                            }}
                                        >
                                            <span className="b-icon">{skill.icon}</span>
                                            <span className="b-name">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
