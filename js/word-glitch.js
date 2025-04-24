/**
 * Word Glitch Effect for Synapse: Latency
 * Swaps the word "hand" with alternative words and adds a page-wide glitch effect
 */

// Array of alternative words to swap with "hand"
const alternativeWords = [
    "Tool", "Witness", "Crutch", "Ghost", "Shadow",
    "Operator", "Backup", "Memory", "Mistake", "Voice",
    "Friend", "Partner", "Symptom", "Signal", "Error",
    "Guide", "Thread", "Anchor", "Savior", "Echo",
    "Thread", "Glitch", "Hollow", "Proxy", "Override",
    "Lie", "Spark", "Pattern", "Habit", "Presence",
    "Specter", "Signal", "Trace", "Thought", "Burden",
    "Needle", "Drift", "Loop", "Fracture", "Pulse",
    "Caretaker", "Watcher", "Remnant", "Code", "Tether",
    "Scaffold", "Link", "Scar", "Imprint", "Script"
];


// Original word to be replaced
const originalWord = "hand";

// Keep track of the current word
let currentWordIndex = -1; // Start with -1 so first swap will be to index 0

/**
 * Initialize the word glitch effect
 */
function initWordGlitch() {
    // Find the subtitle element
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) {
        console.error('Subtitle element not found for word glitch effect');
        return;
    }

    // Store the original text
    const originalText = subtitle.textContent;
    
    // Make sure the original text contains the word to be replaced
    if (!originalText.includes(originalWord)) {
        console.error(`Original text does not contain the word "${originalWord}"`);
        return;
    }

    // Start the word swapping with a random interval
    startWordSwapping(subtitle, originalText);
}

/**
 * Start swapping the word with alternatives at random intervals
 * @param {HTMLElement} subtitle - The subtitle element
 * @param {string} originalText - The original subtitle text
 */
function startWordSwapping(subtitle, originalText) {
    // Set up a function to swap the word
    const swapWord = () => {
        // Get the next word index
        currentWordIndex = (currentWordIndex + 1) % alternativeWords.length;
        const newWord = alternativeWords[currentWordIndex];
        
        // Replace the word in the text
        const newText = originalText.replace(originalWord, newWord);
        
        // Apply the new text with a glitch effect
        applyWordChange(subtitle, newText);
        
        // Add a page-wide glitch effect
        addPageGlitch();
        
        // Schedule the next swap with a random interval (faster)
        const nextInterval = 300 + Math.random() * 700; // 0.3-1 seconds
        setTimeout(swapWord, nextInterval);
    };
    
    // Start the first swap after a shorter delay
    setTimeout(swapWord, 1000);
}

/**
 * Apply the word change with a glitch effect
 * @param {HTMLElement} element - The element to apply the change to
 * @param {string} newText - The new text to set
 */
function applyWordChange(element, newText) {
    // Create a timeline for the word change
    const tl = gsap.timeline();
    
    // Very minimal text shadow effect
    const textShadow = '0 0 3px rgba(255, 0, 60, 0.3)';
    
    // Simple position shift for the word only (no opacity changes)
    tl.to(element, {
        x: Math.random() * 3 - 1.5,
        y: Math.random() * 2 - 1,
        skewX: Math.random() * 3 - 1.5,
        textShadow: textShadow,
        duration: 0.08,
        ease: "power2.out",
        onComplete: () => {
            // Change the text
            element.textContent = newText;
        }
    });
    
    // Return to normal with smooth transition
    tl.to(element, {
        x: 0,
        y: 0,
        skewX: 0,
        textShadow: 'none',
        duration: 0.12,
        ease: "power2.out"
    });
}

/**
 * Add a glitch effect to the entire page
 */
function addPageGlitch() {
    // Completely removed all page-wide glitch effects to avoid any flashes
    // The word change effect alone will provide the glitch aesthetic
    // No code here - intentionally empty
}

// Initialize the word glitch effect when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for the main content to be visible before initializing
    const checkMainContent = setInterval(() => {
        const mainContent = document.getElementById('main-content');
        if (mainContent && window.getComputedStyle(mainContent).display !== 'none') {
            clearInterval(checkMainContent);
            initWordGlitch();
        }
    }, 500);
});