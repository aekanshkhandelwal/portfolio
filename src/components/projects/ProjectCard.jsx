import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, isFlipped, onNext }) => {
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
};

export default ProjectCard;
