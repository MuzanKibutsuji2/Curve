import { AGENTS, AGENT_FIELDS, HEX } from "@/lib/content";
import { Reveal } from "./Reveal";

const LIFECYCLE = ["Create", "Configure", "Test", "Save", "Run", "Review", "Improve", "Version"];

export function Agents() {
  return (
    <>
      <div className="mt-14 grid gap-px overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((a, i) => {
          const c = HEX[a.color];
          return (
            <Reveal key={a.role} delay={i * 60}>
              <article className="group relative h-full overflow-hidden bg-[var(--color-ink)] p-6 transition-colors duration-300 hover:bg-[var(--color-ink-2)]">
                <div
                  className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: c }}
                />
                <div className="relative">
                  <div className="flex items-center gap-2.5">
                    <span className="h-[7px] w-[7px] rounded-full" style={{ background: c }} />
                    <h3 className="text-[1.0625rem] font-medium tracking-[-0.02em]">{a.role}</h3>
                  </div>
                  <p className="mt-3 min-h-[2.8em] text-[0.875rem] leading-[1.6] text-[#9aa0b2]">{a.job}</p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {a.tools.map((t) => (
                      <li
                        key={t}
                        className="mono-xs rounded-[4px] px-1.5 py-1"
                        style={{ color: c, background: `color-mix(in oklab, ${c} 10%, transparent)` }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mono-xs mt-5 border-t border-[var(--color-line)] pt-3 text-[var(--color-dimmer)]">
                    {a.perm}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <h3 className="eyebrow text-[var(--color-dimmer)]">Every agent declares</h3>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {AGENT_FIELDS.map((f) => (
              <li
                key={f}
                className="mono-xs rounded-full border border-[var(--color-line)] px-2.5 py-1.5 text-[var(--color-dim)]"
              >
                {f}
              </li>
            ))}
          </ul>
          <h3 className="eyebrow mt-9 text-[var(--color-dimmer)]">Lifecycle</h3>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
            {LIFECYCLE.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span className="text-[0.875rem] text-[#cfd3de]">{s}</span>
                {i < LIFECYCLE.length - 1 && (
                  <span className="font-mono text-[0.6875rem] text-[var(--color-dimmer)]">→</span>
                )}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="h-full rounded-[12px] border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6 sm:p-8">
            <div className="eyebrow text-[#ff4d9e]">Multi-agent, later</div>
            <p className="mt-4 text-[1.0625rem] leading-[1.6] text-[#dfe2ea]">
              A project becomes a team. Researcher gathers → Analyst structures → Writer drafts → Reviewer
              checks → Coordinator packages the artifact. Each role gets only the permissions it needs.
            </p>
            <p className="serif mt-6 border-t border-[var(--color-line)] pt-6 text-[1.25rem] leading-[1.35] text-[#9aa0b2]">
              Many agents are not the moat.{" "}
              <span className="text-white italic">
                Coordination, permissions, state and verification are.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </>
  );
}
