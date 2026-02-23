import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

export default function Contact() {
    const [status, setStatus] = useState('');
    const form = useRef();

    const handleMouseMove = (e) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS Missing Configuration:', {
                serviceId: !!serviceId,
                templateId: !!templateId,
                publicKey: !!publicKey
            });
            setStatus('error');
            return;
        }

        setStatus('sending');

        emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then(() => {
                setStatus('sent');
                e.target.reset();
                setTimeout(() => setStatus(''), 5000);
            }, (error) => {
                console.error('FAILED...', error.text);
                setStatus('error');
                setTimeout(() => setStatus(''), 5000);
            });
    };

    return (
        <section className="section contact-section" id="contact">
            {/* SVG Noise Filter */}
            <svg style={{ display: 'none' }}>
                <filter id='contactNoiseFilter'>
                    <feTurbulence
                        type='fractalNoise'
                        baseFrequency='0.6'
                        numOctaves='3'
                        stitchTiles='stitch' />
                </filter>
            </svg>

            <div className="container">
                <div className="section-header reveal">
                    <div className="section-tag">Network</div>
                    <h2 className="section-title">
                        Let's <span className="gradient-text text-glow">Connect</span>
                    </h2>
                </div>

                <div className="contact-bento-grid">
                    {/* Main Form Card */}
                    <div className="bento-card card-form reveal" onMouseMove={handleMouseMove}>
                        <div className="b-noise"></div>
                        <div className="b-glow"></div>
                        <h3>Direct Transmission</h3>
                        <form ref={form} className="contact-form-inner" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Identity</label>
                                <input type="text" name="from_name" placeholder="Your name" required />
                            </div>
                            <div className="form-group">
                                <label>Channel</label>
                                <input type="email" name="from_email" placeholder="email@example.com" required />
                            </div>
                            <div className="form-group">
                                <label>Signal Content</label>
                                <textarea name="description" rows="4" placeholder="Briefly describe your request..." required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary magnetic-btn" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Sending...' : 'Initialize Connection →'}
                            </button>
                            {status === 'sent' && <p className="success-note">✅ Transmission Successful!</p>}
                            {status === 'error' && <p className="success-note" style={{ color: '#ef4444' }}>❌ Connection Failed. Try again.</p>}
                        </form>
                    </div>

                    <div className="contact-side-grid">
                        <div className="side-row">
                            {/* LinkedIn Card */}
                            <a href="https://www.linkedin.com/in/aekansh-khandelwal-780029231/"
                                target="_blank" rel="noreferrer"
                                className="bento-card card-social reveal"
                                onMouseMove={handleMouseMove}>
                                <div className="b-noise"></div>
                                <div className="b-glow"></div>
                                <div className="c-icon">🔗</div>
                                <div className="c-info">
                                    <span className="c-label">LinkedIn</span>
                                    <span className="c-val">/in/aekansh</span>
                                </div>
                            </a>

                            {/* GitHub Card */}
                            <a href="https://github.com/aekanshkhandelwal"
                                target="_blank" rel="noreferrer"
                                className="bento-card card-social reveal"
                                onMouseMove={handleMouseMove}>
                                <div className="b-noise"></div>
                                <div className="b-glow"></div>
                                <div className="c-icon">💻</div>
                                <div className="c-info">
                                    <span className="c-label">GitHub</span>
                                    <span className="c-val">@aekansh</span>
                                </div>
                            </a>
                        </div>

                        {/* Status Card */}
                        <div className="bento-card card-status reveal" onMouseMove={handleMouseMove}>
                            <div className="b-noise"></div>
                            <div className="b-glow"></div>
                            <div className="status-indicator">
                                <div className="pulse-dot"></div>
                                <span className="status-text">Ready for Interaction</span>
                            </div>
                            <div className="c-info">
                                <span className="c-label">Availability</span>
                                <span className="c-val">Open for Collaboration</span>
                            </div>
                        </div>

                        <div className="side-row">
                            {/* Email Card */}
                            <div className="bento-card card-mini reveal" onMouseMove={handleMouseMove}>
                                <div className="b-noise"></div>
                                <div className="b-glow"></div>
                                <div className="c-icon">✉️</div>
                                <div className="c-info">
                                    <span className="c-label">Channel</span>
                                    <span className="c-val">Email</span>
                                </div>
                            </div>

                            {/* Phone Card */}
                            <div className="bento-card card-mini reveal" onMouseMove={handleMouseMove}>
                                <div className="b-noise"></div>
                                <div className="b-glow"></div>
                                <div className="c-icon">📞</div>
                                <div className="c-info">
                                    <span className="c-label">Direct</span>
                                    <span className="c-val">Voice</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
