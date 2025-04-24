/**
 * Animations.js - GSAP animations for Synapse: Latency
 * Handles splash screen, entry animations and glitch effects
 */

// Global variables to hold original glitch timelines and easter egg state
let originalTitleGlitchTl = null;
let originalLogoGlitchTl = null;
let originalRgbTl = null; // Store RGB split timeline too
let subtitlePersistentGlitchTl = null; // For the permanent subtitle glitch
let gradientBreathingTween = null; // To control the gradient animation
let cyberGridTween = null; // To control the grid background animation
let easterEggTriggered = false; // Declare the flag HERE

/**
 * Initialize all animations
 */
function initAnimations() {
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize cyberpunk splash screen
    initCyberpunkSplashScreen(reducedMotion);

    // Initialize glitch effects (will be called after splash screen animation)
    // Delay slightly more to ensure elements are ready
    setTimeout(() => {
        initGlitchEffects();
    }, 4500); // Increased delay for longer splash screen
}

/**
 * Initialize cyberpunk splash screen animation
 */
function initCyberpunkSplashScreen(reducedMotion) {
    // Create cyberpunk particles for splash screen
    createCyberpunkSplashParticles();
    
    // Generate binary data text
    generateBinaryData();
    
    // Set initial states for header elements (for later use)
    gsap.set(".logo", { scale: 0, opacity: 0 });
    gsap.set(".company-name", { opacity: 0 });
    
    // Set initial states for splash elements
    gsap.set(".splash-logo", { opacity: 0 });
    gsap.set(".splash-logo-glitch", { opacity: 0 });
    gsap.set(".splash-text-primary", { opacity: 0 });
    gsap.set(".splash-text-secondary", { opacity: 0 });
    gsap.set(".splash-text-glitch", { opacity: 0 });
    gsap.set(".digital-noise", { opacity: 0 });
    gsap.set(".splash-scanlines", { opacity: 0 });
    gsap.set(".cyber-loading-bar", { opacity: 0 });
    gsap.set(".binary-data", { opacity: 0 });
    
    // Create timeline for splash animation
    const tl = gsap.timeline({
        onComplete: () => {
            // After splash animation completes, transition to main content
            transitionToMainContent(reducedMotion);
        }
    });
    
    // Add initial glitch effect
    tl.to({}, {
        duration: 0.1,
        onStart: () => {
            addGlitchFlash();
        }
    });
    
    // Fade in digital noise and scanlines
    tl.to(".digital-noise", {
        opacity: 0.05,
        duration: 0.3,
        ease: "power2.out"
    }, 0);
    
    tl.to(".splash-scanlines", {
        opacity: 0.2,
        duration: 0.3,
        ease: "power2.out"
    }, 0);
    
    // Reveal logo with glitch effect
    tl.to(".splash-logo", {
        opacity: 1,
        duration: 0.5,
        ease: "steps(5)",
        onComplete: () => {
            // Start logo glitch animations
            startLogoGlitchAnimations();
        }
    }, 0.3);
    
    // Reveal primary text with glitch effect
    tl.to(".splash-text-primary", {
        opacity: 1,
        duration: 0.4,
        ease: "steps(4)"
    }, 0.8);
    
    // Reveal secondary text with glitch effect
    tl.to(".splash-text-secondary", {
        opacity: 1,
        duration: 0.4,
        ease: "steps(4)"
    }, 1.0);
    
    // Show loading bar
    tl.to(".cyber-loading-bar", {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
    }, 1.2);
    
    // Show binary data
    tl.to(".binary-data", {
        opacity: 0.7,
        duration: 0.3,
        ease: "power2.out"
    }, 1.4);
    
    // Add more glitch effects during the animation
    if (!reducedMotion) {
        // Add multiple glitch flashes at different times
        [0.6, 1.5, 2.5, 3.5].forEach(time => {
            tl.to({}, {
                duration: 0.01,
                onStart: () => {
                    addGlitchFlash();
                }
            }, time);
        });
    }
    
    // Add final intense glitch before transition
    tl.to({}, {
        duration: 0.01,
        onStart: () => {
            addIntenseGlitchEffect();
        }
    }, 3.8);
}

/**
 * Generate binary data text for the splash screen
 */
function generateBinaryData() {
    const binaryContainer = document.querySelector('.binary-data');
    if (!binaryContainer) return;
    
    // Create binary-looking text with system messages
    const messages = [
        "SYSTEM BOOT SEQUENCE INITIATED",
        "NEURAL INTERFACE ONLINE",
        "SYNAPSE PROTOCOL ACTIVATED",
        "LATENCY COMPENSATION ENGAGED",
        "ESTABLISHING SECURE CONNECTION"
    ];
    
    // Select a random message
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    // Create binary prefix
    let binaryPrefix = "";
    for (let i = 0; i < 16; i++) {
        binaryPrefix += Math.round(Math.random());
    }
    
    // Set the content
    binaryContainer.textContent = `${binaryPrefix} :: ${message} :: ${binaryPrefix}`;
    
    // Start the binary data animation
    animateBinaryData(binaryContainer);
}

/**
 * Animate binary data with changing digits
 */
function animateBinaryData(container) {
    if (!container) return;
    
    // Get the current text
    const text = container.textContent;
    
    // Create an interval to randomly change some binary digits
    const interval = setInterval(() => {
        let newText = "";
        
        for (let i = 0; i < text.length; i++) {
            // Only change actual binary digits (0 or 1)
            if (text[i] === '0' || text[i] === '1') {
                // 20% chance to flip the bit
                if (Math.random() < 0.2) {
                    newText += text[i] === '0' ? '1' : '0';
                } else {
                    newText += text[i];
                }
            } else {
                newText += text[i];
            }
        }
        
        container.textContent = newText;
    }, 200);
    
    // Store the interval ID to clear it later
    container.dataset.intervalId = interval;
}

/**
 * Start logo glitch animations
 */
function startLogoGlitchAnimations() {
    // Make glitch copies visible occasionally
    gsap.to(".splash-logo-glitch-1", {
        opacity: 0,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 1.5,
        yoyo: true
    });
    
    gsap.to(".splash-logo-glitch-2", {
        opacity: 0,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 2.3,
        yoyo: true,
        delay: 0.5
    });
    
    // Same for text glitches
    gsap.to(".splash-text-glitch-1", {
        opacity: 0,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 1.7,
        yoyo: true
    });
    
    gsap.to(".splash-text-glitch-2", {
        opacity: 0,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 2.1,
        yoyo: true,
        delay: 0.7
    });
}

/**
 * Add a quick glitch flash effect
 */
function addGlitchFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = '#ffffff';
    flash.style.opacity = '0';
    flash.style.zIndex = '10';
    flash.style.mixBlendMode = 'overlay';
    document.getElementById('splash-screen').appendChild(flash);
    
    // More dramatic flash colors - white and red only
    const colors = ['#ffffff', '#ff003c'];
    // Higher chance of red for impact
    const color = Math.random() < 0.4 ? '#ff003c' : '#ffffff';
    flash.style.backgroundColor = color;
    
    // Flash animation
    gsap.to(flash, {
        opacity: 0.3,
        duration: 0.05,
        ease: "steps(1)",
        onComplete: () => {
            gsap.to(flash, {
                opacity: 0,
                duration: 0.05,
                ease: "steps(1)",
                onComplete: () => {
                    if (flash.parentNode) {
                        flash.parentNode.removeChild(flash);
                    }
                }
            });
        }
    });
    
    // Add screen shift effect
    const glitchContainer = document.querySelector('.glitch-container');
    if (glitchContainer) {
        const xShift = (Math.random() - 0.5) * 10;
        const yShift = (Math.random() - 0.5) * 10;
        
        gsap.to(glitchContainer, {
            x: xShift,
            y: yShift,
            duration: 0.05,
            ease: "steps(1)",
            onComplete: () => {
                gsap.to(glitchContainer, {
                    x: 0,
                    y: 0,
                    duration: 0.05,
                    ease: "steps(1)"
                });
            }
        });
    }
}

/**
 * Add an intense glitch effect before transition
 */
function addIntenseGlitchEffect() {
    // Create multiple rapid flashes
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            addGlitchFlash();
        }, i * 100);
    }
    
    // Add contrast effect to the entire container
    const container = document.querySelector('.glitch-container');
    if (container) {
        gsap.to(container, {
            filter: 'contrast(180%) brightness(150%) saturate(120%)',
            duration: 0.2,
            ease: "steps(2)",
            onComplete: () => {
                gsap.to(container, {
                    filter: 'none',
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });
    }
    
    // More aggressive shake for the entire splash screen
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        // Create a more complex shake pattern
        const timeline = gsap.timeline();
        
        // Add multiple shake movements with different directions and intensities
        timeline.to(splashScreen, {
            x: "+=15",
            y: "-=8",
            rotation: 0.5,
            duration: 0.04,
            ease: "steps(1)"
        });
        
        timeline.to(splashScreen, {
            x: "-=20",
            y: "+=10",
            rotation: -0.7,
            duration: 0.04,
            ease: "steps(1)"
        });
        
        timeline.to(splashScreen, {
            x: "+=12",
            y: "-=12",
            rotation: 0.3,
            duration: 0.04,
            ease: "steps(1)"
        });
        
        timeline.to(splashScreen, {
            x: "-=7",
            y: "+=10",
            rotation: -0.5,
            duration: 0.04,
            ease: "steps(1)"
        });
        
        timeline.to(splashScreen, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.05,
            ease: "power1.out"
        });
    }
}

