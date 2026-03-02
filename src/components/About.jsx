import useReveal from '../hooks/useReveal';
import './About.css';

export default function About() {
    useReveal();

    return (
        <section className="section about-section" id="about">
            <div className="container">
                <div className="about-grid">
                    <div className="about-text reveal">

                        <div className="about-content-inner">
                            <h2 className="section-title">
                                Passionate about <span className="gradient-text">Data &amp; Insights</span>
                            </h2>
                            <p className="about-p">
                                I am Aekansh Khandelwal, an <strong>Agentic AI &amp; Automation</strong> specialist and <strong>Data Analyst</strong> focused on
                                building autonomous systems and extracting high-impact insights. With a deep background in <strong>Software Development</strong>,
                                I bridge the gap between complex analytics and intelligent automation.
                            </p>
                            <div className="about-highlights">
                                {['Agentic AI Specialist', 'Data Analyst', 'AI Automation Architect', 'Software Developer'].map((tag) => (
                                    <span className="about-tag" key={tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="about-cards reveal">
                        {[
                            { icon: '📍', label: 'Location', val: 'India' },
                            { icon: '🎓', label: 'Education', val: 'B.E. Computer Science' },
                            { icon: '💼', label: 'Availability', val: 'Open to Roles' },
                        ].map((info, idx) => (
                            <div className="info-card" key={idx}>
                                <div className="ic-icon">{info.icon}</div>
                                <div className="ic-content">
                                    <span className="ic-label">{info.label}</span>
                                    <span className="ic-val">{info.val}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
