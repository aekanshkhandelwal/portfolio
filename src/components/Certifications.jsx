import useReveal from '../hooks/useReveal';
import './Certifications.css';

const certifications = [
    {
        title: 'Google Foundations: Data, Data, Everywhere',
        issuer: 'Google',
        desc: 'Mastered data ecosystems, analytical thinking, and the role of spreadsheets, SQL, and Tableau in data-driven decision making.',
        icon: 'G',
        class: 'google',
        isVerified: true,
        credentialLink: 'https://www.coursera.org/account/accomplishments/verify/YF5S34ZHGQRL',
        previewImage: '/Certifications/image1.png',
        logo: '/logos/image1.png'
    },
    {
        title: 'Data Science at Scale Specialization',
        issuer: 'University of Washington',
        desc: 'Deep dive into scalable data management (SQL/NoSQL), MapReduce, Spark, and statistical machine learning for massive datasets.',
        icon: 'D',
        class: 'sql',
        isVerified: true,
        credentialLink: 'https://www.coursera.org/account/accomplishments/specialization/WGNDKO0L5H7A',
        previewImage: '/Certifications/image2.png',
        logo: '/logos/image2.png'
    },
    {
        title: 'Introduction to Data Analytics',
        issuer: 'IBM',
        desc: 'Foundational concepts of data analytics, data life cycles, and the ecosystem of data tools and platforms.',
        icon: 'I',
        class: 'ibm',
        isVerified: true,
        credentialLink: 'https://www.coursera.org/account/accomplishments/verify/GPBSVLE4QBSC',
        previewImage: '/Certifications/image3.png',
        logo: '/logos/image3.png'
    },
    {
        title: 'Tableau Business Intelligence Analyst',
        issuer: 'Tableau',
        desc: 'Professional certificate for mastering data visualization, dashboarding, and business storytelling with Tableau.',
        icon: 'T',
        class: 'google',
        isVerified: true,
        credentialLink: 'https://www.coursera.org/account/accomplishments/professional-cert/IP4A1AJYMNY9',
        previewImage: '/Certifications/image4.png',
        logo: '/logos/image4.png'
    },
    {
        title: 'PwC Power BI Virtual Case Experience',
        issuer: 'PwC',
        desc: 'Real-world simulations building interactive Power BI dashboards for call center analysis and diversity tracking.',
        icon: 'P',
        class: 'pwc',
        isVerified: true,
        credentialLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7165641406575824898/',
        previewImage: '/Certifications/image5.png',
        logo: '/logos/image5.png'
    },
    {
        title: 'SQL for Data Science',
        issuer: 'University of California, Davis',
        desc: 'Applied complex SQL querying and filtering techniques for analytical problem-solving with real datasets.',
        icon: 'S',
        class: 'sql',
        isVerified: true,
        credentialLink: 'https://www.coursera.org/account/accomplishments/verify/NDELQC73PLPY?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course',
        previewImage: '/Certifications/image6.png',
        logo: '/logos/image6.png'
    },
    {
        title: 'Programming in C++: Hands-on Introduction',
        issuer: 'Codio',
        desc: 'Core C++ programming concepts, memory management, and advanced object-oriented programming techniques.',
        icon: 'C',
        class: 'cpp',
        isVerified: true,
        credentialLink: 'https://www.coursera.org/account/accomplishments/specialization/JPNNHNE8ZE8L',
        previewImage: '/Certifications/image7.png',
        logo: '/logos/image7.png'
    },
    {
        title: 'IBM NoSQL, Big Data, and Spark Foundations',
        issuer: 'IBM',
        desc: 'Comprehensive training in distributed computing, Apache Spark, and NoSQL database management at scale.',
        icon: 'B',
        class: 'ibm',
        isVerified: true,
        credentialLink: 'https://www.coursera.org/account/accomplishments/specialization/7363WC859KVP',
        previewImage: '/Certifications/image8.png',
        logo: '/logos/image8.png'
    },
    {
        title: 'SQL (Intermediate) Certificate',
        issuer: 'HackerRank',
        desc: 'Advanced SQL proficiency covering complex joins, unions, and nested sub-queries via industry-standard assessment.',
        icon: 'H',
        class: 'cpp',
        isVerified: true,
        credentialLink: 'https://www.hackerrank.com/certificates/cd904d85f80c',
        previewImage: '/Certifications/image9.png',
        logo: '/logos/image9.png'
    },
];

export default function Certifications() {
    useReveal();

    return (
        <section className="section certs-section" id="certifications">
            <div className="container">
                <div className="section-tag">Credentials</div>
                <h2 className="section-title">
                    Certifications &amp; <span className="gradient-text">Learning</span>
                </h2>
                <div className="certs-grid">
                    {certifications.map((cert, idx) => {
                        const CardWrapper = cert.credentialLink ? 'a' : 'div';
                        const wrapperProps = cert.credentialLink
                            ? { href: cert.credentialLink, target: '_blank', rel: 'noopener noreferrer' }
                            : {};

                        return (
                            <div className={`cert-card-container reveal ${cert.credentialLink ? 'clickable' : ''}`} key={idx}>
                                <CardWrapper className="cert-card-inner" {...wrapperProps}>
                                    {/* Front Side */}
                                    <div className="cert-front">
                                        <div className="cert-main">
                                            <div className={`cert-logo ${cert.class}`}>
                                                {cert.logo ? (
                                                    <img src={cert.logo} alt={cert.issuer} className="cert-logo-img" />
                                                ) : (
                                                    <span>{cert.icon}</span>
                                                )}
                                            </div>
                                            <div className="cert-info">
                                                <div className="cert-header">
                                                    <div className="cert-issuer-wrap">
                                                        <span className="cert-issuer">{cert.issuer}</span>
                                                        {cert.isVerified && (
                                                            <span className="cert-verified-badge" title="Verified Certification">
                                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <h3>{cert.title}</h3>
                                                <p className="cert-desc-front">{cert.desc}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back Side */}
                                    <div className="cert-back">
                                        <div className="cert-preview-wrap">
                                            {/* Blurred background preview */}
                                            <img src={cert.previewImage} alt="" className="cert-preview-bg" />
                                            {/* Sharp contained preview */}
                                            <img src={cert.previewImage} alt={`${cert.title} Preview`} className="cert-preview-img" />

                                            <div className="cert-preview-overlay">
                                                {cert.credentialLink && (
                                                    <div className="cert-link-hint">
                                                        <span>View Credential</span>
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                            <polyline points="15 3 21 3 21 9"></polyline>
                                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardWrapper>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
