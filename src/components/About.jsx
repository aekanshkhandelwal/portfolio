import { GraduationCap, Briefcase } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import './About.css';
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export default function About() {
    useReveal();

    return (
        <section
            className="section about-section relative overflow-hidden"
            id="about"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
            }}
        >
            <div className="about-container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <Card className="about-main-card overflow-hidden border-none shadow-2xl relative bg-transparent dark:bg-transparent">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="white"
                    />

                    <div className="about-flex-container relative">

                        {/* Left content */}
                        <div className="about-left-content">
                            <div className="max-w-xl">
                                <h2 className="text-2xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 cinematic-title">
                                    Passionate about<br />
                                    <span className="text-glow-blue bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500">Data & Insights</span>
                                </h2>
                                <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light about-description">
                                    I am Aekansh Khandelwal, an <strong className="text-white font-semibold">Agentic AI & Automation</strong> specialist and <strong className="text-white font-semibold">Data Analyst</strong> focused on
                                    building autonomous systems and extracting high-impact insights. With a deep background in <strong className="text-white font-semibold">Software Development</strong>, I bridge the gap between complex analytics and intelligent automation.
                                </p>

                                <div className="tag-container mb-8">
                                    {['Agentic AI Specialist', 'Data Analyst', 'AI Automation Architect', 'Software Developer', 'Ai Assist Developer'].map((tag, i) => (
                                        <span key={tag}
                                            className="about-tag-premium stagger-item"
                                            style={{ transitionDelay: `${i * 100}ms` }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>



                                <div className="info-grid">
                                    {[
                                        { icon: <GraduationCap className="w-5 h-5" />, label: 'Education', val: 'B.E. CSE', color: 'cyan' },
                                        { icon: <Briefcase className="w-5 h-5" />, label: 'Availability', val: 'Open to Roles', color: 'indigo' },
                                    ].map((info, idx) => (
                                        <div key={idx}
                                            className={`glass-card stagger-item card-${info.color}`}
                                            style={{ transitionDelay: `${(idx + 4) * 100}ms` }}
                                            onMouseMove={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const x = e.clientX - rect.left;
                                                const y = e.clientY - rect.top;
                                                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                                                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                                            }}
                                        >
                                            <div className="info-button-shell">
                                                <div className="info-topline">
                                                    <div className={`icon-box color-${info.color}`}>
                                                        {info.icon}
                                                    </div>
                                                    <div className="info-label">{info.label}</div>
                                                </div>
                                                <div className="info-copy">
                                                    <div className="info-value">{info.val}</div>
                                                    <div className={`info-accent-line accent-${info.color}`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right content - Invisible placeholder to maintain layout */}
                        <div className="about-right-content pointer-events-none invisible md:visible">
                        </div>
                    </div>
                </Card>
            </div>

            {/* Foreground Spline Mascot - Top layer for tracking, but allow clicks through */}
            <div className="about-mascot-layer absolute inset-0 z-[50] pointer-events-none">
                <div className="about-mascot-frame w-full h-full pointer-events-auto">
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="about-mascot-scene w-full h-full"
                    />
                </div>
            </div>
        </section>
    );
}
