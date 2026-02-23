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
                    <div className="section-tag hero-badge reveal">
                        Available for Opportunity
                    </div>
                    <h1 className="hero-title">
                        Hi, I'm <span className="gradient-text text-glow">Aekansh</span><br />
                        <span className="hero-title-line">Data Analyst &amp; Software Developer</span>
                    </h1>
                    <p className="hero-subtitle">
                        Building intelligent agentic systems and automating complex workflows.
                        Specializing in AI-driven automation, <strong>Advanced Data Analytics</strong>, and high-impact software solutions.
                    </p>
                    <div className="hero-actions">
                        <a href="#projects" className="btn btn-primary magnetic-btn">View Projects</a>
                        <a href="#contact" className="btn btn-outline magnetic-btn">Get In Touch</a>
                        <a
                            href="https://drive.google.com/file/d/19gRBBPgUK3UpEXSJUnXEYG7WXx_LYpyb/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-resume magnetic-btn"
                        >
                            <span className="resume-icon">↗</span> Resume
                        </a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="visual-container reveal">
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
