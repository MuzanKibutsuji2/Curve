import { WORKFLOW_PARAMS, WORKFLOW_STEPS } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Shell, SectionHead } from "./Section";

const STRUCTURE = [
  "Trigger",
  "Inputs",
  "Plan",
  "Agent steps",
  "Conditions",
  "Approvals",
  "Execution",
  "Verification",
  "Outputs",
  "Memory update",
];

const BADGE: Record<string, { label: string; fg: string; bg: string }> = {
  no: { label: "auto", fg: "#1f7a52", bg: "rgba(59,232,192,0.22)" },
  scoped: { label: "in scope", fg: "#6b5cff", bg: "rgba(107,92,255,0.16)" },
  yes: { label: "approval", fg: "#b03a0c", bg: "rgba(255,106,43,0.22)" },
  depends: { label: "depends", fg: "#6f6a5e", bg: "rgba(8,9,12,0.07)" },
};

export function Workflows() {
  return (
    <Shell id="workflows" light>
      <div className="grid-field-paper pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative">
        <SectionHead
          n="07"
          eyebrow="Workflows"
          light
          align="split"
          title={
            <>
              Do it once. Then{" "}
              <span className="serif italic text-[#ff4d9e]">never do it again.</span>
            </>
          }
          lede={
            <>
              A workflow is a reusable description of how Curve performs a class of task — not a macro.
              It carries conditional steps, agent roles, tools, approvals and verification, and it stays
              structured data, so it can be versioned, parameterised and shared.
            </>
          }
        />

        {/* structure chain */}
        <Reveal delay={60}>
          <div className="mt-14 flex flex-wrap items-center gap-x-2.5 gap-y-2 border-y border-[#08090c]/15 py-5">
            {STRUCTURE.map((s, i) => (
              <span key={s} className="flex items-center gap-2.5">
                <span className="eyebrow text-[#08090c]">{s}</span>
                {i < STRUCTURE.length - 1 && <span className="font-mono text-xs text-[#ff6a2b]">→</span>}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
          {/* example */}
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="eyebrow text-[#6f6a5e]">Example · ship a website change</h3>
              <span className="mono-xs text-[#6f6a5e]">9 steps · 3 gates</span>
            </div>
            <ol className="mt-5 max-w-[620px]">
              {WORKFLOW_STEPS.map((s) => {
                const b = BADGE[s.approval];
                return (
                  <li
                    key={s.n}
                    className="flex items-center gap-4 border-b border-[#08090c]/12 py-3.5 first:border-t first:border-[#08090c]/25"
                  >
                    <span className="mono-xs w-5 shrink-0 text-[#6f6a5e]">{String(s.n).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1 text-[0.9375rem] leading-snug">{s.action}</span>
                    <span
                      className="mono-xs shrink-0 rounded-full px-2.5 py-1"
                      style={{ color: b.fg, background: b.bg }}
                    >
                      {b.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* parameters + payoff */}
          <Reveal delay={100}>
            <h3 className="eyebrow text-[#6f6a5e]">Parameters</h3>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {WORKFLOW_PARAMS.map((p) => (
                <li
                  key={p}
                  className="mono-xs rounded-full border border-[#08090c]/20 px-2.5 py-1.5 text-[#45413a]"
                >
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-10 border-l-[3px] border-[#6b5cff] pl-6">
              <p className="serif text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.18] tracking-[-0.015em]">
                This is what turns Curve from a one-off agent into a system for{" "}
                <span className="italic">repeatable work.</span>
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-px bg-[#08090c]/15">
              {[
                ["Saved runs", "become recipes"],
                ["New inputs", "same procedure"],
                ["Versioned", "like code"],
                ["Shareable", "across a team"],
              ].map(([k, v]) => (
                <div key={k} className="bg-[var(--color-paper)] p-4">
                  <dt className="text-[0.9375rem] font-medium">{k}</dt>
                  <dd className="mono-xs mt-1 text-[#6f6a5e]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Shell>
  );
}
