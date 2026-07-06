# Breaking Nomad — PRD

## Original Problem Statement
Build the first public website for Breaking Nomad — a movement for Indian remote workers who live, work, and explore together in curated destinations for 2–4 weeks. Editorial, print-inspired, quiet/warm/human aesthetic (Kinfolk/Aesop/Patagonia Stories references). Extremely detailed brief supplied by user: exact design tokens, typography (General Sans / Inter / Cormorant Garamond italic), zero border-radius, no shadows/gradients/cards, single illustrated exception — a Ghibli-style cursor-tracking hero illustration where character heads follow the cursor.

## User Choices
- Waitlist/application form: frontend-only (no backend persistence) — MOCKED by user choice
- 2 destinations (Old Manali Himachal + Assagao Goa)
- One sample 3-week itinerary (Old Manali)

## Architecture
- React frontend only (CRA + custom CSS, no Tailwind utility usage in design — tokens as CSS custom properties in `index.css`, full stylesheet in `App.css`)
- FastAPI/Mongo template backend untouched (no custom endpoints needed)
- Hero illustration: hand-built layered inline SVG (`HeroIllustration.jsx`) — background layer, per-character body groups, separate `.bn-head` groups with neck pivots (`transform-box: fill-box; origin 50% 92%`); vanilla JS rAF lerp head-tracking, clamp ±14°, per-head easing stagger; idle sway on touch (`hover:none`); frozen for `prefers-reduced-motion`
- Fonts: General Sans (Fontshare), Inter + Cormorant Garamond italic (Google Fonts)

## Implemented (June 2026)
- Sticky nav with anchor links
- Hero: oversized editorial title, Cormorant italic tagline, CTA, cursor-tracking SVG illustration (5 characters, brand palette)
- Our Story: sticky chapter nav (Intersection Observer, max-ratio active state, accent left border), 4 chapters, scroll reveals
- How It Works: 3 columns, giant low-opacity numerals, hand-drawn SVG arrow glyphs (rotates ↓ on mobile)
- Escapes: 2 destinations, batch label + metadata row + serif note + asymmetric 4-image grid-template-areas collage, soft parallax on dominant image, lazy-loaded warm golden-hour photography
- Itinerary: left timeline (border-left spine, Cormorant day numbers in ochre) + sticky right panel (Included / Not Included / Reserve CTA)
- Application: underline-only fields, uppercase caption labels, tactile square interest chips (selected = forest bg/cream text), email required, success state
- Footer: dark forest, links with hairline divider, centered Cormorant closing quote
- Accessibility: focus-visible accent outlines, reduced-motion support, data-testids everywhere

## Testing
- iteration_1.json: 100% frontend pass — all sections, form validation, chip toggle, head-tracking, images (8/8), no overflow at 1920/390, zero console errors

## Backlog
- P1: Persist waitlist submissions to backend (Mongo) + admin view
- P1: Email confirmation on waitlist signup (Resend/SendGrid)
- P2: Per-destination detail pages / more escapes
- P2: Self-hosted PP Neue Montreal if license acquired; AVIF `<picture>` pipeline for images
- P2: Instagram feed / journal (blog) section
