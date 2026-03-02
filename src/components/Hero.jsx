import { useEffect, useRef, useState } from 'react'
import './Hero.css'

export default function Hero() {
    const handleMouseMove = (e) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section className="hero" id="hero">
            {/* High-Fidelity Data Stream Background */}
            <div className="hero-data-stream">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`stream-line line-${i + 1}`}></div>
                ))}
            </div>

            <div className="container hero-inner">
                <div className="hero-content">

                    <h1 className="hero-title">
                        <span className="title-reveal-part prefix">Hi, I'm</span> <span className="gradient-text text-glow">Aekansh</span><br />
                        <span className="title-reveal-part suffix">Data Analyst &amp; Software Developer</span>
                    </h1>
                    <p className="hero-subtitle">
                        Building intelligent agentic systems and automating complex workflows.
                        Specializing in AI-driven automation, <strong>Advanced Data Analytics</strong>, and high-impact software solutions.
                    </p>
                    <div className="hero-actions">
                        <a href="#projects" className="btn cssbuttons-io magnetic-btn">
                            <span>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z" fill="currentColor" />
                                </svg>
                                View Projects
                            </span>
                        </a>
                        <a
                            href="https://aekansh-ragbot.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn cssbuttons-io magnetic-btn"
                        >
                            <span>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" fill="currentColor" />
                                    <circle cx="8" cy="10" r="1.5" fill="currentColor" />
                                    <circle cx="16" cy="10" r="1.5" fill="currentColor" />
                                </svg>
                                Chat with AI
                            </span>
                        </a>
                        <a href="#contact" className="btn cssbuttons-io magnetic-btn">
                            <span>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
                                </svg>
                                Get In Touch
                            </span>
                        </a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="visual-container">
                        <div className="skill-sphere s1" onMouseMove={handleMouseMove}>Power BI</div>
                        <div className="skill-sphere s2" onMouseMove={handleMouseMove}>Python</div>
                        <div className="skill-sphere s3" onMouseMove={handleMouseMove}>SQL</div>
                        <div className="skill-sphere s4" onMouseMove={handleMouseMove}>ML</div>
                        <div className="skill-sphere s5" onMouseMove={handleMouseMove}>AI</div>

                        <div className="terminal-card" onMouseMove={handleMouseMove}>
                            <div className="card-noise"></div>
                            <div className="card-glow"></div>
                            <div className="tc-header">
                                <div className="tc-dots"><span></span><span></span><span></span></div>
                                <div className="tc-tab">analytics.py</div>
                            </div>
                            <div className="tc-body">
                                <div className="coding-content">
                                    <div className="code-line" style={{ '--l-idx': 0 }}>import pandas as pd</div>
                                    <div className="code-line" style={{ '--l-idx': 1 }}>import plotly.express as px</div>
                                    <div className="code-line" style={{ '--l-idx': 2 }}></div>
                                    <div className="code-line" style={{ '--l-idx': 3 }}>df = pd.read_csv('insights.csv')</div>
                                    <div className="code-line" style={{ '--l-idx': 4 }}>kpis = df.groupby('segment').sum()</div>
                                    <div className="code-line" style={{ '--l-idx': 5 }}></div>
                                    <div className="code-line" style={{ '--l-idx': 6 }}>fig = px.bar(kpis, title='ROI Analyzed')</div>
                                    <div className="code-line" style={{ '--l-idx': 7 }}>fig.show()</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
