import type { Metadata } from "next";
import Link from "next/link";
import { AGENT_FIELDS } from "@/lib/content";
import { ROSTER } from "@/lib/agents";
import { AgentRoster } from "@/components/AgentRoster";
import { AgentStudio } from "@/components/AgentStudio";
import { Fusion } from "@/components/Fusion";
import { Sigil } from "@/components/Sigil";
import { SigilCycle } from "@/components/SigilCycle";
import { Reveal } from "@/components/Reveal";
import { Words } from "@/components/motion";
import { Shell, SectionHead } from "@/components/Section";

export const metadata: Metadata = {
  title: "Agents & Fusion",
  description:
    "Name your agents, give them a face and a disposition, scope their tools — then fuse two or more into a single composite that inherits their memories, abilities and workflows.",
};

const LIFECYCLE = ["Create", "Configure", "Test", "Save", "Run", "Review", "Improve", "Version", "Fuse"];

const TEAM = [
  { n: "Beacon", role: "gathers sources", c: "#6b5cff" },
  { n: "Prism", role: "structures the data", c: "#ffc83d" },
  { n: "Quill", role: "drafts the document", c: "#ff6a2b" },
  { n: "Ledger", role: "checks it", c: "#ff4d9e" },
  { n: "Atlas", role: "packages the artifact", c: "#cdff3e" },
];

const MERGE_RULES = [
  {
    k: "Abilities",
    c: "#3be8c0",
    v: "Union of every parent's declared tools. Duplicates collapse to one entry, keeping the strictest input schema.",
  },
  {
    k: "Memories",
    c: "#6b5cff",
    v: "Memory items are unioned, then reconciled — near-duplicate facts merge, contradictions surface for you to resolve rather than silently averaging.",
  },
  {
    k: "Workflows",
    c: "#ff4d9e",
    v: "Every parent workflow carries over with a pointer to the agent it came from, so you can still tell who taught the composite what.",
  },
  {
    k: "Permissions",
    c: "#ff6a2b",
    v: "The most restrictive parent ceiling wins. Fusion can never escalate privilege — widening it is a separate, explicit decision.",
  },
  {
    k: "Disposition",
    c: "#ffc83d",
    v: "The five dials blend to the mean of the parents, so a cautious reviewer genuinely tempers a decisive coder.",
  },
  {
    k: "Lineage",
    c: "#cdff3e",
    v: "Parents stay intact and versioned. A composite records who it came from, and unfusing restores the originals untouched.",
  },
];