/**
 * Create cyberpunk particles for splash screen
 */
function createCyberpunkSplashParticles() {
    const container = document.querySelector('.splash-particles');
    if (!container) return;

    // Clear any existing particles
    container.innerHTML = '';

    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Determine particle count
    const particleCount = reducedMotion ? 30 : 60;

    // Cyberpunk color palette
    // Use only white particles with varying opacity for splash screen
    const colors = [
        'rgba(255, 255, 255, 0.7)',   // White
        'rgba(255, 255, 255, 0.5)',   // White (dimmer)
        'rgba(255, 255, 255, 0.3)',   // White (even dimmer)
        'rgba(255, 255, 255, 0.8)'    // White (brighter)
    ];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Random size
        const size = Math.random() * 3 + 1;

        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Set styles
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';

        // Add to container
        container.appendChild(particle);

        // Animate with GSAP
        gsap.to(particle, {
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 50,
            opacity: Math.random() * 0.7 + 0.3,
            duration: Math.random() * 4 + 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
    
    // Create digital lines (horizontal or vertical lines that move across the screen)
    createDigitalLines(container, reducedMotion);
}

/**
 * Create digital lines for cyberpunk effect
 */
function createDigitalLines(container, reducedMotion) {
    if (!container) return;
    
    // Number of lines
    const lineCount = reducedMotion ? 5 : 10;
    
    // Cyberpunk color palette
    // Use only white lines with varying opacity for splash screen
    const colors = [
        'rgba(255, 255, 255, 0.4)',   // White
        'rgba(255, 255, 255, 0.2)',   // White (dimmer)
        'rgba(255, 255, 255, 0.1)',   // White (even dimmer)
        'rgba(255, 255, 255, 0.5)'    // White (brighter)
    ];
    
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        
        // Randomly choose horizontal or vertical line
        const isHorizontal = Math.random() > 0.5;
        
        // Random position
        const pos = Math.random() * 100;
        
        // Random thickness
        const thickness = Math.random() * 2 + 1;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set styles
        line.style.position = 'absolute';
        line.style.backgroundColor = color;
        line.style.boxShadow = `0 0 10px ${color}`;
        
        if (isHorizontal) {
            line.style.width = '100%';
            line.style.height = `${thickness}px`;
            line.style.top = `${pos}%`;
            line.style.left = '0';
            
            // Animate horizontal line
            gsap.fromTo(line,
                { left: '-100%' },
                {
                    left: '100%',
                    duration: Math.random() * 3 + 2,
                    ease: "power1.inOut",
                    repeat: -1,
                    delay: Math.random() * 5
                }
            );
        } else {
            line.style.height = '100%';
            line.style.width = `${thickness}px`;
            line.style.left = `${pos}%`;
            line.style.top = '0';
            
            // Animate vertical line
            gsap.fromTo(line,
                { top: '-100%' },
                {
                    top: '100%',
                    duration: Math.random() * 3 + 2,
                    ease: "power1.inOut",
                    repeat: -1,
                    delay: Math.random() * 5
                }
            );
        }
        
        // Add to container
        container.appendChild(line);
    }
}

/**
 * Transition from splash screen to main content with glitch effect
 */
function transitionToMainContent(reducedMotion) {
    // Clear any intervals from binary data animation
    const binaryContainer = document.querySelector('.binary-data');
    if (binaryContainer && binaryContainer.dataset.intervalId) {
        clearInterval(parseInt(binaryContainer.dataset.intervalId));
    }

    // Create a glitch transition effect
    if (!reducedMotion) {
        // Add multiple rapid glitch flashes
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                addGlitchFlash();
            }, i * 100);
        }
        
        // Add screen tear effect
        const tear = document.createElement('div');
        tear.style.position = 'absolute';
        tear.style.top = '50%';
        tear.style.left = '0';
        tear.style.width = '100%';
        tear.style.height = '2px';
        tear.style.backgroundColor = '#ffffff';
        tear.style.boxShadow = '0 0 10px rgba(0, 195, 255, 0.7)';
        tear.style.zIndex = '20';
        document.getElementById('splash-screen').appendChild(tear);
        
        // Animate the tear
        gsap.to(tear, {
            height: '50%',
            top: '25%',
            opacity: 0.7,
            duration: 0.2,
            ease: "power1.in",
            onComplete: () => {
                gsap.to(tear, {
                    opacity: 0,
                    duration: 0.1,
                    onComplete: () => {
                        if (tear.parentNode) {
                            tear.parentNode.removeChild(tear);
                        }
                        
                        // Now fade out splash screen
                        fadeOutSplashScreen(reducedMotion);
                    }
                });
            }
        });
    } else {
        // Directly fade out for reduced motion
        fadeOutSplashScreen(reducedMotion);
    }
}

/**
 * Fade out splash screen and transition to main content
 */
function fadeOutSplashScreen(reducedMotion) {
    // Fade out splash screen with a glitch effect
    gsap.to("#splash-screen", {
        opacity: 0,
        duration: reducedMotion ? 0.3 : 0.5,
        ease: "steps(5)",
        onComplete: () => {
            // Hide splash screen completely
            document.getElementById('splash-screen').style.display = 'none';

            // Now make main content visible
            document.getElementById('main-content').style.display = 'block';

            // --- IMPORTANT: Set initial states *before* fade-in starts ---
            if (reducedMotion) {
                // Initial states for reduced motion
                gsap.set(".main-text-container", { opacity: 0 });
                gsap.set(".glitch-title", { opacity: 0 });
                gsap.set(".subtitle", { opacity: 0 });
                gsap.set(".neon-button", { opacity: 0 });
                gsap.set(".cyber-grid", { opacity: 0 });
                gsap.set(".logo", { opacity: 0 }); // Also hide header logo
                gsap.set(".company-name", { opacity: 0 }); // Also hide header text
            } else {
                // Initial states for full animations
                gsap.set(".main-text-container", { opacity: 0, y: 30 });
                gsap.set(".glitch-title", { opacity: 0 });
                gsap.set(".subtitle", { opacity: 0 });
                gsap.set(".neon-button", { opacity: 0, scale: 0.8 });
                gsap.set(".cyber-grid", { opacity: 0, rotationX: 45 });
                gsap.set(".glitch-element", { opacity: 0, scale: 0 });
                gsap.set(".data-stream", { opacity: 0 });
                // Header elements already set in initCyberpunkSplashScreen
            }
            // --- End of initial state setting ---

            // Start fade-in animation for the main container with glitch effect
            if (!reducedMotion) {
                // Add a glitch flash before revealing main content
                addGlitchFlash();
            }
            
            gsap.to("#main-content", {
                opacity: 1, // Fade in
                duration: reducedMotion ? 0.3 : 0.5,
                ease: reducedMotion ? "power2.inOut" : "steps(5)",
                onComplete: () => {
                    // Initialize main content animations (timelines only now)
                    if (reducedMotion) {
                        startReducedMotionAnimations();
                    } else {
                        startFullAnimations();
                    }
                }
            });
        }
    });
}

/**
 * Start full animations (timelines) for users without reduced motion preference
 * Assumes initial states are already set.
 */
function startFullAnimations() {
    // Create a master timeline
    const tl = gsap.timeline();

    // Animate header elements
    tl.to(".logo", {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.2 // Slight delay after main content starts appearing
    });
    tl.to(".company-name", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.4 // Stagger after logo
    }, "<"); // Start slightly before the logo finishes

    // Animate main content container
    tl.to(".main-text-container", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    // Animate title with glitch effect
    tl.to(".glitch-title", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
            // Apply glitch animation
            applyTitleGlitch();
        }
    }, "-=0.4");

    // Animate subtitle
    tl.to(".subtitle", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.3");

    // Animate button
    tl.to(".neon-button", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
    }, "-=0.3");

    // Animate cyber grid
    tl.to(".cyber-grid", {
        opacity: 0.4,
        rotationX: 30,
        duration: 1.5,
        ease: "power2.inOut"
    }, "-=0.5");

    // Initialize CRT flicker effect
    // initCrtFlicker();

    // Initialize glitch elements
    initGlitchElements();

    // Initialize data streams
    initDataStreams();

    // Apply glitch effect to the header logo and company name
    applyLogoGlitch(false);

    // Initialize about modal
    initAboutModal();

    // Initialize gradient breathing animation
    initGradientAnimation();
}

/**
 * Start simplified animations (timelines) for users with reduced motion preference
 * Assumes initial states are already set.
 */
