import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './ProjectDesktopModal.css';

/**
 * ProjectDesktopModal
 *
 * Uses React Portal to render directly on document.body — bypasses ALL parent
 * CSS transforms/filters/perspectives that would break position:fixed.
 *
 * The desktop OS runs at native 1200×675px then JS scales it to fill the screen.
 */
export default function ProjectDesktopModal({ isOpen, onClose, onSwitchView, children }) {
    const innerRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [scaledHeight, setScaledHeight] = useState(675);

    const DESKTOP_W = 1200;
    const DESKTOP_H = 675;

    const calculateScale = () => {
        const availW = window.innerWidth;
        const availH = window.innerHeight;
        const s = Math.min(availW / DESKTOP_W, availH / DESKTOP_H);
        setScale(s);
        setScaledHeight(DESKTOP_H * s);
    };

    useEffect(() => {
        if (!isOpen) return;
        calculateScale();
        window.addEventListener('resize', calculateScale);
        return () => window.removeEventListener('resize', calculateScale);
    }, [isOpen]);

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    const views = [
        { id: 'grid',  title: 'Grid',    path: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
        { id: 'swipe', title: 'HUD',     path: 'M3 3h18v18H3z M7 12h10 M7 8h10 M7 16h10' },
        { id: 'comic', title: 'Comic',   path: 'M3 3h18v18H3z M7 7h10 M7 11h10 M14 15h3 M7 15h4' },
    ];

    // Portal renders on document.body — no parent transforms can trap it
    return createPortal(
        <div className="pdm-overlay">
            {/* Scaled desktop content — layout box matches visual size */}
            <div className="pdm-viewport" style={{ height: scaledHeight }}>
                <div
                    ref={innerRef}
                    className="pdm-inner"
                    style={{
                        width: DESKTOP_W,
                        height: DESKTOP_H,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                    }}
                >
                    {children}
                </div>
            </div>

            {/* Floating action bar — switch views or close */}
            <div className="pdm-fab-bar">
                {views.map(v => (
                    <button
                        key={v.id}
                        className="pdm-fab-btn"
                        onClick={() => onSwitchView(v.id)}
                        title={v.title}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d={v.path} />
                        </svg>
                    </button>
                ))}
                <div className="pdm-fab-divider" />
                <button className="pdm-fab-btn pdm-fab-close" onClick={onClose} title="Close">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                </button>
            </div>
        </div>,
        document.body
    );
}
