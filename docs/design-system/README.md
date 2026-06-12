# PrepWise Vision Design System

Downloaded from Stitch on 2026-06-12.

- **Stitch project:** VoiceReady AI Coach (`projects/12380734787003364150`)
- **Design system asset:** `assets/6f37f1a8828643368b0955765fdc3a41` (version 1)

## Files

- [`design.md`](./design.md) — the canonical design system spec, exactly as stored in Stitch. YAML frontmatter holds the tokens (colors, typography, radii, spacing); the body documents brand, layout, elevation, shapes, and component rules.
- [`tokens.css`](./tokens.css) — the frontmatter tokens converted to CSS custom properties, ready to import or copy into the app's global styles.

## Key facts

- **Mode:** dark only. Background `#131316`, near-black base `#0F0F12`, cards `#1E1E2E`.
- **Primary:** soft purple `#C3B5FD` (CTAs, active states, AI iconography).
- **Secondary:** coral `#FF6B6B` (destructive/critical actions only).
- **Fonts:** Hanken Grotesk (headlines + body), JetBrains Mono (labels, scores, technical data).
- **Spacing:** strict 8px grid, 1280px max container, 24px gutters.
- **Shape:** 8px radius for buttons/inputs, 16px for cards, 24px for modals.

To re-sync from Stitch, use the Stitch MCP tools (`list_design_systems` with project ID `12380734787003364150`) and overwrite `design.md` with the latest `designMd`.