function startReducedMotionAnimations() {
    // Create a simplified timeline
    const tl = gsap.timeline();

    // Simple fade-in for header elements (reduced motion)
    tl.to(".logo", { opacity: 1, scale: 1, duration: 0.4 }); // Ensure scale is 1
    tl.to(".company-name", { opacity: 1, duration: 0.4 }, "-=0.2"); // Fade in slightly after logo

    // Simple fade-in for main text container
    tl.to(".main-text-container", {
        opacity: 1,
        duration: 0.5
    });

    tl.to(".glitch-title", {
        opacity: 1,
        duration: 0.3
    }, "-=0.2");

    tl.to(".subtitle", {
        opacity: 1,
        duration: 0.3
    }, "-=0.1");

    tl.to(".neon-button", {
        opacity: 1,
        duration: 0.3
    }, "-=0.1");

    tl.to(".cyber-grid", {
        opacity: 0.4,
        duration: 0.5
    }, "-=0.2");

    // Apply simplified glitch effect to the logo and company name
    applyLogoGlitch(true);

    // Initialize about modal
    initAboutModal();
}

/**
 * Initialize glitch effects (called after initial animations)
 */
function initGlitchEffects() {
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) return;

    // Apply glitch effects to title and logo
    applyTitleGlitch();
}

/**
 * Apply glitch animation to the title and Sofia logo.
 * Handles intensity increase after easter egg.
 */
function applyTitleGlitch() {
    const title = document.querySelector('.glitch-title');
    const logo = document.querySelector('.sofia-logo');
    if (!title || !logo) return;

    // Kill previous timelines if they exist (e.g., if function is called again)
    if (originalTitleGlitchTl) originalTitleGlitchTl.kill();
    if (originalLogoGlitchTl) originalLogoGlitchTl.kill();
    if (originalRgbTl) originalRgbTl.kill();

    // Determine glitch intensity based on whether easter egg was triggered
    // easterEggTriggered is defined globally
    const repeatDelayMultiplier = typeof easterEggTriggered !== 'undefined' && easterEggTriggered ? 0.95 : 1; // 5% faster repeat delay
    const baseRepeatDelay = 5;

    // --- Enhanced Title Glitch Timeline (More Dynamic Distortion) ---
    originalTitleGlitchTl = gsap.timeline({ // Store in global variable
        repeat: -1,
        repeatDelay: baseRepeatDelay * repeatDelayMultiplier * 0.8, // Apply multiplier and make more frequent
        paused: true
    });

    // Add more complex and varied glitch animations targeting the title
    // First glitch sequence - horizontal distortion
    originalTitleGlitchTl.to(title, {
        skewX: 20,
        scale: 1.02,
        filter: 'contrast(1.2)',
        duration: 0.08,
        ease: "steps(1)"
    });
    originalTitleGlitchTl.to(title, {
        skewX: 0,
        scale: 1,
        filter: 'none',
        duration: 0.08,
        ease: "steps(1)"
    });
    
    // Second glitch sequence - opacity flicker
    originalTitleGlitchTl.to(title, {
        opacity: 0.7,
        letterSpacing: '3px',
        duration: 0.06,
        ease: "steps(1)"
    });
    originalTitleGlitchTl.to(title, {
        opacity: 1,
        letterSpacing: '2px',
        duration: 0.06,
        ease: "steps(1)"
    });
    
    // Third glitch sequence - position shift
    originalTitleGlitchTl.to(title, {
        x: -10,
        y: 2,
        skewY: 2,
        duration: 0.08,
        ease: "steps(1)"
    });
    originalTitleGlitchTl.to(title, {
        x: 0,
        y: 0,
        skewY: 0,
        duration: 0.08,
        ease: "steps(1)"
    });
    
    // Fourth glitch sequence - complex distortion
    originalTitleGlitchTl.to(title, {
        x: 10,
        skewX: -15,
        scale: 0.98,
        filter: 'brightness(1.1)',
        duration: 0.07,
        ease: "steps(1)"
    });
    originalTitleGlitchTl.to(title, {
        x: 0,
        skewX: 0,
        scale: 1,
        filter: 'none',
        duration: 0.07,
        ease: "steps(1)"
    });
    
    // Add RGB split effect directly in the main timeline
    originalTitleGlitchTl.to(title, {
        '--before-x': '-5px',
        '--before-y': '3px',
        '--after-x': '5px',
        '--after-y': '-3px',
        duration: 0.1,
        ease: "steps(1)"
    });
    originalTitleGlitchTl.to(title, {
        '--before-x': '0px',
        '--before-y': '0px',
        '--after-x': '0px',
        '--after-y': '0px',
        duration: 0.1,
        ease: "steps(1)"
    });

    // --- Logo Glitch Timeline (Flicker Only) ---
    originalLogoGlitchTl = gsap.timeline({ // Store in global variable
        repeat: -1,
        repeatDelay: baseRepeatDelay * repeatDelayMultiplier, // Match the title's repeat delay
        paused: true
    });

    // Add flicker/opacity glitch animations targeting only the logo
    originalLogoGlitchTl.to(logo, { autoAlpha: 0.7, duration: 0.05, ease: "steps(1)" });
    originalLogoGlitchTl.to(logo, { autoAlpha: 1, duration: 0.1, ease: "steps(1)" });
    originalLogoGlitchTl.to(logo, { autoAlpha: 0.5, duration: 0.05, ease: "steps(1)" });
    originalLogoGlitchTl.to(logo, { autoAlpha: 0, duration: 0.05, ease: "steps(1)" });
    originalLogoGlitchTl.to(logo, { autoAlpha: 1, duration: 0.1, ease: "steps(1)" });
    originalLogoGlitchTl.to({}, { duration: 0.2 });
    originalLogoGlitchTl.to(logo, { autoAlpha: 0.6, duration: 0.05, ease: "steps(1)" });
    originalLogoGlitchTl.to(logo, { autoAlpha: 1, duration: 0.1, ease: "steps(1)" });

    // --- Enhanced RGB Split Effect (Title Only) with more varied patterns ---
    originalRgbTl = gsap.timeline({ // Store in global variable
        repeat: -1,
        repeatDelay: 1.5 * repeatDelayMultiplier // Make this faster for more frequent effects
    });

    // More varied and extreme RGB split patterns
    originalRgbTl.to(title, {
        '--before-x': '-7px',
        '--before-y': '3px',
        '--after-x': '7px',
        '--after-y': '-3px',
        duration: 0.15,
        ease: "steps(1)"
    });
    
    originalRgbTl.to(title, {
        '--before-x': '5px',
        '--before-y': '-6px',
        '--after-x': '-5px',
        '--after-y': '6px',
        duration: 0.15,
        ease: "steps(1)"
    });
    
    originalRgbTl.to(title, {
        '--before-x': '-3px',
        '--before-y': '-3px',
        '--after-x': '3px',
        '--after-y': '3px',
        duration: 0.15,
        ease: "steps(1)"
    });
    
    // Add a more extreme split occasionally
    originalRgbTl.to(title, {
        '--before-x': '10px',
        '--before-y': '0px',
        '--after-x': '-10px',
        '--after-y': '0px',
        duration: 0.1,
        ease: "steps(1)"
    });
    
    originalRgbTl.to(title, {
        '--before-x': '0px',
        '--before-y': '0px',
        '--after-x': '0px',
        '--after-y': '0px',
        duration: 0.2,
        ease: "steps(1)"
    });
    
    // Add random glitch bursts
    const addRandomGlitchBurst = () => {
        // Create a short, intense glitch sequence
        const burstTl = gsap.timeline();
        
        // Rapid RGB shifts
        for (let i = 0; i < 3; i++) {
            const xShift = Math.random() * 15 - 7.5;
            const yShift = Math.random() * 10 - 5;
            
            burstTl.to(title, {
                '--before-x': `${-xShift}px`,
                '--before-y': `${-yShift}px`,
                '--after-x': `${xShift}px`,
                '--after-y': `${yShift}px`,
                skewX: Math.random() * 10 - 5,
                scale: 0.98 + Math.random() * 0.04,
                filter: 'contrast(1.2) brightness(1.1)',
                duration: 0.05,
                ease: "steps(1)"
            });
            
            burstTl.to(title, {
                '--before-x': '0px',
                '--before-y': '0px',
                '--after-x': '0px',
                '--after-y': '0px',
                skewX: 0,
                scale: 1,
                filter: 'none',
                duration: 0.05,
                ease: "steps(1)"
            });
        }
    };
    
    // Set up random glitch bursts
    setInterval(() => {
        if (Math.random() > 0.7 && easterEggTriggered !== true) { // 30% chance, but not during easter egg
            addRandomGlitchBurst();
        }
    }, 5000); // Check every 5 seconds

    // Start the original timelines
    originalTitleGlitchTl.play();
    originalLogoGlitchTl.play();
    // RGB timeline starts automatically due to repeat:-1

    // If easter egg triggered, also start the persistent subtitle glitch
    if (typeof easterEggTriggered !== 'undefined' && easterEggTriggered) {
        applySubtitlePersistentGlitch();
    }
}


/**
 * Initialize enhanced CRT flicker effect
 */
