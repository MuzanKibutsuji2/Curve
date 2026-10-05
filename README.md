# Curve — marketing site

The public website for **Curve**, a local-first AI execution workspace.

Curve turns a goal into an inspectable plan, asks permission before anything
irreversible, executes on your own machine through Curve Runner, verifies the
result against what it promised, and saves successful work as a reusable
workflow.

All copy and product detail on the site is derived from
`Curve_MVP_and_Full_Product_Specification.pdf` (spec v1.0, October 2026).

## Stack

| Piece      | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 16 (App Router, React 19, TypeScript) |
| Styling    | Tailwind CSS v4 + a small custom token layer  |
| Typography | Inter Tight / Instrument Serif / JetBrains Mono, self-hosted in `public/fonts` |
| Motion     | CSS keyframes + IntersectionObserver, no animation library |

No external runtime dependencies, no webfont CDN, no analytics.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Layout

```
app/
  layout.tsx          root shell, metadata, nav + footer
  page.tsx            the landing page — assembles every section
  download/page.tsx   downloads, first-run guide, requirements, changelog
  globals.css         design tokens, @font-face, type scale, motion
components/
  Hero.tsx            headline + the animated run panel
  RunPanel.tsx        scripted mock of a real Curve run (plan → approval → verify)
  Loop.tsx            interactive core-loop curve
  Thesis.tsx          what Curve is / is not / where it sits
  Layers.tsx          intelligence · orchestration · execution
  Capabilities.tsx    MVP capability grid
  Runner.tsx          Curve Runner, tool contract, wire format
  Agents.tsx          agent roles and declarations
  UseCases.tsx        what you hand it (A–F)
  Workflows.tsx       reusable workflows + example ship pipeline
  Trust.tsx           permission ladder, approval anatomy, principles
  Roadmap.tsx         v0.1 → Phase 3 + execution router
  Pricing.tsx         tiers and add-ons
  Metrics.tsx         north-star and product metrics
  FAQ.tsx  CTA.tsx  Nav.tsx  Footer.tsx  Section.tsx  Reveal.tsx
lib/
  content.ts          single source of truth for all site copy
```

## Design notes

- **The ramp.** Six brand colours (citron → aqua → iris → magenta → flame →
  amber) map onto the six stages of the execution loop, and recur as agent
  identities, risk levels and roadmap phases. Colour means something here.
- **Light and dark alternate.** Dark technical sections carry the product and
  the specs; warm paper sections carry the argument (thesis, workflows,
  pricing).
- **The hero is the product.** `RunPanel` replays a real run — plan, risk
  levels, an approval gate for `create_commit`, streamed tool output, a diff
  and artifacts — rather than showing a stock screenshot.
- Motion respects `prefers-reduced-motion`; scroll reveals degrade to visible
  without JavaScript.
