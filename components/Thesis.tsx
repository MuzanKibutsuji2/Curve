import { NOT_LIST, POSITIONING } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Shell, SectionHead } from "./Section";

export function Thesis() {
  return (
    <Shell id="what" light>
      <div className="grid-field-paper pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative">
        <SectionHead
          n="01"
          eyebrow="What Curve is"
          light
          align="split"
          title={
            <>
              An AI execution workspace,{" "}
              <span className="serif italic text-[#6b5cff]">not another chat window.</span>
            </>
          }
          lede={
            <>
              AI can be enormously capable and still leave you managing context, tools, permissions,
              environments and follow-up by hand. Curve makes <em className="not-italic font-medium">execution
              itself</em> the product: you describe the result, Curve manages the work required to get there.
            </>
          }
        />

        {/* pull quote */}
        <Reveal delay={80}>
          <blockquote className="mt-16 border-t border-[#08090c]/15 pt-10">
            <p className="serif max-w-[22ch] text-[clamp(2rem,5.2vw,4.4rem)] leading-[0.98] tracking-[-0.02em]">
              Curve does not need to own all compute. Curve needs to{" "}
              <span className="italic text-[#ff6a2b]">orchestrate</span> it.
            </p>
            <footer className="mono-xs mt-6 text-[#6f6a5e]">
              Core principle · Curve MVP &amp; Full Product Specification, §0
            </footer>
          </blockquote>
        </Reveal>

        {/* not-list + positioning */}
        <div className="mt-20 grid gap-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal delay={60}>
            <h3 className="eyebrow text-[#6f6a5e]">What Curve is not</h3>
            <ul className="mt-5 space-y-0">
              {NOT_LIST.map((x) => (
                <li
                  key={x}
                  className="flex items-start gap-3 border-b border-[#08090c]/12 py-3.5 text-[0.9375rem] leading-snug text-[#45413a]"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" className="mt-[5px] shrink-0" aria-hidden>
                    <path d="M2 2l8 8M10 2l-8 8" stroke="#ff4d9e" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                  <span>
                    Not <span className="text-[#08090c]">{x}</span>.
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[42ch] text-[0.875rem] leading-relaxed text-[#6f6a5e]">
              Curve does not claim its model is smarter than everyone else&rsquo;s. The differentiation is the
              system around the model.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="eyebrow text-[#6f6a5e]">Where Curve sits</h3>
            <table className="mt-5 w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#08090c]/25">
                  <th className="mono-xs pb-2.5 font-medium text-[#6f6a5e]">CATEGORY</th>
                  <th className="mono-xs hidden pb-2.5 font-medium text-[#6f6a5e] sm:table-cell">EMPHASIS</th>
                  <th className="mono-xs pb-2.5 font-medium text-[#6f6a5e]">CURVE ANSWER</th>
                </tr>
              </thead>
              <tbody>
                {POSITIONING.map((p) => (
                  <tr key={p.cat} className="border-b border-[#08090c]/12 align-top">
                    <td className="py-3.5 pr-4 text-[0.875rem] font-medium whitespace-nowrap">{p.cat}</td>
                    <td className="hidden py-3.5 pr-4 text-[0.875rem] text-[#6f6a5e] sm:table-cell">{p.emphasis}</td>
                    <td className="py-3.5 text-[0.875rem] leading-snug text-[#45413a]">{p.answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </div>
    </Shell>
  );
}
