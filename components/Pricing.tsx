import Link from "next/link";
import { ADDONS, HEX, TIERS } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Shell, SectionHead } from "./Section";

export function Pricing() {
  return (
    <Shell id="pricing" light>
      <div className="grid-field-paper pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative">
        <SectionHead
          n="06"
          eyebrow="Pricing"
          light
          align="split"
          title={
            <>
              Your machine does the work, so the{" "}
              <span className="serif italic text-[#1f7a52]">free tier is real.</span>
            </>
          }
          lede={
            <>
              Curve executes locally wherever possible. The only meaningful variable cost is model usage plus
              lightweight orchestration hosting — which is exactly why you can run real projects without paying
              for a cloud computer you did not need.
            </>
          }
        />

        <div className="mt-14 grid gap-px bg-[#08090c]/18 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t, i) => {
            const c = HEX[t.color];
            return (
              <Reveal key={t.name} delay={i * 70}>
                <div
                  className={`relative flex h-full flex-col p-6 sm:p-7 ${
                    t.featured ? "bg-[#08090c] text-[#eceef4]" : "bg-[var(--color-paper)]"
                  }`}
                >
                  {t.featured && <span className="ramp-line absolute inset-x-0 top-0 h-[3px]" />}

                  <div className="flex items-center gap-2">
                    <span className="h-[7px] w-[7px] rounded-full" style={{ background: c }} />
                    <h3 className="text-[0.9375rem] font-semibold tracking-[-0.01em]">{t.name}</h3>
                    {t.featured && (
                      <span className="mono-xs ml-auto rounded-full bg-white/10 px-2 py-0.5 text-white/70">
                        popular
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-[2.1rem] leading-none font-semibold tracking-[-0.045em]">
                      {t.price}
                    </span>
                    <span className={`mono-xs ${t.featured ? "text-white/45" : "text-[#6f6a5e]"}`}>{t.sub}</span>
                  </div>

                  <p
                    className={`mt-4 text-[0.875rem] leading-[1.55] ${
                      t.featured ? "text-[#b9bece]" : "text-[#45413a]"
                    }`}
                  >
                    {t.blurb}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-[0.8125rem] leading-snug">
                        <svg width="11" height="11" viewBox="0 0 12 12" className="mt-[5px] shrink-0" aria-hidden>
                          <path
                            d="M1.8 6.2L4.4 8.8L10 2.8"
                            stroke={c}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                        <span className={t.featured ? "text-[#cfd3de]" : "text-[#45413a]"}>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={t.href}
                    className={`mt-8 flex h-11 items-center justify-center rounded-full text-[0.875rem] font-medium transition-colors ${
                      t.featured
                        ? "bg-white text-black hover:bg-[#e8e8e8]"
                        : "border border-[#08090c]/25 text-[#08090c] hover:bg-[#08090c] hover:text-[var(--color-paper)]"
                    }`}
                  >
                    {t.cta}
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-10">
          {ADDONS.map((a, i) => (
            <Reveal key={a.name} delay={i * 80}>
              <div className="border-t-2 border-[#08090c] pt-5">
                <h4 className="text-[0.9375rem] font-semibold">{a.name}</h4>
                <p className="mt-2 max-w-[48ch] text-[0.875rem] leading-[1.6] text-[#45413a]">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="mono-xs mt-12 text-[#6f6a5e]">
            Beta pricing. Prices in INR, billed annually or monthly. Local execution is unmetered on every tier.
          </p>
        </Reveal>
      </div>
    </Shell>
  );
}
