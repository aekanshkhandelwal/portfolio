import React, { useState, useEffect, useRef, useCallback } from 'react';
import './SuperView.css';

const skillData = [
  // Data Science & AI
  { cat: 'AI', name: ': Machine Learning', c1: '#a855f7', c2: '#6366f1', label: 'DS_AI.LAYER' },
  { cat: 'AI', name: ': CTGAN Architecture', c1: '#a855f7', c2: '#6366f1', label: 'DS_AI.LAYER' },
  { cat: 'AI', name: ': VGM Normalization', c1: '#a855f7', c2: '#6366f1', label: 'DS_AI.LAYER' },
  { cat: 'AI', name: ': Supervised Learning', c1: '#a855f7', c2: '#6366f1', label: 'DS_AI.LAYER' },
  { cat: 'AI', name: ': Predictive Modeling', c1: '#a855f7', c2: '#6366f1', label: 'DS_AI.LAYER' },
  { cat: 'AI', name: ': Fraud Detection AI', c1: '#a855f7', c2: '#6366f1', label: 'DS_AI.LAYER' },
  { cat: 'AI', name: ': Data Augmentation', c1: '#a855f7', c2: '#6366f1', label: 'DS_AI.LAYER' },

  // Dashboarding & Visuals
  { cat: 'BI', name: ': Power BI', c1: '#22d3ee', c2: '#3b82f6', label: 'BI_VIS.LAYER' },
  { cat: 'BI', name: ': Tableau', c1: '#22d3ee', c2: '#3b82f6', label: 'BI_VIS.LAYER' },
  { cat: 'BI', name: ': Advanced SQL Querying', c1: '#22d3ee', c2: '#3b82f6', label: 'BI_VIS.LAYER' },
  { cat: 'BI', name: ': KPI Monitoring', c1: '#22d3ee', c2: '#3b82f6', label: 'BI_VIS.LAYER' },
  { cat: 'BI', name: ': Data Storytelling', c1: '#22d3ee', c2: '#3b82f6', label: 'BI_VIS.LAYER' },
  { cat: 'BI', name: ': Excel (VBA/Macros)', c1: '#22d3ee', c2: '#3b82f6', label: 'BI_VIS.LAYER' },
  { cat: 'BI', name: ': Business Analytics', c1: '#22d3ee', c2: '#3b82f6', label: 'BI_VIS.LAYER' },

  // Core Engineering
  { cat: 'ENG', name: ': Python', c1: '#f43f5e', c2: '#fb923c', label: 'CORE_ENG.LAYER' },
  { cat: 'ENG', name: ': MongoDB', c1: '#f43f5e', c2: '#fb923c', label: 'CORE_ENG.LAYER' },
  { cat: 'ENG', name: ': React.js', c1: '#f43f5e', c2: '#fb923c', label: 'CORE_ENG.LAYER' },
  { cat: 'ENG', name: ': C / C++ (OOPS)', c1: '#f43f5e', c2: '#fb923c', label: 'CORE_ENG.LAYER' },
  { cat: 'ENG', name: ': REST & Gmail APIs', c1: '#f43f5e', c2: '#fb923c', label: 'CORE_ENG.LAYER' },
  { cat: 'ENG', name: ': Node.js', c1: '#f43f5e', c2: '#fb923c', label: 'CORE_ENG.LAYER' },
  { cat: 'ENG', name: ': JWT & OAuth', c1: '#f43f5e', c2: '#fb923c', label: 'CORE_ENG.LAYER' },

  // Modern Ecosystem
  { cat: 'ECO', name: ': n8n Automation', c1: '#10b981', c2: '#a3e635', label: 'MOD_ECO.LAYER' },
  { cat: 'ECO', name: ': Groq LLM Integration', c1: '#10b981', c2: '#a3e635', label: 'MOD_ECO.LAYER' },
  { cat: 'ECO', name: ': Streamlit Framework', c1: '#10b981', c2: '#a3e635', label: 'MOD_ECO.LAYER' },
  { cat: 'ECO', name: ': Pandas & NumPy', c1: '#10b981', c2: '#a3e635', label: 'MOD_ECO.LAYER' },
  { cat: 'ECO', name: ': Data Preprocessing', c1: '#10b981', c2: '#a3e635', label: 'MOD_ECO.LAYER' },
  { cat: 'ECO', name: ': Git & Version Control', c1: '#10b981', c2: '#a3e635', label: 'MOD_ECO.LAYER' },
  { cat: 'ECO', name: ': Vercel Deployment', c1: '#10b981', c2: '#a3e635', label: 'MOD_ECO.LAYER' },
];

