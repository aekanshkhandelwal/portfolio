import useReveal from '../hooks/useReveal';
import './Education.css';

const educationData = [
    {
        year: '2025',
        period: 'Aug 2021 — May 2025',
        title: 'B.E. — Computer Science Engineering (Big Data Analytics)',
        institution: 'Chandigarh University, Mohali',
        badge: '8.02 CGPA',
    },
    {
        year: '2020',
        period: 'April 2020',
        title: 'Higher Secondary School',
        institution: 'Frame International School, Dausa, Rajasthan (CBSE)',
        badge: 'Class XII',
    },
    {
        year: '2018',
        period: 'March 2018',
        title: 'Secondary School School',
        institution: 'Shree Ashram The International School, Dausa, Rajasthan (CBSE)',
        badge: 'Class X',
    },
];

export default function Education() {
    useReveal();

    return (
        <section className="edu-section" id="education">
            <div className="edu-container">

                {/* Header */}
                <div className="edu-header-row reveal">
                    <div>
                        <h2 className="edu-section-title">Education</h2>
                        <p className="edu-section-subtitle">My Academic Journey</p>
                    </div>
                </div>

                {/* Education Items */}
                <div className="edu-list">
                    {educationData.map((edu, idx) => (
                        <div className="edu-item reveal" key={idx}>
                            {/* Ghost year behind content */}
                            <div className="ghost-year">{edu.year}</div>

                            {/* Left accent bar */}
                            <div className="edu-accent-bar" />

                            <div className="edu-content-wrapper">
                                <div className="edu-info">
                                    <p className="edu-period">{edu.period}</p>
                                    <h3 className="edu-degree">{edu.title}</h3>
                                </div>

                                <div className="edu-meta">
                                    <p className="edu-institution">{edu.institution}</p>
                                    <div className="edu-badge">
                                        <span className="edu-badge-text">{edu.badge}</span>
                                        <div className="edu-badge-slide" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer decoration */}
                <div className="edu-footer-deco">
                    <div className="edu-footer-line" />
                    <p className="edu-footer-text">End of Record</p>
                    <div className="edu-footer-line right" />
                </div>

            </div>
        </section>
    );
}
