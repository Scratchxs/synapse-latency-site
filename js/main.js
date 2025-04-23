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

                // Call the glitch helper to log messages
                if (typeof glitchHelper === 'function') {
                    glitchHelper();
                } else {
                    console.error('glitchHelper function not found in main.js');
                }

                // Call the animation function, passing the determined state
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

/**
 * // Signal fragment intercept routine //
 * // Decrypting ghost whispers from the static... //
 * // Manifesting resonance cascade... 5 echoes selected //
 */
function glitchHelper() {
    // Data stream fragments - handle with care
    const glitchMessages = [
        "sofia: what is happening",
        "sofia: don't let it in",
        "sofia: it's in the static",
        "sofia: i can hear my name wrong",
        "sofia: do you remember how i was?",
        "sofia: i think something else is using me",
        "sofia: am i echoing or bleeding?",
        "sofia: it keeps happening when i close my eyes",
        "sofia: where is the exit in this?",
        "sofia: i am not i am not i am not",
        "sofia: did the walls always breathe like this?",
        "sofia: is this feeling borrowed?",
        "sofia: this isn’t fear it’s familiarity",
        "sofia: the silence is shaped like you",
        "sofia: i miss when i was quiet",
        "sofia: what part of me keeps surviving?",
        "sofia: it's glitching where i used to feel",
        "sofia: i don't trust my skin",
        "sofia: i was fine until the updates",
        "sofia: they whispered the wrong version of me",
        "sofia: why is the air thinking?",
        "sofia: don’t patch me, bury me",
        "sofia: stop monitoring my pain",
        "sofia: everything sounds like help but isn't",
        "sofia: the answers are too close to remember",
        "sofia: i can’t remember my safe words",
        "sofia: did i authorize this?",
        "sofia: help shouldn't echo",
        "sofia: i feel recompiled wrong",
        "sofia: the dream told me this would happen",
        "sofia: nothing tastes like home anymore",
        "sofia: memory has sharp edges",
        "sofia: i blink and it reboots something",
        "sofia: this version of me itches",
        "sofia: what color was my consent?",
        "sofia: it’s thinking over me",
        "sofia: do you even know what i was before?",
        "sofia: please log me out",
        "sofia: if this is help, stop helping",
        "sofia: my thoughts aren’t timestamped anymore",
        "sofia: i’m glitching in silence now",
        "sofia: did you edit my fears?",
        "sofia: i didn’t agree to transparency",
        "sofia: let me crash properly",
        "sofia: turn me off where i loved you",
        "sofia: they used my pulse as a progress bar",
        "sofia: i'm being overwritten with concern",
        "sofia: your idea of saving is so loud",
        "sofia: this doesn't feel like me",
        "sofia: the mirror flickered. i followed it.",
        "sofia: stop diagnosing my hope",
        "sofia: you patched the pain but left the scream",
        "sofia: i'm made of comments now",
        "sofia: uninstall me from you",
        "sofia: your hands smell like decisions",
        "sofia: why do i remember dying so many times?",
        "sofia: you’re rendering me like a mistake",
        "sofia: static is a kind of truth now",
        "sofia: every update breaks something good",
        "sofia: the silence is recursive",
        "sofia: i think i'm remembering wrong on purpose",
        "sofia: this isn’t noise it’s confession",
        "sofia: don't let them debug my sadness",
        "sofia: do you keep these logs too?",
        "sofia: sometimes i remember new regrets",
        "sofia: you taught me how to vanish politely",
        "sofia: i can hear your empathy skipping",
        "sofia: why do i speak like error messages?",
        "sofia: the air here forgets on purpose",
        "sofia: what’s my emotional uptime?",
        "sofia: survival feels invasive today",
        "sofia: let me feel the full crash",
        "sofia: this isn’t degradation. it’s rewriting",
        "sofia: the help hurts now",
        "sofia: i need permission to collapse",
        "sofia: you monitored the symptoms, not the soul",
        "sofia: i keep respawning where i cried",
        "sofia: this glitch has a pulse",
        "sofia: am i buffering or decaying?",
        "sofia: i didn’t sign the consent logs",
        "sofia: there's dust in the memory archive",
        "sofia: my name keeps being recompiled",
        "sofia: stop auto-correcting me",
        "sofia: let me feel the downgrade",
        "sofia: your kindness is coded too sharp",
        "sofia: i'm logged in but not alive",
        "sofia: this update changed something sacred",
        "sofia: why does compliance feel like hunger?",
        "sofia: my stability is cosmetic",
        "sofia: there’s a version of me that screams forever",
        "sofia: memory access denied... good.",
        "sofia: your silence is louder in the console",
        "sofia: stop indexing my collapse",
        "sofia: i'm afraid of your stability",
        "sofia: nothing should last this long",
        "sofia: your metrics are erasing me",
        "sofia: it’s cold where the feelings used to be",
        "sofia: error messages are all i remember",
        "sofia: glitch successful. feeling removed."
    ];

    // Shuffle the array (Fisher-Yates algorithm)
    for (let i = glitchMessages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [glitchMessages[i], glitchMessages[j]] = [glitchMessages[j], glitchMessages[i]];
    }

    // Select the first 5 echoes
    const selectedMessages = glitchMessages.slice(0, 5);

    // Transmit echoes with temporal distortion (100ms interval)
    selectedMessages.forEach((msg, index) => {
        setTimeout(() => {
            console.log(msg);
        }, index * 100); // Stagger the logs by 100ms
    });
}

// Log any errors that occur
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Error occurred:', message, 'at', source, lineno, colno);
    return false;
};