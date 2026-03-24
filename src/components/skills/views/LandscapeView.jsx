import React from 'react';
import './LandscapeView.css';

const LandscapeView = ({ skillGroups }) => {
    return (
        <div className="landscape-view-container">
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
        </div>
    );
};

export default LandscapeView;
