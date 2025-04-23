/**
 * Main.js - Entry point for Synapse: Latency landing page
 * Initializes all components and handles DOM ready events
 */

// Global variables for Easter Egg
let sofiaLogoClicks = 0;
// easterEggTriggered is now declared globally in animations.js

// Wait for DOM to be fully loaded
$(document).ready(function() {
    
    // Initialize particles
    if (typeof initParticles === 'function') {
        initParticles();
    } else {
        console.error('Particle system initialization function not found.');
    }
    
    // Initialize animations
    // Note: animations.js has its own DOMContentLoaded listener,
    // but we call it here as well to ensure proper sequence
    if (typeof initAnimations === 'function') {
        initAnimations();
    } else {
        console.error('Animation initialization function not found.');
    }
    
    // Add event listeners
    setupEventListeners();
    
    // Initialize cyber grid animation
    initCyberGrid();
    
});

/**
 * Set up event listeners for the page
 */
function setupEventListeners() {
    // Listen for reduced motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
        // Reload the page to apply new motion preferences
        window.location.reload();
    });
    
    // Listen for window resize events (particles are handled in particles.js)
    window.addEventListener('resize', debounce(() => {
        // Any additional resize handling can go here
    }, 250));
    
    // Listen for visibility changes to pause/resume animations when tab is inactive
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Could pause intensive animations here if needed
        } else {
            // Could resume animations here if needed
        }
    });
    
    // Set up notify button
    const notifyButton = document.getElementById('notify-button');
    if (notifyButton) {
        notifyButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create the Beta Signup Modal content
            const betaModalHtml = `
                <div class="beta-signup-modal">
                    <h3>Join the Pre-launch Beta</h3>
                    <p>Select your platform below. Keep in mind the sign up may be opened/closed during specific development cycles.</p>
                    <div class="beta-buttons-container">
                        <a href="https://play.google.com/apps/testing/com.anthemsyndicate.synapse.latency" target="_blank" class="neon-button android-beta-btn">Android</a>
                        <button class="neon-button ios-beta-btn" disabled>iOS (Coming Soon)</button>
                    </div>
                </div>
            `;
            
            // Create modal container
            const modal = document.createElement('div');
            modal.id = 'beta-modal'; // Give it an ID for easier targeting
            modal.className = 'modal'; // Use existing modal class for overlay styling
            modal.innerHTML = `<div class="modal-content">${betaModalHtml}</div>`;
            document.body.appendChild(modal);
            
            // Function to close the modal
            const closeModal = () => {
                modal.classList.remove('show');
                // Remove the modal from DOM after transition
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                }, 300); // Match CSS transition duration
            };

            // Add click outside listener
            modal.addEventListener('click', (event) => {
                // Check if the click is directly on the modal overlay (not the content inside)
                if (event.target === modal) {
                    closeModal();
                }
            });

            // Show modal with animation
            // Use requestAnimationFrame to ensure the element is in the DOM before adding the class
            requestAnimationFrame(() => {
                modal.classList.add('show');
            });

            // No need for submit/cancel button listeners anymore
        });
    }

    // Add Easter Egg listener to Sofia Logo
    const sofiaLogo = document.querySelector('.sofia-logo');
    if (sofiaLogo) {
        sofiaLogo.addEventListener('click', () => {
            sofiaLogoClicks++;

            if (sofiaLogoClicks >= 5) { // Check if threshold is met
                
                const isFirstTime = !easterEggTriggered; // Check the flag state *before* calling

                // Call the function, passing the determined state
                if (typeof triggerEasterEgg === 'function') {
                    triggerEasterEgg(isFirstTime); // Pass the state as an argument
                } else {
                    console.error('triggerEasterEgg function not found in animations.js');
                }

                // Set the global flag *after* the first call is initiated
                if (isFirstTime) {
                    easterEggTriggered = true;
                }
                
                sofiaLogoClicks = 0; // Reset counter after triggering
            }
            // Reset clicks if user stops clicking for a bit (optional)
            setTimeout(() => {
                if (sofiaLogoClicks > 0 && sofiaLogoClicks < 5) {
                     sofiaLogoClicks = 0; // Reset if sequence is broken
                }
            }, 2000); // Reset after 2 seconds of no clicks
        });
    } else {
        console.warn('Sofia Logo element not found for Easter Egg listener.');
    }
}

/**
 * Initialize cyber grid animation
 */
function initCyberGrid() {
    const grid = document.querySelector('.cyber-grid');
    if (!grid) return;
    
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;
    
    // Create grid animation
    gsap.to(grid, {
        backgroundPosition: '80px 80px',
        duration: 20,
        ease: 'none',
        repeat: -1
    });
    
    // Add subtle 3D movement on mouse move
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
        
        gsap.to(grid, {
            rotationX: 30 + moveY,
            rotationY: moveX,
            duration: 1,
            ease: 'power2.out'
        });
    });
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Check if a script or library is loaded
 * @param {string} libraryName - The name of the global variable to check
 * @returns {boolean} - Whether the library is loaded
 */
function isLibraryLoaded(libraryName) {
    return typeof window[libraryName] !== 'undefined';
}

// Log any errors that occur
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Error occurred:', message, 'at', source, lineno, colno);
    return false;
};