const navigation = [
  { id: 'AI', label: 'DS_AI.LAYER', title: 'Data Science & AI', c1: '#a855f7', c2: '#6366f1' },
  { id: 'BI', label: 'BI_VIS.LAYER', title: 'Dashboarding & Visuals', c1: '#06b6d4', c2: '#3b82f6' },
  { id: 'ENG', label: 'CORE_ENG.LAYER', title: 'Core Engineering', c1: '#f43f5e', c2: '#fb923c' },
  { id: 'ECO', label: 'MOD_ECO.LAYER', title: 'Modern Ecosystem', c1: '#10b981', c2: '#a3e635' },
];

export default function SuperView() {
  const [activeMode, setActiveMode] = useState('AI');
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef();

  // High-performance mutable state for physics (avoids React render overhead)
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
    el: null // DOM reference
  })));

  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const activeColors = useRef({ c1: '#a855f7', c2: '#6366f1' });

  // Persistent background nodes for neural web effect
  const bgNodes = useRef(Array.from({ length: 45 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.0005,
    vy: (Math.random() - 0.5) * 0.0005,
    size: Math.random() * 1.5 + 0.5
  })));

  // "Ghost" data bits for extra tech atmosphere
  const ghostBits = useRef(Array.from({ length: 15 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.001,
    vy: (Math.random() - 0.5) * 0.001,
    text: ['0x' + Math.floor(Math.random() * 0xFF).toString(16), 'DATA_STREAM', '>> RUN', 'SYSTEM.OK', '0101', 'NODE_INF'][Math.floor(Math.random() * 6)],
    opacity: 0,
    targetOpacity: Math.random() * 0.15 + 0.05
  })));

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
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.current.tx = e.clientX - rect.left;
      mouse.current.ty = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const width = canvasRef.current?.width || window.innerWidth;
      const height = canvasRef.current?.height || window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const ctx = canvasRef.current?.getContext('2d');

      // Mouse Lerp
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.1;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.1;

      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        const sf = width < 560 ? 0.42 : width < 768 ? 0.56 : width < 1024 ? 0.8 : 1.0;

        // 1. BACKGROUND NEURAL WEB
        ctx.lineWidth = 0.5;
        bgNodes.current.forEach((node, i) => {
          node.x = (node.x + node.vx + 1) % 1;
          node.y = (node.y + node.vy + 1) % 1;
          const nx = node.x * width;
          const ny = node.y * height;

          ctx.beginPath();
          ctx.fillStyle = i % 2 === 0 ? `${activeColors.current.c1}22` : 'rgba(255,255,255,0.05)';
          ctx.arc(nx, ny, node.size * sf, 0, Math.PI * 2);
          ctx.fill();

          // connections
          bgNodes.current.slice(i + 1, i + 5).forEach(other => {
            const ox = other.x * width;
            const oy = other.y * height;
            const d = Math.sqrt(Math.pow(nx - ox, 2) + Math.pow(ny - oy, 2));
            if (d < 250 * sf) {
              const alpha = (1 - d / (250 * sf)) * 0.1;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
              ctx.moveTo(nx, ny);
              ctx.lineTo(ox, oy);
              ctx.stroke();
            }
          });
        });

        // 2. ACTIVE SKILL CONNECTIONS
        const activeShards = shardsRef.current.filter(s => s.cat === activeMode);
        ctx.beginPath();
        ctx.lineWidth = 1;

        activeShards.forEach((s1, i) => {
          activeShards.slice(i + 1).forEach(s2 => {
            const d = Math.sqrt(Math.pow(s1.x - s2.x, 2) + Math.pow(s1.y - s2.y, 2));
            const cx1 = s1.x + 100 * sf;
            const cy1 = s1.y + 30 * sf;
            const cx2 = s2.x + 100 * sf;
            const cy2 = s2.y + 30 * sf;

            if (d < 500 * sf) {
              const alpha = (1 - d / (500 * sf)) * 0.2;
              ctx.strokeStyle = `${activeColors.current.c1}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
              ctx.moveTo(cx1, cy1);
              ctx.lineTo(cx2, cy2);
            }
          });

          // Connection to Core
          const dc = Math.sqrt(Math.pow(s1.x + 100 * sf - centerX, 2) + Math.pow(s1.y + 30 * sf - centerY, 2));
          const cAlpha = Math.max(0, (1 - dc / (800 * sf)) * 0.08);
          ctx.strokeStyle = `${activeColors.current.c2}${Math.floor(cAlpha * 255).toString(16).padStart(2, '0')}`;
          ctx.moveTo(s1.x + 100 * sf, s1.y + 30 * sf);
          ctx.lineTo(centerX, centerY);
        });
        ctx.stroke();

        // 3. CORE AMBIENCE
        const pulse = 1 + Math.sin(Date.now() / 1000) * 0.2;
        const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 180 * pulse * sf);
        coreGrad.addColorStop(0, `${activeColors.current.c1}33`);
        coreGrad.addColorStop(0.6, `${activeColors.current.c2}05`);
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.fillRect(0, 0, width, height);

        // 4. GHOST DATA BITS
        ctx.font = `${Math.floor(10 * sf)}px 'JetBrains Mono', monospace`;
        ghostBits.current.forEach(bit => {
          bit.x = (bit.x + bit.vx + 1) % 1;
          bit.y = (bit.y + bit.vy + 1) % 1;
          bit.opacity += (bit.targetOpacity - bit.opacity) * 0.01;
          ctx.fillStyle = `rgba(255, 255, 255, ${bit.opacity})`;
          ctx.fillText(bit.text, bit.x * width, bit.y * height);
        });
      }

      // Update Shard Positions & Styles
      shardsRef.current.forEach((shard) => {
        const viewportWidth = window.innerWidth;
        const sf = viewportWidth < 560 ? 0.42 : viewportWidth < 768 ? 0.56 : viewportWidth < 1024 ? 0.8 : 1.0;
        const i = shard.index % 7;

        if (shard.cat === activeMode) {
          shard.targetOpacity = 1;
          switch (activeMode) {
            case 'AI':
              const angle = (i / 7) * Math.PI * 2;
              shard.tx = centerX + Math.cos(angle) * (280 * sf) - (110 * sf);
              shard.ty = centerY + Math.sin(angle) * (280 * sf) - (35 * sf);
              break;
            case 'BI':
              shard.tx = centerX - (450 * sf) + (i % 3) * (320 * sf);
              shard.ty = centerY - (150 * sf) + Math.floor(i / 3) * (140 * sf);
              break;
            case 'ENG':
              shard.tx = centerX - (150 * sf);
              shard.ty = centerY - (320 * sf) + i * (95 * sf);
              break;
            case 'ECO':
              const flowShift = Math.sin((i * 0.8) + (Date.now() * 0.0015)) * (200 * sf);
              shard.tx = centerX + flowShift - (110 * sf);
              shard.ty = centerY - (350 * sf) + (i * 110 * sf);
              break;
            default: break;
          }
        } else {
          shard.targetOpacity = 0.02;
          const driftAngle = (shard.index / skillData.length) * Math.PI * 2;
          shard.tx = centerX + Math.cos(driftAngle) * (width * 0.5);
          shard.ty = centerY + Math.sin(driftAngle) * (height * 0.5);
        }

        // Physics
        const tension = 0.04;
        const friction = 0.85;
        shard.vx = (shard.vx + (shard.tx - shard.x) * tension) * friction;
        shard.vy = (shard.vy + (shard.ty - shard.y) * tension) * friction;
        shard.x += shard.vx;
        shard.y += shard.vy;

        // 3D Parallax & Glint
        const dx = (shard.x + 110 * sf) - mouse.current.x;
        const dy = (shard.y + 35 * sf) - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 300 * sf) {
          const force = (1 - dist / (300 * sf));
          shard.x += (dx / dist) * force * 15;
          shard.y += (dy / dist) * force * 15;
          shard.rotationY = (dx / (300 * sf)) * 45;
          shard.rotationX = -(dy / (300 * sf)) * 45;
        } else {
          shard.rotationX *= 0.9;
          shard.rotationY *= 0.9;
        }

        // Direct DOM update for performance
        if (shard.el) {
          shard.el.style.opacity = shard.targetOpacity;
          shard.el.style.pointerEvents = shard.cat === activeMode ? 'auto' : 'none';
          shard.el.style.zIndex = shard.cat === activeMode ? '50' : '10';
          shard.el.style.transform = `translate3d(${shard.x}px, ${shard.y}px, 0) rotateX(${shard.rotationX}deg) rotateY(${shard.rotationY}deg)`;

          const gx = (mouse.current.x - (shard.x + 110 * sf)) / 1.5;
          const gy = (mouse.current.y - (shard.y + 35 * sf)) / 1.5;
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
    <div ref={containerRef} className="super-view-shell relative w-full bg-transparent overflow-hidden rounded-none text-white font-['Space_Grotesk'] antialiased">
      {/* Background FX (Scoped to container) */}
      <div className="absolute inset-0 pointer-events-none z-[5]" style={{
        background: `radial-gradient(circle at center, transparent 10%, rgba(0,0,0,0.9) 100%)`
      }} />
      <div
        className="absolute inset-0 pointer-events-none z-[2] transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${(mouse.current.x / (containerRef.current?.clientWidth || 1)) * 100}% ${(mouse.current.y / (containerRef.current?.clientHeight || 1)) * 100}%, ${activeColors.current.c1}33 0%, transparent 70%)`
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[20vh] pointer-events-none z-[6] opacity-10 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-[scan_8s_linear_infinite]" />
      <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />

      {/* MINIMALIST TOP NAVIGATION BAR */}
      <nav className="super-view-nav absolute top-0 left-0 w-full z-[200] pointer-events-none">
        <div className="super-view-nav__inner max-w-7xl mx-auto pointer-events-auto">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleModeSwitch(item.id)}
              className={`super-view-tab relative flex-1 flex flex-col items-center justify-center transition-all duration-500 group border-b border-transparent ${activeMode === item.id ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}
              style={{ '--active-c1': item.c1, '--active-c2': item.c2 }}
            >
              <span
                className={`super-view-tab__label font-black uppercase text-center transition-all duration-300 leading-tight ${activeMode === item.id ? '' : 'group-hover:text-white'}`}
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
      <div className="super-view-main relative z-[100] h-full flex flex-col justify-center pointer-events-none">
        <div className="super-view-stage flex-grow relative">
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
                perspective: '1500px'
              }}
            >
              {/* SHARD OUTER SHELL - Custom Notched Rectangle Shape */}
              <div
                className="super-shard-card relative bg-[#0a0c1b]/90 backdrop-blur-2xl border border-white/10 font-black uppercase whitespace-nowrap shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:bg-[#121525] group-hover:scale-110 overflow-hidden"
                style={{
                  clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                  textShadow: '0 0 10px rgba(0,0,0,0.5)'
                }}
              >
                {/* Active Highlight Border */}
                <div className="absolute left-0 top-0 w-2 h-full shadow-[0_0_30px_var(--active-c1)] opacity-70" style={{ background: `linear-gradient(to bottom, ${skill.c1}, ${skill.c2})` }} />

                {/* Decorative Points */}
                <div className="absolute top-0 right-0 w-1 h-3 bg-white/10" />
                <div className="absolute bottom-0 left-0 w-1 h-3 bg-white/10 ml-4" />

                {/* Internal Data Scanning Bar */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />

                <div className="absolute inset-[-100%] pointer-events-none opacity-25" style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 60%)',
                  transform: 'translate(var(--glint-x, 0), var(--glint-y, 0))'
                }} />

                <span className="super-shard-index font-mono opacity-60 italic text-white/50">0{(index % 7) + 1}</span>
                {skill.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}} />
    </div>
  );
}
