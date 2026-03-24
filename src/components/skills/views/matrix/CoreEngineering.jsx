import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Layers, Code2, Globe, Database, ShieldCheck, Zap, Activity, ChevronRight } from 'lucide-react';

const SKILLS = [
  { id: 'python', name: "PYTHON", color: "#FF2D55", icon: <Terminal size={14} />, description: "Advanced scripting & automation" },
  { id: 'mongo', name: "MONGODB", color: "#FFD700", icon: <Database size={14} />, description: "Scalable NoSQL architecture" },
  { id: 'react', name: "REACT.JS", color: "#00E5FF", icon: <Layers size={14} />, description: "Modern UI/UX development" },
  { id: 'cpp', name: "C / C++ (OOPS)", color: "#7B61FF", icon: <Cpu size={14} />, description: "System level programming" },
  { id: 'api', name: "REST & GMAIL APIS", color: "#E040FB", icon: <Globe size={14} />, description: "Integrated communication services" },
  { id: 'node', name: "NODE.JS", color: "#00E676", icon: <Zap size={14} />, description: "Event-driven backend logic" },
  { id: 'auth', name: "JWT & OAUTH", color: "#FF4B2B", icon: <ShieldCheck size={14} />, description: "Secure authentication protocols" }
];

const CoreEngineering = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const size = isMobile ? 260 : 300;
  const strokeWidth = isMobile ? 20 : 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / SKILLS.length;

  return (
    <div className="matrix-viz-container core-eng-viz h-full w-full flex items-center justify-center p-2" ref={containerRef}>
      {/* Animated Donut Stage */}
      <div className={`relative flex items-center justify-center select-none transition-transform duration-500
        ${isMobile ? 'w-[260px] h-[260px]' : 'w-[300px] h-[300px]'}`}>
        
        <div className={`transition-all duration-1000 ${activeIndex === null ? 'animate-[spin_60s_linear_infinite]' : 'rotate-0'}`}>
            <svg width={size} height={size} className="transform rotate-[-90deg]">
            {SKILLS.map((skill, index) => {
                const rotation = (index * 360) / SKILLS.length;
                const isActive = activeIndex === index;
                return (
                <g 
                    key={skill.name} 
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    className="cursor-pointer"
                >
                    <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke={skill.color}
                    strokeWidth={isActive ? strokeWidth + 8 : strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (segmentLength - 6)}
                    className="transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: 'center',
                        opacity: activeIndex === null || isActive ? 1 : 0.2,
                        filter: isActive ? `drop-shadow(0 0 10px ${skill.color})` : 'none',
                    }}
                    />
                </g>
                );
            })}
            </svg>
        </div>

        {/* Central Information Hub */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`
            rounded-full bg-[#050607]/80 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center text-center p-4 transition-all duration-500
            ${isMobile ? 'w-32 h-32' : 'w-40 h-40'}
            ${activeIndex !== null ? 'shadow-[0_0_30px_rgba(255,255,255,0.05)] scale-105' : 'shadow-none'}
          `}>
            {activeIndex !== null ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                <div className="mb-2" style={{ color: SKILLS[activeIndex].color }}>
                  {React.cloneElement(SKILLS[activeIndex].icon, { size: isMobile ? 12 : 14 })}
                </div>
                <div className={`${isMobile ? 'text-[8px]' : 'text-[10px]'} font-black tracking-tight uppercase italic mb-1 truncate w-full`}>
                  {SKILLS[activeIndex].name}
                </div>
                <div className={`${isMobile ? 'text-[6px]' : 'text-[7px]'} text-white/40 leading-relaxed border-t border-white/5 pt-1 max-w-[80px] md:max-w-[100px] mx-auto`}>
                  {SKILLS[activeIndex].description}
                </div>
              </motion.div>
            ) : (
              <div className="text-center opacity-40">
                <Activity className="mx-auto mb-2 text-rose-500 animate-pulse" size={isMobile ? 18 : 24} />
                <div className={`${isMobile ? 'text-[6px]' : 'text-[7px]'} font-mono tracking-[0.4em]`}>CORE_SYSTEM</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 pointer-events-none opacity-20">
         <Code2 size={24} strokeWidth={1} className="text-white" />
      </div>
    </div>
  );
};

export default CoreEngineering;