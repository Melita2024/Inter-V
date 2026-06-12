---
name: PrepWise Vision
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#c9c4d1'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#938f9b'
  outline-variant: '#48454f'
  surface-tint: '#cbbeff'
  primary: '#ded5ff'
  on-primary: '#322664'
  primary-container: '#c3b5fd'
  on-primary-container: '#504483'
  inverse-primary: '#615596'
  secondary: '#ffb3b0'
  on-secondary: '#68000f'
  secondary-container: '#901822'
  on-secondary-container: '#ff9e9b'
  tertiary: '#dad8ee'
  on-tertiary: '#2f2f40'
  tertiary-container: '#bebcd2'
  on-tertiary-container: '#4c4b5d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e6deff'
  primary-fixed-dim: '#cbbeff'
  on-primary-fixed: '#1d0e4e'
  on-primary-fixed-variant: '#493d7c'
  secondary-fixed: '#ffdad8'
  secondary-fixed-dim: '#ffb3b0'
  on-secondary-fixed: '#410006'
  on-secondary-fixed-variant: '#8c1520'
  tertiary-fixed: '#e3e0f7'
  tertiary-fixed-dim: '#c6c4da'
  on-tertiary-fixed: '#1a1a2a'
  on-tertiary-fixed-variant: '#464557'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered to evoke a sense of "Technological Empowerment." It bridges the gap between high-stakes professional growth and cutting-edge artificial intelligence. The brand personality is **Encouraging, Professional, and Intelligent**, manifesting as a digital mentor that is both sophisticated and accessible.

The visual style is **Corporate Modern with Glassmorphic accents**. It utilizes a deep, monolithic dark palette to reduce eye strain during long practice sessions, while employing vibrant "energy" colors—soft purple and coral—to highlight progress and primary actions. The interface feels "alive" through subtle depth, clean linework, and a focus on high-density information presented with surgical clarity.

## Colors

The palette is optimized for a premium dark-mode experience. 
- **Primary (#C3B5FD):** A soft, luminous purple used for primary CTA buttons, active states, and AI-related iconography. It represents intelligence and innovation.
- **Secondary (#FF6B6B):** A vibrant coral used sparingly for critical actions (like "End Session"), error states, or urgent notifications.
- **Surface Tiers:** The background uses a near-black neutral (#0F0F12). Component cards and containers use a deep charcoal (#1E1E2E) to create subtle separation.
- **Accents:** Use gradients transitioning from the Primary Purple to a deeper Indigo to signify "AI activity" or "processing" states.

## Typography

This design system utilizes **Hanken Grotesk** as the primary typeface for its sharp, contemporary geometry and exceptional legibility in dark environments. It strikes a balance between technical precision and approachable warmth.

For technical data, timestamps, and status badges, **JetBrains Mono** is used to provide a "developer-inspired" high-tech feel, signaling the data-driven nature of the AI feedback. 

**Hierarchical Rules:**
- Use `headline-xl` only for primary landing hero sections or major dashboard milestones.
- `label-caps` should be used for category tags (e.g., "TECHNICAL", "BEHAVIORAL") to provide a distinct visual rhythm.
- Paragraph text should maintain a 1.5x line-height ratio to ensure comfort during long reading sessions of interview feedback.

## Layout & Spacing

The layout follows a **12-column Fluid Grid** system for desktop, transitioning to a **4-column grid** for mobile. 

**Spacing Philosophy:**
- **Generous Whitespace:** Information is grouped logically into "islands" (cards) with significant padding (minimum 32px) between major sections to prevent cognitive overload.
- **The 8px Rule:** All margins, paddings, and height increments must be multiples of 8px to maintain a rhythmic, structured appearance.
- **Card Layouts:** Grid-based cards (like the "Take Interviews" section) use a consistent 24px gutter. On tablet, these reflow from 3 columns to 2.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Glassmorphism**, rather than traditional heavy shadows.

- **Level 0 (Background):** #0F0F12. The base of the application.
- **Level 1 (Cards/Containers):** #1E1E2E. Used for primary content blocks. These should have a subtle 1px border (#FFFFFF 10% opacity) to define edges against the dark background.
- **Level 2 (Modals/Popovers):** A semi-transparent blur (Backdrop-filter: blur(20px)) with a slightly lighter fill.
- **Interactive States:** When hovering over cards, apply a soft "Primary Purple" outer glow (spread 20px, 15% opacity) to simulate a light-emitting screen.

## Shapes

The design system uses a **Rounded (Level 2)** shape language. This softens the "technical" edge of the AI, making the experience feel more supportive and human-centric.

- **Standard Buttons & Inputs:** 0.5rem (8px) corner radius.
- **Feature Cards:** 1rem (16px) corner radius.
- **Outer Containers (Modals):** 1.5rem (24px) corner radius.
- **Avatars:** Strictly circular to contrast against the predominantly rectangular grid.

## Components

### Buttons
- **Primary:** Solid fill using Primary Purple with black text. High contrast for immediate visibility.
- **Secondary:** Transparent with 1px Primary Purple border.
- **Destructive:** Solid Secondary Coral. Reserved for "End Interview" or "Delete Account."

### Cards
Cards are the workhorse of this system. They should feature a subtle gradient background (dark charcoal to slightly darker charcoal) and a 1px border. Inside, use `label-caps` for metadata (date/score) and `headline-lg` for the interview title.

### Input Fields
Inputs are "pill-style" but slightly squared (8px radius). Background should be a shade darker than the card surface, with a Primary Purple 2px border on focus.

### AI Status Indicator
A unique component for PrepWise: A pulsing orb or waveform using a Primary-to-Secondary gradient to indicate the AI is "listening" or "thinking."

### Feedback Meters
For scores (e.g., 75/100), use a circular progress ring with a gradient stroke. Use the JetBrains Mono font for the numeric value to emphasize data accuracy.
