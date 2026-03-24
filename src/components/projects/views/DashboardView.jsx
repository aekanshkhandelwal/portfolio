import React, { useState, useMemo, memo, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Activity, Binary, ExternalLink, Sparkles } from 'lucide-react';
import './DashboardView.css';

// ── Memoized Ambient Glows for Deep Environmental Light ──
const AmbientGlows = memo(({ springX, springY }) => {
    const leftX = useTransform(springX, [-1, 1], [-150, 50]);
    const leftY = useTransform(springY, [-1, 1], [-50, 150]);
    const rightX = useTransform(springX, [-1, 1], [50, -150]);
    const rightY = useTransform(springY, [-1, 1], [150, -50]);

    return (
        <>
            <motion.div className="ambient-glow" style={{ left: '-10%', top: '-10%', x: leftX, y: leftY }} />
            <motion.div className="ambient-glow" style={{ right: '-10%', bottom: '-10%', x: rightX, y: rightY }} />
        </>
    );
});

// ── Memoized decorative background ──
const NodeBackground = memo(() => {
    const nodes = useMemo(() => Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        size: 0.1 + Math.random() * 0.2
    })), []);

    return (
        <div className="quantum-bg-canvas">
            <div className="quantum-mesh" />
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect width="100" height="100" fill="transparent" />
                {nodes.map((node) => (
                    <motion.circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r={node.size}
                        fill="var(--q-primary)"
                        animate={{
                            opacity: [0.05, 0.15, 0.05],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: node.delay }}
                    />
                ))}
            </svg>
        </div>
    );
});

