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
  page.tsx            the landing page — hero, loop, platform tabs, agents, pricing, download
  agents/page.tsx     agents in depth — roster, studio, fusion lab, teams
  download/page.tsx   downloads, first-run guide, requirements, changelog
  globals.css         design tokens, @font-face, type scale, motion
components/
  Hero.tsx            headline + the animated run panel
  RunPanel.tsx        scripted mock of a real Curve run (plan → approval → verify)
  Loop.tsx            interactive core-loop curve
  Thesis.tsx          what Curve is / is not / where it sits
  Layers.tsx          intelligence · orchestration · execution
  Tabs.tsx            the platform tab bar — five deep sections in one screen
  Capabilities.tsx    MVP capability grid                     (platform tab 01)
  Runner.tsx          Curve Runner, tool contract, wire format (platform tab 02)
  Workflows.tsx       reusable workflows + example ship pipeline (platform tab 03)
  Trust.tsx           permission ladder, approval anatomy       (platform tab 04)
  Roadmap.tsx         v0.1 → Phase 3, execution router, metrics (platform tab 05)
  Sigil.tsx           procedural SVG avatar generated from an agent name
  SigilCycle.tsx      hero portrait that cycles the roster
  AgentRoster.tsx     the six built-in agents, expandable
  AgentStudio.tsx     live agent builder — name, sigil, accent, dials, tools, ceiling
  Fusion.tsx          the fusion lab — pick 2–3 agents, merge, read the merge report
  FusionLoop.tsx      auto-playing fusion teaser used on the landing page
  UseCases.tsx        what you hand it (A–F)
  Pricing.tsx         tiers and add-ons
  motion.tsx          useInView, Words, Spot, CountUp, ScrollProgress, Dial
  SectionRail.tsx     scroll-spy dot rail (xl and up)
  FAQ.tsx  CTA.tsx  Nav.tsx  Footer.tsx  Section.tsx  Reveal.tsx
lib/
  content.ts          single source of truth for all site copy
  agents.ts           agent roster, disposition dials, permission ladder, fuse()
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
- **Agents have faces.** `Sigil` hashes an agent's name into a deterministic
  seed and draws a unique set of bezier strokes from it, so renaming an agent
  in the studio visibly changes who it is.
- **Fusion is modelled, not mocked.** `lib/agents.ts` implements the real
  rules: abilities union, memories union minus a deterministic overlap,
  workflows keep their parent pointer, disposition averages, and the
  permission ceiling always clamps to the *most restrictive* parent.
- **Less scrolling.** The five deepest product sections live behind one sticky
  tab bar under `#platform`, and a dot rail tracks position on wide screens.
- Motion respects `prefers-reduced-motion`; scroll reveals degrade to visible
  without JavaScript.
