import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, PieChart, Database, Zap, Presentation, Table, Search
} from 'lucide-react';

const skills = [
  {
    name: "Power BI",
    icon: <LayoutDashboard size={18} />,
    color: "#22d3ee",
    accent: "cyan",
    height: "85%",
    status: "OPTIMIZED",
    description: "Executive-grade dashboards for KPI visibility, drilldowns, and decision-ready reporting.",
    tools: ["DAX", "Power Query", "Data Modeling"]
  },
  {
    name: "Tableau",
    icon: <PieChart size={18} />,
    color: "#f43f5e",
    accent: "rose",
    height: "96%",
    status: "EXPERT",
    description: "High-clarity visual storytelling with interactive exploration layers and polished presentation flow.",
    tools: ["LOD Calcs", "Prep", "Viz Design"]
  },
  {
    name: "SQL Querying",
    icon: <Database size={18} />,
    color: "#fbbf24",
    accent: "amber",
    height: "91%",
    status: "ADVANCED",
    description: "Analytical querying across large datasets with optimized joins, CTEs, and performance-focused logic.",
    tools: ["Window Functions", "CTE", "Stored Procs"]
  },
  {
    name: "KPI Monitoring",
    icon: <Zap size={18} />,
    color: "#10b981",
    accent: "emerald",
    height: "92%",
    status: "STABLE",
    description: "Live metric tracking with alert layers, benchmark signals, and operational monitoring loops.",
    tools: ["Alerting", "Real-time", "Benchmarking"]
  },
  {
    name: "Storytelling",
    icon: <Presentation size={18} />,
    color: "#6366f1",
    accent: "indigo",
    height: "87%",
    status: "FLUENT",
    description: "Narrative-first dashboards that turn raw numbers into memorable insight sequences for stakeholders.",
    tools: ["Narrative", "UX", "Audience Mapping"]
  },
  {
    name: "Excel / VBA",
    icon: <Table size={18} />,
    color: "#d946ef",
    accent: "fuchsia",
    height: "82%",
    status: "LEGACY MASTER",
    description: "Spreadsheet automation, macro-driven workflows, and reporting acceleration for legacy-heavy teams.",
    tools: ["Macros", "PowerPivot", "Automations"]
  },
  {
    name: "Analytics",
    icon: <Search size={18} />,
    color: "#38bdf8",
    accent: "sky",
    height: "89%",
    status: "STRATEGIC",
    description: "Business analysis workflows for pattern discovery, forecasting, and market-facing decision support.",
    tools: ["Predictive", "Regression", "Market Mix"]
  }
];

const SkillBar = ({ skill, index, activeIndex, setActiveIndex }) => {
  const isHovered = activeIndex === index;
  const isDimmed = activeIndex !== null && activeIndex !== index;

  return (
    <div 
      className={`relative flex h-full min-w-0 flex-col items-center justify-end transition-all duration-300 ${isDimmed ? 'translate-y-2 opacity-20' : 'translate-y-0 opacity-100'}`}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      style={{ flex: '1 1 0' }}
    >
      <button
        type="button"
        className="group relative flex h-[150px] w-full max-w-[28px] appearance-none items-end justify-center border-0 bg-transparent p-0 outline-none md:h-[180px] md:max-w-[34px]"
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(null)}
        onFocus={() => setActiveIndex(index)}
        onBlur={() => setActiveIndex(null)}
        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
        aria-label={`${skill.name} proficiency details`}
      >
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: skill.height }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-t-lg shadow-2xl overflow-hidden"
          style={{ background: `linear-gradient(to top, ${skill.color}44, ${skill.color})` }}
        >
          <motion.div 
            animate={{ y: ["100%", "-100%"] }}
            transition={{ duration: isHovered ? 1.5 : 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none"
          />
          <div className="absolute inset-x-[40%] top-2 bottom-0 bg-white/10 blur-[2px] rounded-full" />
        </motion.div>

        <div className="absolute top-[100%] left-0 right-0 h-16 pointer-events-none overflow-hidden opacity-10">
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: skill.height }}
                className="w-full blur-lg rounded-b-xl origin-top scale-y-[-0.6]"
                style={{ background: `linear-gradient(to bottom, ${skill.color}, transparent)` }}
            />
        </div>
      </button>

      <div className="relative z-10 mt-4 flex flex-col items-center gap-2 md:mt-6">
        <div className={`p-2 rounded-lg bg-slate-900 border transition-all duration-300 
          ${isHovered ? 'border-white scale-110 shadow-lg' : 'border-slate-800'}`}>
          {React.cloneElement(skill.icon, { 
            className: isHovered ? 'text-white' : 'text-slate-500',
            size: 16
          })}
        </div>
        <span className={`w-[52px] text-center text-[7px] font-black uppercase tracking-[0.14em] transition-colors duration-300 leading-tight md:w-16 md:text-[8px] md:tracking-widest
          ${isHovered ? 'text-white' : 'text-slate-600'}`}>
          {skill.name}
        </span>
      </div>
    </div>
  );
};

const DashboardingVisuals = () => {
    const [activeIndex, setActiveIndex] = useState(3);

    useEffect(() => {
      const handleResize = () => {
        setActiveIndex((current) => current ?? 3);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const activeSkill = activeIndex !== null ? skills[activeIndex] : null;

    return (
        <div className="matrix-animated-chart flex h-full w-full flex-col justify-between gap-4 md:gap-6">
            <div className="flex h-[250px] w-full items-end justify-between gap-1 px-0.5 sm:gap-2 sm:px-1 md:h-[320px] md:gap-4 md:px-2">
                {skills.map((skill, idx) => (
                    <SkillBar 
                        key={skill.name} 
                        skill={skill} 
                        index={idx} 
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
              {activeSkill && (
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="rounded-2xl border border-white/10 bg-black/60 px-3 py-3 backdrop-blur-xl"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.14em] text-white sm:text-[11px]">
                        {activeSkill.name}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: activeSkill.color, boxShadow: `0 0 10px ${activeSkill.color}` }}
                        />
                        <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-slate-400">
                          {activeSkill.status}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-white">
                      {React.cloneElement(activeSkill.icon, { size: 16 })}
                    </div>
                  </div>

                  <p className="mb-3 text-[11px] leading-relaxed text-slate-400 md:text-[12px]">
                    {activeSkill.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {activeSkill.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[8px] font-mono uppercase text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardingVisuals;
