import Link from "next/link";
import { CurveMark } from "./CurveMark";

const COLS = [
  {
    head: "Product",
    links: [
      ["How it works", "/#loop"],
      ["Platform", "/#platform"],
      ["Agents & fusion", "/agents"],
      ["Agent studio", "/agents#studio"],
      ["Use cases", "/#uses"],
      ["Pricing", "/#pricing"],
    ],
  },
  {
    head: "Build",
    links: [
      ["Download", "/download"],
      ["Runner protocol", "/#platform"],
      ["Tool schemas", "/#platform"],
      ["Agent roster", "/agents#roster"],
      ["Fusion rules", "/agents#fusion"],
      ["Changelog", "/download#changelog"],
    ],
  },
  {
    head: "Company",
    links: [
      ["Spec v1.0", "/#what"],
      ["Principles", "/#trust"],
      ["Contact", "#contact"],
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-[var(--color-line)]">
      <div className="mx-auto max-w-[1320px] px-5 pt-16 pb-10 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.7fr)]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Curve home">
              <CurveMark size={30} />
              <span className="text-[1.3rem] font-semibold tracking-[-0.045em]">Curve</span>
            </Link>
            <p className="serif mt-5 max-w-[26ch] text-[1.3rem] leading-[1.25] text-[#9aa0b2]">
              Goal → Project → Agents → Workflow → Permission → Execution → Verification →{" "}
              <span className="text-white italic">Artifact.</span>
            </p>
            <p className="mono-xs mt-6 max-w-[40ch] leading-relaxed text-[var(--color-dimmer)]">
              Curve should own the orchestration layer, not necessarily every execution machine.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.head}>
                <h3 className="eyebrow text-[var(--color-dimmer)]">{c.head}</h3>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[0.875rem] text-[#9aa0b2] transition-colors hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="ramp-line mt-14 h-px opacity-55" />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <span className="mono-xs text-[var(--color-dimmer)]">
            © {new Date().getFullYear()} Curve · local-first AI execution workspace
          </span>
          <span className="mono-xs text-[var(--color-dimmer)]">
            Runner 0.3.1 · Spec 1.0 · Built for people who want receipts
          </span>
        </div>
      </div>
    </footer>
  );
}
