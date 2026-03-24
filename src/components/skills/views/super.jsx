import React, { useState, useEffect, useRef, useCallback } from 'react';

const skillData = [
  // Data Science & AI
  { cat: 'AI', name: 'Machine Learning', c1: '#a855f7', c2: '#6366f1' },
  { cat: 'AI', name: 'CTGAN Architecture', c1: '#a855f7', c2: '#6366f1' },
  { cat: 'AI', name: 'VGM Normalization', c1: '#a855f7', c2: '#6366f1' },
  { cat: 'AI', name: 'Supervised Learning', c1: '#a855f7', c2: '#6366f1' },
  { cat: 'AI', name: 'Predictive Modeling', c1: '#a855f7', c2: '#6366f1' },
  { cat: 'AI', name: 'Fraud Detection AI', c1: '#a855f7', c2: '#6366f1' },
  { cat: 'AI', name: 'Data Augmentation', c1: '#a855f7', c2: '#6366f1' },

  // Dashboarding & Visuals
  { cat: 'BI', name: 'Power BI', c1: '#22d3ee', c2: '#3b82f6' },
  { cat: 'BI', name: 'Tableau', c1: '#22d3ee', c2: '#3b82f6' },
  { cat: 'BI', name: 'Advanced SQL Querying', c1: '#22d3ee', c2: '#3b82f6' },
  { cat: 'BI', name: 'KPI Monitoring', c1: '#22d3ee', c2: '#3b82f6' },
  { cat: 'BI', name: 'Data Storytelling', c1: '#22d3ee', c2: '#3b82f6' },
  { cat: 'BI', name: 'Excel (VBA/Macros)', c1: '#22d3ee', c2: '#3b82f6' },
  { cat: 'BI', name: 'Business Analytics', c1: '#22d3ee', c2: '#3b82f6' },

  // Core Engineering
  { cat: 'ENG', name: 'Python', c1: '#f43f5e', c2: '#fb923c' },
  { cat: 'ENG', name: 'MongoDB', c1: '#f43f5e', c2: '#fb923c' },
  { cat: 'ENG', name: 'React.js', c1: '#f43f5e', c2: '#fb923c' },
  { cat: 'ENG', name: 'C / C++ (OOPS)', c1: '#f43f5e', c2: '#fb923c' },
  { cat: 'ENG', name: 'REST & Gmail APIs', c1: '#f43f5e', c2: '#fb923c' },
  { cat: 'ENG', name: 'Node.js', c1: '#f43f5e', c2: '#fb923c' },
  { cat: 'ENG', name: 'JWT & OAuth', c1: '#f43f5e', c2: '#fb923c' },

  // Modern Ecosystem
  { cat: 'ECO', name: 'n8n Automation', c1: '#10b981', c2: '#a3e635' },
  { cat: 'ECO', name: 'Groq LLM Integration', c1: '#10b981', c2: '#a3e635' },
  { cat: 'ECO', name: 'Streamlit Framework', c1: '#10b981', c2: '#a3e635' },
  { cat: 'ECO', name: 'Pandas & NumPy', c1: '#10b981', c2: '#a3e635' },
  { cat: 'ECO', name: 'Data Preprocessing', c1: '#10b981', c2: '#a3e635' },
  { cat: 'ECO', name: 'Git & Version Control', c1: '#10b981', c2: '#a3e635' },
  { cat: 'ECO', name: 'Vercel Deployment', c1: '#10b981', c2: '#a3e635' },
];

const navigation = [
  { id: 'AI', title: 'Data Science & AI', c1: '#a855f7', c2: '#6366f1' },
  { id: 'BI', title: 'Dashboarding & Visuals', c1: '#06b6d4', c2: '#3b82f6' },
  { id: 'ENG', title: 'Core Engineering', c1: '#f43f5e', c2: '#fb923c' },
  { id: 'ECO', title: 'Modern Ecosystem', c1: '#10b981', c2: '#a3e635' },
];

