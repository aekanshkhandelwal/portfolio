import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <span className="nav-logo">AK<span className="dot">.</span></span>
                        <p className="footer-tagline">
                            Data Analyst & BI Developer<br />
                            Transforming complex data into visual stories.
                        </p>
                    </div>
                    <div className="footer-right">
                        <div className="footer-links">
                            <h4 className="footer-links-title">Quick Links</h4>
                            {['about', 'skills', 'projects', 'certifications', 'education', 'contact'].map((id) => (
                                <a href={`#${id}`} key={id} className="footer-nav-link">
                                    {id.charAt(0).toUpperCase() + id.slice(1)}
                                </a>
                            ))}
                        </div>
                        <div className="footer-socials">
                            {[
                                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/aekansh-khandelwal-780029231/' },
                                { name: 'GitHub', href: 'https://github.com/aekanshkhandelwal' },
                                { name: 'Twitter', href: '#' },
                            ].map((social) => (
                                <a href={social.href} key={social.name} className="social-pill" target="_blank" rel="noreferrer">
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-credits">
                        Built with React, CSS3 & Ambient Mist
                    </div>
                    <p className="copyright">&copy; {new Date().getFullYear()} Aekansh Khandelwal</p>
                </div>
            </div>
        </footer>
    );
}
