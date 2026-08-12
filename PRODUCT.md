# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

*(Inferred from the brief and existing site copy — not user-confirmed.)*

Primary: machine-learning researchers and applied-research engineers at robotics and
embodied-AI labs who are training Vision-Language-Action (VLA) models and are blocked on
the quality and volume of human-manipulation data. They arrive evaluating whether a dataset
is worth licensing, and they judge credibility on modality coverage, capture fidelity,
frame counts, licensing terms, and whether a sample can be inspected before committing.

Secondary: technical founders, investors, and partners assessing whether the capture
operation is real and whether it scales.

## Product Purpose

Vega4D captures human manipulation and kinematics at sub-millimeter fidelity and sells the
resulting multi-modal datasets to teams training embodied-AI and VLA foundation models. The
site's job is to make the capture pipeline believable to a technical evaluator and to
convert that belief into a dataset-access request.

Success for the site: a qualified researcher submits an access request without needing a
call first.

## Positioning

*(Inferred from existing site copy: "The definitive dataset for foundation models",
"Human Kinematics", "VLA Models", "Actuation Datasets", "Sub-millimeter", "Zero Latency",
"Multi-modal".)*

The differentiator is the capture pipeline itself — an owned, instrumented, multi-modal rig
producing pure interaction data with sub-millimeter joint tracking, rather than scraped
video or synthetic motion. A competitor cannot truthfully claim the same physical capture
apparatus.

## Operating Context

Evaluators read the page on a laptop, often alongside a paper or a training run. They skim
for numbers first and prose second, expect to see a code snippet showing how data is
loaded, and expect licensing to be stated rather than hidden behind a sales call.

## Capabilities and Constraints

- Existing stack: Vite 8, React 19, Tailwind 4, framer-motion, Supabase JS client.
- One live write path: a Supabase `contacts` table (`first_name`, `last_name`, `email`,
  `message`) with row-level security permitting anonymous inserts only.
- Deployment via GitHub Actions to a static host; the site must work as a static build with
  no server runtime.
- No routing, auth, dashboard, or CMS.
- No Three.js/WebGL — Canvas 2D is the ceiling for visual effects. (User-confirmed.)
- Single page. (User-confirmed.)
- Undecided: real dataset SKUs, pricing, and licensing terms.

## Brand Commitments

- Name: **Vega4D**. (Existing.)
- Existing mark: two rotated rounded bars, currently rendered as inline SVG.
- Existing accent: amber `#FFB24D` / `#FF7A18` on near-black. Carried forward as the single
  brand signal. (User-confirmed as direction.)
- Voice: clipped, declarative, engineering-first. Short sentences. No hype adjectives.
  (Inferred from existing headline style: "Robotic Dexterity, Perfected.")

## Evidence on Hand

None. There are no real customer names, partner logos, benchmark results, capture-volume
figures, dataset sizes, published papers, or photography in the repository. The only asset
is `src/assets/hero.png` and the inline logo mark.

**Future work must not fabricate proof.** Any figure, partner name, or benchmark rendered
on the site is illustrative scaffolding, must live in `src/data/site.js` under an explicit
placeholder annotation, and must be visibly marked as illustrative in the UI wherever a
reader could mistake it for a verified result.

## Product Principles

1. **Specs before adjectives.** A number with a unit persuades this audience; "cutting-edge"
   does not.
2. **Show the apparatus.** Credibility comes from making the capture pipeline legible, not
   from claiming outcomes.
3. **Never fake proof.** Absent evidence stays absent or stays labeled. Fabricated social
   proof is the fastest way to lose a researcher.
4. **Let them inspect before they ask.** Samples, schemas, and code snippets in the open;
   the access request is the last step, not the gate.
5. **Density is the aesthetic.** This audience reads instruments, not brochures.

## Accessibility & Inclusion

No product-specific requirement was established. Baseline: WCAG AA contrast, full
keyboard operability, and complete motion suppression under `prefers-reduced-motion`, since
the design leans on continuous canvas animation.
