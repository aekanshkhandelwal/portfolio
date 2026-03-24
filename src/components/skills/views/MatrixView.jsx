import React from 'react';
import { 
    Brain, BarChart3, Code2, Workflow
} from 'lucide-react';
import DataScienceAi from './matrix/DataScienceAi';
import DashboardingVisuals from './matrix/DashboardingVisuals';
import CoreEngineering from './matrix/CoreEngineering';
import ModernEcosystem from './matrix/ModernEcosystem';
import './MatrixView.css';

const MatrixView = ({ 
    activePillar, 
    setActivePillar, 
    palette
}) => {
    const pillars = [
        { 
            id: 'ai', 
            title: 'DATA SCIENCE & AI', 
            subtitle: 'NEURAL NODE', 
            icon: <Brain className="w-5 h-5" />, 
            accent: palette.magenta, 
            glowColor: 'rgba(192,38,211,0.25)',
            Component: DataScienceAi
        },
        { 
            id: 'bi', 
            title: 'DASHBOARDING & VISUALS', 
            subtitle: 'VISUAL LAYER', 
            icon: <BarChart3 className="w-5 h-5" />, 
            accent: palette.cyan, 
            glowColor: 'rgba(6,182,212,0.25)',
            Component: DashboardingVisuals
        },
        { 
            id: 'core', 
            title: 'CORE ENGINEERING', 
            subtitle: 'SYSTEM CORE', 
            icon: <Code2 className="w-5 h-5" />, 
            accent: palette.rose, 
            glowColor: 'rgba(244,63,94,0.25)',
            Component: CoreEngineering
        },
        { 
            id: 'eco', 
            title: 'MODERN ECOSYSTEM', 
            subtitle: 'NETWORK ORBIT', 
            icon: <Workflow className="w-5 h-5" />, 
            accent: palette.amber, 
            glowColor: 'rgba(251,191,36,0.25)',
            Component: ModernEcosystem
        },
    ];

    return (
        <div className="skills-matrix-stage">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
                {pillars.map((pillar) => {
                    const isActive = activePillar === pillar.id;
                    const ActiveComponent = pillar.Component;
                    return (
                        <div
                            key={pillar.id}
                            onMouseEnter={() => setActivePillar(pillar.id)}
                            onMouseLeave={() => setActivePillar(null)}
                            className={`skills-matrix-card ${isActive ? 'is-active' : ''}`}
                            style={{ '--mx-accent': pillar.accent, '--mx-glow': pillar.glowColor }}
                        >
                            <div className="skills-matrix-card-header">
                                <div className="skills-matrix-card-identity">
                                    <div className="skills-matrix-card-icon">
                                        {pillar.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="skills-matrix-card-title">{pillar.title}</h3>
                                        <p className="skills-matrix-card-subtitle">{pillar.subtitle}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="skills-matrix-card-visual">
                                <ActiveComponent />
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default MatrixView;
