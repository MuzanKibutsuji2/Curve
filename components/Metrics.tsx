import { METRICS } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Metrics() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-ink-2)]">
      <div
        className="pointer-events-none absolute -top-40 left-1/3 h-[420px] w-[420px] rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: "radial-gradient(circle, #cdff3e 0%, transparent 70%)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <span className="eyebrow text-[var(--color-dimmer)]">North star</span>
            <p className="h-display mt-6 max-w-[14ch] text-balance">
              Verified work completed <span className="serif ramp-text italic">per week.</span>
            </p>
            <p className="mt-6 max-w-[42ch] text-[0.9375rem] leading-[1.65] text-[#9aa0b2]">
              Not messages sent. Not tokens burned. Not time on task. The only number that matters is how much
              real work Curve finished and could prove it finished.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <dl className="border-t border-[var(--color-line-strong)]">
              {METRICS.map((m) => (
                <div
                  key={m.k}
                  className="grid gap-1 border-b border-[var(--color-line)] py-3.5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-baseline sm:gap-6"
                >
                  <dt className="text-[0.875rem] font-medium text-[#dfe2ea]">{m.k}</dt>
                  <dd className="text-[0.8125rem] leading-snug text-[#8b90a0]">{m.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
