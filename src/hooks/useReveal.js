import { useEffect, useRef } from 'react';

export default function useReveal(deps = []) {
    const ref = useRef(null);

    useEffect(() => {
        function startObserving() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.15 }
            );

            const elements = ref.current ? [ref.current] : document.querySelectorAll('.reveal');
            elements.forEach((el) => observer.observe(el));

            return () => observer.disconnect();
        }

        // If the intro overlay is still in the DOM, wait for it to leave before revealing
        const overlay = document.querySelector('.intro-overlay');
        if (overlay) {
            // Poll until the intro overlay is done (removed or has 'done' class)
            const poll = setInterval(() => {
                const el = document.querySelector('.intro-overlay:not(.done)');
                if (!el) {
                    clearInterval(poll);
                    startObserving();
                }
            }, 100);
            return () => clearInterval(poll);
        } else {
            return startObserving();
        }
    }, [...deps]);

    return ref;
}
