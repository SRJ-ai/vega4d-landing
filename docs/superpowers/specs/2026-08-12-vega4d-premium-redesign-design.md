# Vega4D — Premium Instrument-Grade Redesign

**Date:** 2026-08-12
**Status:** Approved
**Scope:** In-place redesign of the existing single-page Vega4D marketing site.

## Problem

The current site (`src/App.jsx`, 276 lines with inline styles) reads as a competent
template: a dark hero, two generic content sections, a three-column feature grid, and a
CTA. It does not communicate what Vega4D actually is — a company that captures human
kinematics at sub-millimeter fidelity and sells the resulting datasets to teams training
Vision-Language-Action foundation models. The Supabase `contacts` table exists but no form
is wired to it, so the site cannot capture a lead.

## Goal

A long single-page site that feels like laboratory instrumentation: dense, labeled,
measured, and precise. A visiting ML researcher should believe the capture pipeline is
real and should be able to request dataset access without leaving the page.

## Non-goals

- No routing or multi-page structure.
- No Three.js or WebGL. Canvas 2D only.
- No CMS, blog, auth, or dashboard.
- No new runtime dependencies.

## Direction contract

The design decisions below are binding. Any deviation during implementation must be
justified against them.

| Axis | Decision |
| --- | --- |
| World | Instrument-grade dark — lab equipment, not SaaS marketing |
| Base ink | `#05060A` page, `#0A0C12` panel |
| Hairlines | `rgba(255,255,255,0.07)`, 1px, used as the primary separator |
| Signal color | Amber `#FFB24D` — the single brand accent, carried over from the current site |
| Live color | Cyan `#6EE7F9` — reserved exclusively for live/active data states |
| Display type | Grotesk at `-0.04em` tracking, weights 300–500 only |
| Numeric type | Monospace for every numeral, unit, label, ID, and timestamp |
| Grid | 12 columns, 1440px max width, 24px gutters |
| Blueprint guides | Faint hairline column guides visible in the pipeline and telemetry sections only |
| Density | Every section carries a monospace eyebrow with an index, e.g. `01 / CAPTURE` |

### Explicitly banned

Purple-to-blue gradients. Glassmorphism cards. A centered three-icon feature row.
Uniform 16px border radius. Everything center-aligned. Emoji as iconography. Drop shadows
used for depth on dark backgrounds.

## Section structure

Nine sections, top to bottom.

1. **Hero** — 100vh. Canvas point cloud rendering a 21-keypoint hand skeleton that drifts
   and responds to pointer parallax. Nav bar with logo, monospace menu trigger, and a
   `SYS ● LIVE` status pill. Headline, one-line subhead, two buttons. A bottom hairline
   strip carries four counters (frames captured, capture hours, subjects, keypoints/sec)
   that count up on mount.
2. **Partner marquee** — monospace partner names, hairline-divided, slow horizontal drift.
3. **Capture pipeline** — four stages (Capture → Vectorize → Validate → Ship) laid out
   horizontally with a scroll-linked progress line and a small canvas micro-visualization
   per stage.
4. **Dataset catalog** — dataset rows presented as a spec sheet: name, modality tags,
   frame count, size on disk, license, sample link. Row hover raises the hairline and
   reveals the sample action.
5. **Live telemetry** — a dark panel with three canvas charts (throughput sparkline,
   latency histogram, sensor grid heat map) and numeric readouts that update on an
   interval, communicating that capture is ongoing.
6. **Benchmarks** — a comparison table of model performance with and without Vega4D data,
   with bars that animate on scroll into view.
7. **Integration** — a tabbed code block (Python / cURL / TypeScript) with hand-rolled
   token highlighting and a copy-to-clipboard button.
8. **Access tiers** — three tiers (Research / Lab / Enterprise) as hairline cards, no
   gradients, with an honest feature list per tier.
9. **Request access** — a form writing to the Supabase `contacts` table, followed by the
   site footer.

### Placeholder data

