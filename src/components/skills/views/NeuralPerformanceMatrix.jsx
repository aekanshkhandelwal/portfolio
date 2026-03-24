import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Interactive Three.js skill matrix (card-friendly).
 *
 * `skills`: [{ label, value (0-100), color, icon }]
 * - `icon` can be a React node; it will only be rendered in the HUD/legend (not in Three.js).
 */
const NeuralPerformanceMatrix = ({ skills, accent = '#a855f7' }) => {
    const mountRef = useRef(null);
    const rafRef = useRef(0);
    const isDraggingRef = useRef(false);
    const prevMouseRef = useRef({ x: 0, y: 0 });

    const nodesRef = useRef([]);
    const linesRef = useRef([]);
    const raycasterRef = useRef(new THREE.Raycaster());
    const mouseRef = useRef(new THREE.Vector2());

    const [activeNode, setActiveNode] = useState(null);

    useEffect(() => {
        if (!mountRef.current) return undefined;

        const mountEl = mountRef.current;
        mountEl.innerHTML = '';

        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
        // Keep the "rotation effect" visible even when reduced-motion is enabled.
        // (You can re-add strict reduced-motion behavior later via a prop if needed.)
        const autoRotateSpeed = prefersReducedMotion ? 0.0012 : 0.0022;
        const particleRotateSpeed = prefersReducedMotion ? 0.0003 : 0.0006;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        mountEl.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(new THREE.Color(accent), 2, 20);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const coreGeom = new THREE.IcosahedronGeometry(1, 1);
        const coreMat = new THREE.MeshPhongMaterial({
            color: new THREE.Color(accent),
            wireframe: true,
            transparent: true,
            opacity: 0.6,
        });
        const core = new THREE.Mesh(coreGeom, coreMat);
        scene.add(core);

        const particlesGeom = new THREE.BufferGeometry();
        const particleCount = 900;
        const particlePositions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particlePositions.length; i += 1) {
            particlePositions[i] = (Math.random() - 0.5) * 30;
        }
        particlesGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        const particlesMat = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.4,
        });
        const particles = new THREE.Points(particlesGeom, particlesMat);
        scene.add(particles);

        const nodes = [];
        const lines = [];
        const safeSkills = Array.isArray(skills) ? skills : [];

        if (safeSkills.length > 0) {
            safeSkills.forEach((skill, i) => {
                const angle = (i / safeSkills.length) * Math.PI * 2;
                const radius = (Number(skill.value) / 100) * 5;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const z = (Math.random() - 0.5) * 2;

                const nodeGeom = new THREE.SphereGeometry(0.15, 16, 16);
                const nodeColor = new THREE.Color(skill.color || accent);
                const nodeMat = new THREE.MeshPhongMaterial({
                    color: nodeColor,
                    emissive: nodeColor,
                    emissiveIntensity: 0.5,
                });
                const node = new THREE.Mesh(nodeGeom, nodeMat);
                node.position.set(x, y, z);
                node.userData = { ...skill, index: i };
                nodes.push(node);
                scene.add(node);

                const lineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), node.position]);
                const lineMat = new THREE.LineBasicMaterial({
                    color: nodeColor,
                    transparent: true,
                    opacity: 0.2,
                });
                const line = new THREE.Line(lineGeom, lineMat);
                lines.push(line);
                scene.add(line);
            });
        }

        nodesRef.current = nodes;
        linesRef.current = lines;

        const canvas = renderer.domElement;
        canvas.classList.add('mx-neural-canvas-el');

        const updateSize = () => {
            const w = mountEl.clientWidth || 1;
            const h = mountEl.clientHeight || 1;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
        };
        updateSize();

        const resizeObs = new ResizeObserver(updateSize);
        resizeObs.observe(mountEl);

        const updateRaycast = (clientX, clientY) => {
            const rect = canvas.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            const x = ((clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
            mouseRef.current.set(x, y);
            raycasterRef.current.setFromCamera(mouseRef.current, camera);
            const intersects = raycasterRef.current.intersectObjects(nodesRef.current, false);
            if (intersects.length > 0) setActiveNode(intersects[0].object.userData);
            else setActiveNode(null);
        };

        const onPointerDown = (e) => {
            isDraggingRef.current = true;
            prevMouseRef.current = { x: e.clientX, y: e.clientY };
            try {
                canvas.setPointerCapture?.(e.pointerId);
            } catch {
                // ignore
            }
            canvas.classList.add('mx-neural-grabbing');
        };

        const onPointerUp = (e) => {
            isDraggingRef.current = false;
            try {
                canvas.releasePointerCapture?.(e.pointerId);
            } catch {
                // ignore
            }
            canvas.classList.remove('mx-neural-grabbing');
        };

        const onPointerMove = (e) => {
            if (isDraggingRef.current) {
                const deltaX = e.clientX - prevMouseRef.current.x;
                const deltaY = e.clientY - prevMouseRef.current.y;
                scene.rotation.y += deltaX * 0.005;
                scene.rotation.x += deltaY * 0.005;
            }
            prevMouseRef.current = { x: e.clientX, y: e.clientY };
            updateRaycast(e.clientX, e.clientY);
        };

        const onPointerLeave = () => {
            if (!isDraggingRef.current) setActiveNode(null);
        };

        canvas.addEventListener('pointerdown', onPointerDown, { passive: true });
        canvas.addEventListener('pointerup', onPointerUp, { passive: true });
        canvas.addEventListener('pointercancel', onPointerUp, { passive: true });
        canvas.addEventListener('pointermove', onPointerMove, { passive: true });
        canvas.addEventListener('pointerleave', onPointerLeave, { passive: true });

        const animate = () => {
            rafRef.current = requestAnimationFrame(animate);

            core.rotation.y += 0.01;
            core.rotation.x += 0.005;

            if (!isDraggingRef.current) scene.rotation.y += autoRotateSpeed;
            particles.rotation.y -= particleRotateSpeed;
            linesRef.current.forEach((line, i) => {
                line.material.opacity = 0.1 + Math.sin(Date.now() * 0.002 + i) * 0.1;
            });

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            resizeObs.disconnect();
            cancelAnimationFrame(rafRef.current);

            canvas.removeEventListener('pointerdown', onPointerDown);
            canvas.removeEventListener('pointerup', onPointerUp);
            canvas.removeEventListener('pointercancel', onPointerUp);
            canvas.removeEventListener('pointermove', onPointerMove);
            canvas.removeEventListener('pointerleave', onPointerLeave);

            nodesRef.current.forEach((node) => {
                node.geometry.dispose();
                node.material.dispose();
                scene.remove(node);
            });
            linesRef.current.forEach((line) => {
                line.geometry.dispose();
                line.material.dispose();
                scene.remove(line);
            });
            nodesRef.current = [];
            linesRef.current = [];

            particles.geometry.dispose();
            particles.material.dispose();
            scene.remove(particles);

            coreGeom.dispose();
            coreMat.dispose();
            scene.remove(core);

            renderer.dispose();
            renderer.forceContextLoss?.();
            if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        };
    }, [skills, accent]);

    return (
        <div className="mx-neural-viz">
            <div ref={mountRef} className="mx-neural-canvas" aria-hidden="true" />

            <div className={`mx-neural-hud ${activeNode ? 'is-active' : ''}`} aria-hidden="true">
                <div className="mx-neural-hud-card">
                    <div className="mx-neural-hud-left">
                        <div
                            className="mx-neural-hud-icon"
                            style={{
                                borderColor: `${activeNode?.color || accent}44`,
                                backgroundColor: `${activeNode?.color || accent}11`,
                                color: activeNode?.color || accent,
                            }}
                        >
                            {activeNode?.icon}
                        </div>
                        <div className="min-w-0">
                            <div className="mx-neural-hud-label">{activeNode?.label}</div>
                            <div className="mx-neural-hud-meter">
                                <div className="mx-neural-hud-track">
                                    <div
                                        className="mx-neural-hud-fill"
                                        style={{
                                            width: `${activeNode?.value || 0}%`,
                                            backgroundColor: activeNode?.color || accent,
                                        }}
                                    />
                                </div>
                                <div className="mx-neural-hud-value" style={{ color: activeNode?.color || accent }}>
                                    {activeNode?.value}%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-neural-hud-right">
                        <div className="mx-neural-hud-micro">Node Stability</div>
                        <div className="mx-neural-hud-status">OPTIMAL</div>
                    </div>
                </div>
            </div>

            <div className="mx-neural-legend" aria-hidden="true">
                <div className="mx-neural-legend-card">
                    <div className="mx-neural-legend-title">Neural Nodes</div>
                    <div className="mx-neural-legend-list">
                        {(Array.isArray(skills) ? skills : []).map((s) => (
                            <div
                                key={s.label}
                                className={`mx-neural-legend-row ${activeNode?.label === s.label ? 'is-active' : ''}`}
                                style={{ '--rowColor': s.color }}
                            >
                                <span className="mx-neural-legend-dot" />
                                <span className="mx-neural-legend-text">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeuralPerformanceMatrix;