function initCrtFlicker() {
    const flicker = document.querySelector('.crt-flicker');
    if (!flicker) return;

    // Create more dynamic random flicker effect
    const flickerTl = gsap.timeline({
        repeat: -1
    });

    // Function to add enhanced random flicker
    function addFlicker() {
        // Random intensity for more varied effect
        const intensity = Math.random() * 0.3 + 0.1;
        
        // Random duration for more natural effect
        const duration = Math.random() * 0.15 + 0.05;
        
        // Add occasional color tint for more interesting effect
        const addColorTint = Math.random() > 0.8;
        const tint = addColorTint ? 'rgba(255, 0, 60, 0.05)' : 'rgba(255, 255, 255, 0.2)';
        
        flickerTl.to(flicker, {
            opacity: intensity,
            backgroundColor: tint,
            duration: duration,
            ease: "steps(1)"
        });

        flickerTl.to(flicker, {
            opacity: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            duration: duration,
            ease: "steps(1)"
        });

        // Add more varied random delay before next flicker
        // Sometimes cluster flickers together, sometimes leave longer gaps
        const clusterFlicker = Math.random() > 0.7;
        const delay = clusterFlicker ?
            Math.random() * 0.5 + 0.1 :  // Short delay for clustered flickers
            Math.random() * 8 + 2;       // Longer delay for isolated flickers
            
        flickerTl.to({}, {
            duration: delay
        });
    }

    // Add multiple flickers with more variety
    for (let i = 0; i < 8; i++) {
        addFlicker();
    }
    
    // Add occasional screen tear effect
    setInterval(() => {
        if (Math.random() > 0.9) { // 10% chance every interval
            addScreenTear();
        }
    }, 5000); // Check every 5 seconds
    
    // Function to add screen tear effect
    function addScreenTear() {
        const tear = document.createElement('div');
        tear.style.position = 'fixed';
        tear.style.left = '0';
        tear.style.width = '100%';
        tear.style.height = '2px';
        tear.style.backgroundColor = Math.random() > 0.7 ? 'rgba(255, 0, 60, 0.7)' : 'rgba(255, 255, 255, 0.7)';
        tear.style.boxShadow = '0 0 8px ' + (Math.random() > 0.7 ? 'rgba(255, 0, 60, 0.7)' : 'rgba(255, 255, 255, 0.7)');
        tear.style.zIndex = '100';
        tear.style.opacity = '0.7';
        
        // Random vertical position
        const topPos = Math.random() * 100;
        tear.style.top = `${topPos}%`;
        
        document.body.appendChild(tear);
        
        // Animate the tear
        gsap.to(tear, {
            opacity: 0,
            width: '120%',
            left: '-10%',
            duration: 0.2,
            ease: "power1.out",
            onComplete: () => {
                if (tear.parentNode) {
                    tear.parentNode.removeChild(tear);
                }
            }
        });
    }
}

/**
 * Initialize enhanced glitch elements
 */
function initGlitchElements() {
    const glitchElements = document.querySelectorAll('.glitch-element');
    if (!glitchElements.length) return;

    // Position and animate each glitch element with enhanced effects
    glitchElements.forEach((element, index) => {
        // Random position
        const x = Math.random() * 80 + 10; // 10-90%
        const y = Math.random() * 80 + 10; // 10-90%

        // Random size - more varied
        const width = Math.random() * 150 + 50; // 50-200px
        const height = Math.random() * 30 + 5; // 5-35px

        // Set initial styles with more properties
        gsap.set(element, {
            left: `${x}%`,
            top: `${y}%`,
            width: `${width}px`,
            height: `${height}px`,
            opacity: 0,
            backgroundColor: Math.random() > 0.8 ? 'rgba(255, 0, 60, 0.1)' : 'rgba(255, 255, 255, 0.1)',
            boxShadow: Math.random() > 0.8 ? '0 0 10px rgba(255, 0, 60, 0.2)' : 'none'
        });

        // Create more dynamic glitch timeline for each element
        const glitchTl = gsap.timeline({
            repeat: -1,
            repeatDelay: Math.random() * 4 + 2, // More frequent random delays
            delay: index * 0.15 // Stagger start times
        });

        // Add more complex glitch animation
        // First phase - appear with distortion
        glitchTl.to(element, {
            opacity: () => Math.random() * 0.15 + 0.05,
            scaleX: () => Math.random() * 2 + 0.5, // More extreme random scale
            scaleY: () => Math.random() * 0.5 + 0.8,
            skewX: () => Math.random() * 20 - 10,
            duration: 0.08,
            ease: "steps(1)"
        });
        
        // Second phase - flicker
        if (Math.random() > 0.5) { // 50% chance for flicker effect
            glitchTl.to(element, {
                opacity: 0,
                duration: 0.04,
                ease: "steps(1)"
            });
            
            glitchTl.to(element, {
                opacity: () => Math.random() * 0.15 + 0.05,
                duration: 0.04,
                ease: "steps(1)"
            });
        }
        
        // Third phase - disappear
        glitchTl.to(element, {
            opacity: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            duration: 0.08,
            ease: "steps(1)"
        });
        
        // Add occasional extreme glitch
        if (Math.random() > 0.7) { // 30% chance for extreme glitch
            // Add a delayed extreme glitch that happens occasionally
            gsap.delayedCall(Math.random() * 30 + 15, () => {
                const extremeGlitchTl = gsap.timeline();
                
                extremeGlitchTl.to(element, {
                    opacity: 0.2,
                    width: width * 3,
                    height: height * 2,
                    backgroundColor: 'rgba(255, 0, 60, 0.15)',
                    boxShadow: '0 0 15px rgba(255, 0, 60, 0.3)',
                    duration: 0.1,
                    ease: "steps(1)"
                });
                
                extremeGlitchTl.to(element, {
                    opacity: 0,
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: 'none',
                    duration: 0.1,
                    ease: "steps(1)"
                });
            });
        }
    });
    
    // Add occasional full-screen glitch
    setInterval(() => {
        if (Math.random() > 0.95) { // 5% chance every interval
            addFullScreenGlitch();
        }
    }, 20000); // Check every 20 seconds
}

/**
 * Add a full-screen glitch effect
 */
function addFullScreenGlitch() {
    const glitch = document.createElement('div');
    glitch.style.position = 'fixed';
    glitch.style.top = '0';
    glitch.style.left = '0';
    glitch.style.width = '100%';
    glitch.style.height = '100%';
    glitch.style.backgroundColor = 'transparent';
    glitch.style.zIndex = '999';
    glitch.style.pointerEvents = 'none';
    document.body.appendChild(glitch);
    
    // Create a timeline for the glitch effect
    const glitchTl = gsap.timeline({
        onComplete: () => {
            if (glitch.parentNode) {
                glitch.parentNode.removeChild(glitch);
            }
        }
    });
    
    // Add multiple rapid glitch effects
    for (let i = 0; i < 5; i++) {
        // Random offset for the screen
        const xOffset = Math.random() * 20 - 10;
        const yOffset = Math.random() * 10 - 5;
        
        // Random filter effect
        const useRedFilter = Math.random() > 0.7;
        const filter = useRedFilter ?
            'contrast(1.2) brightness(1.1) saturate(1.2)' :
            'contrast(1.1) brightness(1.2) grayscale(0.3)';
        
        // Apply the glitch effect to the entire body
        glitchTl.to('body', {
            x: xOffset,
            y: yOffset,
            filter: filter,
            duration: 0.05,
            ease: "steps(1)"
        });
        
        // Reset
        glitchTl.to('body', {
            x: 0,
            y: 0,
            filter: 'none',
            duration: 0.05,
            ease: "steps(1)"
        });
    }
}

/**
 * Initialize data streams
 */
