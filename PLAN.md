# Plan: Anthem Syndicate Landing Page (Synapse: Latency)

**Project Goal:** Create a single-page cyberpunk-themed landing page announcing "Synapse: Latency is coming soon." The page will feature the Anthem Syndicate logo, use the "Pixeloid Sans" font, a specific dark color scheme (`#111c21`), incorporate GSAP-based particles, and use the `mgGlitch` library (requiring jQuery) for glitch effects.

---

## Phase 1: Setup and Structure

1.  **Create/Verify Directory Structure:**
    ```mermaid
    graph TD
        A[synapse-latency-site] --> B(index.html);
        A --> C(css);
        C --> D(style.css);
        A --> E(js);
        E --> F(main.js);
        E --> G(particles.js);
        E --> H(animations.js);
        A --> I(assets);
        I --> J(fonts);
        J --> K(PixeloidSans.ttf);
        A --> L(ANTHEM Logo.png);
        A --> M(Sofia_Logo2.png);
        A --> N(mgGlitch-master);
        N --> O(src/mgGlitch.min.js);
        N --> P[... other mgGlitch files ...];
    ```
    *   **Action Required by User:** Ensure `PixeloidSans.ttf` is placed in `assets/fonts/`.

2.  **Include Libraries:** Add jQuery (CDN), GSAP (CDN), and `mgGlitch` (local file) to `index.html`.

---

## Phase 2: HTML Content (`index.html`)

1.  **Basic Structure:** Set up HTML5 boilerplate.
2.  **Link Assets:** Link `css/style.css`.
3.  **Header:** Create `<header>` containing:
    *   An `<img>` tag for `ANTHEM Logo.png`.
    *   A `<span>` or `<p>` tag for the text "ANTHEM SYNDICATE".
4.  **Main Content:** Create `<main>`. Inside, create a wrapper `div` (e.g., `<div class="glitch-wrapper">`) for the `<h1>` "Synapse: Latency is coming soon." This wrapper will be positioned absolutely for `mgGlitch`.
5.  **Particle Container:** Add `<div id="particle-container"></div>`.
6.  **Link Scripts:** Include jQuery CDN, GSAP CDN, `mgGlitch-master/src/mgGlitch.min.js`, and local scripts (`particles.js`, `animations.js`, `main.js`) at the end of `<body>` (in that specific order).

---

## Phase 3: Styling (`css/style.css`)

1.  **Font Definition:** Use `@font-face` to define the "Pixeloid Sans" font family, pointing to `../assets/fonts/PixeloidSans.ttf`.
2.  **Global Styles:**
    *   Set `box-sizing: border-box;`.
    *   Apply the dark background color (`#111c21`) to the `<body>`.
    *   Set the default font family to "Pixeloid Sans", sans-serif (as fallback).
    *   Set default text color (e.g., a light grey or off-white).
3.  **Header Styling:**
    *   Position the header (e.g., `position: fixed` or `absolute` at the top-left).
    *   Style the logo image (size, margins).
    *   Style the company name text (size, color, alignment).
4.  **Main Content Styling:**
    *   Center the `.glitch-wrapper` element on the page (using Flexbox/Grid on `<main>`).
    *   Set `position: absolute;` on `.glitch-wrapper`. **(Required by mgGlitch)**
    *   Style the `<h1>` text (large font size, color, `position: relative;` or `static;` within the absolute wrapper).
5.  **Particle Container Styling:**
    *   Position the container absolutely or fixed to cover the entire viewport (`top: 0; left: 0; width: 100%; height: 100%;`).
    *   Set `z-index: -1;` to place it behind other content.
    *   Style individual particle elements (created by JS).
6.  **Glitch Styles:** Rely primarily on `mgGlitch`'s injected styles, adding minimal custom styles if needed for integration or appearance tuning.

---

## Phase 4: Particle System (`js/particles.js`)

1.  **Adapt Code:** Copy the `createParticles` function (and necessary helpers/variables, potentially simplified) from the provided `../snypase-latency-legal/js/splash-screen.js`.
2.  **Refactor:**
    *   Target the `#particle-container` div in `index.html`.
    *   Adjust particle colors to fit a cyberpunk theme (e.g., electric blues, cyans, neon pinks, white/grey).
    *   Tune particle count, size, speed, and animation behavior for a continuous background effect using GSAP.
3.  **Initialization:** Create a function `initParticles()` to encapsulate the setup and start the animations.

---

## Phase 5: Animations (`js/animations.js`)

1.  **Initialization:** Create a function `initAnimations()`.
2.  **Entry Animations:** Use GSAP to animate the header and the `.glitch-wrapper`/`<h1>` on page load (e.g., fade in, slight upward movement).
3.  **Glitch Effect Integration:**
    *   Inside `initAnimations`, use jQuery to select the target element (e.g., `<h1>` or `.glitch-wrapper`).
    *   Initialize `mgGlitch` on the selected element according to its documentation: `$('.glitch-wrapper').mgGlitch({ /* options */ });`.
    *   Configure options (e.g., `destroy: false`, `glitch: true`, `scale: true`, `blend: true`, `blendModeType: 'hue'`, `glitch1TimeMin: 100`, `glitch1TimeMax: 800`, `glitch2TimeMin: 50`, `glitch2TimeMax: 400`) based on desired effect (continuous, on hover, etc.). Refer to `mgGlitch` documentation/demo for details.

---

## Phase 6: Main Script (`js/main.js`)

1.  **DOM Ready:** Use jQuery's `$(document).ready()` function or vanilla JS `DOMContentLoaded` listener.
2.  **Initialize:** Call `initParticles()` and `initAnimations()` from within the DOM ready handler.

---

## Phase 7: Implementation

1.  **Review:** *(Done)*
2.  **Write to Markdown:** *(This step)*
3.  **Execute:** Switch to "Code" mode to implement the plan step-by-step, creating/editing files as outlined above.

---

## Implementation Flowchart

```mermaid
graph LR
    A[Start] --> B{Load index.html};
    B --> C{Load style.css};
    C --> D{@font-face Pixeloid Sans};
    D --> E{Apply Base Styles};
    B --> F1{Load jQuery};
    F1 --> F2{Load GSAP};
    F2 --> F3{Load mgGlitch.min.js};
    F3 --> G{Load particles.js};
    G --> H{Load animations.js};
    H --> I{Load main.js};
    I --> J[DOM Ready];
    J --> K(Call initParticles);
    K --> L{Create & Animate Particles};
    J --> M(Call initAnimations);
    M --> N{Animate Header/Wrapper In};
    M --> O{Initialize mgGlitch on Target};
    N & L & O --> P[Page Ready];