/**
 * QoL.js - Quality of Life improvements for Synapse: Latency
 * Adds additional features to enhance user experience
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('QoL features initializing...');
    
    // Initialize all QoL features
    initKeyboardNavigation();
    initAccessibilityFeatures();
    initPerformanceOptimizations();
    initCursorEffect();
    
    console.log('QoL features initialized successfully');
});

/**
 * Initialize keyboard navigation
 * Allows users to navigate the site using keyboard shortcuts
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key closes any modal
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                modal.classList.remove('show');
            });
        }
        
        // Ctrl+I opens about section
        if (e.ctrlKey && e.key === 'i') {
            e.preventDefault();
            const aboutModal = document.getElementById('about-modal'); // Renamed ID
            if (aboutModal) {
                aboutModal.classList.add('show');
            }
        }
        
        // Ctrl+N opens notification form
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            const notifyButton = document.getElementById('notify-button');
            if (notifyButton) {
                notifyButton.click();
            }
        }
    });
}

/**
 * Initialize accessibility features
 * Improves site accessibility for all users
 */
function initAccessibilityFeatures() {
    // Add aria attributes to improve screen reader compatibility
    const aboutTrigger = document.getElementById('about-trigger'); // Renamed ID
    if (aboutTrigger) {
        aboutTrigger.setAttribute('aria-label', 'Open About'); // Changed label
        aboutTrigger.setAttribute('role', 'button');
    }
    
    const notifyButton = document.getElementById('notify-button');
    if (notifyButton) {
        notifyButton.setAttribute('aria-label', 'Join the Pre-Launch Beta');
        notifyButton.setAttribute('role', 'button');
    }
    
    // Add focus styles that are visible but match the aesthetic
    const style = document.createElement('style');
    style.textContent = `
        a:focus, button:focus {
            outline: 2px solid var(--highlight-color);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
    
    // Add skip to content link for keyboard users (hidden visually until focused)
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to content';
    skipLink.className = 'skip-link';
    skipLink.setAttribute('aria-label', 'Skip to main content');
    
    // Style the skip link
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.padding = '8px';
    skipLink.style.zIndex = '10000';
    skipLink.style.backgroundColor = 'var(--bg-color)';
    skipLink.style.color = 'var(--text-color)';
    skipLink.style.transition = 'top 0.3s ease';
    
    // Show skip link on focus
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'aria-live-announcer';
    liveRegion.style.position = 'absolute';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.padding = '0';
    liveRegion.style.margin = '-1px';
    liveRegion.style.overflow = 'hidden';
    liveRegion.style.clip = 'rect(0, 0, 0, 0)';
    liveRegion.style.whiteSpace = 'nowrap';
    liveRegion.style.border = '0';
    document.body.appendChild(liveRegion);
    
    // Function to announce messages to screen readers
    window.announceToScreenReader = function(message) {
        const announcer = document.getElementById('aria-live-announcer');
        if (announcer) {
            announcer.textContent = message;
        }
    };
}

/**
 * Initialize performance optimizations
 * Improves site performance and responsiveness
 */
function initPerformanceOptimizations() {
    // Throttle intensive animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
        const particleContainer = document.getElementById('particle-container');
        const cyberGrid = document.querySelector('.cyber-grid');
        
        if (document.hidden) {
            // Reduce animation intensity when tab is not visible
            if (particleContainer) {
                particleContainer.style.opacity = '0.3';
            }
            
            if (cyberGrid) {
                cyberGrid.style.opacity = '0.1';
            }
            
            // Pause GSAP animations to save resources
            gsap.globalTimeline.pause();
        } else {
            // Restore animations when tab becomes visible again
            if (particleContainer) {
                particleContainer.style.opacity = '1';
            }
            
            if (cyberGrid) {
                cyberGrid.style.opacity = '0.4';
            }
            
            // Resume GSAP animations
            gsap.globalTimeline.resume();
        }
    });
    
    // Optimize for devices with reduced memory
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        console.log('Low memory device detected, optimizing animations');
        
        // Reduce particle count for low memory devices
        const particles = document.querySelectorAll('.particle');
        for (let i = 0; i < particles.length; i++) {
            if (i % 2 !== 0) { // Remove every other particle
                particles[i].remove();
            }
        }
        
        // Simplify other effects
        const dataStreams = document.querySelectorAll('.data-stream');
        dataStreams.forEach((stream, index) => {
            if (index > 0) { // Keep only one data stream
                stream.remove();
            }
        });
    }
    
    // Lazy load non-critical resources
    setTimeout(() => {
        // Add any additional resources that can be loaded after initial render
        const additionalStyles = document.createElement('link');
        additionalStyles.rel = 'stylesheet';
        additionalStyles.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(additionalStyles);
    }, 2000);
}

/**
 * Initialize custom cursor effect
 * Creates a glitchy cursor trail effect
 */
function initCursorEffect() {
    // Only initialize on devices with pointer support (not touch-only)
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        cursorTrail.style.position = 'fixed';
        cursorTrail.style.width = '20px';
        cursorTrail.style.height = '20px';
        cursorTrail.style.borderRadius = '50%';
        cursorTrail.style.border = '1px solid var(--highlight-color)';
        cursorTrail.style.pointerEvents = 'none';
        cursorTrail.style.zIndex = '9999';
        cursorTrail.style.transform = 'translate(-50%, -50%)';
        cursorTrail.style.opacity = '0';
        document.body.appendChild(cursorTrail);
        
        // Create glitch effect for cursor
        const cursorGlitch = document.createElement('div');
        cursorGlitch.className = 'cursor-glitch';
        cursorGlitch.style.position = 'fixed';
        cursorGlitch.style.width = '5px';
        cursorGlitch.style.height = '5px';
        cursorGlitch.style.backgroundColor = 'var(--highlight-color)';
        cursorGlitch.style.borderRadius = '50%';
        cursorGlitch.style.pointerEvents = 'none';
        cursorGlitch.style.zIndex = '9999';
        cursorGlitch.style.transform = 'translate(-50%, -50%)';
        cursorGlitch.style.opacity = '0.7';
        document.body.appendChild(cursorGlitch);
        
        // Track mouse movement
        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;
        let glitchX = 0;
        let glitchY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show cursor elements when mouse moves
            cursorTrail.style.opacity = '0.5';
            cursorGlitch.style.opacity = '0.7';
            
            // Add random glitch offset occasionally
            if (Math.random() > 0.9) {
                glitchX = mouseX + (Math.random() * 20 - 10);
                glitchY = mouseY + (Math.random() * 20 - 10);
            } else {
                glitchX = mouseX;
                glitchY = mouseY;
            }
        });
        
        // Animate cursor elements
        function animateCursor() {
            // Smooth trail following
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            
            cursorGlitch.style.left = glitchX + 'px';
            cursorGlitch.style.top = glitchY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Hide cursor after period of inactivity
        let inactivityTimer;
        function resetInactivityTimer() {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                cursorTrail.style.opacity = '0';
                cursorGlitch.style.opacity = '0';
            }, 3000);
        }
        
        document.addEventListener('mousemove', resetInactivityTimer);
        resetInactivityTimer();
        
        // Add glitch effect on click
        document.addEventListener('mousedown', function() {
            // Create click ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.position = 'fixed';
            ripple.style.left = mouseX + 'px';
            ripple.style.top = mouseY + 'px';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'transparent';
            ripple.style.border = '1px solid var(--highlight-color)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '9998';
            document.body.appendChild(ripple);
            
            // Animate ripple
            gsap.to(ripple, {
                width: '50px',
                height: '50px',
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => {
                    ripple.remove();
                }
            });
            
            // Add glitch effect to cursor
            gsap.to(cursorGlitch, {
                scale: 2,
                opacity: 1,
                duration: 0.1,
                ease: 'steps(1)',
                onComplete: () => {
                    gsap.to(cursorGlitch, {
                        scale: 1,
                        opacity: 0.7,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }
}