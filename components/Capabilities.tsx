import { CAPABILITIES } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Capabilities() {
  return (
    <div className="grid gap-px overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
      {CAPABILITIES.map((c, i) => (
        <Reveal key={c.name} delay={Math.min(i, 8) * 40}>
          <article className="group relative h-full bg-[var(--color-ink)] p-6 transition-colors duration-300 hover:bg-[var(--color-ink-2)]">
            <div className="flex items-baseline gap-3">
              <span className="mono-xs text-[var(--color-dimmer)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[1.0625rem] font-medium tracking-[-0.02em]">{c.name}</h3>
            </div>
            <p className="mt-2.5 text-[0.875rem] leading-[1.6] text-[#9aa0b2]">{c.body}</p>
            <span className="ramp-line absolute bottom-0 left-0 h-[2px] w-0 transition-[width] duration-400 ease-out group-hover:w-full" />
          </article>
        </Reveal>
      ))}

      {/* closing cell */}
      <Reveal delay={360}>
        <article className="relative flex h-full flex-col justify-between bg-[var(--color-ink-2)] p-6">
          <p className="serif text-[1.35rem] leading-[1.25] text-[#dfe2ea]">
            Everything above is in the MVP. None of it requires a cloud account.
          </p>
          <span className="mono-xs mt-6 text-[var(--color-dimmer)]">
            MVP v0.1 — mandatory scope
          </span>
        </article>
      </Reveal>
    </div>
  );
}
