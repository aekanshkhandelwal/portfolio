import { useState, useEffect, useRef } from 'react';
import {
    Monitor, Power, X, Minus, Square,
    Search, Wifi, Volume2, Bell,
    Folder, FileText, Globe, Github,
    Layout, Cpu, Activity, Database,
    Maximize2, Minimize2, ChevronRight, Settings,
    User, Command, Grid, Cloud, Star, Clock,
    Plane, Battery, Sparkles, ArrowUpRight, Plus
} from 'lucide-react';
import './DesktopView.css';
import windowsWallpaper from '../../../assets/projects/windows_wallpaper.png';
import win11Dark from '../../../assets/projects/win11_dark.png';
import win11Sunset from '../../../assets/projects/win11_sunset.png';
import win11Plane1 from '../../../assets/projects/win11_plane_1.png';
import win11Plane2 from '../../../assets/projects/win11_plane_2.png';
import win11Plane3 from '../../../assets/projects/win11_plane_3.png';

const DesktopView = ({ projects, initialProjectIndex, onCloseSelected }) => {
    const wallpapers = [
        { id: 'default', src: windowsWallpaper, name: 'Default' },
        { id: 'dark', src: win11Dark, name: 'Glow Dark' },
        { id: 'sunset', src: win11Sunset, name: 'Sunrise' },
        { id: 'plane1', src: win11Plane1, name: 'Sky Jet' },
        { id: 'plane2', src: win11Plane2, name: 'Vintage' },
        { id: 'plane3', src: win11Plane3, name: 'Aviation' }
    ];

    const [powerOn, setPowerOn] = useState(true);
    const [bootState, setBootState] = useState('on'); // 'off', 'booting', 'welcome', 'on', 'shutting-down'
    const [currentWallpaper, setCurrentWallpaper] = useState(wallpapers[0].src);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isBrowserMaximized, setIsBrowserMaximized] = useState(false);
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [activeWindow, setActiveWindow] = useState(null);
    const [minimizedWindows, setMinimizedWindows] = useState([]);
    const [explorerView, setExplorerView] = useState('files'); // 'files' or 'details'
    const [navigationHistory, setNavigationHistory] = useState(['root']); // Breadcrumb stack
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
    const [runOpen, setRunOpen] = useState(false);
    const [runInput, setRunInput] = useState('');
    const [browserOpen, setBrowserOpen] = useState(false);
    const [browserTabs, setBrowserTabs] = useState([{ id: 'tab1', title: 'Mercury Home', url: 'mercury://home' }]);
    const [activeTabId, setActiveTabId] = useState('tab1');
    const [browserUrl, setBrowserUrl] = useState('mercury://home');
    const [resumeOpen, setResumeOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isCompactViewport, setIsCompactViewport] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth <= 640;
    });

    const [currentTime, setCurrentTime] = useState(new Date());

    // Update clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const mediaQuery = window.matchMedia('(max-width: 640px)');
        const syncCompactViewport = (event) => setIsCompactViewport(event.matches);

        setIsCompactViewport(mediaQuery.matches);

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', syncCompactViewport);
            return () => mediaQuery.removeEventListener('change', syncCompactViewport);
        }

        mediaQuery.addListener(syncCompactViewport);
        return () => mediaQuery.removeListener(syncCompactViewport);
    }, []);

    const getWindowKey = (win) => {
        if (!win) return null;
        if (win === 'browser') return 'browser';
        if (typeof win === 'string') return win;
        if (win.id === 'browser') return 'browser';
        return win.title ? `project:${win.title}` : null;
    };

    const addMinimizedWindow = (win) => {
        const normalizedWindow = win === 'browser' ? { id: 'browser', title: 'Browser' } : win;
        const windowKey = getWindowKey(normalizedWindow);

        if (!windowKey) return;

        setMinimizedWindows((prev) => {
            const withoutWindow = prev.filter((item) => getWindowKey(item) !== windowKey);
            return [...withoutWindow, normalizedWindow];
        });
    };

    const removeMinimizedWindow = (win) => {
        const windowKey = getWindowKey(win);

        if (!windowKey) return;

        setMinimizedWindows((prev) => prev.filter((item) => getWindowKey(item) !== windowKey));
    };

    const handleToggleStartMenu = (e) => {
        e?.stopPropagation?.();
        setStartMenuOpen((prev) => !prev);
        setSearchOpen(false);
        setQuickSettingsOpen(false);
    };

    const handleToggleQuickSettings = (e) => {
        e?.stopPropagation?.();
        setQuickSettingsOpen((prev) => !prev);
        setStartMenuOpen(false);
        setSearchOpen(false);
    };

    // Power Sequence Logic
    const handlePowerToggle = () => {
        if (bootState === 'off') {
            setBootState('booting');
            setPowerOn(true);
            setTimeout(() => setBootState('welcome'), 2000);
            setTimeout(() => setBootState('on'), 4500);
        } else if (bootState === 'on') {
            setBootState('shutting-down');
            setStartMenuOpen(false);
            setSettingsOpen(false);
            setTimeout(() => {
                setBootState('off');
                setPowerOn(false);
            }, 2000);
        }
    };

    const handleShutdown = () => {
        if (bootState === 'on') {
            setBootState('shutting-down');
            setStartMenuOpen(false);
            setSettingsOpen(false);
            setQuickSettingsOpen(false);
            setTimeout(() => {
                setBootState('off');
                setPowerOn(false);
                setActiveWindow(null);
            }, 2000);
        }
    };

    const toggleBrowser = () => {
        if (!browserOpen) {
            setBrowserOpen(true);
            setIsBrowserMaximized(isCompactViewport);
            removeMinimizedWindow('browser');
            setBrowserTabs([{ id: 'tab1', title: 'Mercury Home', url: 'mercury://home' }]);
            setActiveTabId('tab1');
            setBrowserUrl('mercury://home');
        } else {
            setBrowserOpen(false);
            removeMinimizedWindow('browser');
        }
    };

    const addTab = () => {
        const newId = `tab-${Date.now()}`;
        setBrowserTabs([...browserTabs, { id: newId, title: 'New Tab', url: 'mercury://home' }]);
        setActiveTabId(newId);
        setBrowserUrl('mercury://home');
    };

    const closeTab = (e, id) => {
        e.stopPropagation();
        if (browserTabs.length === 1) {
            setBrowserOpen(false);
            removeMinimizedWindow('browser');
            return;
        }
        const newTabs = browserTabs.filter(t => t.id !== id);
        setBrowserTabs(newTabs);
        if (activeTabId === id) {
            const lastTab = newTabs[newTabs.length - 1];
            setActiveTabId(lastTab.id);
            setBrowserUrl(lastTab.url);
        }
    };

    const switchTab = (id) => {
        const tab = browserTabs.find(t => t.id === id);
        setActiveTabId(id);
        if (tab) setBrowserUrl(tab.url || 'mercury://home');
    };

    const updateTabState = (newUrl, newTitle) => {
        setBrowserTabs(prev => prev.map(tab =>
            tab.id === activeTabId ? { ...tab, url: newUrl || tab.url, title: newTitle || tab.title } : tab
        ));
    };

    // Keyboard Shortcuts (Simulated)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.altKey && e.key === 'r') { // Using Alt+R as a browser-safe Win+R alternative
                e.preventDefault();
                setRunOpen(true);
            }
            if (e.key === 'Escape') {
                setStartMenuOpen(false);
                setSearchOpen(false);
                setQuickSettingsOpen(false);
                setRunOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleIconClick = (project) => {
        if (selectedIcon?.title === project.title) {
            // Already selected, let's open
            setActiveWindow(project);
            setExplorerView('files');
            setIsMaximized(isCompactViewport);
            setNavigationHistory(['root', project.title]);
            removeMinimizedWindow(project);
            setStartMenuOpen(false);
            setSearchOpen(false);
        } else {
            setSelectedIcon(project);
        }
    };

    const handleFileClick = (type) => {
        if (selectedFile === type) {
            handleOpenFile(type);
        } else {
            setSelectedFile(type);
        }
    };

    const handleOpenFile = (type) => {
        if (type === 'desc') {
            setExplorerView('details');
            setNavigationHistory(prev => [...prev, 'Description.txt']);
        } else if (type === 'launch') {
            if (activeWindow && activeWindow.link) {
                window.open(activeWindow.link, '_blank');
            }
        }
    };

    const toggleWindow = (win) => {
        if (win.id === 'browser') {
            if (browserOpen) {
                handleMinimize('browser');
            } else {
                setBrowserOpen(true);
                setIsBrowserMaximized((prev) => (isCompactViewport ? true : prev));
                removeMinimizedWindow('browser');
            }
            return;
        }

        if (activeWindow?.title === win.title) {
            // Minimize if active
            setMinimizedWindows(prev => [...new Set([...prev, win])]);
            setActiveWindow(null);
        } else {
            // Restore/Open if not active
            setActiveWindow(win);
            removeMinimizedWindow(win);
            setStartMenuOpen(false);
            setSearchOpen(false);
            setQuickSettingsOpen(false);
        }
    };

    const handleMinimize = (windowType) => {
        if (windowType === 'browser') {
            addMinimizedWindow('browser');
            setBrowserOpen(false);
        } else {
            addMinimizedWindow(windowType);
            setActiveWindow(null);
        }
    };

    const handleBack = () => {
        if (explorerView === 'details') {
            setExplorerView('files');
            setNavigationHistory(prev => prev.slice(0, -1));
            return;
        }

        if (navigationHistory.length > 1) {
            const newHistory = [...navigationHistory];
            newHistory.pop();
            setNavigationHistory(newHistory);

            if (newHistory.length === 1) {
                // Back to root (Desktop/PC view)
                setActiveWindow(null);
            }
        }
    };

    const closeWindow = () => {
        removeMinimizedWindow(activeWindow);
        setActiveWindow(null);
        setExplorerView('files');
        setIsMaximized(false);
        if (onCloseSelected) onCloseSelected();
    };

    // Open initial project if provided
    const hasOpenedInitial = useRef(false);
    useEffect(() => {
        if (initialProjectIndex !== null && initialProjectIndex !== undefined && bootState === 'on' && !hasOpenedInitial.current) {
            handleIconClick(projects[initialProjectIndex]);
            hasOpenedInitial.current = true;
        }
        if (bootState === 'off') {
            hasOpenedInitial.current = false;
        }
    }, [initialProjectIndex, projects, bootState]);

    return (
        <div className="monitor-view-wrapper">
            <div className={`monitor-container ${powerOn ? 'animate-monitor' : ''}`}>
                <div className="monitor-backglow"></div>

                <div className="monitor-frame">
                    <div className="monitor-brand">Aekansh OS</div>

                    <div className="monitor-screen">
                        <div className="screen-reflection"></div>

                        <div className={`screen-content ${powerOn ? 'on' : 'off'}`}>
                            {powerOn ? (
                                <div
                                    className="desktop-env win11 consolidated"
                                    style={{ backgroundImage: `url(${currentWallpaper})` }}
                                    onClick={() => {
                                        setStartMenuOpen(false);
                                        setSearchOpen(false);
                                        setQuickSettingsOpen(false);
                                        setSelectedIcon(null);
                                    }}
                                >

                                    {bootState === 'booting' && (
                                        <div className="os-boot-screen">
                                            <div className="os-boot-logo">
                                                <svg viewBox="0 0 100 100" width="80" height="80">
                                                    <path d="M0 0 H46 V46 H0 Z" fill="#0078d4" />
                                                    <path d="M54 0 H100 V46 H54 Z" fill="#0078d4" />
                                                    <path d="M0 54 H46 V100 H0 Z" fill="#0078d4" />
                                                    <path d="M54 54 H100 V100 H54 Z" fill="#0078d4" />
                                                </svg>
                                            </div>
                                            <div className="os-boot-loader">
                                                <div className="boot-spinner"></div>
                                            </div>
                                        </div>
                                    )}

                                    {bootState === 'welcome' && (
                                        <div className="os-welcome-screen">
                                            <div className="welcome-content">
                                                <div className="welcome-avatar">
                                                    <User size={64} color="white" />
                                                </div>
                                                <h2 className="welcome-user">Aekansh</h2>
                                                <div className="welcome-loading">
                                                    <div className="boot-spinner"></div>
                                                    <span>Welcome</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {bootState === 'shutting-down' && (
                                        <div className="os-shutdown-screen">
                                            <div className="shutdown-content">
                                                <div className="boot-spinner"></div>
                                                <span>Shutting down</span>
                                            </div>
                                        </div>
                                    )}

                                    {bootState === 'on' && (
                                        <>
                                            <div className="os-desktop-workspace">
                                                <div
                                                    className={`os-icon-container ${selectedIcon?.title === 'Edge' ? 'selected' : ''}`}
                                                    onClick={(e) => { e.stopPropagation(); selectedIcon?.title === 'Edge' ? toggleBrowser() : setSelectedIcon({ title: 'Edge' }); }}
                                                >
                                                    <div className="os-icon-visual">
                                                        <Globe size={40} className="text-blue-400" />
                                                    </div>
                                                    <span className="os-icon-label">Microsoft Edge</span>
                                                </div>
                                                {projects.map((project, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`os-icon-container ${selectedIcon?.title === project.title ? 'selected' : ''}`}
                                                        onClick={(e) => { e.stopPropagation(); handleIconClick(project); }}
                                                    >
                                                        <div className="os-icon-visual">
                                                            <Folder className="folder-icon-svg" size={40} />
                                                        </div>
                                                        <span className="os-icon-label">{project.title}</span>
                                                    </div>
                                                ))}
                                                <div
                                                    className={`os-icon-container ${selectedIcon?.title === 'Settings' ? 'selected' : ''}`}
                                                    onClick={(e) => { e.stopPropagation(); selectedIcon?.title === 'Settings' ? setSettingsOpen(true) : setSelectedIcon({ title: 'Settings' }); }}
                                                >
                                                    <div className="os-icon-visual">
                                                        <Settings className="text-zinc-400" size={40} />
                                                    </div>
                                                    <span className="os-icon-label">Settings</span>
                                                </div>
                                                <div
                                                    className={`os-icon-container ${selectedIcon?.title === 'Resume' ? 'selected' : ''}`}
                                                    onClick={(e) => { e.stopPropagation(); selectedIcon?.title === 'Resume' ? setResumeOpen(true) : setSelectedIcon({ title: 'Resume' }); }}
                                                >
                                                    <div className="os-icon-visual">
                                                        <FileText className="pdf-icon" size={40} />
                                                    </div>
                                                    <span className="os-icon-label">Resume.pdf</span>
                                                </div>
                                            </div>

                                            {activeWindow && (
                                                <div className={`os-window-canvas win-mica ${isMaximized ? 'maximized' : ''}`}>
                                                    <div className="os-window-header" onDoubleClick={() => setIsMaximized(!isMaximized)}>
                                                        <div className="os-window-title-area">
                                                            <Folder size={14} className="folder-icon-svg" />
                                                            <span className="os-window-title text-xs font-medium opacity-80">{activeWindow.title}</span>
                                                        </div>
                                                        <div className="os-window-controls">
                                                            <div className="os-control-btn" onClick={() => handleMinimize(activeWindow)}>
                                                                <Minus size={14} />
                                                            </div>
                                                            <div className="os-control-btn" onClick={() => setIsMaximized(!isMaximized)}>
                                                                {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                                                            </div>
                                                            <div className="os-control-btn close" onClick={closeWindow}>
                                                                <X size={16} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="os-explorer-toolbar">
                                                        <div className="os-toolbar-group">
                                                            <div className="os-toolbar-btn active">
                                                                <Grid size={16} />
                                                                <span>New</span>
                                                            </div>
                                                            <div className="os-toolbar-divider" />
                                                            <div className="os-toolbar-btn">
                                                                <Clock size={16} />
                                                                <span>History</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="os-address-bar">
                                                        <div className="os-nav-actions">
                                                            <ChevronRight
                                                                size={16}
                                                                className={`rotate-180 ${navigationHistory.length > 1 || explorerView === 'details' ? 'active' : 'opacity-40'}`}
                                                                onClick={handleBack}
                                                            />
                                                            <ChevronRight size={16} className="opacity-40" />
                                                            <ChevronRight size={16} className="-rotate-90 opacity-80" />
                                                        </div>
                                                        <div className="os-breadcrumb-bar">
                                                            <div className="breadcrumb-item">
                                                                <Monitor size={12} />
                                                                <span>This PC</span>
                                                            </div>
                                                            {navigationHistory.map((item, i) => (
                                                                item !== 'root' && (
                                                                    <div key={i} className="flex items-center">
                                                                        <span className="breadcrumb-sep mx-1 text-zinc-500">{'>'}</span>
                                                                        <div className={`breadcrumb-item ${i === navigationHistory.length - 1 ? 'active' : ''}`}>
                                                                            {item}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            ))}
                                                        </div>
                                                        <div className="os-search-bar">
                                                            <Search size={14} className="opacity-40" />
                                                            <input type="text" placeholder="Search" readOnly />
                                                        </div>
                                                    </div>

                                                    <div className="os-window-body">
                                                        <aside className="os-sidebar">
                                                            <div className="sidebar-group">
                                                                <div className="sidebar-item active"><Star size={14} /> <span>Quick Access</span></div>
                                                                <div className="sidebar-item"><Clock size={14} /> <span>Recent</span></div>
                                                            </div>
                                                            <div className="sidebar-divider" />
                                                            <div className="sidebar-group">
                                                                <div className="sidebar-item"><Monitor size={14} /> <span>This PC</span></div>
                                                                <div className="sidebar-item"><Cloud size={14} /> <span>Cloud Drive</span></div>
                                                            </div>
                                                        </aside>
                                                        <main className="os-explorer-content custom-scrollbar p-6">
                                                            {explorerView === 'files' ? (
                                                                <div className="os-file-grid" onClick={() => setSelectedFile(null)}>
                                                                    <div className={`os-file-item ${selectedFile === 'desc' ? 'selected' : ''}`} onClick={(e) => { e.stopPropagation(); handleFileClick('desc'); }}>
                                                                        <div className="os-file-icon"><FileText size={40} className="text-blue-400 opacity-80" /></div>
                                                                        <span className="os-file-label text-[11px] mt-1">Description.txt</span>
                                                                    </div>
                                                                    <div className={`os-file-item ${selectedFile === 'launch' ? 'selected' : ''}`} onClick={(e) => { e.stopPropagation(); handleFileClick('launch'); }}>
                                                                        <div className="os-file-icon"><Cpu size={40} className="text-zinc-200 opacity-80" /></div>
                                                                        <span className="os-file-label text-[11px] mt-1">launch.exe</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="os-txt-content animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                                    <div className="flex items-center gap-4 mb-6">
                                                                        <button className="txt-back-btn" onClick={handleBack}>
                                                                            <ChevronRight size={14} className="rotate-180" />
                                                                        </button>
                                                                        <div className="h-4 w-[1px] bg-white/10" />
                                                                        <span className="text-xs opacity-50 font-mono">systemroot/{activeWindow.title?.toLowerCase().replace(/\s+/g, '_') || 'project'}/readme.txt</span>
                                                                    </div>

                                                                    <div className="flex justify-between items-end mb-10">
                                                                        <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40 leading-tight uppercase">{activeWindow.title}</h1>
                                                                        <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest whitespace-nowrap mb-2">v2.0 Stable Build</div>
                                                                    </div>

                                                                    <div className="project-detail-sections space-y-12">
                                                                        <section className="bg-white/5 p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                                                                            <div className="absolute top-0 right-0 p-4 opacity-5"><Cpu size={64} /></div>
                                                                            <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                                                <Sparkles size={14} /> Executive Summary
                                                                            </h3>
                                                                            <p className="text-xl text-zinc-300 leading-relaxed font-light">{activeWindow.details || activeWindow.desc}</p>
                                                                        </section>

                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                            <section className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                                                                <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Architecture Stack</h3>
                                                                                <div className="flex flex-wrap gap-2">
                                                                                    {activeWindow.tags?.map(tag => (
                                                                                        <span key={tag} className="px-4 py-2 bg-zinc-900 border border-white/10 rounded-2xl text-[12px] text-zinc-300 font-bold hover:border-blue-500/50 transition-colors">
                                                                                            {tag}
                                                                                        </span>
                                                                                    ))}
                                                                                </div>
                                                                            </section>

                                                                            <section className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                                                                <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Core Metrics</h3>
                                                                                <div className="grid grid-cols-1 gap-3">
                                                                                    {activeWindow.metrics?.map((m, i) => (
                                                                                        <div key={i} className="flex items-center gap-4 group">
                                                                                            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                                                                <Activity size={14} />
                                                                                            </div>
                                                                                            <div className="flex flex-col">
                                                                                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-wider">{m.label}</span>
                                                                                                <span className="text-xs font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors">{m.val}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </section>
                                                                        </div>
                                                                    </div>

                                                                    <div className="txt-actions mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                                                                        <div className="flex flex-col">
                                                                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Target Object</span>
                                                                            <span className="text-xs font-mono text-zinc-400">{activeWindow.link?.split('/').pop() || 'live_system'}</span>
                                                                        </div>
                                                                        <button className="btn-primary group flex items-center gap-3 px-10 py-4 rounded-2xl bg-white text-black font-black transition-all hover:scale-[1.05] active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]" onClick={() => activeWindow.link && window.open(activeWindow.link, '_blank')}>
                                                                            ACCESS DEPLOYMENT <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </main>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Browser Window */}
                                            {browserOpen && (
                                                <div className={`os-window-canvas win-mica browser-window flex flex-col ${isBrowserMaximized ? 'maximized' : ''}`}>
                                                    <div className="os-window-header border-b border-white/5 flex flex-col pt-2 bg-[#1a1c1e]">
                                                        <div className="flex items-center justify-between px-4 w-full mb-1 h-10">
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex items-center gap-1.5">
                                                                    {browserTabs.map(tab => (
                                                                        <div
                                                                            key={tab.id}
                                                                            onClick={() => switchTab(tab.id)}
                                                                            className={`browser-tab flex items-center gap-3 px-4 h-9 rounded-t-xl transition-all cursor-pointer group relative ${activeTabId === tab.id
                                                                                    ? 'bg-zinc-950 text-white border-x border-t border-white/10 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.5)]'
                                                                                    : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
                                                                                }`}
                                                                        >
                                                                            <Globe size={13} className={activeTabId === tab.id ? 'text-blue-400' : 'opacity-50'} />
                                                                            <span className="text-[11px] font-bold tracking-wide truncate max-w-[100px]">{tab.title}</span>
                                                                            <button
                                                                                onClick={(e) => closeTab(e, tab.id)}
                                                                                className="tab-close-btn opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded-md p-0.5 transition-all"
                                                                            >
                                                                                <X size={10} />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                    <button
                                                                        onClick={addTab}
                                                                        className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:bg-white/5 hover:text-zinc-300 rounded-lg transition-all ml-1"
                                                                    >
                                                                        <Plus size={16} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="os-window-controls scale-90">
                                                                <div className="os-control-btn" onClick={() => handleMinimize('browser')}>
                                                                    <Minus size={14} />
                                                                </div>
                                                                <div
                                                                    className="os-control-btn"
                                                                    onClick={(e) => { e.stopPropagation(); setIsBrowserMaximized(!isBrowserMaximized); }}
                                                                    onDoubleClick={(e) => e.stopPropagation()}
                                                                >
                                                                    {isBrowserMaximized ? <Minimize2 size={13} /> : <Square size={12} />}
                                                                </div>
                                                                <div className="os-control-btn close" onClick={() => { setBrowserOpen(false); removeMinimizedWindow('browser'); }}>
                                                                    <X size={14} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="browser-toolbar bg-zinc-950 flex items-center gap-4 px-4 py-2 border-b border-white/5 shadow-lg">
                                                            <div className="flex items-center gap-1">
                                                                <div className="p-1.5 hover:bg-white/10 rounded-lg cursor-pointer transition-all">
                                                                    <ChevronRight size={16} className="rotate-180 text-zinc-500" />
                                                                </div>
                                                                <div className="p-1.5 hover:bg-white/10 rounded-lg cursor-pointer transition-all">
                                                                    <ChevronRight size={16} className="text-zinc-500" />
                                                                </div>
                                                                <div className="p-1.5 hover:bg-white/10 rounded-lg cursor-pointer transition-all">
                                                                    <Clock size={14} className="text-zinc-400" />
                                                                </div>
                                                            </div>
                                                            <div className="browser-address-bar flex-1 bg-zinc-900/50 border border-white/10 h-10 rounded-2xl flex items-center px-4 gap-3 group hover:border-blue-500/30 transition-all focus-within:ring-2 focus-within:ring-blue-500/20">
                                                                <Globe size={12} className="text-blue-500/70" />
                                                                <input
                                                                    type="text"
                                                                    value={browserUrl}
                                                                    onChange={(e) => setBrowserUrl(e.target.value)}
                                                                    onBlur={() => updateTabState(browserUrl)}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter') {
                                                                            const val = e.target.value.trim();
                                                                            let finalUrl = val;
                                                                            if (val.includes('.') && !val.includes(' ')) {
                                                                                finalUrl = val.startsWith('http') ? val : `https://${val}`;
                                                                                window.open(finalUrl, '_blank');
                                                                            } else {
                                                                                finalUrl = `https://www.google.com/search?q=${encodeURIComponent(val)}`;
                                                                                window.open(finalUrl, '_blank');
                                                                            }
                                                                            setBrowserUrl(finalUrl);
                                                                            updateTabState(finalUrl);
                                                                        }
                                                                    }}
                                                                    className="bg-transparent border-none outline-none text-[13px] text-zinc-300 font-medium w-full"
                                                                />
                                                            </div>
                                                            <div className="user-avatar-small w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-[11px] font-black shadow-lg border border-white/10">AK</div>
                                                        </div>
                                                    </div>
                                                    <div className="os-window-body bg-zinc-950 flex flex-col p-12 md:p-20 overflow-y-auto">
                                                        <div className="max-w-6xl mx-auto w-full">
                                                            <div className="flex items-center justify-between mb-12">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                                                        <Globe size={24} className="text-white" />
                                                                    </div>
                                                                    <div>
                                                                        <h2 className="text-2xl font-black tracking-tight text-white">Mercury Home</h2>
                                                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Decentralized Web Framework</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-zinc-400">v4.2.0-stable</div>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                                                                {projects.slice(0, 4).map((p, i) => (
                                                                    <div key={i} className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all cursor-pointer flex flex-col shadow-2xl" onClick={() => { setBrowserUrl(p.link); window.open(p.link, '_blank'); }}>
                                                                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white mb-6 transition-all shrink-0 shadow-lg">
                                                                            <Activity size={24} />
                                                                        </div>
                                                                        <h4 className="text-lg font-black text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors uppercase">{p.title}</h4>
                                                                        <p className="text-sm text-zinc-400 font-medium line-clamp-3 leading-relaxed opacity-70 group-hover:opacity-100">{p.details}</p>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="relative p-12 rounded-[48px] bg-gradient-to-br from-indigo-950/40 via-blue-900/20 to-transparent border border-white/10 overflow-hidden group hover:border-blue-500/30 transition-all flex items-center justify-between shadow-2xl">
                                                                <div className="relative z-10 max-w-md">
                                                                    <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Continue your research</h2>
                                                                    <p className="text-base text-zinc-400 leading-relaxed mb-8 opacity-80">The Mercury Engine is learning from your browsing patterns to optimize latency across regions.</p>
                                                                    <button className="px-10 py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform active:scale-95 shadow-xl">Optimize Now</button>
                                                                </div>
                                                                <div className="absolute -right-16 -bottom-16 opacity-5 group-hover:opacity-10 transition-opacity">
                                                                    <Globe size={320} className="text-blue-400 rotate-12" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Resume Window */}
                                            {resumeOpen && (
                                                <div className="os-window-canvas win-mica resume-window">
                                                    <div className="os-window-header">
                                                        <div className="os-window-title-area">
                                                            <FileText size={14} className="text-orange-400" />
                                                            <span className="os-window-title text-xs font-medium opacity-80">Aekansh_Resume.pdf</span>
                                                        </div>
                                                        <div className="os-window-controls">
                                                            <div className="os-control-btn close" onClick={() => setResumeOpen(false)}>
                                                                <X size={16} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="os-window-body bg-zinc-900 overflow-y-auto custom-scrollbar p-8">
                                                        <div className="resume-sheet bg-white text-zinc-900 p-12 mx-auto max-w-3xl shadow-2xl min-h-[1000px]">
                                                            <h1 className="text-4xl font-bold mb-2">AEKANSH KHANDELWAL</h1>
                                                            <p className="text-zinc-600 mb-8 tracking-widest font-medium">FULL STACK DEVELOPER & DATA SCIENTIST</p>
                                                            <div className="h-[1px] bg-zinc-200 mb-10" />
                                                            <section className="mb-12">
                                                                <h2 className="text-sm font-bold text-blue-600 mb-4 tracking-widest uppercase">Profile</h2>
                                                                <p className="text-sm leading-relaxed text-zinc-700 font-medium">Highly skilled developer with expertise in building agentic AI systems, RAG architectures, and premium full-stack applications. Passionate about merging high-fidelity design with robust functional logic.</p>
                                                            </section>
                                                            <div className="grid grid-cols-2 gap-12">
                                                                <section>
                                                                    <h2 className="text-sm font-bold text-blue-600 mb-4 tracking-widest uppercase">Expertise</h2>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {['React', 'Node.js', 'Python', 'ML', 'SQL', 'GenAI'].map(s => (
                                                                            <span key={s} className="px-3 py-1 bg-zinc-100 rounded text-[10px] font-bold text-zinc-600">{s}</span>
                                                                        ))}
                                                                    </div>
                                                                </section>
                                                                <section>
                                                                    <h2 className="text-sm font-bold text-blue-600 mb-4 tracking-widest uppercase">Contact</h2>
                                                                    <p className="text-xs text-zinc-500 mb-1">Github: /aekanshkhandelwal</p>
                                                                    <p className="text-xs text-zinc-500">Location: India</p>
                                                                </section>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Settings Window */}
                                            {settingsOpen && (
                                                <div className="os-window-canvas win-mica settings-window">
                                                    <div className="os-window-header">
                                                        <div className="os-window-title-area">
                                                            <Settings size={14} className="text-zinc-400" />
                                                            <span className="os-window-title text-xs font-medium opacity-80">Settings</span>
                                                        </div>
                                                        <div className="os-window-controls">
                                                            <div className="os-control-btn close" onClick={() => setSettingsOpen(false)}>
                                                                <X size={16} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="os-window-body flex">
                                                        <aside className="os-sidebar w-48 border-r border-white/5 p-4">
                                                            <div className="sidebar-group">
                                                                <div className="sidebar-item active"><Layout size={14} /> <span>Personalization</span></div>
                                                                <div className="sidebar-item"><Monitor size={14} /> <span>System</span></div>
                                                            </div>
                                                        </aside>
                                                        <main className="flex-1 p-8 overflow-y-auto">
                                                            <h2 className="text-2xl font-bold mb-8 tracking-tight">Personalization</h2>
                                                            <div className="mb-10">
                                                                <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Background Settings</h3>
                                                                <div className="wallpaper-grid">
                                                                    {wallpapers.map((wp) => (
                                                                        <div
                                                                            key={wp.id}
                                                                            className={`wallpaper-thumb ${currentWallpaper === wp.src ? 'active' : ''}`}
                                                                            onClick={() => setCurrentWallpaper(wp.src)}
                                                                        >
                                                                            <img src={wp.src} alt={wp.name} />
                                                                            <div className="thumb-overlay">
                                                                                <span className="text-[10px] font-bold">{wp.name}</span>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </main>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Run Dialog */}
                                            {runOpen && (
                                                <div className="os-run-dialog win-mica shadow-2xl" onClick={(e) => e.stopPropagation()}>
                                                    <div className="run-header">
                                                        <Activity size={14} className="text-blue-400" />
                                                        <span className="text-xs ml-2">Run</span>
                                                        <div className="ml-auto cursor-pointer" onClick={() => setRunOpen(false)}><X size={14} /></div>
                                                    </div>
                                                    <div className="run-body p-4">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <Activity size={32} className="text-blue-400" />
                                                            <p className="text-[11px] opacity-70">Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.</p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <span className="text-xs pt-1">Open:</span>
                                                            <input
                                                                type="text"
                                                                className="run-input"
                                                                autoFocus
                                                                value={runInput}
                                                                onChange={(e) => setRunInput(e.target.value)}
                                                                onKeyDown={(e) => e.key === 'Enter' && setRunOpen(false)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="run-footer flex justify-end gap-2 p-3 bg-white/5">
                                                        <button className="run-btn" onClick={() => setRunOpen(false)}>OK</button>
                                                        <button className="run-btn" onClick={() => setRunOpen(false)}>Cancel</button>
                                                        <button className="run-btn disabled">Browse...</button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Quick Settings */}
                                            {quickSettingsOpen && (
                                                <div className="os-quick-settings win-mica" onClick={(e) => e.stopPropagation()}>
                                                    <div className="qs-grid p-6 grid grid-cols-3 gap-4">
                                                        <div className="qs-item active"><Wifi size={20} /><span>Wi-Fi</span></div>
                                                        <div className="qs-item active"><Activity size={20} /><span>Bluetooth</span></div>
                                                        <div className="qs-item"><Plane size={20} /><span>Airplane</span></div>
                                                        <div className="qs-item active"><Volume2 size={20} /><span>Volume</span></div>
                                                        <div className="qs-item"><Bell size={20} /><span>Focus</span></div>
                                                        <div className="qs-item"><Cpu size={20} /><span>Battery</span></div>
                                                    </div>
                                                    <div className="qs-footer p-4 border-t border-white/5 flex justify-between items-center bg-white/5">
                                                        <div className="qs-battery flex items-center gap-2 opacity-60">
                                                            <Battery size={14} />
                                                            <span className="text-[10px] font-bold">100%</span>
                                                        </div>
                                                        <div className="qs-actions flex gap-4">
                                                            <div className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity" onClick={() => setSettingsOpen(true)}><Settings size={16} /></div>
                                                            <div className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity" onClick={handleShutdown}><Power size={16} /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {startMenuOpen && (
                                                <div className="os-start-menu-v2 win-mica" onClick={(e) => e.stopPropagation()}>
                                                    <div className="start-menu-inner start-menu-shell p-8 flex flex-col h-full bg-zinc-900/60 backdrop-blur-3xl">
                                                        <div className="start-search-box mb-8 group" onClick={() => { setSearchOpen(true); setStartMenuOpen(false); }}>
                                                            <Search size={16} className="opacity-40 group-hover:text-blue-400 transition-colors" />
                                                            <input type="text" placeholder="Search for apps, settings, and documents" readOnly />
                                                        </div>

                                                        <div className="start-sections flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                                            <section className="start-section start-section-pinned mb-10">
                                                                <div className="start-section-head flex items-center justify-between mb-6 px-2">
                                                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Pinned</span>
                                                                    <button className="start-section-action text-[10px] font-bold bg-white/5 px-3 py-1 rounded-full hover:bg-white/10 transition-colors">All apps {'>'}</button>
                                                                </div>
                                                                <div className="pinned-grid start-pinned-grid grid grid-cols-3 gap-6">
                                                                    <div className="pinned-item flex flex-col items-center gap-2 group cursor-pointer" onClick={() => { setBrowserOpen(true); setIsBrowserMaximized(isCompactViewport); removeMinimizedWindow('browser'); setStartMenuOpen(false); }}>
                                                                        <div className="pinned-icon w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center"><Globe size={24} className="text-white" /></div>
                                                                        <span className="text-[10px] font-bold group-hover:text-white transition-colors">Edge</span>
                                                                    </div>
                                                                    <div className="pinned-item flex flex-col items-center gap-2 group cursor-pointer" onClick={() => { setSettingsOpen(true); setStartMenuOpen(false); }}>
                                                                        <div className="pinned-icon w-12 h-12 rounded-2xl bg-zinc-800 border border-white/5 group-hover:scale-110 transition-transform flex items-center justify-center"><Settings size={24} className="text-zinc-400" /></div>
                                                                        <span className="text-[10px] font-bold group-hover:text-white transition-colors">Settings</span>
                                                                    </div>
                                                                    <div className="pinned-item flex flex-col items-center gap-2 group cursor-pointer" onClick={() => { setResumeOpen(true); setStartMenuOpen(false); }}>
                                                                        <div className="pinned-icon w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/20 group-hover:scale-110 transition-transform flex items-center justify-center"><FileText size={24} className="text-orange-400" /></div>
                                                                        <span className="text-[10px] font-bold group-hover:text-white transition-colors">Resume</span>
                                                                    </div>
                                                                    {projects.slice(0, 3).map((p, i) => (
                                                                        <div key={i} className="pinned-item flex flex-col items-center gap-2 group cursor-pointer" onClick={() => handleIconClick(p)}>
                                                                            <div className="pinned-icon w-12 h-12 rounded-2xl bg-zinc-800 border border-white/5 group-hover:scale-110 transition-transform flex items-center justify-center"><Folder size={24} className="text-zinc-500" /></div>
                                                                            <span className="text-[10px] font-bold group-hover:text-white transition-colors truncate w-full text-center px-1">{p.title.split(' ')[0]}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </section>

                                                            <section className="start-section start-section-recommended">
                                                                <div className="start-section-head flex items-center justify-between mb-6 px-2">
                                                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Recommended</span>
                                                                    <button className="start-section-action text-[10px] font-bold bg-white/5 px-3 py-1 rounded-full hover:bg-white/10 transition-colors">More {'>'}</button>
                                                                </div>
                                                                <div className="recommended-list start-recommended-list space-y-1">
                                                                    <div className="rec-item start-rec-item flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-all group" onClick={() => { setResumeOpen(true); setStartMenuOpen(false); }}>
                                                                        <div className="rec-icon w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all"><FileText size={20} /></div>
                                                                        <div className="rec-copy flex flex-col">
                                                                            <span className="rec-title text-xs font-bold text-zinc-200">Aekansh_Resume.pdf</span>
                                                                            <span className="rec-meta text-[10px] text-zinc-500 uppercase tracking-widest font-black">Recently opened</span>
                                                                        </div>
                                                                        <ArrowUpRight size={14} className="ml-auto opacity-0 group-hover:opacity-40 transition-opacity" />
                                                                    </div>
                                                                    {projects.slice(0, 2).map((p, i) => (
                                                                        <div key={i} className="rec-item start-rec-item flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-all group" onClick={() => handleIconClick(p)}>
                                                                            <div className="rec-icon w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all"><Cpu size={20} /></div>
                                                                            <div className="rec-copy flex flex-col">
                                                                                <span className="rec-title text-xs font-bold text-zinc-200">{p.title}</span>
                                                                                <span className="rec-meta text-[10px] text-zinc-500 uppercase tracking-widest font-black">Added recently</span>
                                                                            </div>
                                                                            <ArrowUpRight size={14} className="ml-auto opacity-0 group-hover:opacity-40 transition-opacity" />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </section>
                                                        </div>

                                                        <div className="start-footer mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                                            <div className="start-footer-profile flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl cursor-pointer transition-all group">
                                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-[10px] font-black border border-white/10 group-hover:border-blue-500 transition-colors">AK</div>
                                                                <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">Aekansh Khandelwal</span>
                                                            </div>
                                                            <div className="start-footer-power p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors" onClick={handleShutdown}><Power size={18} className="text-zinc-400 hover:text-red-400" /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Search Overlay */}
                                            {searchOpen && (
                                                <div className="os-search-overlay win-mica" onClick={(e) => e.stopPropagation()}>
                                                    <div className="search-input-wrapper">
                                                        <Search size={22} className="opacity-40" />
                                                        <input
                                                            type="text"
                                                            placeholder="Type to search projects and files..."
                                                            autoFocus
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="search-results custom-scrollbar p-6">
                                                        <div className="search-categories flex gap-3 mb-6">
                                                            <div className="cat-chip active">All</div>
                                                            <div className="cat-chip">Apps</div>
                                                            <div className="cat-chip">Docs</div>
                                                            <div className="cat-chip">Web</div>
                                                        </div>

                                                        {searchQuery.length > 0 ? (
                                                            <div className="results-list space-y-2">
                                                                <span className="text-[10px] uppercase font-bold opacity-30 tracking-widest mb-2 block">Best Match</span>
                                                                {projects.filter(p =>
                                                                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                                    p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                                    p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                                                                ).map((p, i) => (
                                                                    <div key={i} className="search-result-v2 flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer" onClick={() => handleIconClick(p)}>
                                                                        <Folder size={24} className="text-zinc-400 folder-icon-svg" />
                                                                        <div className="flex flex-col">
                                                                            <span className="text-sm font-bold">{p.title}</span>
                                                                            <span className="text-[10px] opacity-40 lowercase">systemroot/{p.title.toLowerCase().replace(/\s+/g, '_')}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="quick-search-grid">
                                                                <span className="text-[10px] uppercase font-bold opacity-30 tracking-widest mb-4 block text-center">Top Apps</span>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="quick-item p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all cursor-pointer" onClick={() => { setBrowserOpen(true); setIsBrowserMaximized(isCompactViewport); removeMinimizedWindow('browser'); }}>
                                                                        <Globe size={18} className="text-blue-400" />
                                                                        <span className="text-xs font-bold">Edge Browser</span>
                                                                    </div>
                                                                    <div className="quick-item p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all cursor-pointer" onClick={() => setResumeOpen(true)}>
                                                                        <FileText size={18} className="text-orange-400" />
                                                                        <span className="text-xs font-bold">Resume.pdf</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="os-taskbar-win11 win-mica" onClick={(e) => e.stopPropagation()}>
                                                <div className="taskbar-left flex items-center gap-4 px-4">
                                                    <div className="taskbar-weather flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                                                        <Cloud size={16} className="text-blue-400" />
                                                        <span className="text-[10px] font-bold">24°C</span>
                                                    </div>
                                                </div>
                                                <div className="taskbar-center">
                                                    <div className={`taskbar-itemStart ${startMenuOpen ? 'active' : ''}`} onClick={handleToggleStartMenu}>
                                                        <div className="start-icon-v2">
                                                            <div className="grid grid-cols-2 gap-[2px]">
                                                                <div className="w-[8px] h-[8px] bg-blue-500 rounded-[1px]" />
                                                                <div className="w-[8px] h-[8px] bg-blue-400 rounded-[1px]" />
                                                                <div className="w-[8px] h-[8px] bg-blue-400 rounded-[1px]" />
                                                                <div className="w-[8px] h-[8px] bg-blue-600 rounded-[1px]" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`taskbar-item ${searchOpen ? 'active' : ''}`} onClick={() => { setSearchOpen(!searchOpen); setStartMenuOpen(false); setQuickSettingsOpen(false); }}>
                                                        <Search size={22} className="opacity-60" />
                                                    </div>
                                                    <div className={`taskbar-item ${browserOpen ? 'active' : ''}`} onClick={() => {
                                                        if (browserOpen) {
                                                            handleMinimize('browser');
                                                        } else {
                                                            setBrowserOpen(true);
                                                            setIsBrowserMaximized((prev) => (isCompactViewport ? true : prev));
                                                            removeMinimizedWindow('browser');
                                                        }
                                                        setStartMenuOpen(false);
                                                        setQuickSettingsOpen(false);
                                                    }}>
                                                        <Globe size={22} className="text-blue-400 opacity-60" />
                                                    </div>
                                                    <div className="taskbar-item" onClick={() => setRunOpen(true)}>
                                                        <Command size={22} className="opacity-60" />
                                                    </div>
                                                    {[...minimizedWindows, activeWindow].filter(Boolean).map((win, i) => {
                                                        const isBrowser = win.id === 'browser';
                                                        const isActive = isBrowser ? browserOpen : (activeWindow?.title === win.title);
                                                        return (
                                                            <div
                                                                key={i}
                                                                className={`taskbar-item ${isActive ? 'active' : ''}`}
                                                                onClick={() => toggleWindow(win)}
                                                                title={win.title}
                                                            >
                                                                {isBrowser ? (
                                                                    <Globe size={22} className="text-blue-400 opacity-60" />
                                                                ) : (
                                                                    <Folder size={22} className="folder-icon-svg" />
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="taskbar-right px-4">
                                                    <div className="tray-group flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" onClick={handleToggleQuickSettings}>
                                                        <Wifi size={14} />
                                                        <Volume2 size={14} />
                                                        <Battery size={14} />
                                                    </div>
                                                    <div className="tray-clock flex flex-col items-center ml-4 cursor-pointer" onClick={handleToggleQuickSettings}>
                                                        <div className="time text-[11px] font-bold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                        <div className="date text-[9px] opacity-60">{currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}</div>
                                                    </div>
                                                    <div className="show-desktop border-l border-white/5 ml-4 pl-1 flex items-center h-full">
                                                        <div className="w-[2px] h-full hover:bg-white/10 transition-all" onClick={(e) => { e.stopPropagation(); setActiveWindow(null); }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="monitor-off-screen">
                                    <div className="no-signal">NO SIGNAL</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="monitor-hardware-ui">
                        <div className={`monitor-status-light ${powerOn ? 'on' : ''}`}></div>
                        <button className={`monitor-power-btn ${powerOn ? 'on' : ''}`} onClick={handlePowerToggle}><Power size={14} /></button>
                    </div>
                </div>

                <div className="monitor-base">
                    <div className="stand-neck"></div>
                    <div className="stand-foot"></div>
                </div>
            </div>
        </div>
    );
};

export default DesktopView;
