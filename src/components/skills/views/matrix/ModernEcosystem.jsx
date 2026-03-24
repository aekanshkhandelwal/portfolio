import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Workflow, Cpu, Layout, Table, Wand2, GitBranch, Triangle, Box, ChevronRight
} from 'lucide-react';

const skills = [
  { id: 'n8n', name: 'n8n Automation', description: 'Workflow automation and node-based logic.', icon: Workflow, color: '#ff6d5a' },
  { id: 'groq', name: 'Groq LLM', description: 'High-speed inference for large language models.', icon: Cpu, color: '#f59e0b' },
  { id: 'streamlit', name: 'Streamlit', description: 'Building data-rich web applications rapidly.', icon: Layout, color: '#00d1ff' },
  { id: 'pandas', name: 'Pandas & NumPy', description: 'High-performance data manipulation.', icon: Table, color: '#34d399' },
  { id: 'preprocessing', name: 'Data Preprocessing', description: 'Cleaning and structuring raw information.', icon: Wand2, color: '#a78bfa' },
  { id: 'git', name: 'Git & Version Control', description: 'Collaborative code management.', icon: GitBranch, color: '#ec4899' },
  { id: 'vercel', name: 'Vercel Deployment', description: 'Cloud infrastructure and CI/CD pipelines.', icon: Triangle, color: '#ffffff' }
];

const ModernEcosystem = () => {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      if (!isHovered) {
        setRotation(prev => (prev + 0.3) % 360);
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  return (
    <div className="matrix-viz-container ecosystem-viz h-full w-full flex items-center justify-center p-4">
      {/* Orbital Stage */}
      <div className={`relative flex items-center justify-center transition-all duration-500
        ${isMobile ? 'w-[280px] h-[280px] scale-[0.85]' : 'w-[320px] h-[320px] scale-100'}`}>
        
        {/* Central Hub */}
        <div 
          className="relative z-10 w-16 h-16 flex items-center justify-center rounded-2xl bg-black border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-transform duration-500 hover:scale-110 group cursor-help"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-white/5 rounded-2xl animate-pulse" />
          <Workflow className="w-6 h-6 text-white relative z-10 group-hover:rotate-180 transition-transform duration-700" />
          
          <div className="absolute -inset-2 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute -inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        </div>

        {/* Orbit Path Visualizer */}
        <div 
          className="absolute w-[240px] h-[240px] border border-white/5 rounded-full"
          style={{ transform: 'rotateX(60deg)' }}
        />

        {/* Satellites Container */}
        <div 
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {skills.map((skill, index) => {
            const angle = (index * (360 / skills.length));
            const radius = 120; 
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={skill.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
              >
                <button
                  onMouseEnter={() => {
                    setIsHovered(true);
                    setActiveSkill(skill);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    setActiveSkill(null);
                  }}
                  className="group relative flex flex-col items-center gap-2"
                  style={{ transform: `rotate(-${rotation}deg)` }}
                >
                  <div 
                    className={`absolute h-px w-16 -left-8 top-1/2 -z-10 transition-opacity duration-300 ${activeSkill?.id === skill.id ? 'opacity-40' : 'opacity-0'}`}
                    style={{ 
                      background: `linear-gradient(90deg, transparent, ${skill.color})`,
                      transform: `rotate(${angle + 180}deg)`,
                      transformOrigin: 'right center'
                    }}
                  />

                  <div 
                    className={`relative w-10 h-10 flex items-center justify-center rounded-xl bg-black border border-white/10 transition-all duration-500 group-hover:scale-125 group-hover:border-white/40 shadow-xl overflow-hidden`}
                  >
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{ backgroundColor: skill.color }}
                    />
                    <skill.icon className="w-4 h-4 transition-colors duration-300" style={{ color: skill.color }} />
                  </div>

                  <span className={`text-[8px] font-bold uppercase tracking-widest transition-all duration-500 ${activeSkill?.id === skill.id ? 'opacity-100' : 'opacity-0'}`}>
                    {skill.id}
                  </span>

                  <div 
                    className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: skill.color }}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Info Card Overlay (Small) */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className={`absolute z-50 p-3 rounded-xl bg-black/80 border border-white/10 backdrop-blur-xl pointer-events-none shadow-2xl
                ${isMobile ? 'inset-x-0 bottom-4 w-full' : '-top-24 right-0 w-48'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 px-1.5 rounded bg-white/10" style={{ color: activeSkill.color }}>
                  <activeSkill.icon className="w-3 h-3" />
                </div>
                <h3 className="font-bold text-[10px] uppercase truncate">{activeSkill.name}</h3>
              </div>
              <p className="text-[8px] text-gray-400 leading-tight mb-2">
                {activeSkill.description}
              </p>
              <div className="flex items-center text-[7px] font-mono text-cyan-400 uppercase tracking-widest opacity-60">
                Satellite Sync: Active <ChevronRight className="w-2 h-2 ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute top-2 left-2 pointer-events-none opacity-30">
        <Box className="w-6 h-6 text-amber-400/40" />
      </div>
    </div>
  );
};

export default ModernEcosystem;