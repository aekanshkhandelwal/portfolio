import useReveal from '../hooks/useReveal';
import './Education.css';

const educationData = [
    {
        period: 'Aug 2021 – May 2025',
        title: 'B.E. – Computer Science Engineering (Big Data Analytics)',
        institution: 'Chandigarh University, Mohali',
        gpa: '8.02 / 10.00',
    },
    {
        period: 'April 2020',
        title: 'Higher Secondary Certificate (Class XII)',
        institution: 'Frame International School, Dausa, Rajasthan (CBSE)',
        gpa: 'Class XII',
    },
    {
        period: 'March 2018',
        title: 'Secondary School Certificate (Class X)',
        institution: 'Shree Ashram The International School, Dausa, Rajasthan (CBSE)',
        gpa: 'Class X',
    },
];

export default function Education() {
    useReveal();

    return (
        <section className="section edu-section" id="education">
            <div className="container">

                <h2 className="section-title">
                    Education &amp; <span className="gradient-text">Background</span>
                </h2>
                <div className="timeline">
                    {educationData.map((edu, idx) => (
                        <div className="tl-item reveal" key={idx}>
                            <div className="tl-pulse"></div>
                            <div className="tl-card">
                                <div className="tl-main">
                                    <div className="tl-info">
                                        <div className="tl-meta">
                                            <span className="tl-date">{edu.period}</span>
                                        </div>
                                        <h3>{edu.title}</h3>
                                        <p className="tl-inst">{edu.institution}</p>
                                    </div>

                                    <div className="tl-viz">
                                        <div className="cgpa-badge reveal">
                                            {edu.gpa.includes('/') ? `${edu.gpa.split('/')[0]} CGPA` : edu.gpa}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