export default function AgentsPage() {
  return (
    <>
      {/* ── header ── */}
      <section className="noise relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="drift absolute -top-[28%] left-[8%] h-[44vw] w-[44vw] rounded-full opacity-[0.2] blur-[120px]"
            style={{ background: "radial-gradient(circle, #ff4d9e 0%, transparent 68%)" }}
          />
          <div
            className="drift absolute -top-[22%] right-[2%] h-[42vw] w-[42vw] rounded-full opacity-[0.18] blur-[120px]"
            style={{ background: "radial-gradient(circle, #3be8c0 0%, transparent 68%)", animationDelay: "-9s" }}
          />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-5 pt-32 pb-16 sm:px-8 sm:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow text-[var(--color-dimmer)]">Agents</span>
              <span className="h-px w-10 bg-[var(--color-line)]" />
              <span className="mono-xs text-[var(--color-dimmer)]">roster · studio · fusion</span>
            </div>
          </Reveal>

          <Words as="h1" className="h-mega mt-7 block max-w-[16ch]" delay={120}>
            Name them. Shape them. <span className="serif ramp-text italic">Fuse them.</span>
          </Words>

          <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:items-start lg:gap-16">
            <div>
              <Reveal delay={260}>
                <p className="max-w-[52ch] text-[1.0625rem] leading-[1.62] text-[#b9bece]">
                  A Curve agent is a named individual with a face, a disposition, a declared toolset and a
                  permission ceiling — not an anonymous prompt. When two of them keep ending up on the same
                  job, fuse them into one that remembers everything both of them learned.
                </p>
              </Reveal>

              {/* sigil strip */}
              <Reveal delay={320}>
                <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
                  {ROSTER.map((a) => (
                    <span key={a.id} className="group flex items-center gap-2.5">
                      <Sigil seed={a.seed} colours={[a.colour]} size={34} animate={false} />
                      <span className="mono-xs text-[var(--color-dimmer)] transition-colors group-hover:text-white">
                        {a.name}
                      </span>
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={380}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href="#studio"
                    className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-6 text-[0.9375rem] font-medium text-black"
                  >
                    <span className="relative z-10">Build an agent</span>
                    <span className="ramp-line absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                  </a>
                  <a
                    href="#fusion"
                    className="inline-flex h-12 items-center rounded-full border border-[var(--color-line-strong)] px-6 text-[0.9375rem] text-[#dfe2ea] transition-colors hover:border-white/45 hover:bg-white/[0.04]"
                  >
                    Fuse two agents
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <SigilCycle />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── roster ── */}
      <Shell id="roster">
        <SectionHead
          n="01"
          eyebrow="The roster"
          align="split"
          title={
            <>
              Six colleagues, each with a{" "}
              <span className="serif italic text-[#3be8c0]">face and an opinion.</span>
            </>
          }
          lede="Every agent carries a procedurally generated sigil derived from its name, an accent colour that follows it through every run timeline, and five disposition dials that decide how it behaves when the job gets ambiguous. Open one to see how it is wired."
        />
        <div className="mt-12">
          <AgentRoster />
        </div>
      </Shell>

      {/* ── studio ── */}
      <Shell id="studio" className="border-t border-[var(--color-line)] bg-[var(--color-ink-2)]">
        <SectionHead
          n="02"
          eyebrow="Agent studio"
          align="split"
          title={
            <>
              Build one now. It updates{" "}
              <span className="serif italic text-[#6b5cff]">as you type.</span>
            </>
          }
          lede="Name it, pick an archetype to start from, choose its accent, drag the five dials until the personality reads right, toggle the tools it may touch and set its ceiling. The agent card on the right is the actual record Curve stores."
        />
        <div className="mt-12">
          <AgentStudio />
        </div>

        <Reveal delay={80}>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h3 className="eyebrow text-[var(--color-dimmer)]">Every agent declares</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {AGENT_FIELDS.map((f) => (
                  <li
                    key={f}
                    className="mono-xs rounded-full border border-[var(--color-line)] px-2.5 py-1.5 text-[var(--color-dim)]"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow text-[var(--color-dimmer)]">Lifecycle</h3>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                {LIFECYCLE.map((s, i) => (
                  <span key={s} className="flex items-center gap-2">
                    <span
                      className={`text-[0.875rem] ${i === LIFECYCLE.length - 1 ? "font-medium text-[#ff4d9e]" : "text-[#cfd3de]"}`}
                    >
                      {s}
                    </span>
                    {i < LIFECYCLE.length - 1 && (
                      <span className="font-mono text-[0.6875rem] text-[var(--color-dimmer)]">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Shell>

      {/* ── fusion ── */}
      <Shell id="fusion" className="border-t border-[var(--color-line)]">
        <SectionHead
          n="03"
          eyebrow="Fusion"
          align="split"
          title={
            <>
              Merge two agents into one that{" "}
              <span className="serif italic text-[#ff4d9e]">remembers both.</span>
            </>
          }
          lede="Pick two or three agents and fuse them. The composite inherits the union of their abilities, their reconciled memories and all of their workflows — while its permission ceiling clamps down to the most restrictive parent, never up."
        />

        <div className="mt-12">
          <Fusion />
        </div>

        {/* rules */}
        <div className="mt-14">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="eyebrow text-[var(--color-dimmer)]">What actually merges</span>
              <span className="h-px flex-1 bg-[var(--color-line)]" />
            </div>
          </Reveal>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
            {MERGE_RULES.map((r, i) => (
              <Reveal key={r.k} delay={i * 60}>
                <div className="h-full bg-[var(--color-ink)] p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="h-[7px] w-[7px] rounded-full" style={{ background: r.c }} />
                    <h3 className="text-[1.0625rem] font-medium tracking-[-0.02em]">{r.k}</h3>
                  </div>
                  <p className="mt-2.5 text-[0.875rem] leading-[1.6] text-[#9aa0b2]">{r.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={100}>
          <blockquote className="mt-14">
            <p className="serif max-w-[26ch] text-[clamp(1.6rem,3.4vw,2.8rem)] leading-[1.1] tracking-[-0.02em]">
              A fused agent is still an agent:{" "}
              <span className="italic text-[#cdff3e]">scoped, versioned, and able to be refused.</span>
            </p>
            <footer className="mono-xs mt-5 text-[var(--color-dimmer)]">
              Fusion changes capability, never the permission model.
            </footer>
          </blockquote>
        </Reveal>
      </Shell>

      {/* ── teams ── */}
      <Shell id="teams" className="border-t border-[var(--color-line)] bg-[var(--color-ink-2)]">
        <SectionHead
          n="04"
          eyebrow="Teams"
          align="split"
          title={
            <>
              Or leave them separate and let them{" "}
              <span className="serif italic text-[#ffc83d]">pass the work along.</span>
            </>
          }
          lede="Fusion is for roles that have genuinely converged. When they haven't, a project can run them as a relay instead — each role holding only the permissions its step needs."
        />

        <Reveal>
          <div className="scroll-thin mt-12 flex items-stretch gap-2 overflow-x-auto pb-2">
            {TEAM.map((t, i) => (
              <div key={t.n} className="flex shrink-0 items-center gap-2">
                <div
                  className="rounded-[10px] border px-4 py-3.5"
                  style={{
                    borderColor: `color-mix(in oklab, ${t.c} 38%, transparent)`,
                    background: `color-mix(in oklab, ${t.c} 7%, transparent)`,
                  }}
                >
                  <div className="text-[0.9375rem] font-medium" style={{ color: t.c }}>
                    {t.n}
                  </div>
                  <div className="mono-xs mt-0.5 whitespace-nowrap text-[var(--color-dimmer)]">{t.role}</div>
                </div>
                {i < TEAM.length - 1 && (
                  <span className="font-mono text-xs text-[var(--color-dimmer)]">→</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="serif mt-10 max-w-[30ch] text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.2] text-[#9aa0b2]">
            Many agents are not the moat.{" "}
            <span className="text-white italic">
              Coordination, permissions, state and verification are.
            </span>
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 flex flex-wrap gap-3 border-t border-[var(--color-line)] pt-10">
            <Link
              href="/download"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-6 text-[0.9375rem] font-medium text-black"
            >
              <span className="relative z-10">Download Curve</span>
              <span className="ramp-line absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </Link>
            <Link
              href="/#platform"
              className="inline-flex h-12 items-center rounded-full border border-[var(--color-line-strong)] px-6 text-[0.9375rem] text-[#dfe2ea] transition-colors hover:border-white/45 hover:bg-white/[0.04]"
            >
              See the platform
            </Link>
          </div>
        </Reveal>
      </Shell>
    </>
  );
}
