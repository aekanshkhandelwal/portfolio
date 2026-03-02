import { useEffect, useRef, useState } from 'react';
import './IntroScreen.css';

const LOAD_DURATION = 2000;    // loading bar duration (ms)
const FLIP_DURATION = 700;     // Slightly faster for snappier landing
const PRE_FLIP_DELAY = 150;    // brief pause after bar fills before FLIP starts

export default function IntroScreen({ onComplete }) {
    const nameRef = useRef(null);
    const [bgFading, setBgFading] = useState(false);   // black bg fades out while name flies
    const [barFading, setBarFading] = useState(false); // bar + label hide when FLIP starts
    const [done, setDone] = useState(false);           // removes overlay from DOM

    useEffect(() => {
        const timer = setTimeout(() => {
            startFlip();
        }, LOAD_DURATION + PRE_FLIP_DELAY);

        return () => clearTimeout(timer);
    }, []);

    function startFlip() {
        const introEl = nameRef.current;

        // Immediately fade the black background and bar/label
        // so the site content is revealed underneath as the name flies
        setBgFading(true);
        setBarFading(true);

        if (!introEl) {
            setTimeout(() => { onComplete(); setDone(true); }, 800);
            return;
        }

        // Locate the target element in the Hero
        const heroTarget = document.querySelector('.hero-title .gradient-text.text-glow');
        if (!heroTarget) {
            setTimeout(() => { onComplete(); setDone(true); }, 800);
            return;
        }

        // ── FLIP: measure both positions ──
        const introRect = introEl.getBoundingClientRect();
        const heroRect = heroTarget.getBoundingClientRect();

        const introCX = introRect.left + introRect.width / 2;
        const introCY = introRect.top + introRect.height / 2;
        const heroCX = heroRect.left + heroRect.width / 2;
        const heroCY = heroRect.top + heroRect.height / 2;

        const dx = heroCX - introCX;
        const dy = heroCY - introCY;
        const scale = Math.min(heroRect.width / introRect.width, heroRect.height / introRect.height);

        // Start position: no transform
        introEl.style.transition = 'none';
        introEl.style.transform = 'none';
        introEl.style.opacity = '1';
        introEl.getBoundingClientRect(); // force reflow

        // Animate to hero position; fade out near the end so it "lands" before disappearing
        introEl.style.transition = `
            transform ${FLIP_DURATION}ms cubic-bezier(0.19, 1, 0.22, 1),
            opacity   150ms ease ${FLIP_DURATION - 50}ms
        `;
        introEl.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
        introEl.style.opacity = '0';

        // After FLIP lands: notify parent → triggers staggered site reveal
        setTimeout(() => {
            onComplete();
            // Give one more frame then remove overlay entirely
            requestAnimationFrame(() => setDone(true));
        }, FLIP_DURATION + 50);
    }

    return (
        <div className={`intro-overlay${done ? ' done' : ''}`}>
            {/* Black background layer — fades independently */}
            <div className={`intro-bg${bgFading ? ' fading' : ''}`} />
            <div className={`intro-glow${bgFading ? ' fading' : ''}`} />

            {/* Name — does the FLIP */}
            <span className="intro-name" ref={nameRef}>Aekansh</span>

            {/* Bar + label — hide when FLIP starts */}
            <div className={`intro-bar-wrap${barFading ? ' fading' : ''}`}>
                <div className="intro-bar-fill" />
            </div>
            <span className={`intro-label${barFading ? ' fading' : ''}`}>Loading</span>
        </div>
    );
}
