import React, { cloneElement, useState, useEffect } from 'react';
import { ExternalLink, Radio, Binary, Box, Shield, Zap, Activity } from 'lucide-react';
import './HudView.css';

const HudView = ({
    filteredProjects,
    currentIndex,
    setCurrentIndex
}) => {
    const [viewportWidth, setViewportWidth] = useState(() => {
        if (typeof window === 'undefined') return 1440;
        return window.innerWidth;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const handleResize = () => setViewportWidth(window.innerWidth);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = viewportWidth <= 900;

    if (!filteredProjects.length) return null;

    const safeIndex = Math.min(currentIndex, filteredProjects.length - 1);
    const active = filteredProjects[safeIndex];

    const mobileLabel = (title) => {
        const words = (title || '').split(' ').filter(Boolean);
        return words.slice(0, 2).join(' ') || title;
    };

    const accentHexMap = {
        'accent-teal': '#2dd4bf',
        'accent-blue': '#60a5fa',
        'accent-purple': '#a78bfa',
    };

    const accentRgbMap = {
        'accent-teal': '45, 212, 191',
        'accent-blue': '96, 165, 250',
        'accent-purple': '167, 139, 250',
    };

    const accentHex = accentHexMap[active.accent] || '#8b5cf6';
    const accentRgb = accentRgbMap[active.accent] || '139, 92, 246';

    // Dynamic stats based on project complexity
    const efficiency = (92 + (safeIndex * 3) % 7).toFixed(1);
    const missionId = `MISSION_LOG_V${24 + (safeIndex % 3)}.${safeIndex + 1}`;

    return (
        <div
            className="hud-view-container"
            style={{
                '--hud-accent': accentHex,
                '--hud-accent-rgb': accentRgb
            }}
        >
            {/* Background HUD Layers */}
            <div className="hud-bg-grid" />
            <div className="hud-bg-scanlines" />

            {/* Main Command Console Layout */}
            <div className="hud-console-layout">

                {/* LEFT: MISSION SELECTION COLUMN */}
                <aside className="hud-aside selection-col">
                    <div className="hud-mission-log-header">
                        {missionId}
                    </div>
                    <div className="hud-mission-list">
                        {filteredProjects.map((proj, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`hud-mission-btn ${safeIndex === idx ? 'active' : ''}`}
                            >
                                {safeIndex === idx && <div className="hud-active-pulse" />}
                                <h3 className="hud-mission-title">
                                    {proj.title}
                                </h3>
                                <div className="hud-mission-id">
                                    Mission_{idx < 9 ? `0${idx + 1}` : idx + 1}
                                </div>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* CENTER: MISSION BRIEFING PANEL */}
                <main className="hud-main-briefing">
                    <div className="hud-briefing-window">
                        {/* Briefing Textures */}
                        <div className="hud-texture-top-right" />
                        <div className="hud-glow-line-bottom" />

                        {/* Header Area */}
                        <div className="hud-briefing-header">
                            <div className="hud-header-info">
                                <h2 className="hud-glitch-title">BRIEFING</h2>
                                <p className="hud-subtitle">Tactical Blueprint</p>
                            </div>
                            <div className="hud-icon-box">
                                {active.icon && cloneElement(active.icon, { className: "hud-icon" })}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="hud-briefing-content">
                            <div className="flex flex-col gap-6">
                                <div className="hud-project-info flex-1">
                                    <div className="hud-tag-cloud">
                                        {active.tags.map(tag => (
                                            <span key={tag} className="hud-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <h4 className="hud-active-title">
                                        {active.title}
                                    </h4>
                                    <div className="hud-desc-container">
                                        <p className="hud-desc">
                                            {active.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Large Stat Callouts */}
                            <div className="hud-metrics-grid">
                                {active.metrics.map((m, i) => (
                                    <div key={i} className="hud-metric-box">
                                        <div className="hud-metric-id">Stat_{i + 1}</div>
                                        <p className="hud-metric-label">{m.label}</p>
                                        <p className="hud-metric-val">{m.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Launch Action */}
                        <a
                            href={active.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hud-launch-btn"
                        >
                            INITIALIZE_{active.action || 'LAUNCH'} <ExternalLink size={24} />
                        </a>
                    </div>
                </main>

                {/* RIGHT: SYSTEM LOGS & PROJECT TELEMETRY */}
                <aside className="hud-aside telemetry-col">
                    {/* Status HUD */}
                    <div className="hud-status-panel">
                        <div className="hud-status-header">
                            <div className="hud-status-icon-box">
                                <Radio className="hud-radio-icon" />
                            </div>
                            <div className="hud-status-text">
                                <p className="hud-small-cap">System Status</p>
                                <p className="hud-status-val">Operational</p>
                            </div>
                        </div>

                        <div className="hud-efficiency-module">
                            <p className="hud-small-cap tracking-widest">Global Efficiency</p>
                            <div className="hud-progress-track">
                                <div className="hud-progress-fill" style={{ width: `${efficiency}%` }} />
                            </div>
                            <div className="hud-progress-labels">
                                <span>0%</span>
                                <span>DATA_STREAM_STABLE</span>
                                <span>{efficiency}%</span>
                            </div>
                        </div>
                    </div>

                    {/* PROJECT RESOURCES TELEMETRY */}
                    <div className="hud-telemetry-panel">
                        <div className="hud-telemetry-bg-effect" />

                        <h4 className="hud-telemetry-header">
                            <Binary size={12} /> Tech Stack Payload
                        </h4>

                        <div className="hud-resource-list scrollbar-hide" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {active.tags.map((tag, i) => (
                                <div key={tag} className="hud-resource-item">
                                    <div className="hud-resource-info">
                                        <span className="hud-resource-name">
                                            {tag}
                                        </span>
                                        <span className="hud-resource-hex">
                                            0x0{i + 1}_LOADED
                                        </span>
                                    </div>
                                    <div className="hud-resource-bar">
                                        <div
                                            className="hud-resource-fill"
                                            style={{ width: `${75 + (Math.sin(i + safeIndex) * 15)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Tactical Footer */}
                            <div className="hud-tactical-footer">
                                <div className="hud-diagnostic-row">
                                    <span>Diagnostic Link</span>
                                    <span style={{ color: accentHex }}>Encrypted</span>
                                </div>
                                <div className="hud-bars-viz">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                        <div
                                            key={i}
                                            className="hud-viz-bar"
                                            style={{
                                                height: `${Math.random() * 12 + 4}px`,
                                                background: i % 2 === 0 ? accentHex : 'rgba(255,255,255,0.1)'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="hud-deco-icon">
                            <Box size={96} />
                        </div>
                    </div>
                </aside>
            </div>

            {/* Comic Branding Footer */}
            <footer className="hud-footer">
                <div className="hud-footer-left">
                    <span>VIRTUAL_SESSION_ID::{(Math.random() * 10000).toFixed(0)}</span>
                </div>
            </footer>
        </div>
    );
};

export default HudView;
