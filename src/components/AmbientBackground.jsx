import './AmbientBackground.css';

const AmbientBackground = () => {
    return (
        <div className="ambient-container" aria-hidden="true">
            <div className="ambient-foundation"></div>
            <div className="ambient-depth ambient-depth-1"></div>
            <div className="ambient-depth ambient-depth-2"></div>
            <div className="ambient-depth ambient-depth-3"></div>
            <div className="ambient-wave ambient-wave-1"></div>
            <div className="ambient-wave ambient-wave-2"></div>
            <div className="ambient-wave ambient-wave-3"></div>
            <div className="ambient-column column-1"></div>
            <div className="ambient-column column-2"></div>
            <div className="ambient-column column-3"></div>
            <div className="ambient-sheen"></div>
            <div className="ambient-grid-overlay"></div>
            <div className="ambient-grain"></div>
            <div className="ambient-vignette"></div>
        </div>
    );
};

export default AmbientBackground;