export default function App() {
  const [activeMode, setActiveMode] = useState('AI');
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef();
  
  const shardsRef = useRef(skillData.map((data, index) => ({
    ...data,
    index,
    x: Math.random() * 800,
    y: Math.random() * 600,
    tx: 0,
    ty: 0,
    vx: 0,
    vy: 0,
    rotationX: 0,
    rotationY: 0,
    el: null
  })));

  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const activeColors = useRef({ c1: '#a855f7', c2: '#6366f1' });

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      if (canvasRef.current) {
        canvasRef.current.width = clientWidth;
        canvasRef.current.height = clientHeight;
      }
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const handleMouseMove = (e) => {
      mouse.current.tx = e.clientX;
      mouse.current.ty = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const width = canvasRef.current?.width || window.innerWidth;
      const height = canvasRef.current?.height || window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const ctx = canvasRef.current?.getContext('2d');

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.1;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.1;

      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        
        const activeShards = shardsRef.current.filter(s => s.cat === activeMode);
        ctx.beginPath();
        ctx.lineWidth = 1;
        
        activeShards.forEach((s1, i) => {
          activeShards.slice(i + 1).forEach(s2 => {
            const d = Math.sqrt(Math.pow(s1.x - s2.x, 2) + Math.pow(s1.y - s2.y, 2));
            
            if (activeMode === 'ECO') {
              if (Math.abs(s1.index - s2.index) === 1) {
                ctx.strokeStyle = `${activeColors.current.c1}40`;
                ctx.moveTo(s1.x + 80, s1.y + 20);
                ctx.quadraticCurveTo(
                  (s1.x + s2.x) / 2 + 100, 
                  (s1.y + s2.y) / 2, 
                  s2.x + 80, 
                  s2.y + 20
                );
              }
            } else if (d < 400) {
              const alpha = (1 - d / 400) * 0.15;
              ctx.strokeStyle = `${activeColors.current.c1}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
              ctx.moveTo(s1.x + 80, s1.y + 20);
              ctx.lineTo(s2.x + 80, s2.y + 20);
            }
          });

          const dc = Math.sqrt(Math.pow(s1.x + 80 - centerX, 2) + Math.pow(s1.y + 20 - centerY, 2));
          const cAlpha = Math.max(0, (1 - dc / 600) * 0.05);
          ctx.strokeStyle = `${activeColors.current.c2}${Math.floor(cAlpha * 255).toString(16).padStart(2, '0')}`;
          ctx.moveTo(s1.x + 80, s1.y + 20);
          ctx.lineTo(centerX, centerY);
        });
        ctx.stroke();

        const pulse = 1 + Math.sin(Date.now() / 1000) * 0.2;
        const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100 * pulse);
        coreGrad.addColorStop(0, `${activeColors.current.c1}44`);
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.fillRect(0, 0, width, height);
      }

      shardsRef.current.forEach((shard) => {
        const i = shard.index % 7;
        
        if (shard.cat === activeMode) {
          shard.targetOpacity = 1;
          switch(activeMode) {
            case 'AI':
              const angle = (i / 7) * Math.PI * 2;
              shard.tx = centerX + Math.cos(angle) * 250 - 80;
              shard.ty = centerY + Math.sin(angle) * 250 - 20;
              break;
            case 'BI':
              shard.tx = centerX - 350 + (i % 3) * 250;
              shard.ty = centerY - 120 + Math.floor(i / 3) * 100;
              break;
            case 'ENG':
              shard.tx = centerX - 120;
              shard.ty = centerY - 240 + i * 75;
              break;
            case 'ECO':
              const flowShift = Math.sin((i * 0.8) + (Date.now() * 0.0015)) * 180;
              shard.tx = centerX + flowShift - 80;
              shard.ty = centerY - 280 + (i * 90);
              break;
            default: break;
          }
        } else {
          shard.targetOpacity = 0.02;
          const driftAngle = (shard.index / skillData.length) * Math.PI * 2;
          shard.tx = centerX + Math.cos(driftAngle) * (width * 0.5);
          shard.ty = centerY + Math.sin(driftAngle) * (height * 0.5);
        }

        const tension = 0.04;
        const friction = 0.85;
        shard.vx = (shard.vx + (shard.tx - shard.x) * tension) * friction;
        shard.vy = (shard.vy + (shard.ty - shard.y) * tension) * friction;
        shard.x += shard.vx;
        shard.y += shard.vy;

        const dx = (shard.x + 80) - mouse.current.x;
        const dy = (shard.y + 20) - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 300) {
          const force = (1 - dist / 300);
          shard.x += (dx / dist) * force * 15;
          shard.y += (dy / dist) * force * 15;
          shard.rotationY = (dx / 300) * 45;
          shard.rotationX = -(dy / 300) * 45;
        } else {
          shard.rotationX *= 0.9;
          shard.rotationY *= 0.9;
        }

        if (shard.el) {
          shard.el.style.opacity = shard.targetOpacity;
          shard.el.style.pointerEvents = shard.cat === activeMode ? 'auto' : 'none';
          shard.el.style.zIndex = shard.cat === activeMode ? '50' : '10';
          shard.el.style.transform = `translate3d(${shard.x}px, ${shard.y}px, 0) rotateX(${shard.rotationX}deg) rotateY(${shard.rotationY}deg)`;
          
          const gx = (mouse.current.x - shard.x) / 1.5;
          const gy = (mouse.current.y - shard.y) / 1.5;
          shard.el.style.setProperty('--glint-x', `${gx}px`);
          shard.el.style.setProperty('--glint-y', `${gy}px`);
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeMode, updateDimensions]);

  const handleModeSwitch = (modeId) => {
    setActiveMode(modeId);
    const mode = navigation.find(n => n.id === modeId);
    activeColors.current = { c1: mode.c1, c2: mode.c2 };
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020308] overflow-hidden text-white font-['Space_Grotesk'] antialiased">
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-[5]" style={{
        background: `radial-gradient(circle at center, transparent 10%, rgba(0,0,0,0.9) 100%)`
      }} />
      <div 
        className="fixed inset-0 pointer-events-none z-[2] transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${(mouse.current.x / (window.innerWidth || 1)) * 100}% ${(mouse.current.y / (window.innerHeight || 1)) * 100}%, ${activeColors.current.c1}33 0%, transparent 70%)`
        }} 
      />
      <div className="fixed top-0 left-0 w-full h-[20vh] pointer-events-none z-[6] opacity-10 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-[scan_8s_linear_infinite]" />
      <canvas ref={canvasRef} className="fixed inset-0 z-[1]" />

      {/* MINIMALIST TOP NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 w-full z-[200] py-12 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-nowrap items-center justify-between gap-2 md:gap-6 pointer-events-auto">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleModeSwitch(item.id)}
              className={`relative flex-1 py-4 flex flex-col items-center justify-center transition-all duration-500 group border-b border-transparent ${activeMode === item.id ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}
              style={{ '--active-c1': item.c1, '--active-c2': item.c2 }}
            >
              <span 
                className={`text-[10px] sm:text-xs md:text-lg font-black uppercase tracking-widest text-center transition-all duration-300 leading-tight ${activeMode === item.id ? '' : 'group-hover:text-white'}`} 
                style={{ color: activeMode === item.id ? item.c1 : 'inherit' }}
              >
                {item.title}
              </span>
              
              {/* Animated underline */}
              <div 
                className={`absolute bottom-[-2px] left-0 h-0.5 rounded-full transition-all duration-700 shadow-[0_0_20px_var(--active-c1)] ${activeMode === item.id ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                style={{ background: `linear-gradient(to right, ${item.c1}, ${item.c2})` }}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* Main UI Layer */}
      <div className="relative z-[100] h-full flex flex-col justify-center pointer-events-none">
        <div className="flex-grow relative mt-32">
          {skillData.map((skill, index) => (
            <div
              key={`${skill.cat}-${skill.name}`}
              ref={el => {
                if (shardsRef.current[index]) shardsRef.current[index].el = el;
              }}
              className="absolute cursor-pointer pointer-events-auto transition-opacity duration-700 select-none group"
              style={{
                '--active-c1': skill.c1,
                '--active-c2': skill.c2,
                perspective: '1200px'
              }}
            >
              <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 px-6 md:px-8 py-3 md:py-4 font-black text-[10px] md:text-[12px] tracking-[3px] uppercase whitespace-nowrap [clip-path:polygon(8%_0,100%_0,92%_100%,0%_100%)] shadow-2xl transition-all duration-300 group-hover:bg-white/10 group-hover:scale-105 overflow-hidden">
                <div className="absolute left-0 top-0 w-1.5 h-full shadow-[0_0_20px_var(--active-c1)]" style={{ background: `linear-gradient(to bottom, ${skill.c1}, ${skill.c2})` }} />
                
                <div className="absolute inset-[-100%] pointer-events-none opacity-20" style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 60%)',
                  transform: 'translate(var(--glint-x, 0), var(--glint-y, 0))'
                }} />

                <span className="font-mono opacity-40 mr-4 italic">0{(index % 7) + 1}</span>
                {skill.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}} />
    </div>
  );
}