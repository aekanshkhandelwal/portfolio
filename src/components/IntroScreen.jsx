import { useEffect, useRef, useState } from 'react';
import './IntroScreen.css';

const LOAD_DURATION = 2000;    // loading bar duration (ms)
const FLIP_DURATION = 700;     // Slightly faster for snappier landing
const PRE_FLIP_DELAY = 150;    // brief pause after bar fills before FLIP starts

export default function IntroScreen({ onComplete }) {
    const nameRef = useRef(null);
    const [stage, setStage] = useState('image'); // 'image' -> 'original'
    const [bgFading, setBgFading] = useState(false);
    const [barFading, setBarFading] = useState(false);
    const [done, setDone] = useState(false);
    const [imageBlinking, setImageBlinking] = useState(false);

    useEffect(() => {
        // 1. Initial Image Phase
        const blinkTimer = setTimeout(() => {
            setImageBlinking(true);
        }, 800);

        // 2. Transition to Original Loading Phase (disappear image, show name) after 2.2s
        const originalTimer = setTimeout(() => {
            setStage('original');
        }, 2200);

        // 3. Start FLIP after the original loading duration (2s) + prefix (2.2s) + delay
        const flipTimer = setTimeout(() => {
            startFlip();
        }, 2200 + LOAD_DURATION + PRE_FLIP_DELAY);

        return () => {
            clearTimeout(blinkTimer);
            clearTimeout(originalTimer);
            clearTimeout(flipTimer);
        };
    }, []);

    function startFlip() {
        const introEl = nameRef.current;
        if (!introEl) {
            onComplete();
            setDone(true);
            return;
        }

        // Fade out overlay elements
        setBgFading(true);
        setBarFading(true);

        const heroTarget = document.getElementById('flip-target');
        if (!heroTarget) {
            setTimeout(() => { onComplete(); setDone(true); }, 800);
            return;
        }

        requestAnimationFrame(() => {
            const introRect = introEl.getBoundingClientRect();
            const heroRect = heroTarget.getBoundingClientRect();

            const dx = (heroRect.left + heroRect.width / 2) - (introRect.left + introRect.width / 2);
            const dy = (heroRect.top + heroRect.height / 2) - (introRect.top + introRect.height / 2);
            const scale = Math.min(heroRect.width / introRect.width, heroRect.height / introRect.height);

            introEl.style.transition = 'none';
            introEl.style.transform = 'none';
            introEl.style.opacity = '1';
            introEl.getBoundingClientRect(); // force reflow

            introEl.style.transition = `
                transform ${FLIP_DURATION}ms cubic-bezier(0.19, 1, 0.22, 1),
                opacity   150ms ease ${FLIP_DURATION - 50}ms
            `;
            introEl.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
            introEl.style.opacity = '0';

            setTimeout(() => {
                onComplete();
                requestAnimationFrame(() => setDone(true));
            }, FLIP_DURATION + 50);
        });
    }

    return (
        <div className={`intro-overlay${done ? ' done' : ''}`}>
            {/* Background Layers */}
            <div className={`intro-bg${bgFading ? ' fading' : ''}`} />
            <div className={`intro-glow${bgFading ? ' fading' : ''}`} />

            {/* Background Image Layer (Persistent across stages) */}
            <div className={`intro-image-container${stage === 'original' ? ' stage-2' : ''}`}>
                <img 
                    src="/loading.png" 
                    alt="Loading" 
                    className={`intro-image${imageBlinking ? ' blinking' : ''}`}
                />
            </div>

            {/* Stage 2: Original Loading Animation */}
            {stage === 'original' && (
                <div className="intro-original-content">
                    <span className="intro-name" ref={nameRef}>Aekansh</span>

                    <div className={`intro-bar-wrap${barFading ? ' fading' : ''}`}>
                        <div className="intro-bar-fill" />
                    </div>
                    <span className={`intro-label${barFading ? ' fading' : ''}`}>Loading</span>
                </div>
            )}
        </div>
    );
}
