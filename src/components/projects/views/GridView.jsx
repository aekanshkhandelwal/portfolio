import React from 'react';
import ProjectCard from '../ProjectCard';
import './GridView.css';

const GridView = ({ 
    filteredProjects, 
    projects, 
    handleOpenWindow, 
    handleMouseMove 
}) => {
    const handleProjectClick = (project, originalIdx) => {
        if (project.link) {
            window.open(project.link, '_blank', 'noopener,noreferrer');
            return;
        }

        handleOpenWindow(originalIdx);
    };

    return (
        <div className="projects-grid">
            {filteredProjects.map((project) => {
                const originalIdx = projects.findIndex(p => p.title === project.title);
                return (
                    <div
                        className="reveal"
                        key={originalIdx}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={(e) => e.currentTarget.classList.add('visible')}
                    >
                        <div className="project-card-wrapper">
                            <div
                                className="project-card-click-area"
                                onClick={() => handleProjectClick(project, originalIdx)}
                            >
                                <ProjectCard project={project} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};


export default GridView;
