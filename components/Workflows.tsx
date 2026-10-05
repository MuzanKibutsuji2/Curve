import { WORKFLOW_PARAMS, WORKFLOW_STEPS } from "@/lib/content";
import { Reveal } from "./Reveal";

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
  no: { label: "auto", fg: "#3be8c0", bg: "rgba(59,232,192,0.12)" },
  scoped: { label: "in scope", fg: "#6b5cff", bg: "rgba(107,92,255,0.16)" },
  yes: { label: "approval", fg: "#ff6a2b", bg: "rgba(255,106,43,0.15)" },
  depends: { label: "depends", fg: "#8b90a0", bg: "rgba(255,255,255,0.05)" },
};

/** Dark panel version — lives inside the Platform tabs. */
export function WorkflowsPanel() {
  return (
    <>
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <h3 className="h-title max-w-[16ch]">
            Do it once. Then{" "}
            <span className="serif italic text-[#ff4d9e]">never do it again.</span>
          </h3>
          <p className="max-w-[54ch] text-[0.9375rem] leading-[1.62] text-[#b9bece]">
            A workflow is a reusable description of how Curve performs a class of task — not a macro. It
            carries conditional steps, agent roles, tools, approvals and verification, and it stays
            structured data, so it can be versioned, parameterised and shared.
          </p>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <div className="scroll-thin mt-9 flex items-center gap-2.5 overflow-x-auto border-y border-[var(--color-line)] py-4">
          {STRUCTURE.map((s, i) => (
            <span key={s} className="flex shrink-0 items-center gap-2.5">
              <span className="eyebrow text-[#cfd3de]">{s}</span>
              {i < STRUCTURE.length - 1 && <span className="font-mono text-xs text-[#ff6a2b]">→</span>}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:gap-16">
        <Reveal>
          <div className="flex items-baseline justify-between gap-4">
            <h4 className="eyebrow text-[var(--color-dimmer)]">Example · ship a website change</h4>
            <span className="mono-xs text-[var(--color-dimmer)]">9 steps · 3 gates</span>
          </div>
          <ol className="mt-4 max-w-[620px]">
            {WORKFLOW_STEPS.map((s) => {
              const b = BADGE[s.approval];
              return (
                <li
                  key={s.n}
                  className="flex items-center gap-4 border-b border-[var(--color-line)] py-2.5 first:border-t first:border-[var(--color-line-strong)]"
                >
                  <span className="mono-xs w-5 shrink-0 text-[var(--color-dimmer)]">
                    {String(s.n).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-[0.875rem] leading-snug text-[#dfe2ea]">
                    {s.action}
                  </span>
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

        <Reveal delay={100}>
          <h4 className="eyebrow text-[var(--color-dimmer)]">Parameters</h4>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {WORKFLOW_PARAMS.map((p) => (
              <li
                key={p}
                className="mono-xs rounded-full border border-[var(--color-line)] px-2.5 py-1.5 text-[var(--color-dim)]"
              >
                {p}
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid grid-cols-2 gap-px bg-[var(--color-line)]">
            {[
              ["Saved runs", "become recipes"],
              ["New inputs", "same procedure"],
              ["Versioned", "like code"],
              ["Shareable", "across a team"],
            ].map(([k, v]) => (
              <div key={k} className="bg-[var(--color-ink)] p-4">
                <dt className="text-[0.875rem] font-medium">{k}</dt>
                <dd className="mono-xs mt-1 text-[var(--color-dimmer)]">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="serif mt-8 border-l-2 border-[#6b5cff] pl-5 text-[1.2rem] leading-[1.3] text-[#9aa0b2]">
            This is what turns Curve from a one-off agent into a system for{" "}
            <span className="text-white italic">repeatable work.</span>
          </p>
        </Reveal>
      </div>
    </>
  );
}
