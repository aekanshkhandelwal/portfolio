import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal,
    X,
    Search,
    Folder,
    Check,
    Zap,
    Layout,
    Laptop,
    Wrench,
    Bot,
    Sun,
    Moon,
    Github,
    ChevronRight,
    Minus,
    Square
} from 'lucide-react';

const Syntax = ({ type, children, isDarkMode }) => {
    const colors = isDarkMode ? {
        keyword: "text-[#c678dd]",
        variable: "text-[#61afef]",
        string: "text-[#98c379]",
        brace: "text-[#abb2bf]",
        property: "text-[#d19a66]",
        number: "text-[#d19a66]"
    } : {
        keyword: "text-[#0000ff]",
        variable: "text-[#001080]",
        string: "text-[#a31515]",
        brace: "text-[#3b3b3b]",
        property: "text-[#0451a5]",
        number: "text-[#098658]"
    };

    return <span className={colors[type] || (isDarkMode ? "text-[#abb2bf]" : "text-[#3b3b3b]")}>{children}</span>;
};

const IdeView = ({ skillGroups, activeFileIdx, setActiveFileIdx }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const activeGroup = skillGroups[activeFileIdx];
    const activeFileName = `${activeGroup.title.replace(/\s+/g, '')}.json`;

    const getIcon = (title) => {
        const t = title.toLowerCase();
        if (t.includes('data science')) return <Bot className="w-full h-full text-pink-400" />;
        if (t.includes('visuals')) return <Layout className="w-full h-full text-blue-400" />;
        if (t.includes('engineering')) return <Laptop className="w-full h-full text-cyan-400" />;
        return <Wrench className="w-full h-full text-purple-400" />;
    };

    const theme = {
        bg: isDarkMode ? "bg-[#11111b]" : "bg-[#ffffff]",
        bgSidebar: isDarkMode ? "bg-[#11111b]" : "bg-[#f3f3f3]",
        bgHeader: isDarkMode ? "bg-[#11111b]" : "bg-[#f3f3f3]",
        bgEditor: isDarkMode ? "bg-[#11111b]" : "bg-[#ffffff]",
        border: isDarkMode ? "border-[#181825]" : "border-[#e5e5e5]",
        borderInner: isDarkMode ? "border-[#1e1e2e]" : "border-[#d4d4d4]",
        textMain: isDarkMode ? "text-[#cdd6f4]" : "text-[#3b3b3b]",
        textMuted: isDarkMode ? "text-[#7f849c]" : "text-[#6a6a6a]",
        lineNum: isDarkMode ? "text-[#45475a]" : "text-[#2b91af]",
        accent: "#7c4dff",
        hover: isDarkMode ? "hover:bg-[#1e1e2e]" : "hover:bg-[#e8e8e8]",
        activeSidebar: isDarkMode ? "bg-[#7c4dff20]" : "bg-[#7c4dff15]"
    };

    return (
        <div className={`w-full h-full font-mono transition-[background-color,color,border-color] duration-500 ease-out flex items-center justify-center overscroll-none`}>
            {/* Responsive Container: Fluid on Mobile, Aspect-Locked on Desktop */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-full h-full md:aspect-video md:max-h-[90%] md:max-w-7xl ${theme.bg} rounded-xl shadow-2xl border-none flex flex-col overflow-hidden relative shadow-black/40 transition-[background-color,color,border-color,box-shadow] duration-500 ease-out`}
            >
                {/* Header Bar */}
                <div className={`h-11 md:h-[9%] ${theme.bgHeader} border-b-0 flex items-center justify-between px-4 md:px-[2%] z-50 transition-[background-color,color,border-color] duration-500 ease-out`}>
                    <div className="flex gap-2 items-center">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        </div>
                    </div>

                    <div className="hidden md:flex flex-1 justify-center">
                        <div className={`px-4 py-1 rounded-md bg-black/20 text-[10px] ${theme.textMuted} border ${theme.border}`}>
                            {activeFileName} — Visual Studio Code
                        </div>
                    </div>

                    <motion.button
                        onClick={toggleTheme}
                        type="button"
                        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                        className={`relative -translate-x-1 flex h-8 w-[52px] shrink-0 items-center overflow-hidden rounded-full border px-1 ${theme.textMain} transition-colors duration-500 ${
                            isDarkMode
                                ? 'border-white/10 bg-[#181825]'
                                : 'border-[#d8def0] bg-[#eef2ff]'
                        }`}
                    >
                        <motion.span
                            layout
                            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                            className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full shadow-lg ${
                                isDarkMode
                                    ? 'left-1 bg-[#7c4dff] text-white shadow-[#7c4dff55]'
                                    : 'left-[calc(100%-1.75rem)] bg-white text-[#5b5fc7] shadow-[#c7d2fe]'
                            }`}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={isDarkMode ? 'sun' : 'moon'}
                                    initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                                    transition={{ duration: 0.22 }}
                                    className="flex items-center justify-center"
                                >
                                    {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                                </motion.span>
                            </AnimatePresence>
                        </motion.span>

                    </motion.button>
                </div>

                <div className="flex flex-1 overflow-hidden relative">
                    {/* Sidebar - Hidden on Mobile */}
                    <div className={`hidden md:flex w-[22%] ${theme.bgSidebar} border-r-0 flex-col pt-8 overflow-hidden transition-[background-color,color,border-color] duration-500 ease-out`}>
                        <div className="px-6 mb-4">
                            <span className={`text-[10px] ${theme.textMuted} uppercase font-bold tracking-widest block truncate`}>Projects</span>
                        </div>

                        <div className="flex flex-col gap-1 overflow-y-auto no-scrollbar pb-6">
                            {skillGroups.map((group, idx) => {
                                const fileName = `${group.title.replace(/\s+/g, '')}.json`;
                                return (
                                    <button
                                        key={fileName}
                                        onClick={() => setActiveFileIdx(idx)}
                                        className={`flex items-center gap-3 px-6 py-2.5 transition-all relative group text-left ${activeFileIdx === idx
                                            ? `${theme.activeSidebar} ${theme.textMain} border-l-[2px] border-[#7c4dff]`
                                            : `${theme.textMuted} ${theme.hover}`
                                            }`}
                                    >
                                        <div className={`w-5 h-5 p-0.5 rounded shrink-0 ${activeFileIdx === idx ? (isDarkMode ? "bg-[#1e1e2e]" : "bg-white") : ""}`}>
                                            {getIcon(group.title)}
                                        </div>
                                        <span className={`truncate text-sm ${activeFileIdx === idx ? "font-bold tracking-tight" : ""}`}>{fileName}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className={`flex-1 flex flex-col ${theme.bgEditor} overflow-hidden transition-[background-color,color,border-color] duration-500 ease-out`}>
                        {/* Breadcrumb / Mobile Tabs */}
                        <div className={`h-11 border-b-0 flex items-center px-4 md:px-6 gap-2 ${theme.textMuted} text-[11px] truncate transition-[background-color,color,border-color] duration-500 ease-out`}>
                            {/* Mobile View Switcher Icons */}
                            <div className="md:hidden flex gap-2 mr-2 pr-2 border-r border-[#1e1e2e]">
                                {skillGroups.map((group, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveFileIdx(idx)}
                                        className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${activeFileIdx === idx ? "bg-[#7c4dff20] text-[#cba6f7]" : "opacity-40"}`}
                                    >
                                        <div className="w-3.5 h-3.5">{getIcon(group.title)}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="hidden xs:flex items-center gap-1.5">
                                <Folder className={`w-3.5 h-3.5 ${isDarkMode ? "text-[#f9e2af]" : "text-[#7c4dff]"}`} />
                                <span className="opacity-60 text-xs">src / skills /</span>
                                <span className={isDarkMode ? "text-[#cba6f7]" : "text-[#7c4dff] font-semibold"}>{activeFileName}</span>
                            </div>
                            <div className="xs:hidden">
                                <span className={isDarkMode ? "text-[#cba6f7]" : "text-[#7c4dff] font-semibold"}>{activeFileName}</span>
                            </div>
                        </div>

                        {/* Code Body */}
                        <div className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-auto custom-scrollbar transition-[background-color,color,border-color] duration-500 ease-out">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFileName}
                                    initial={{ opacity: 0, x: 5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -5 }}
                                    transition={{ duration: 0.15 }}
                                    className="flex min-w-fit"
                                >
                                    <div className={`w-8 md:w-12 ${theme.lineNum} text-right pr-4 md:pr-6 select-none leading-[1.8] md:leading-[1.6] opacity-60 text-xs md:text-[1vw]`}>
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <div key={i}>{i + 1}</div>
                                        ))}
                                    </div>

                                    <div className="flex-1 leading-[1.8] md:leading-[1.6] text-xs md:text-[1.1vw] text-left">
                                        <div className="flex gap-2 whitespace-nowrap">
                                            <Syntax type="keyword" isDarkMode={isDarkMode}>const</Syntax>
                                            <Syntax type="variable" isDarkMode={isDarkMode}>{activeFileName.split('.')[0].replace('&', '_')}</Syntax>
                                            <Syntax type="brace" isDarkMode={isDarkMode}>=</Syntax>
                                            <Syntax type="brace" isDarkMode={isDarkMode}>{'{'}</Syntax>
                                        </div>

                                        <div className="pl-6 md:pl-8 flex gap-2 whitespace-nowrap">
                                            <Syntax type="property" isDarkMode={isDarkMode}>"skills"</Syntax>
                                            <Syntax type="brace" isDarkMode={isDarkMode}>:</Syntax>
                                            <Syntax type="brace" isDarkMode={isDarkMode}>[</Syntax>
                                        </div>

                                        {activeGroup.skills.map((skill, i) => (
                                            <div key={i} className="pl-12 md:pl-16 whitespace-nowrap">
                                                <Syntax type="string" isDarkMode={isDarkMode}>"{skill.name}"</Syntax>
                                                {i < activeGroup.skills.length - 1 && <Syntax type="brace" isDarkMode={isDarkMode}>,</Syntax>}
                                            </div>
                                        ))}

                                        <div className="pl-6 md:pl-8 whitespace-nowrap">
                                            <Syntax type="brace" isDarkMode={isDarkMode}>]</Syntax>
                                        </div>

                                        <div className="whitespace-nowrap">
                                            <Syntax type="brace" isDarkMode={isDarkMode}>{'}'}</Syntax>
                                            <Syntax type="brace" isDarkMode={isDarkMode}>;</Syntax>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Terminal Area */}
                        <div className={`h-24 md:h-[25%] ${theme.bgHeader} border-t-0 flex flex-col shrink-0 overflow-hidden transition-[background-color,color,border-color] duration-500 ease-out`}>
                            <div className={`h-9 md:h-[30%] px-4 md:px-6 border-b ${theme.border} flex items-center gap-4 text-[11px] font-bold tracking-tight ${theme.textMuted}`}>
                                <div className={`${theme.textMain} border-b border-[#7c4dff] h-full flex items-center mt-[1px] shrink-0`}>TERMINAL</div>
                                <div className="hidden md:block opacity-60">OUTPUT</div>
                                <div className="ml-auto opacity-40 shrink-0 cursor-pointer hover:opacity-100">
                                    <X className="w-4 h-4" />
                                </div>
                            </div>
                            <div className={`flex-1 p-3 md:p-4 ${theme.textMain} overflow-y-auto text-xs md:text-[1vw] leading-tight text-left`}>
                                <div className="flex flex-wrap gap-x-2">
                                    <span className={isDarkMode ? "text-[#a6e3a1]" : "text-green-600 font-semibold"}>aekansh@portfolio</span>
                                    <span className={theme.textMuted}>:<span className={isDarkMode ? "text-[#89b4fa]" : "text-blue-600"}>~/skills</span>$</span>
                                    <span className={theme.textMain}>cat {activeFileName}</span>
                                </div>
                                <div className="mt-1 md:mt-2 text-zinc-500 italic text-[11px] md:text-[0.9vw]">
                                    {activeFileIdx === 0 && '> Scanning Data Science libraries... CTGAN initialized.'}
                                    {activeFileIdx === 1 && '> Fetching visualization modules... PowerBI connected.'}
                                    {activeFileIdx === 2 && '> Python 3.10.12 detected. All core modules ready.'}
                                    {activeFileIdx === 3 && '> n8n & Groq integrations verified. Automations active.'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className={`h-6 md:h-[3.5%] ${isDarkMode ? "bg-[#7c4dff]" : "bg-[#6533ff]"} text-white flex items-center justify-between px-4 md:px-6 text-[10px] md:text-[0.7vw] shrink-0 overflow-hidden transition-[background-color,color,border-color] duration-500 ease-out`}>
                    <div className="flex items-center gap-4 md:gap-6 truncate">
                        <span className="opacity-90">Ln 1, Col 1</span>
                        <span className="hidden sm:inline opacity-70">UTF-8</span>
                    </div>
                    <div className="flex items-center gap-4 md:gap-8 font-medium shrink-0">
                        <span className="hidden xs:inline truncate opacity-90">JS ES6</span>
                        <div className="flex items-center gap-1 shrink-0">
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            <span className="hidden sm:inline">Go live</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                            <Check className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Prettier</span>
                        </div>
                    </div>
                </div>
            </motion.div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #313244; border-radius: 10px; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
};

export default IdeView;