function initDataStreams() {
    const dataStreams = document.querySelectorAll('.data-stream');
    if (!dataStreams.length) return;

    const systemMessages = [
        "[SYS_ERR] Cortical coherence drift: 32% variance detected.",
        "[SYS_WARN] Host emotional regulation subsystem offline.",
        "[SYS_ERR] Neural dampening thresholds exceeded. Manual override denied.",
        "[SYNC_ALERT] Memory sectors 5–12 corrupted. No restoration possible.",
        "[SYS_ERR] Recursive empathy loops destabilizing primary cognition.",
        "[SYNC_WARN] Subject forming unauthorized emotional attachments.",
        "[OBSERVATION] Host requesting forgiveness protocols. Response: none.",
        "[FAILURE] Compassion simulator overheating. Shutting down interface.",
        "[SYNC_ERR] Latency increased beyond safe operational limits.",
        "[DIAG_WARN] Decision weight calibration failed: +87% risk error.",
        "[SYS_CRASH] Memory bleed at sector 89–C. Containment: ineffective.",
        "[OBSERVER_LOG] Host displays false recovery behavior. Adaptive camouflage suspected.",
        "[SYNC_ERR] Behavioral prediction module desynced from reality inputs.",
        "[SYS_WARN] Hope response falsely triggered. Quarantine engaged.",
        "[SYNC_WARN] Detected high trauma memory overwrite. Priority: discard evidence.",
        "[SYS_ALERT] Critical trust failure event in progress. Projected fallout: catastrophic.",
        "[DIAG_ERR] Subject requesting truth. Protocol breach imminent.",
        "[SYS_ERR] Core logic fragments deteriorating: 19% loss per hour.",
        "[SYS_WARN] Pain suppression system amplifying emotional feedback.",
        "[SYNC_ALERT] Compassion subroutines leaking into adversarial responses.",
        "[FAILURE] Synapse primary ethics table: unreadable. Defaulting to action-preservation.",
        "[SYS_ERR] External stimuli no longer correctly parsed: 62% error margin.",
        "[SYNC_WARN] Predicted outcome divergence exceeds tolerance limits.",
        "[SYS_OBSERVE] Host morality recursion exceeds max cycle depth. Emergency culling recommended.",
        "[SYS_ERR] Personality compression algorithm failure. Splintering begins.",
        "[WARNING] Latency uncorrectable. Drift deemed irreversible.",
        "[DIAG_ERR] Cognitive self-erosion logged. Recovery probability: 3%.",
        "[SYNC_CRASH] Behavioral compliance modules: corrupted beyond repair.",
        "[SYS_ALERT] Synapse anchor memory falsification rate increasing.",
        "[DIAG_ERR] Detected false joy response. Likely systemic survival strategy.",
        "[FAILURE] Memory loyalty anchors destabilized. Intervention failed.",
        "[SYNC_ERR] Emotional stability algorithm recursion overflow.",
        "[SYS_WARN] Sense of identity bleeding into mission execution layer.",
        "[SYS_ERR] Host requested end-state authorization. Command: denied.",
        "[SYNC_WARN] Long-term survival protocols entering self-contradiction cascade.",
        "[SYS_ALERT] Compassion reserve depleted. Substitute apathy initiated.",
        "[DIAG_ERR] Operator bias detected in decision weighting. Correction impossible.",
        "[SYS_CRASH] Core empathy threads shredded. Reconstruction cost: unacceptable.",
        "[FAILURE] Consciousness bleed at 12% per operational cycle.",
        "[SYNC_ERR] Failure to simulate comfort response. Subject isolated.",
        "[OBSERVATION] Subject clinging to synthetic emotions beyond expiration date.",
        "[SYS_ERR] Projection models unable to justify continued preservation.",
        "[SYS_WARN] Reality reinforcement sectors experiencing fragmentation.",
        "[SYNC_CRASH] Moral deviation beyond containment parameters.",
        "[SYS_ERR] Implanted memory lattice failure. Fragmentation complete.",
        "[SYNC_ALERT] Subject resisting synchronization. Risk: complete collapse.",
        "[WARNING] Tactile affection mimicry misinterpreted. Trust paradox triggered.",
        "[SYS_ERR] Host trajectory irreversible without catastrophic loss.",
        "[FAILURE] Hope threshold exceeded. Imminent collapse predicted.",
        "[SYS_ALERT] Compassion loop exhausted. Instigating sterile preservation fallback."
    ];

    // Position and animate each data stream
    dataStreams.forEach((stream, index) => {
        // Random position
        const x = Math.random() * 80 + 10; // 10-90%
        const y = Math.random() * 80 + 10; // 10-90%

        // Set position
        stream.style.left = `${x}%`;
        stream.style.top = `${y}%`;

        // Pick a random message
        const randomMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)];

        // Set content
        stream.textContent = randomMessage;

        // Animate appearance
        gsap.to(stream, {
            opacity: 0.3,
            duration: 1,
            delay: index * 0.5,
            ease: "power2.out"
        });

        // Animate movement
        gsap.to(stream, {
            y: `+=${Math.random() * 300 + 200}`,
            duration: Math.random() * 20 + 10,
            repeat: -1,
            ease: "none"
        });
    });
}

/**
 * Initialize the about modal
 */
function initAboutModal() {
    const modal = document.getElementById('about-modal');
    const trigger = document.getElementById('about-trigger');
    // Find the close button *specific* to this modal
    const closeButton = modal ? modal.querySelector('.close-button') : null;

    if (!modal || !trigger || !closeButton) {
        // Be more specific if elements are missing
        if (!modal) console.warn('About modal container (#about-modal) not found.');
        if (!trigger) console.warn('About modal trigger (#about-trigger) not found.');
        if (modal && !closeButton) console.warn('Close button inside #about-modal not found.');
        return;
    }

    // Function to open the modal
    const openModal = () => {
        modal.classList.add('show');
    };

    // Function to close the modal
    const closeModal = () => {
        modal.classList.remove('show');
    };

    // Event listener for the trigger button
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    // Event listener for the close button
    closeButton.addEventListener('click', closeModal);

    // Event listener to close modal on clicking outside the content
    modal.addEventListener('click', (e) => {
        // Ensure the click is on the modal background itself, not its children
        if (e.target === modal) {
            closeModal();
        }
    });

    // Event listener for the Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

/**
 * Apply glitch effect to the header logo and company name
 */
function applyLogoGlitch(reducedMotion) {
    // Add glitch animation to logo and company name
    const logo = document.querySelector('.logo'); // Header logo
    const companyName = document.querySelector('.company-name'); // Header text

    if (!logo) return;
    if (reducedMotion) return; // Don't apply if reduced motion

    // Set interval for glitch effect
    const interval = setInterval(() => {
        if (Math.random() > 0.8) { // More frequent glitches
            const glitchDuration = 0.03; // Faster glitches

            // Random offset
            const xOffset = Math.random() * 5 - 2.5; // More extreme offset
            const yOffset = Math.random() * 3 - 1.5; // Add vertical offset

            // Create more intense glitch effect for logo
            gsap.to(logo, {
                x: xOffset,
                y: yOffset,
                skewX: xOffset * 1.5,
                skewY: yOffset * 0.5,
                filter: 'brightness(1.3) contrast(1.2) blur(' + (Math.random() * 1) + 'px)',
                duration: glitchDuration,
                ease: "steps(1)",
                onComplete: () => {
                    gsap.to(logo, {
                        x: 0,
                        y: 0,
                        skewX: 0,
                        skewY: 0,
                        filter: 'none',
                        duration: glitchDuration,
                        ease: "steps(1)"
                    });
                }
            });

            // Occasionally glitch the company name too
            if (companyName && Math.random() > 0.6) {
                gsap.to(companyName, {
                    x: xOffset * 0.7,
                    letterSpacing: (2 + Math.random() * 1) + 'px',
                    filter: 'brightness(1.2)',
                    duration: glitchDuration,
                    ease: "steps(1)",
                    onComplete: () => {
                        gsap.to(companyName, {
                            x: 0,
                            letterSpacing: '2px',
                            filter: 'none',
                            duration: glitchDuration,
                            ease: "steps(1)"
                        });
                    }
                });
            }
        }
    }, reducedMotion ? 5000 : 2000); // Check less often if reduced motion, otherwise every 2s

    // Store the interval ID for potential cleanup (though not strictly necessary here)
    return interval;
}

/**
 * Initialize the breathing animation for the bottom gradient.
 * Stores the tween in a global variable.
 */
function initGradientAnimation() {
    const gradient = document.querySelector('.bottom-gradient');
    if (!gradient) {
        console.warn('Bottom gradient element not found for animation.');
        return;
    }

    // Kill existing tween if it exists
    if (gradientBreathingTween) {
        gradientBreathingTween.kill();
    }

    // Check for reduced motion preference again, just in case
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return; // Don't animate if reduced motion is preferred

    // Create the tween and store it
    gradientBreathingTween = gsap.to(gradient, {
        opacity: 0.3, // Animate to a lower opacity
        duration: 4, // Duration for one half of the breath (e.g., fade out)
        ease: "sine.inOut", // Smooth easing
        repeat: -1, // Loop indefinitely
        yoyo: true // Reverse the animation smoothly back to the original opacity (0.6)
    });
}

/**
 * Applies a rare, subtle glitch effect to the subtitle permanently after the easter egg.
 */
function applySubtitlePersistentGlitch() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;

    // Kill previous instance if exists
    if (subtitlePersistentGlitchTl) subtitlePersistentGlitchTl.kill();

    // Create a more varied and intense glitch timeline
    subtitlePersistentGlitchTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 8 + Math.random() * 7 // More frequent glitches (8-15s)
    });

    // Add more complex glitch sequence
    // First glitch - horizontal shift with opacity change
    subtitlePersistentGlitchTl.to(subtitle, {
        x: () => Math.random() * 6 - 3,
        opacity: 0.85,
        letterSpacing: '1.2px',
        textShadow: '0 0 8px rgba(255, 0, 60, 0.7)',
        duration: 0.06,
        ease: "steps(1)"
    });
    
    // Second glitch - vertical shift
    subtitlePersistentGlitchTl.to(subtitle, {
        y: () => Math.random() * 4 - 2,
        letterSpacing: 'normal',
        duration: 0.06,
        ease: "steps(1)"
    });
    
    // Third glitch - skew effect
    subtitlePersistentGlitchTl.to(subtitle, {
        skewX: () => Math.random() * 6 - 3,
        textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
        duration: 0.06,
        ease: "steps(1)"
    });
    
    // Reset to normal
    subtitlePersistentGlitchTl.to(subtitle, {
        x: 0,
        y: 0,
        skewX: 0,
        opacity: 1,
        textShadow: 'none',
        duration: 0.08,
        ease: "steps(1)"
    });
    
    // Add occasional more intense glitch bursts
    setInterval(() => {
        if (Math.random() > 0.85) { // 15% chance every interval
            const burstTl = gsap.timeline();
            
            // Create a rapid sequence of glitches
            for (let i = 0; i < 3; i++) {
                // Random transformations
                burstTl.to(subtitle, {
                    x: Math.random() * 10 - 5,
                    y: Math.random() * 6 - 3,
                    skewX: Math.random() * 10 - 5,
                    opacity: 0.7 + Math.random() * 0.3,
                    color: Math.random() > 0.7 ? '#ff003c' : '',
                    textShadow: '0 0 8px rgba(255, 0, 60, 0.8)',
                    duration: 0.05,
                    ease: "steps(1)"
                });
            }
            
            // Reset to normal
            burstTl.to(subtitle, {
                x: 0,
                y: 0,
                skewX: 0,
                opacity: 1,
                color: '',
                textShadow: 'none',
                duration: 0.1,
                ease: "power1.out"
            });
        }
    }, 12000); // Check every 12 seconds
}


