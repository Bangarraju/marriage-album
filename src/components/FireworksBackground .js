import React from 'react';
import Particles from 'react-tsparticles';
import "../App.css"

const FireworksBackground = () => {
    const particlesOptions = {
        // ... your tsParticles configuration for fireworks
        // (e.g., type: "fireworks", colors, shapes, movement, etc.)
    };

    return (
        <Particles
            id="tsparticles"
            options={particlesOptions}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
        />
    );
};

export default FireworksBackground;