const DashboardView = ({ projects = [], dashboardActiveIdx = 0, setDashboardActiveIdx }) => {
    const [viewportWidth, setViewportWidth] = useState(() => {
        if (typeof window === 'undefined') return 1440;
        return window.innerWidth;
    });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 40, stiffness: 150 });
    const springY = useSpring(mouseY, { damping: 40, stiffness: 150 });

    // Parallax transformations
    const leftX = useTransform(springX, [-1, 1], [-30, 30]);
    const rightX = useTransform(springX, [-1, 1], [30, -30]);
    const coreX = useTransform(springX, [-1, 1], [-15, 15]);
    const coreY = useTransform(springY, [-1, 1], [-15, 15]);

    const currentProject = useMemo(() => {
        return projects[dashboardActiveIdx] || projects[0] || null;
    }, [projects, dashboardActiveIdx]);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const handleResize = () => setViewportWidth(window.innerWidth);
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isTablet = viewportWidth <= 1200;
    const isMobile = viewportWidth <= 900;
    const isPhone = viewportWidth <= 640;

    const themeClass = useMemo(() => {
        if (!currentProject) return 'theme-teal';
        const accent = currentProject.accent || '';
        if (accent.includes('teal')) return 'theme-teal';
        if (accent.includes('blue')) return 'theme-blue';
        if (accent.includes('purple')) return 'theme-purple';
        if (accent.includes('amber') || accent.includes('orange')) return 'theme-orange';
        return 'theme-teal';
    }, [currentProject]);

    const orbitalItems = useMemo(() => {
        if (!projects.length) return [];
        const radius = isPhone ? 118 : isMobile ? 142 : isTablet ? 176 : 220;
        return projects.map((proj, idx) => {
            const angle = (idx / projects.length) * Math.PI * 2;
            return {
                id: idx,
                icon: proj.icon,
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius
            };
        });
    }, [projects, isTablet, isMobile, isPhone]);

    const coreSize = useMemo(() => {
        if (viewportWidth <= 480) return 188;
        if (viewportWidth <= 640) return 224;
        if (viewportWidth <= 900) return 252;
        if (viewportWidth <= 1200) return 286;
        return 320;
    }, [viewportWidth]);

    const mobileLabel = (title) => {
        const words = (title || '').split(' ').filter(Boolean);
        return words.slice(0, 2).join(' ') || title;
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x * 2);
        mouseY.set(y * 2);
    };

    if (!currentProject) return <div className="quantum-dashboard" />;

    return (
        <div className={`quantum-dashboard ${themeClass}`} onMouseMove={handleMouseMove}>
            <div className="quantum-grid-overlay" />
            <AmbientGlows springX={springX} springY={springY} />
            <NodeBackground />

            {/* ── Central Hub ── */}
            <div className="core-container">
                <motion.div
                    className="project-core"
                    style={{ width: coreSize, height: coreSize, x: coreX, y: coreY }}
                >
                    <motion.div
                        className="w-full h-full relative"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="core-aura" style={{ pointerEvents: 'none' }} />
                        <div className="core-orb" style={{ pointerEvents: 'none' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentProject.title}
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.1, y: -10 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex flex-col items-center justify-center p-10 text-center"
                                    style={{ rotate: -360 }}
                                >
                                    <div className="text-6xl mb-6 text-white drop-shadow-[0_0_15px_var(--q-primary-glow)]">
                                        {currentProject.icon}
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-tight max-w-[240px]">
                                        {currentProject.title}
                                    </h3>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="orbital-nav" style={{ pointerEvents: 'none' }}>
                            {orbitalItems.map((item) => (
                                <motion.div
                                    key={`orbital-${item.id}`}
                                    className="orbital-item"
                                    style={{
                                        x: item.x,
                                        y: item.y,
                                        rotate: -360,
                                        pointerEvents: 'auto'
                                    }}
                                >
                                    <div
                                        className={`nav-node ${dashboardActiveIdx === item.id ? 'active' : ''}`}
                                        onClick={() => setDashboardActiveIdx(item.id)}
                                    >
                                        {item.icon}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* ── HUD Layer ── */}
            <div className="quantum-hud">
                <div className="hud-column left">
                    <motion.div
                        className="hud-panel"
                        style={{ x: leftX }}
                    >
                        <div className="panel-label"><Activity size={14} /> telemetry.sys</div>
                        <h2 className="panel-title">{currentProject.title}</h2>
                        <p className="text-sm opacity-50 mb-6 line-clamp-4 leading-relaxed">
                            {currentProject.details || currentProject.desc}
                        </p>
                        <div className="viz-container">
                            <svg className="spectral-svg" viewBox="0 0 100 20">
                                <polyline
                                    fill="none" stroke="var(--q-primary)" strokeWidth="2"
                                    points="0,12 10,8 20,15 30,5 40,12 50,2 60,18 70,5 80,15 90,8 100,12"
                                    opacity="0.8"
                                />
                            </svg>
                        </div>
                    </motion.div>
                </div>

                <div className="hud-column center" />

                <div className="hud-column right">
                    <motion.div
                        className="hud-panel"
                        style={{ x: rightX }}
                    >
                        <div className="panel-label"><Binary size={14} /> stack.data</div>
                        <div className="metrics-grid">
                            {(currentProject.tags || []).slice(0, 4).map((tag) => (
                                <div key={tag} className="metric-item">
                                    <div className="radial-container">
                                        <svg width="64" height="64"><circle className="circle-bg" cx="32" cy="32" r="28" /></svg>
                                        <div className="radial-label text-[10px] font-bold">{tag.substring(0, 3).toUpperCase()}</div>
                                    </div>
                                    <span className="metric-name text-[9px]">{tag}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8">
                            <a href={currentProject.link} target="_blank" rel="noreferrer"
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 active:scale-95">
                                <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Initialize Connection</span>
                                <ExternalLink size={14} className="text-primary" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="mobile-dashboard-shell">
                <div className="mobile-dashboard-panel">
                    <div className="panel-label"><Activity size={13} /> telemetry.sys</div>
                    <h2 className="mobile-dashboard-title">{currentProject.title}</h2>
                    <p className="mobile-dashboard-copy">
                        {currentProject.details || currentProject.desc}
                    </p>
                </div>

                <div className="mobile-dashboard-panel">
                    <div className="panel-label"><Binary size={13} /> stack.data</div>
                    <div className="mobile-tag-grid">
                        {(currentProject.tags || []).slice(0, 6).map((tag) => (
                            <div key={tag} className="mobile-tag-chip">
                                <span>{tag}</span>
                            </div>
                        ))}
                    </div>
                    <a
                        href={currentProject.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mobile-dashboard-link"
                    >
                        <span>Initialize Connection</span>
                        <ExternalLink size={14} className="text-primary" />
                    </a>
                </div>

                <div className="mobile-dashboard-nav">
                    {projects.map((project, idx) => (
                        <button
                            key={`mobile-project-${project.title}-${idx}`}
                            type="button"
                            className={`mobile-nav-chip ${dashboardActiveIdx === idx ? 'active' : ''}`}
                            onClick={() => setDashboardActiveIdx(idx)}
                        >
                            <span className="mobile-nav-icon">{project.icon}</span>
                            <span className="mobile-nav-label">{mobileLabel(project.title)}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="system-footer">
                <div className="status-badge">
                    <Sparkles size={12} className="text-primary" />
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-40">QUANTUM LINK STABLE</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
