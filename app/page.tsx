import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Thesis } from "@/components/Thesis";
import { Loop } from "@/components/Loop";
import { Layers } from "@/components/Layers";
import { Capabilities } from "@/components/Capabilities";
import { Runner } from "@/components/Runner";
import { WorkflowsPanel } from "@/components/Workflows";
import { Trust } from "@/components/Trust";
import { Roadmap } from "@/components/Roadmap";
import { UseCases } from "@/components/UseCases";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { FusionLoop } from "@/components/FusionLoop";
import { Sigil } from "@/components/Sigil";
import { DownloadBlock } from "@/components/DownloadBlock";
import { Tabs } from "@/components/Tabs";
import { SectionRail } from "@/components/SectionRail";
import { Shell, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/motion";
import { ROSTER } from "@/lib/agents";

const RAIL = [
  { id: "top", label: "Top", colour: "#cdff3e" },
  { id: "what", label: "What it is", colour: "#6b5cff" },
  { id: "loop", label: "The loop", colour: "#3be8c0" },
  { id: "platform", label: "Platform", colour: "#ffc83d" },
  { id: "agents", label: "Agents", colour: "#ff4d9e" },
  { id: "uses", label: "Use cases", colour: "#ff6a2b" },
  { id: "pricing", label: "Pricing", colour: "#cdff3e" },
  { id: "get", label: "Download", colour: "#3be8c0" },
  { id: "faq", label: "FAQ", colour: "#6b5cff" },
];

export default function Home() {
  return (
    <>
      <SectionRail items={RAIL} />

      <div id="top" />
      <Hero />
      <Ticker />
      <Thesis />

      {/* ── 02 the loop ── */}
      <Shell id="loop">
        <SectionHead
          n="02"
          eyebrow="The core loop"
          align="split"
          title={
            <>
              Ten stages between a sentence and a{" "}
              <span className="serif italic text-[#3be8c0]">finished thing.</span>
            </>
          }
          lede={
            <>
              Intent, understand, plan, permission check, execute, observe, verify, report, remember, reuse.
              Nothing is hidden. The design rule is simple: never make the user wonder what Curve is doing.
            </>
          }
        />
        <Loop />
      </Shell>

      {/* ── 03 architecture + platform tabs ── */}
      <Shell id="platform" className="border-t border-[var(--color-line)] bg-[var(--color-ink-2)]">
        <SectionHead
          n="03"
          eyebrow="The platform"
          align="split"
          title={
            <>
              Three layers. The middle one is the{" "}
              <span className="serif italic text-[#6b5cff]">whole point.</span>
            </>
          }
          lede={
            <>
              Frontier labs own intelligence. Sandbox vendors own execution. Curve builds the orchestration
              layer in between — the part that decides what to do, who does it, whether it is allowed and
              whether it actually worked.
            </>
          }
        />
        <Layers />

        <div className="mt-16">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="eyebrow text-[var(--color-dimmer)]">Go deeper — pick a surface</span>
              <span className="h-px flex-1 bg-[var(--color-line)]" />
              <span className="mono-xs text-[var(--color-dimmer)]">no scrolling required</span>
            </div>
          </Reveal>

          <Tabs
            tabs={[
              { id: "cap", label: "Capabilities", colour: "#cdff3e", node: <Capabilities /> },
              { id: "runner", label: "Curve Runner", colour: "#3be8c0", node: <Runner /> },
              { id: "wf", label: "Workflows", colour: "#ff4d9e", node: <WorkflowsPanel /> },
              { id: "perm", label: "Permissions", colour: "#ff6a2b", node: <Trust /> },
              { id: "road", label: "Roadmap", colour: "#ffc83d", node: <Roadmap /> },
            ]}
          />
        </div>
      </Shell>

      {/* ── 04 agents + fusion ── */}
      <Shell id="agents" className="border-t border-[var(--color-line)]">
        <SectionHead
          n="04"
          eyebrow="Agents & fusion"
          align="split"
          title={
            <>
              Name them, shape them, then{" "}
              <span className="serif italic text-[#ff4d9e]">fuse them into one.</span>
            </>
          }
          lede={
            <>
              Agents are named individuals with a generated sigil, an accent colour, five disposition dials
              and a declared toolset. When two keep landing on the same job, merge them — the composite
              inherits both memories, both toolsets and every workflow, while its permission ceiling clamps
              to the stricter parent.
            </>
          }
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-14">
          {/* roster strip */}
          <Reveal>
            <h3 className="eyebrow text-[var(--color-dimmer)]">The roster</h3>
            <ul className="mt-5 space-y-px overflow-hidden rounded-[12px] border border-[var(--color-line)]">
              {ROSTER.map((a) => (
                <li
                  key={a.id}
                  className="group flex items-center gap-3.5 bg-[var(--color-ink-2)] px-4 py-3 transition-colors hover:bg-[var(--color-ink-3)]"
                >
                  <Sigil seed={a.seed} colours={[a.colour]} size={34} animate={false} />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-[0.9375rem] font-medium">{a.name}</span>
                      <span className="mono-xs" style={{ color: a.colour }}>
                        {a.role}
                      </span>
                    </span>
                    <span className="serif block text-[0.9375rem] leading-snug text-[var(--color-dim)]">
                      &ldquo;{a.persona}&rdquo;
                    </span>
                  </span>
                  <span className="mono-xs hidden shrink-0 text-[var(--color-dimmer)] sm:block">
                    {a.handle}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-[10px] border border-[var(--color-line)] bg-[var(--color-line)]">
              {[
                ["Agents", 6, "#cdff3e"],
                ["Memories", 1361, "#6b5cff"],
                ["Workflows", 14, "#ff4d9e"],
              ].map(([k, v, c]) => (
                <div key={k as string} className="bg-[var(--color-ink-2)] px-4 py-3.5">
                  <div
                    className="text-[1.35rem] font-semibold tracking-[-0.04em]"
                    style={{ color: c as string }}
                  >
                    <CountUp to={v as number} />
                  </div>
                  <div className="mono-xs mt-0.5 text-[var(--color-dimmer)]">{k as string}</div>
                </div>
              ))}
            </dl>

            <Link
              href="/agents"
              className="group mt-7 inline-flex h-12 items-center gap-2.5 rounded-full border border-[var(--color-line-strong)] px-6 text-[0.9375rem] text-[#dfe2ea] transition-colors hover:border-white/45 hover:bg-white/[0.04]"
            >
              Open the agent studio
              <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M1 6h11m0 0L8.2 2.2M12 6 8.2 9.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>

          {/* live fusion */}
          <Reveal delay={100}>
            <h3 className="eyebrow text-[var(--color-dimmer)]">Fusion, running live</h3>
            <div className="mt-5">
              <FusionLoop />
            </div>
            <p className="mt-4 text-[0.875rem] leading-relaxed text-[#9aa0b2]">
              Abilities union. Memories reconcile. Workflows carry their lineage. The permission ceiling
              goes <strong className="font-medium text-white">down</strong>, never up — fusion changes what
              an agent can do, never what it is allowed to do.{" "}
              <Link
                href="/agents#fusion"
                className="text-white underline decoration-[var(--color-line-strong)] underline-offset-4 hover:decoration-white"
              >
                Try it yourself
              </Link>
              .
            </p>

            <dl className="mt-7 border-t border-[var(--color-line)]">
              {[
                ["Abilities", "Union of both toolsets, duplicates collapsed.", "#3be8c0"],
                ["Memories", "Unioned, then reconciled — contradictions surface.", "#6b5cff"],
                ["Workflows", "Carried over, each pointing at the parent it came from.", "#ff4d9e"],
                ["Permissions", "Clamped to the most restrictive parent. Never widened.", "#ff6a2b"],
                ["Lineage", "Parents stay intact. Unfusing restores them untouched.", "#cdff3e"],
              ].map(([k, v, c]) => (
                <div
                  key={k}
                  className="grid gap-0.5 border-b border-[var(--color-line)] py-2.5 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-4"
                >
                  <dt className="flex items-center gap-2 text-[0.8125rem] font-medium">
                    <span className="h-[6px] w-[6px] rounded-full" style={{ background: c }} />
                    {k}
                  </dt>
                  <dd className="text-[0.8125rem] leading-snug text-[#8b90a0]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Shell>

      {/* ── 05 use cases ── */}
      <Shell id="uses" className="border-t border-[var(--color-line)] bg-[var(--color-ink-2)]">
        <SectionHead
          n="05"
          eyebrow="What you hand it"
          align="split"
          title={
            <>
              Six jobs people actually{" "}
              <span className="serif italic text-[#ffc83d]">give it.</span>
            </>
          }
          lede="From a one-line bug fix to a five-role proposal. Same project, same permissions, same run history."
        />
        <UseCases />
      </Shell>

      <Pricing />

      {/* ── 11 download ── */}
      <Shell id="get" className="border-y border-[var(--color-line)]">
        <SectionHead
          n="07"
          eyebrow="Get Curve"
          align="split"
          title={
            <>
              One installer. One folder. <span className="serif italic text-[#3be8c0]">One hour to trust.</span>
            </>
          }
          lede={
            <>
              Install Curve Runner, authenticate it once, pick a project directory and give Curve a task you
              would otherwise do yourself. Full install notes and release history live on the{" "}
              <Link
                href="/download"
                className="text-white underline decoration-[var(--color-line-strong)] underline-offset-4 hover:decoration-white"
              >
                download page
              </Link>
              .
            </>
          }
        />
        <DownloadBlock compact />
      </Shell>

      {/* ── 12 faq ── */}
      <Shell id="faq">
        <SectionHead
          n="08"
          eyebrow="Questions"
          title={
            <>
              The ones that actually <span className="serif italic text-[#ffc83d]">matter.</span>
            </>
          }
        />
        <FAQ />
      </Shell>

      <CTA />
    </>
  );
}