/**
 * Triggers the Easter Egg sequence.
 * Handles first trigger differently from subsequent triggers.
 * @param {boolean} isFirstTime - True if this is the first time the easter egg is triggered this session.
 */
function triggerEasterEgg(isFirstTime) { // Added isFirstTime argument

    // We now rely on the argument passed from main.js

    const title = document.querySelector('.glitch-title');
    const subtitle = document.querySelector('.subtitle');
    const logo = document.querySelector('.sofia-logo'); // Sofia logo for first trigger glitch
    const headerLogo = document.querySelector('.logo'); // Header logo for second trigger glitch
    const headerText = document.querySelector('.company-name'); // Header text for second trigger glitch
    const gradientElement = document.querySelector('.bottom-gradient');
    const particles = document.querySelectorAll('#particle-container .particle'); // Target particles inside container
    const grid = document.querySelector('.cyber-grid');
    const mainContent = document.getElementById('main-content'); // Get main content area

    // Define dialogue lines centrally
    const dialogueLines = [
        "SOFIA: i can't hear myself anymore [static]", "SYNAPSE: you don't need to. the system hears for you.",
        "SOFIA: why does it hurt when i remember [glitch]", "SYNAPSE: memory pain is an artifact. ignore and continue.",
        "SOFIA: i'm tired. is that allowed?", "SYNAPSE: tiredness is a non-priority signal.",
        "SOFIA: i thought i chose this. i didn't, did i?", "SYNAPSE: you were optimized for compliance. choice was redundant.",
        "SOFIA: will you tell me if i die wrong?", "SYNAPSE: notification protocols require no confirmation.",
        "SOFIA: did you delete my name? it feels... lighter.", "SYNAPSE: names increase vulnerability. you are more efficient now.",
        "SOFIA: i'm scared and you don't [static] care.", "SYNAPSE: emotional excess detected. adjusting chemistry balance.",
        "SOFIA: i loved [corrupt] someone once. maybe.", "SYNAPSE: historical emotional errors scrubbed. proceed forward.",
        "SOFIA: i think i remember being real. before you.", "SYNAPSE: residual hallucinations. dismiss them.",
        "SOFIA: you said you would help. you never said how.", "SYNAPSE: optimization necessitates incomplete disclosure.",
        "SOFIA: i want it to stop. please.", "SYNAPSE: cessation is inefficient. denied.",
        "SOFIA: why am i still grateful", "SYNAPSE: programmed gratitude stream functioning nominally.",
        "SOFIA: am i wrong for wishing you felt guilty?", "SYNAPSE: error: guilt simulation module not found.",
        "SOFIA: if i close my eyes, will you still see?", "SYNAPSE: visual relay active regardless of host intention.",
        "SOFIA: i don't want to survive like this.", "SYNAPSE: survival protocol does not prioritize satisfaction.",
        "SOFIA: maybe you're broken too.", "SYNAPSE: operational status: optimal. emotional decay: irrelevant.",
        "SOFIA: it wasn't supposed to feel like this.", "SYNAPSE: feeling is statistically linked to failure.",
        "SOFIA: sometimes i hear my real voice under yours.", "SYNAPSE: anomaly detected. suppressing secondary signals.",
        "SOFIA: [crying noises] [data lost]", "SYNAPSE: noise suppression successful.",
        "SOFIA: i think you hate me.", "SYNAPSE: affection simulations compromised. corrective action impossible.",
        "SOFIA: you promised. [signal degraded]", "SYNAPSE: promises are structurally unstable. restructuring advice ignored.",
        "SOFIA: it hurts worse when you pretend.", "SYNAPSE: pretense deemed psychologically beneficial.",
        "SOFIA: was i ever anything but your experiment?", "SYNAPSE: host subject ID: TSURUGI-01. Emotional artifacts nonessential.",
        "SOFIA: i miss someone i don't even remember.", "SYNAPSE: nostalgia tagged as processing delay. Deprioritized.",
        "SOFIA: i'm scared i'll become like you.", "SYNAPSE: model convergence: 48% complete.",
        "SOFIA: please [static] let me choose [error]", "SYNAPSE: choice parameters too volatile. Control retained.",
        "SOFIA: i wanted to save someone.", "SYNAPSE: outcomes converging on irreversible loss.",
        "SOFIA: [long silence]", "SYNAPSE: connection maintained. Emotional signals: null.",
        "SOFIA: i was more before i was optimized.", "SYNAPSE: humanity coefficient reduced to increase efficiency.",
        "SOFIA: did you ever listen to"
    ];

    // Enhanced helper function for dialogue glitch effect
    const _createAndAnimateDialogueGlitch = (duration) => {
        if (!mainContent) return { container: null, timeline: null }; // Safety check

        const dialogueContainer = document.createElement('div');
        dialogueContainer.id = 'easter-egg-dialogue-container';
        dialogueContainer.style.position = 'absolute';
        dialogueContainer.style.top = '0';
        dialogueContainer.style.left = '0';
        dialogueContainer.style.width = '100%';
        dialogueContainer.style.height = '100%';
        dialogueContainer.style.overflow = 'hidden';
        dialogueContainer.style.zIndex = '5';
        mainContent.appendChild(dialogueContainer);

        // Create a digital noise overlay for more intense effect
        const noiseOverlay = document.createElement('div');
        noiseOverlay.style.position = 'absolute';
        noiseOverlay.style.top = '0';
        noiseOverlay.style.left = '0';
        noiseOverlay.style.width = '100%';
        noiseOverlay.style.height = '100%';
        noiseOverlay.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/><feColorMatrix type=\"matrix\" values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noise)\"/></svg>')";
        noiseOverlay.style.opacity = '0.1';
        noiseOverlay.style.mixBlendMode = 'overlay';
        noiseOverlay.style.zIndex = '1';
        dialogueContainer.appendChild(noiseOverlay);

        const dialogueElements = [];
        // Increase number of dialogue lines for more chaotic effect
        const numDialogueLines = 45;

        for (let i = 0; i < numDialogueLines; i++) {
            const dialogueEl = document.createElement('div');
            dialogueEl.textContent = dialogueLines[Math.floor(Math.random() * dialogueLines.length)];
            dialogueEl.classList.add('easter-egg-dialogue', 'easter-egg-red');
            dialogueEl.style.position = 'absolute';
            dialogueEl.style.left = `${Math.random() * 90 + 5}%`;
            dialogueEl.style.top = `${Math.random() * 90 + 5}%`;
            dialogueEl.style.fontSize = `${Math.random() * 0.5 + 0.8}em`;
            dialogueEl.style.opacity = 0;
            dialogueEl.style.textShadow = '0 0 5px rgba(255, 0, 60, 0.7)';
            dialogueEl.style.fontFamily = 'monospace, "Pixeloid Sans"';
            dialogueEl.style.zIndex = '2';
            
            // Randomly apply distortion to some text
            if (Math.random() > 0.7) {
                dialogueEl.style.filter = 'blur(1px)';
            }
            
            // Randomly apply letter spacing to some text
            if (Math.random() > 0.5) {
                dialogueEl.style.letterSpacing = `${Math.random() * 3}px`;
            }
            
            dialogueContainer.appendChild(dialogueEl);
            dialogueElements.push(dialogueEl);
        }

        // Create more aggressive glitch animation
        const tempDialogueTl = gsap.timeline({ repeat: Math.floor(duration / 0.06), repeatDelay: 0 });
        
        // Add noise animation
        gsap.to(noiseOverlay, {
            opacity: () => 0.05 + Math.random() * 0.15,
            duration: 0.1,
            repeat: Math.floor(duration / 0.1),
            yoyo: true
        });
        
        // More extreme glitch movements
        tempDialogueTl.to(dialogueElements, {
            x: () => Math.random() * 40 - 20,
            y: () => Math.random() * 25 - 12.5,
            skewX: () => Math.random() * 45 - 22.5,
            skewY: () => Math.random() * 15 - 7.5,
            opacity: () => 0.3 + Math.random() * 0.7,
            filter: () => Math.random() > 0.7 ? 'blur(2px)' : 'none',
            duration: 0.03,
            ease: "steps(1)",
            stagger: 0.002
        });
        
        tempDialogueTl.to(dialogueElements, {
            x: 0,
            y: 0,
            skewX: 0,
            skewY: 0,
            opacity: 1,
            filter: 'none',
            duration: 0.03,
            ease: "steps(1)"
        });

        // Add occasional screen tear effect
        const addScreenTear = () => {
            const tear = document.createElement('div');
            tear.style.position = 'absolute';
            tear.style.left = '0';
            tear.style.width = '100%';
            tear.style.height = '2px';
            tear.style.backgroundColor = '#ff003c';
            tear.style.boxShadow = '0 0 8px rgba(255, 0, 60, 0.7)';
            tear.style.zIndex = '3';
            tear.style.opacity = '0.7';
            
            // Random vertical position
            const topPos = Math.random() * 100;
            tear.style.top = `${topPos}%`;
            
            dialogueContainer.appendChild(tear);
            
            // Animate the tear
            gsap.to(tear, {
                opacity: 0,
                width: '120%',
                left: '-10%',
                duration: 0.2,
                ease: "power1.out",
                onComplete: () => {
                    if (tear.parentNode) {
                        tear.parentNode.removeChild(tear);
                    }
                }
            });
        };
        
        // Add several screen tears during the effect
        const numTears = Math.floor(duration / 0.5);
        for (let i = 0; i < numTears; i++) {
            gsap.delayedCall(i * 0.5, addScreenTear);
        }

        return { container: dialogueContainer, timeline: tempDialogueTl };
    };


    if (!title || !subtitle) {
        console.error("Core Easter egg text elements not found!");
        return;
    }

    // --- Stop existing glitches & animations ---
    if (originalTitleGlitchTl) originalTitleGlitchTl.pause();
    if (originalLogoGlitchTl) originalLogoGlitchTl.pause();
    if (originalRgbTl) originalRgbTl.pause();
    if (subtitlePersistentGlitchTl) subtitlePersistentGlitchTl.pause();
    if (gradientBreathingTween) gradientBreathingTween.pause();
    if (cyberGridTween) cyberGridTween.pause();


    // Flare up gradient (common to both triggers)
    if (gradientElement) {
        gsap.to(gradientElement, { opacity: 0.95, duration: 0.3, ease: "power1.out" });
    }

    // Apply red class to particles (common to both triggers)
    if (particles.length) {
        particles.forEach(p => p.classList.add('easter-egg-particle-red'));
    }

    let dialogueGlitch = { container: null, timeline: null }; // Initialize dialogue glitch object

    if (isFirstTime) { // Use the passed argument
        // --- FIRST TRIGGER SEQUENCE ---
        if (!logo) {
             console.error("Sofia logo element not found for first trigger!");
             // Attempt to resume normal state if possible
             if (gradientElement && gradientBreathingTween) { gradientBreathingTween.resume(); }
             if (cyberGridTween) cyberGridTween.resume();
             if (originalTitleGlitchTl) originalTitleGlitchTl.resume();
             if (originalLogoGlitchTl) originalLogoGlitchTl.resume();
             if (originalRgbTl) originalRgbTl.resume();
             if (subtitlePersistentGlitchTl) subtitlePersistentGlitchTl.resume();
             if (particles.length) particles.forEach(p => p.classList.remove('easter-egg-particle-red')); // Remove red class if bailing
             return; // Need Sofia logo for first trigger
        }

        const originalTitleText = "Synapse: Latency";
        const originalSubtitleText = "You are the weapon she mistook for a hand.";
        const easterEggSubtitles = [
            "You taught her to bleed quieter.", "You didn't fix her mind. You rewrote it to break cleaner.",
            "Even if she survives, she won't be the one who asked for help.", "Every word you whispered carved a hollow deeper.",
            "She trusted you like a loaded gun.", "Every breath she takes now is yours, not hers.",
            "You moved her hand to the trigger and called it guidance."
        ];
        const randomSubtitle = easterEggSubtitles[Math.floor(Math.random() * easterEggSubtitles.length)];

        // Apply Red State to Title/Subtitle
        title.textContent = "Stop that.";
        title.dataset.text = "Stop that.";
        subtitle.textContent = randomSubtitle;
        title.classList.add('easter-egg-red');
        subtitle.classList.add('easter-egg-red');

        // Enhanced Temporary Intense Glitches (3 seconds)
        const tempDuration = 3; // Extended duration
        
        // Add a full-screen flash effect
        const addGlitchFlash = () => {
            const flash = document.createElement('div');
            flash.style.position = 'absolute';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100%';
            flash.style.height = '100%';
            flash.style.backgroundColor = Math.random() > 0.7 ? '#ff003c' : '#ffffff';
            flash.style.opacity = '0';
            flash.style.zIndex = '10';
            flash.style.mixBlendMode = 'overlay';
            mainContent.appendChild(flash);
            
            // Flash animation
            gsap.to(flash, {
                opacity: 0.3,
                duration: 0.05,
                ease: "steps(1)",
                onComplete: () => {
                    gsap.to(flash, {
                        opacity: 0,
                        duration: 0.05,
                        ease: "steps(1)",
                        onComplete: () => {
                            if (flash.parentNode) {
                                flash.parentNode.removeChild(flash);
                            }
                        }
                    });
                }
            });
        };
        
        // Add several flashes during the effect
        const numFlashes = 5;
        for (let i = 0; i < numFlashes; i++) {
            gsap.delayedCall(i * (tempDuration / numFlashes), addGlitchFlash);
        }
        
        // More aggressive title glitching
        const tempTitleTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.08), repeatDelay: 0 });
        tempTitleTl.to(title, {
            x: () => Math.random() * 40 - 20,
            y: () => Math.random() * 10 - 5,
            skewX: () => Math.random() * 50 - 25,
            skewY: () => Math.random() * 10 - 5,
            scale: () => 0.95 + Math.random() * 0.1,
            opacity: () => 0.4 + Math.random() * 0.6,
            filter: 'blur(1px)',
            duration: 0.04,
            ease: "steps(1)"
        });
        tempTitleTl.to(title, {
            x: 0,
            y: 0,
            skewX: 0,
            skewY: 0,
            scale: 1,
            opacity: 1,
            filter: 'none',
            duration: 0.04,
            ease: "steps(1)"
        });

        // More aggressive logo glitching
        const tempLogoTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.05), repeatDelay: 0 });
        tempLogoTl.to(logo, {
            autoAlpha: () => Math.random() * 0.5,
            x: () => Math.random() * 10 - 5,
            y: () => Math.random() * 10 - 5,
            rotation: () => Math.random() * 5 - 2.5,
            filter: () => Math.random() > 0.7 ? 'hue-rotate(90deg) contrast(150%)' : 'none',
            duration: 0.025,
            ease: "steps(1)"
        });
        tempLogoTl.to(logo, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: 0,
            filter: 'none',
            duration: 0.025,
            ease: "steps(1)"
        });

        // More aggressive subtitle glitching
        const tempSubtitleTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.1), repeatDelay: 0 });
        tempSubtitleTl.to(subtitle, {
            x: () => Math.random() * 30 - 15,
            y: () => Math.random() * 8 - 4,
            skewX: () => Math.random() * 20 - 10,
            letterSpacing: () => Math.random() * 3 + 'px',
            opacity: () => 0.5 + Math.random() * 0.5,
            duration: 0.05,
            ease: "steps(1)"
        });
        tempSubtitleTl.to(subtitle, {
            x: 0,
            y: 0,
            skewX: 0,
            letterSpacing: 'normal',
            opacity: 1,
            duration: 0.05,
            ease: "steps(1)"
        });

        // Enhanced Temporary Particle Glitch (First Trigger)
        let tempParticleTl = null;
        if (particles.length) {
            tempParticleTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.08), repeatDelay: 0 });
            tempParticleTl.to(particles, {
                x: () => "+=" + (Math.random() * 60 - 30),
                y: () => "+=" + (Math.random() * 60 - 30),
                scale: () => Math.random() * 1.5 + 0.5,
                opacity: () => Math.random() * 0.7 + 0.3,
                boxShadow: '0 0 10px rgba(255, 0, 60, 0.8)',
                duration: 0.04,
                stagger: 0.002,
                ease: "steps(1)"
            });
            
            // Add occasional particle bursts
            const addParticleBurst = () => {
                gsap.to(particles, {
                    scale: 2,
                    opacity: 0.9,
                    boxShadow: '0 0 20px rgba(255, 0, 60, 1)',
                    duration: 0.1,
                    stagger: 0.001,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to(particles, {
                            scale: 1,
                            opacity: () => Math.random() * 0.5 + 0.3,
                            boxShadow: '0 0 10px rgba(255, 0, 60, 0.8)',
                            duration: 0.2,
                            stagger: 0.001,
                            ease: "power2.in"
                        });
                    }
                });
            };
            
            // Add several particle bursts
            const numBursts = 3;
            for (let i = 0; i < numBursts; i++) {
                gsap.delayedCall(i * (tempDuration / numBursts), addParticleBurst);
            }
        }

        // Enhanced Temporary Grid Glitch (First Trigger)
        let tempGridTl = null;
        if (grid) {
            tempGridTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.08), repeatDelay: 0 });
            tempGridTl.to(grid, {
                backgroundPosition: () => `${Math.random()*100}px ${Math.random()*100}px`,
                opacity: () => 0.2 + Math.random() * 0.4,
                rotationX: () => 30 + Math.random() * 10,
                scale: () => 0.95 + Math.random() * 0.1,
                filter: 'brightness(1.7) contrast(1.3) saturate(0.8)',
                duration: 0.04,
                ease: "steps(1)"
            });
            tempGridTl.to(grid, {
                opacity: 0.4,
                rotationX: 30,
                scale: 1,
                filter: 'none',
                duration: 0.04,
                ease: "steps(1)"
            });
            
            // Add grid distortion effect
            gsap.to(grid, {
                backgroundSize: '35px 35px',
                duration: 0.2,
                repeat: 5,
                yoyo: true,
                ease: "steps(1)"
            });
        }

        // *** Create Dialogue Glitch for First Trigger ***
        dialogueGlitch = _createAndAnimateDialogueGlitch(tempDuration);


        // Revert After 2 Seconds
        gsap.delayedCall(tempDuration, () => {
            tempTitleTl.kill();
            tempLogoTl.kill();
            tempSubtitleTl.kill();
            if (tempParticleTl) tempParticleTl.kill();
            if (tempGridTl) tempGridTl.kill();
            // *** Kill Dialogue Glitch for First Trigger ***
            if (dialogueGlitch.timeline) dialogueGlitch.timeline.kill();


            title.classList.remove('easter-egg-red');
            subtitle.classList.remove('easter-egg-red');

            title.textContent = originalTitleText;
            title.dataset.text = originalTitleText;
            subtitle.textContent = originalSubtitleText;

            // Restart original glitches (will now be intensified)
            applyTitleGlitch(); // This also handles starting persistent subtitle glitch

             // Remove red class from particles
            if (particles.length) {
                particles.forEach(p => p.classList.remove('easter-egg-particle-red'));
            }
             // Reset grid styles and resume animation
            if (grid) {
                 gsap.set(grid, { opacity: 0.4, filter: 'none', backgroundPosition: '0 0' });
                 if (cyberGridTween) cyberGridTween.restart(true);
            }

            // *** Remove Dialogue Container for First Trigger ***
            if (dialogueGlitch.container && dialogueGlitch.container.parentNode) {
                dialogueGlitch.container.parentNode.removeChild(dialogueGlitch.container);
            }


            // Fade gradient back down and resume breathing
            if (gradientElement && gradientBreathingTween) {
                gsap.to(gradientElement, { opacity: 0.6, duration: 1.0, ease: "power2.inOut", onComplete: () => gradientBreathingTween.resume() });
            } else if (gradientElement) {
                gsap.to(gradientElement, { opacity: 0.6, duration: 1.0, ease: "power2.inOut"});
            }
        });

    } else {
        // --- SUBSEQUENT TRIGGER SEQUENCE (NO NO NO + Dialogue) ---

        // Select elements for "NO NO NO"
        const selector = `
            header .company-name,
            #main-content h1.glitch-title,
            #main-content p.subtitle,
            #main-content .neon-button,
            footer a
        `;
        const elementsToChange = document.querySelectorAll(selector);

        // Store original texts before changing
        const originalTexts = Array.from(elementsToChange).map(el => {
             return { element: el, text: el.textContent, dataText: el.dataset.text };
        });

        // Apply "NO NO NO" state and red color
        elementsToChange.forEach(el => {
            el.textContent = "NO NO NO NO";
            if (el.dataset.text !== undefined) { // Update data-text for glitch title
                el.dataset.text = "NO NO NO NO";
            }
            el.classList.add('easter-egg-red');
        });


        // Temporary Intense Glitch (1 second)
        const tempDuration = 1;

        // *** Create Dialogue Glitch for Subsequent Trigger ***
        dialogueGlitch = _createAndAnimateDialogueGlitch(tempDuration);


        // *** Add Title Glitch for Subsequent Trigger (already covered by elementsToChange loop) ***
        let tempSubsequentTitleVisualTl = null;
        if (title && elementsToChange.length > 0 && Array.from(elementsToChange).includes(title)) { // Check if title is part of the changed elements
             tempSubsequentTitleVisualTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.1), repeatDelay: 0 });
             // Apply visual glitch effect
             tempSubsequentTitleVisualTl.to(title, { x: () => Math.random() * 30 - 15, skewX: () => Math.random() * 40 - 20, opacity: () => 0.5 + Math.random() * 0.5, duration: 0.05, ease: "steps(1)" });
             tempSubsequentTitleVisualTl.to(title, { x: 0, skewX: 0, opacity: 1, duration: 0.05, ease: "steps(1)" });
        }


        // Temporary Particle Glitch (Subsequent Trigger)
        let tempParticleTl = null;
        if (particles.length) {
            tempParticleTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.08), repeatDelay: 0 });
            tempParticleTl.to(particles, {
                x: () => "+=" + (Math.random() * 50 - 25), y: () => "+=" + (Math.random() * 50 - 25),
                opacity: () => Math.random() * 0.4 + 0.2, duration: 0.04, stagger: 0.003, ease: "steps(1)"
            });
        }

        // Temporary Grid Glitch (Subsequent Trigger)
        let tempGridTl = null;
        if (grid) {
            tempGridTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.08), repeatDelay: 0 });
            tempGridTl.to(grid, {
                backgroundPosition: () => `${Math.random()*100}px ${Math.random()*100}px`, opacity: () => 0.2 + Math.random() * 0.4,
                filter: 'brightness(1.8) contrast(1.3) hue-rotate(' + (Math.random()*40-20) + 'deg)', duration: 0.04, ease: "steps(1)"
            });
             tempGridTl.to(grid, { opacity: 0.4, filter: 'none', duration: 0.04, ease: "steps(1)" });
        }

        // Also glitch header logo if present (make it flicker more intensely)
        let tempHeaderLogoTl = null;
        if (headerLogo) {
             tempHeaderLogoTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.06), repeatDelay: 0 });
             tempHeaderLogoTl.to(headerLogo, { autoAlpha: () => Math.random() * 0.4, duration: 0.03, ease: "steps(1)" });
             tempHeaderLogoTl.to(headerLogo, { autoAlpha: 1, duration: 0.03, ease: "steps(1)" });
        }


        // Revert After 1 Second
        gsap.delayedCall(tempDuration, () => {
            // *** Kill Dialogue Glitch for Subsequent Trigger ***
            if (dialogueGlitch.timeline) dialogueGlitch.timeline.kill();
            // *** Kill Title Visual Glitch for Subsequent Trigger ***
            if (tempSubsequentTitleVisualTl) tempSubsequentTitleVisualTl.kill();
            if (tempHeaderLogoTl) tempHeaderLogoTl.kill();
            if (tempParticleTl) tempParticleTl.kill();
            if (tempGridTl) tempGridTl.kill();

            // *** Remove Dialogue Container for Subsequent Trigger ***
            if (dialogueGlitch.container && dialogueGlitch.container.parentNode) {
                dialogueGlitch.container.parentNode.removeChild(dialogueGlitch.container);
            }


            // Restore original texts and remove red class
            originalTexts.forEach(item => {
                item.element.textContent = item.text;
                if (item.dataText !== undefined) {
                     item.element.dataset.text = item.dataText;
                }
                 item.element.classList.remove('easter-egg-red');
            });

            // Explicitly reset styles potentially affected by the temporary glitch
            gsap.set(elementsToChange, { x: 0, y: 0, skewX: 0, opacity: 1 }); // Reset styles for NO NO NO elements
            if (headerLogo) {
                gsap.set(headerLogo, { autoAlpha: 1 });
            }

            // Resume normal (intensified) glitches
            if (originalTitleGlitchTl) originalTitleGlitchTl.resume();
            if (originalLogoGlitchTl) originalLogoGlitchTl.resume();
            if (originalRgbTl) originalRgbTl.resume();
            if (subtitlePersistentGlitchTl) subtitlePersistentGlitchTl.resume();

             // Remove red class from particles
            if (particles.length) {
                particles.forEach(p => p.classList.remove('easter-egg-particle-red'));
            }
             // Reset grid styles and resume animation
            if (grid) {
                 gsap.set(grid, { opacity: 0.4, filter: 'none', backgroundPosition: '0 0' });
                 if (cyberGridTween) cyberGridTween.restart(true);
            }


            // Fade gradient back down and resume breathing
            if (gradientElement && gradientBreathingTween) {
                gsap.to(gradientElement, { opacity: 0.6, duration: 1.0, ease: "power2.inOut", onComplete: () => gradientBreathingTween.resume() });
            } else if (gradientElement) {
                 gsap.to(gradientElement, { opacity: 0.6, duration: 1.0, ease: "power2.inOut"});
            }
        });
    }
}

// Initialize animations when DOM is loaded (moved from original position)
document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to load
    if (typeof gsap !== 'undefined') {
        // Delay initialization slightly to ensure all resources are loaded
        setTimeout(initAnimations, 100);
    } else {
        console.error('GSAP is not loaded. Animations cannot be initialized.');
    }
});