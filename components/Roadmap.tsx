import { HEX, METRICS, ROADMAP, ROUTER } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Roadmap() {
  return (
    <>
      <div className="relative mt-2">
        {/* spine */}
        <div className="ramp-line absolute inset-x-0 top-[7px] hidden h-px opacity-45 lg:block" aria-hidden />

        <div className="scroll-thin -mx-5 flex gap-px overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:px-0">
          {ROADMAP.map((r, i) => {
            const c = HEX[r.color];
            return (
              <Reveal key={r.tag} delay={i * 80} className="w-[268px] shrink-0 lg:w-auto">
                <div className="relative h-full pt-0 lg:pr-6">
                  <span
                    className="relative z-10 block h-[15px] w-[15px] rounded-full border-[3px] border-[var(--color-ink)]"
                    style={{ background: c }}
                  />
                  <div className="mt-5">
                    <div className="flex items-center gap-2">
                      <span className="text-[1.0625rem] font-semibold tracking-[-0.02em]" style={{ color: c }}>
                        {r.tag}
                      </span>
                      <span className="mono-xs text-[var(--color-dimmer)]">{r.status}</span>
                    </div>
                    <h3 className="mt-1.5 text-[1.0625rem] font-medium tracking-[-0.02em]">{r.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {r.items.map((it) => (
                        <li key={it} className="flex gap-2.5 text-[0.8125rem] leading-[1.55] text-[#9aa0b2]">
                          <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-[var(--color-dimmer)]" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* execution router */}
      <div className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <h3 className="h-title text-[1.5rem] sm:text-[1.75rem]">The Execution Router</h3>
          <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-[1.62] text-[#9aa0b2]">
            Later, Curve stops caring where work happens. A policy decides the environment —
            &ldquo;use local when available, otherwise ask before cloud&rdquo; — which keeps cloud an explicit
            cost and privacy decision rather than a hidden dependency.
          </p>
          <div className="mono-xs mt-6 inline-block rounded-full border border-[var(--color-line-strong)] px-3 py-1.5 text-[var(--color-dim)]">
            Phase 3 · not in the MVP
          </div>
        </Reveal>

        <Reveal delay={90}>
          <ul className="border-t border-[var(--color-line-strong)]">
            {ROUTER.map((r) => (
              <li
                key={r.cond}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] py-3.5"
              >
                <span className="text-[0.875rem] text-[#cfd3de]">{r.cond}</span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[0.6875rem] text-[var(--color-dimmer)]">→</span>
                  <span className="mono-xs" style={{ color: HEX[r.color] }}>
                    {r.exec}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* how we will know it worked */}
      <div className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <span className="eyebrow text-[var(--color-dimmer)]">North star</span>
          <p className="h-title mt-5 max-w-[13ch] text-balance">
            Verified work completed <span className="serif ramp-text italic">per week.</span>
          </p>
          <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-[1.62] text-[#9aa0b2]">
            Not messages sent. Not tokens burned. Not time on task. The only number that matters is how
            much real work Curve finished and could prove it finished.
          </p>
        </Reveal>

        <Reveal delay={90}>
          <dl className="border-t border-[var(--color-line-strong)]">
            {METRICS.map((m) => (
              <div
                key={m.k}
                className="grid gap-1 border-b border-[var(--color-line)] py-3 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-baseline sm:gap-6"
              >
                <dt className="text-[0.875rem] font-medium text-[#dfe2ea]">{m.k}</dt>
                <dd className="text-[0.8125rem] leading-snug text-[#8b90a0]">{m.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </>
  );
}