All benchmark figures, telemetry values, counter totals, dataset sizes, and partner names
are illustrative. They live in `src/data/site.js` and are annotated with a
`PLACEHOLDER — replace with real figures` comment block. The site must not present
invented metrics as verified fact; benchmark numbers carry a visible "illustrative"
footnote until real figures are supplied.

## Architecture

```
src/
  data/site.js              all copy, dataset specs, tier definitions — single source
  styles/tokens.css         color, type, space, and easing tokens
  components/
    Nav.jsx
    Hero.jsx
    PartnerMarquee.jsx
    CapturePipeline.jsx
    DatasetCatalog.jsx
    LiveTelemetry.jsx
    Benchmarks.jsx
    Integration.jsx
    AccessTiers.jsx
    RequestAccess.jsx
    SiteFooter.jsx
    primitives/
      SectionHeader.jsx     monospace eyebrow + index + heading
      Hairline.jsx
      Counter.jsx
  components/canvas/
    PointCloud.jsx
    Sparkline.jsx
    SensorGrid.jsx
    LatencyHistogram.jsx
  hooks/
    useCountUp.js
    useOnScreen.js
    useReducedMotion.js
  lib/supabase.js           existing, unchanged
  App.jsx                   composition only — imports and orders sections
```

Each section component owns its own markup and reads its copy from `src/data/site.js`. No
copy is inlined in JSX. `App.jsx` becomes composition only, so any section can be
reordered or removed without touching another file.

### Canvas units

Every canvas component follows the same contract: it accepts sizing from its container,
renders on `requestAnimationFrame`, caps `devicePixelRatio` at 2, pauses its loop when
scrolled offscreen via `useOnScreen`, renders a single static frame when
`prefers-reduced-motion` is set, and is marked `aria-hidden="true"` because it carries no
information not also present as text.

### Styling

Tailwind 4 handles layout, spacing, and responsive breakpoints. `tokens.css` owns color,
typography scale, and easing as CSS custom properties so the palette can be retuned in one
file. The current `src/App.css` and the bulk of `src/index.css` are replaced.

## Data flow

The site is static apart from one write path. `RequestAccess` holds local form state,
validates on blur and on submit, then inserts into the Supabase `contacts` table through
the existing client in `src/lib/supabase.js`.

## Error handling

- Required-field and email-format validation run client-side before any network call.
- The submit button is disabled and shows a pending label while the insert is in flight.
- A Supabase error renders an inline error message with the failure reason and leaves the
  entered values intact so nothing is retyped.
- Success replaces the form with a confirmation state that includes what happens next.
- A visually hidden honeypot field rejects the submission when filled, for basic spam
  resistance.
- If `VITE_SUPABASE_URL` is unset, the form surfaces a configuration error rather than
  failing silently against the placeholder URL.

## Accessibility

Semantic landmarks (`header`, `main`, `section`, `footer`) with one `h1`. Visible
`:focus-visible` rings on every interactive element. Every input has an associated
`<label>`; errors are linked with `aria-describedby` and announced via a live region.
Canvases are `aria-hidden`. Text meets WCAG AA contrast against its actual background. All
motion collapses under `prefers-reduced-motion`.

## Performance

No new dependencies. Canvas loops pause offscreen. Scroll listeners are passive and
rAF-throttled. Fonts load with `display: swap` and are preconnected. Target: production
build under 250KB gzipped JS, no layout shift from font loading, 60fps scroll on a
mid-range laptop.

## Verification

Implementation is not complete until all of the following pass and the output is recorded:

1. `npm run build` succeeds with no warnings introduced by this work.
2. `npm run lint` passes.
3. The dev server is driven in a real browser at 375px, 768px, and 1440px, with a
   screenshot captured at each width.
4. The browser console is clean — no errors, no React warnings.
5. The request-access form is submitted against the real Supabase table and the row is
   confirmed, or, if credentials are unavailable, the failure path is exercised and the
   error state is screenshotted.
6. Keyboard-only traversal reaches every interactive element with a visible focus state.
7. `prefers-reduced-motion` is emulated and confirmed to stop all animation.
