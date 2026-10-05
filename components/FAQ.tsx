import { FAQS } from "@/lib/content";
import { Reveal } from "./Reveal";

export function FAQ() {
  return (
    <div className="mt-12 border-t border-[var(--color-line-strong)]">
      {FAQS.map((f, i) => (
        <Reveal key={f.q} delay={Math.min(i, 5) * 50}>
          <details className="group border-b border-[var(--color-line)]">
            <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
              <span className="mono-xs mt-[7px] shrink-0 text-[var(--color-dimmer)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[1.0625rem] leading-snug font-medium tracking-[-0.02em] transition-colors group-hover:text-white sm:text-[1.125rem]">
                {f.q}
              </span>
              <span className="relative mt-2 h-3 w-3 shrink-0">
                <span className="absolute top-1/2 left-0 h-px w-3 bg-[var(--color-dim)]" />
                <span className="absolute top-1/2 left-0 h-px w-3 rotate-90 bg-[var(--color-dim)] transition-transform duration-300 group-open:rotate-0" />
              </span>
            </summary>
            <p className="max-w-[72ch] pr-8 pb-6 pl-[2.25rem] text-[0.9375rem] leading-[1.68] text-[#9aa0b2]">
              {f.a}
            </p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
