import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, ShieldCheck, Database, BarChart3, Binary, Workflow, Target, Zap } from 'lucide-react';

const SKILLS = [
  { id: 'ml', name: 'Machine Learning', icon: Brain, color: '#e879f9', value: 0.88, x: 200, y: 150 },
  { id: 'ctgan', name: 'CTGAN Architecture', icon: Cpu, color: '#22d3ee', value: 0.95, x: 400, y: 180 },
  { id: 'vgm', name: 'VGM Normalization', icon: Database, color: '#f43f5e', value: 0.84, x: 150, y: 350 },
  { id: 'sl', name: 'Supervised Learning', icon: Binary, color: '#fbbf24', value: 0.91, x: 450, y: 320 },
  { id: 'pm', name: 'Predictive Modeling', icon: BarChart3, color: '#2dd4bf', value: 0.92, x: 300, y: 450 },
  { id: 'fd', name: 'Fraud Detection AI', icon: ShieldCheck, color: '#6366f1', value: 0.93, x: 300, y: 100 },
  { id: 'da', name: 'Data Augmentation', icon: Workflow, color: '#a855f7', value: 0.88, x: 500, y: 450 },
];

const PARTICLE_COUNT = 100;

const DataScienceAi = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [tick, setTick] = useState(0);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map(() => ({
      id: Math.random(),
      baseX: Math.random() * 600,
      baseY: Math.random() * 600,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  useEffect(() => {
    let frame;
    const animate = () => {
      setTick(t => t + 1);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const hoveredSkill = useMemo(() => SKILLS.find(s => s.id === hoveredId), [hoveredId]);

  return (
    <div className="matrix-viz-container data-science-viz" ref={containerRef}>
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 600 550" className="w-full h-full overflow-visible">
          <defs>
            <filter id="glow-ds">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {particles.map((p) => {
            let targetX = p.baseX;
            let targetY = p.baseY;

            if (hoveredSkill) {
              targetX = hoveredSkill.x + (p.baseX - hoveredSkill.x) * 0.3;
              targetY = hoveredSkill.y + (p.baseY - hoveredSkill.y) * 0.3;
            }

            const driftX = Math.sin(tick * p.speed + p.id) * 15;
            const driftY = Math.cos(tick * p.speed + p.id) * 15;

            return (
              <circle
                key={p.id}
                cx={targetX + driftX}
                cy={targetY + driftY}
                r={isMobile ? p.size * 1.5 : p.size}
                fill={hoveredSkill ? hoveredSkill.color : 'rgba(255,255,255,0.3)'}
                opacity={hoveredSkill ? 0.6 : 0.2}
                className="transition-colors duration-500"
              />
            );
          })}

          {SKILLS.map((skill) => {
            const isHovered = hoveredId === skill.id;
            const iconSize = isMobile ? 12 : 10;
            const labelSize = isMobile ? 10 : 8;

            return (
              <g 
                key={skill.id} 
                onMouseEnter={() => setHoveredId(skill.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer"
              >
                <motion.circle
                  cx={skill.x} cy={skill.y}
                  r={isHovered ? (isMobile ? 45 : 40) : (isMobile ? 25 : 20)}
                  fill="transparent"
                  stroke={skill.color}
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="opacity-40"
                />

                <motion.circle
                  cx={skill.x} cy={skill.y}
                  r={isHovered ? 12 : 6}
                  fill={skill.color}
                  filter={isHovered ? "url(#glow-ds)" : ""}
                  className="transition-all duration-300"
                />

                {isHovered && SKILLS.map(other => (
                  other.id !== skill.id && (
                    <motion.line
                      key={`${skill.id}-${other.id}`}
                      x1={skill.x} y1={skill.y}
                      x2={other.x} y2={other.y}
                      stroke={skill.color}
                      strokeWidth="0.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                    />
                  )
                ))}

                <foreignObject x={skill.x - iconSize/2} y={skill.y - iconSize/2} width={iconSize} height={iconSize} className="pointer-events-none">
                  <div className="flex items-center justify-center w-full h-full">
                    <skill.icon size={iconSize} className={isHovered ? "text-white" : "text-black"} />
                  </div>
                </foreignObject>

                <text
                  x={skill.x} y={skill.y + (isMobile ? 35 : 30)}
                  textAnchor="middle"
                  fill={isHovered ? "white" : "rgba(255,255,255,0.4)"}
                  fontSize={labelSize}
                  className="uppercase tracking-widest pointer-events-none font-bold italic"
                >
                  {isHovered ? skill.name : skill.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* SIDE INFO (Responsive Position) */}
        <AnimatePresence>
          {hoveredId && hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: isMobile ? 20 : 0, x: isMobile ? 0 : 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: isMobile ? 20 : 0, x: isMobile ? 0 : 10 }}
              className={`absolute p-4 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl pointer-events-none z-50 shadow-2xl
                ${isMobile ? 'bottom-4 left-4 right-4' : 'top-4 right-4 w-52'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target size={14} className="text-blue-400" />
                  <span className="text-[9px] font-black uppercase text-blue-400 tracking-[0.2em]">Sync Protocol</span>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[7px] font-bold text-blue-400 uppercase">
                  Locked
                </div>
              </div>
              
              <div className="text-base font-black uppercase tracking-tighter text-white mb-2 leading-none">
                {hoveredSkill.name}
              </div>
              
              <div className="space-y-2">
                <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${hoveredSkill.value * 100}%` }}
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                  />
                </div>
                <div className="flex justify-between items-center text-[8px] font-bold tracking-widest uppercase">
                  <span className="text-slate-500">Neural Strength</span>
                  <span className="text-white font-mono">{Math.round(hoveredSkill.value * 100)}%</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[7px] text-zinc-600 font-bold uppercase tracking-widest">Node ID: {hoveredSkill.id.toUpperCase()}</span>
                <div className="flex gap-1">
                   {[...Array(3)].map((_, i) => (
                     <div key={i} className={`w-1 h-1 rounded-full ${i < 2 ? 'bg-blue-400' : 'bg-zinc-800 animate-pulse'}`} />
                   ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-none opacity-20">
         <Zap size={24} strokeWidth={1} className="text-white" />
      </div>
    </div>
  );
};

export default DataScienceAi;