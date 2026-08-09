# Futuristic Premium Design System — gastroliver.in

This document outlines GLEC's futuristic visual redesign tokens, color system, typography variables, glassmorphic layout rules, ambient lighting components, and responsive motion guidelines.

---

## 1. Futuristic Color Palette
We use a contrast of deep dark midnight navy grids combined with light frosted glass panels to establish rhythm:
- **Midnight Navy Background (`--primary`)**: `#040D1A` (RGB: `4, 13, 26`) — represents sterile, high-end medical space.
- **Electric Cyan Glow (`--secondary`)**: `#00F2FE` (RGB: `0, 242, 254`) — represents modern medical technology and diagnostic accuracy.
- **Consultant Accent Gold (`--accent`)**: `#C5A059` (RGB: `197, 160, 89`) — representing gold-medalist credentials.
- **Fine Glowing Hairline (`--border`)**: `rgba(0, 242, 254, 0.08)`.

---

## 2. Glassmorphism Utilities
- **Frosted Glass Panel (`.glass-panel`)**:
  - `background: rgba(255, 255, 255, 0.75);`
  - `backdrop-filter: blur(20px);`
  - `border: 1px solid rgba(0, 242, 254, 0.08);`
- **Dark Immersive Glass Panel (`.glass-panel-dark`)**:
  - `background: rgba(4, 13, 26, 0.8);`
  - `backdrop-filter: blur(20px);`
  - `border: 1px solid rgba(0, 242, 254, 0.1);`

---

## 3. Spacing & Spatial Rhythm
- Spacing relies on clear, structured tokens: SM (16px), MD (24px), LG (40px), XL (64px), and XXL (96px).
- Dynamic pages enforce a centered **`750px` line-length limit** (`.reading-column`) for maximum reading speed and minimal fatigue when consuming medical education contents.

---

## 4. Typography Hierarchy
- **Editorial Headings**: Large title characters are styled with tighter tracking (`-0.025em`) and light classic font weights (`500`).
- **Dashboard Micro-Eyebrows (`.font-display-mono`)**: Monospaced styles with a wide letter-spacing (`0.22em`), colored in electric cyan to indicate tech-premium details.

---

## 5. Animations & Micro-interactions
- **Spotlight Backgrounds (`.glow-spot-cyan`, `.glow-spot-teal`)**: Soft ambient radial lights placed selectively to float behind panels.
- **Image reveals (`.image-reveal`)**: Sliding clip-path sweeps (`clip-path: inset(0 0 100% 0) ➔ inset(0)`) triggered smoothly.
- **Stagger reveals (`.fade-up-stagger`)**: Staggered scroll entries (`delay-1` to `delay-5`) using cubic-bezier transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Reduced motion overrides**: All keyframe zooms and transform translates reset automatically if the browser indicates `prefers-reduced-motion: reduce`.
