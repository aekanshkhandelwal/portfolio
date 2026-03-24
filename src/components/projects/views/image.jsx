import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './image.css';

const FILTERS = ['All', 'AI', 'Full Stack', 'Data Science', 'ML Research', 'Tooling'];

const API_IMAGE_MAP = {
    rag: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=1200',
    linear: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    sendwise: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=1200',
    retail: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=1200',
    ctgan: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200',
    datacleaning: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1200',
    netflix: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=1200',
    spam: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1200',
    videogames: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1200',
    movie: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=1200',
    social: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    library: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200',
};

const CATEGORY_MAP = {
    'Personalized RAG BOT': 'AI',
    'Linear Clone - Project Management Tool': 'Full Stack',
    'SendWise.ai â€” AI Email Command Centre': 'AI',
    'Retail Chain Insights Dashboard': 'Data Science',
    'CTGAN â€” Privacy-Preserving Synthetic Data Generation': 'ML Research',
    'No-Code Data Cleaning Tool': 'Tooling',
    'Streaming Platform Netflix Analytics System': 'Data Science',
    'ML Model for Spam Detection': 'ML Research',
    'Video Games Sales Interactive Dashboard': 'Data Science',
    'Movie Recommender System': 'ML Research',
    'Social Media Platform (Prototype)': 'Full Stack',
    'Library Management System': 'Tooling',
};

const TITLE_OVERRIDES = {
    'Linear Clone - Project Management Tool': 'Linear Workspace Clone',
    'SendWise.ai â€” AI Email Command Centre': 'SendWise.ai',
    'Retail Chain Insights Dashboard': 'Retail Chain Insights',
    'CTGAN â€” Privacy-Preserving Synthetic Data Generation': 'CTGAN Synthesis',
    'No-Code Data Cleaning Tool': 'No-Code Data Scrub',
    'Streaming Platform Netflix Analytics System': 'Netflix Analytics System',
    'ML Model for Spam Detection': 'Spam Detection Model',
    'Video Games Sales Interactive Dashboard': 'Video Games Sales Viz',
    'Movie Recommender System': 'Movie Rec System',
    'Social Media Platform (Prototype)': 'Social Media Platform',
    'Library Management System': 'Library Manager',
};

const SUBTITLE_MAP = {
    AI: 'AI Intelligence',
    'Full Stack': 'Full Stack',
    'Data Science': 'Data Science',
    'ML Research': 'ML Research',
    Tooling: 'Tooling',
};

const ACCENT_MAP = {
    'accent-teal': '#3b82f6',
    'accent-blue': '#7c3aed',
    'accent-purple': '#d946ef',
};

function getCategory(project) {
    if (CATEGORY_MAP[project.title]) return CATEGORY_MAP[project.title];

    const tags = project.tags.map((tag) => tag.toLowerCase());
    if (tags.some((tag) => tag.includes('react') || tag.includes('oauth') || tag.includes('node'))) return 'Full Stack';
    if (tags.some((tag) => tag.includes('power bi') || tag.includes('sql') || tag.includes('analytics'))) return 'Data Science';
    if (tags.some((tag) => tag.includes('machine learning') || tag === 'ml' || tag.includes('ctgan'))) return 'ML Research';
    if (tags.some((tag) => tag.includes('python') || tag.includes('streamlit'))) return 'Tooling';
    return 'AI';
}

function getDisplayTitle(project) {
    return TITLE_OVERRIDES[project.title] || project.title;
}

function getProjectKey(project) {
    const title = project.title.toLowerCase();
    if (title.includes('rag')) return 'rag';
    if (title.includes('linear')) return 'linear';
    if (title.includes('sendwise') || title.includes('email')) return 'sendwise';
    if (title.includes('retail')) return 'retail';
    if (title.includes('ctgan') || title.includes('synthetic')) return 'ctgan';
    if (title.includes('cleaning') || title.includes('scrub')) return 'datacleaning';
    if (title.includes('netflix') || title.includes('streaming')) return 'netflix';
    if (title.includes('spam')) return 'spam';
    if (title.includes('video games') || title.includes('games sales')) return 'videogames';
    if (title.includes('movie recommender') || title.includes('movie rec')) return 'movie';
    if (title.includes('social media')) return 'social';
    if (title.includes('library')) return 'library';
    return null;
}

function getPreviewAsset(project) {
    const projectKey = getProjectKey(project);
    return (projectKey && API_IMAGE_MAP[projectKey]) || null;
}

function GalleryCard({ project }) {
    const accent = ACCENT_MAP[project.accent] || '#60a5fa';
    const category = getCategory(project);
    const previewAsset = getPreviewAsset(project);
    const displayTitle = getDisplayTitle(project);
    const titleWords = displayTitle.split(' ');
    const accentWord = titleWords[titleWords.length - 1];
    const titlePrefix = titleWords.slice(0, -1).join(' ');

    return (
        <article
            className="gallery-card"
            style={{
                '--gallery-accent': accent,
            }}
        >
            <div className="gallery-card__media">
                {previewAsset ? (
                    <img
                        src={previewAsset}
                        alt={displayTitle}
                        className="gallery-card__image"
                        loading="lazy"
                    />
                ) : (
                    <div className="gallery-card__fallback">{displayTitle}</div>
                )}
                <div className="gallery-card__overlay" />
                <div className="gallery-card__shine" />
            </div>

            <div className="gallery-card__content">
                <div className="gallery-card__top">
                    <span className="gallery-card__badge">{SUBTITLE_MAP[category] || category}</span>
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gallery-card__launch"
                        aria-label={`Open ${displayTitle}`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <ArrowUpRight size={20} />
                    </a>
                </div>

                <div className="gallery-card__body">
                    <h3 className="gallery-card__title">
                        {titlePrefix ? <span>{titlePrefix} </span> : null}
                        <span className="gallery-card__title-accent">{accentWord}</span>
                    </h3>
                    <p className="gallery-card__description">{project.desc}</p>
                </div>

                <div className="gallery-card__meta">
                    <div className="gallery-card__tags">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="gallery-card__tag">#{tag}</span>
                        ))}
                    </div>

                    <div className="gallery-card__metrics">
                        {project.metrics?.slice(0, 3).map((metric) => (
                            <span key={metric.label} className="gallery-card__metric">
                                {metric.val} {metric.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function GalleryView({ projects }) {
    const [activeFilter, setActiveFilter] = useState('All');

    const visibleProjects = useMemo(() => {
        if (activeFilter === 'All') return projects;
        return projects.filter((project) => getCategory(project) === activeFilter);
    }, [activeFilter, projects]);

    return (
        <div className="works-gallery">
            <div className="works-gallery__filters" role="tablist" aria-label="Project filters">
                {FILTERS.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        className={`works-gallery__filter ${activeFilter === filter ? 'is-active' : ''}`}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="works-gallery__grid">
                {visibleProjects.map((project) => (
                    <GalleryCard key={project.title} project={project} />
                ))}
            </div>
        </div>
    );
}
