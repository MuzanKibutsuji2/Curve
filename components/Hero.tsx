import Link from "next/link";
import { Backdrop } from "./Backdrop";
import { RunPanel } from "./RunPanel";
import { Reveal } from "./Reveal";

const FACTS = [
  ["Execution", "Your machine. Scoped to one folder."],
  ["Permission", "Visible, editable, enforced locally."],
  ["Completion", "Verified, or Curve says it couldn't."],
];

export function Hero() {
  return (
    <section className="noise relative overflow-hidden pt-28 pb-14 sm:pt-36">
      <Backdrop />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] bg-white/[0.04] px-3 py-1.5 backdrop-blur">
              <span className="ramp-line h-[6px] w-[6px] rounded-full" />
              <span className="eyebrow text-[var(--color-dim)]">Local-first AI execution workspace</span>
            </span>
            <span className="mono-xs text-[var(--color-dimmer)]">v0.3.1 beta · spec 1.0 · Oct 2026</span>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="h-mega mt-7 max-w-[17ch]">
            Describe the outcome.
            <br />
            <span className="text-[var(--color-dim)]">Curve does the work</span>
            <br />
            <span className="serif ramp-text italic">and proves it did.</span>
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <Reveal delay={170}>
            <p className="max-w-[56ch] text-[1.0625rem] leading-[1.6] text-[#b9bece] sm:text-[1.125rem]">
              Curve turns a goal into an inspectable plan, asks permission before anything irreversible,
              executes on your own machine through <strong className="font-medium text-white">Curve Runner</strong>,
              verifies the result against what it promised — then saves the whole thing as a workflow you can run
              again.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/download"
                className="group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full bg-white px-6 text-[0.9375rem] font-medium text-black"
              >
                <span className="relative z-10">Download Curve</span>
                <svg
                  className="relative z-10 transition-transform duration-300 group-hover:translate-y-[2px]"
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path d="M7 1v9m0 0 3.6-3.6M7 10 3.4 6.4M1.5 12.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <span className="ramp-line absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              </Link>

              <Link
                href="#loop"
                className="inline-flex h-12 items-center rounded-full border border-[var(--color-line-strong)] px-6 text-[0.9375rem] text-[#dfe2ea] transition-colors hover:border-white/45 hover:bg-white/[0.04]"
              >
                See the loop
              </Link>

              <span className="mono-xs text-[var(--color-dimmer)]">Free tier · no cloud required</span>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <dl className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
              {FACTS.map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-5 py-3.5">
                  <dt className="eyebrow w-[86px] shrink-0 text-[var(--color-dimmer)]">{k}</dt>
                  <dd className="text-[0.9375rem] leading-snug text-[#cfd3de]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={300} className="mt-14">
          <RunPanel />
        </Reveal>

        <Reveal delay={360}>
          <p className="mono-xs mt-4 text-[var(--color-dimmer)]">
            Illustrative run. Curve Runner executes locally; the orchestrator never touches your disk directly.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
