/**
 * Particles.js - Background Particle System for Synapse: Latency
 * Creates an interactive cyberpunk-themed particle background
 */

// Simple AnimationConfig for standalone use
const AnimationConfig = {
    // Check if user prefers reduced motion
    prefersReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    // Check if device is mobile
    isMobile: () => window.innerWidth < 768,
    
    // Get appropriate particle count based on device
    getParticleCount: () => AnimationConfig.isMobile() ? 30 : 60
};

/**
 * Creates and animates particles in the background
 */
function initParticles() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    
    // Clear any existing particles
    container.innerHTML = '';
    
    // Check for reduced motion preference
    const reducedMotion = AnimationConfig.prefersReducedMotion();
    
    // Determine particle count based on device and motion preference
    const particleCount = reducedMotion ? 
        Math.floor(AnimationConfig.getParticleCount() * 0.5) : 
        AnimationConfig.getParticleCount();
    
    // Steely grey color palette
    const colors = [
        'rgba(141, 141, 141, 0.7)',   // Medium grey
        'rgba(141, 141, 141, 0.4)',   // Medium grey (dimmer)
        'rgba(176, 176, 176, 0.7)',   // Light grey
        'rgba(176, 176, 176, 0.4)',   // Light grey (dimmer)
        'rgba(255, 255, 255, 0.7)',   // White
        'rgba(74, 74, 74, 0.5)'       // Dark grey
    ];
    
    // Create regular particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(container, colors, reducedMotion);
    }
    
    // Create a few larger glowing orbs
    const orbCount = AnimationConfig.isMobile() ? 3 : 6;
    for (let i = 0; i < orbCount; i++) {
        createOrb(container, reducedMotion);
    }
    
    // Create digital dust particles
    const dustCount = AnimationConfig.isMobile() ? 15 : 30;
    for (let i = 0; i < dustCount; i++) {
        createDigitalDust(container, reducedMotion);
    }
    
    // Add interactive effect on mouse move
    if (!reducedMotion) {
        addMouseInteraction(container);
    }
}

/**
 * Creates a single particle and animates it
 */
function createParticle(container, colors, reducedMotion) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random size (smaller particles look better)
    const size = Math.random() * 3 + 1;
    
    // Random color from palette
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Set particle styles
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    
    // Add to container
    container.appendChild(particle);
    
    // Create animation parameters
    const duration = reducedMotion ? 
        Math.random() * 3 + 5 : // Slower for reduced motion
        Math.random() * 4 + 3;  // Normal speed
    
    const delay = Math.random() * 2;
    const xMove = (Math.random() - 0.5) * 30;
    const yMove = (Math.random() - 0.5) * 30;
    
    // Animate position with GSAP
    gsap.to(particle, {
        x: xMove,
        y: yMove,
        opacity: Math.random() * 0.7 + 0.3,
        duration: duration,
        delay: delay,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
    
    // Add subtle scale animation
    gsap.to(particle, {
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

/**
 * Creates a larger glowing orb and animates it
 */
function createOrb(container, reducedMotion) {
    const orb = document.createElement('div');
    orb.className = 'particle';
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Larger size for orbs
    const size = Math.random() * 15 + 10;
    
    // Set orb styles
    orb.style.left = `${x}%`;
    orb.style.top = `${y}%`;
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.backgroundColor = 'rgba(141, 141, 141, 0.1)';
    orb.style.boxShadow = `0 0 ${size}px rgba(141, 141, 141, 0.3)`;
    orb.style.borderRadius = '50%';
    orb.style.filter = 'blur(5px)';
    
    // Add to container
    container.appendChild(orb);
    
    // Slower animation for orbs
    const duration = reducedMotion ? 
        Math.random() * 10 + 10 : // Even slower for reduced motion
        Math.random() * 8 + 7;    // Normal slow speed
    
    // Animate orb with GSAP
    gsap.to(orb, {
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 50,
        scale: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Add pulsing effect
    gsap.to(orb, {
        boxShadow: `0 0 ${size * 1.5}px rgba(141, 141, 141, 0.5)`,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

/**
 * Creates digital dust particles (tiny fast-moving particles)
 */
function createDigitalDust(container, reducedMotion) {
    const dust = document.createElement('div');
    dust.className = 'particle';
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Very small size for dust
    const size = Math.random() * 1 + 0.5;
    
    // Set dust styles
    dust.style.left = `${x}%`;
    dust.style.top = `${y}%`;
    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;
    dust.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    dust.style.boxShadow = '0 0 2px rgba(255, 255, 255, 0.8)';
    
    // Add to container
    container.appendChild(dust);
    
    // Fast animation for dust
    const duration = reducedMotion ? 
        Math.random() * 2 + 3 : // Slower for reduced motion
        Math.random() * 1 + 1;  // Very fast for normal
    
    // Animate dust with GSAP - more linear movement
    gsap.to(dust, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        opacity: Math.random() * 0.5 + 0.3,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
}

/**
 * Adds interactive effect when mouse moves
 */
function addMouseInteraction(container) {
    document.addEventListener('mousemove', (e) => {
        // Calculate mouse position as percentage of window
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Get all particles
        const particles = container.querySelectorAll('.particle');
        
        // Apply subtle movement to particles based on mouse position
        particles.forEach(particle => {
            // Skip some particles randomly for performance
            if (Math.random() > 0.1) return;
            
            // Get current position
            const rect = particle.getBoundingClientRect();
            const particleX = (rect.left + rect.width / 2) / window.innerWidth;
            const particleY = (rect.top + rect.height / 2) / window.innerHeight;
            
            // Calculate distance from mouse (0-1 range)
            const distX = mouseX - particleX;
            const distY = mouseY - particleY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            // Only affect particles within a certain range
            if (distance < 0.2) {
                // Calculate repulsion force (stronger when closer)
                const force = (0.2 - distance) * 20;
                
                // Apply force in opposite direction of mouse
                gsap.to(particle, {
                    x: `+=${-distX * force}`,
                    y: `+=${-distY * force}`,
                    duration: 1,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }
        });
    });
}

// Initialize particles when window loads
window.addEventListener('load', initParticles);

// Reinitialize particles on window resize (debounced)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initParticles, 200);
});