import { HEX, LAYERS } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Layers() {
  return (
    <div className="mt-14 space-y-px overflow-hidden rounded-[12px] border border-[var(--color-line)]">
      {LAYERS.map((l, i) => {
        const c = HEX[l.color];
        return (
          <Reveal key={l.name} delay={i * 90}>
            <div className="group relative grid gap-5 bg-[var(--color-ink-2)] p-6 pl-7 transition-colors duration-300 hover:bg-[var(--color-ink-3)] sm:p-8 sm:pl-9 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10">
              <span
                className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-100 transition-transform duration-500"
                style={{ background: c }}
              />

              <div className="flex items-baseline gap-4">
                <span className="serif shrink-0 text-[2.2rem] leading-none" style={{ color: c }}>
                  {l.n}
                </span>
                <span className="h-title text-[1.5rem] sm:text-[1.625rem]">{l.name}</span>
              </div>

              <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-[#b9bece]">
                {l.purpose}
                <span className="mt-1.5 block text-[0.8125rem]" style={{ color: c }}>
                  {l.note}
                </span>
              </p>

              <ul className="flex flex-wrap gap-1.5">
                {l.items.map((it) => (
                  <li
                    key={it}
                    className="mono-xs rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[var(--color-dim)]"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
