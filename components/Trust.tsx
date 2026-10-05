import { PERMISSIONS, SECURITY_PRINCIPLES } from "@/lib/content";
import { Reveal } from "./Reveal";

const TONE: Record<string, { fg: string; bg: string }> = {
  ok: { fg: "#3be8c0", bg: "rgba(59,232,192,0.12)" },
  warn: { fg: "#ffc83d", bg: "rgba(255,200,61,0.12)" },
  hot: { fg: "#ff6a2b", bg: "rgba(255,106,43,0.14)" },
  deny: { fg: "#ff4d9e", bg: "rgba(255,77,158,0.14)" },
};

export function Trust() {
  return (
    <>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        {/* permission ladder */}
        <Reveal>
          <h3 className="eyebrow text-[var(--color-dimmer)]">Permission levels</h3>
          <div className="scroll-thin mt-5 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--color-line-strong)]">
                  <th className="mono-xs pb-2.5 font-medium text-[var(--color-dimmer)]">LEVEL</th>
                  <th className="mono-xs pb-2.5 font-medium text-[var(--color-dimmer)]">EXAMPLES</th>
                  <th className="mono-xs pb-2.5 text-right font-medium text-[var(--color-dimmer)]">DEFAULT</th>
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS.map((p) => {
                  const t = TONE[p.tone];
                  return (
                    <tr key={p.level} className="border-b border-[var(--color-line)]">
                      <td className="py-3 pr-4 text-[0.875rem] font-medium whitespace-nowrap">{p.level}</td>
                      <td className="py-3 pr-4 text-[0.875rem] text-[#9aa0b2]">{p.examples}</td>
                      <td className="py-3 text-right">
                        <span
                          className="mono-xs inline-block rounded-full px-2.5 py-1 whitespace-nowrap"
                          style={{ color: t.fg, background: t.bg }}
                        >
                          {p.mode}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-[56ch] text-[0.9375rem] leading-[1.6] text-[#9aa0b2]">
            Permissioning is a visible product feature, not a hidden security implementation. You can read the
            ladder, edit it per project, and see exactly which rung a step needed.
          </p>
        </Reveal>

        {/* anatomy of an approval */}
        <Reveal delay={100}>
          <h3 className="eyebrow text-[var(--color-dimmer)]">Anatomy of an approval</h3>
          <div className="mt-5 rounded-[12px] border border-[var(--color-line-strong)] bg-[var(--color-ink-2)] p-6">
            <ul className="space-y-0">
              {[
                ["What", "the exact action Curve intends to take"],
                ["Where", "the path, repository or destination it affects"],
                ["Why", "the step in the plan that requires it"],
                ["Impact", "expected blast radius and whether it reverses"],
                ["Scope", "once, for this workflow, or never"],
              ].map(([k, v], i) => (
                <li
                  key={k}
                  className="flex gap-4 border-b border-[var(--color-line)] py-3 last:border-0"
                  style={{ opacity: 1 - i * 0.03 }}
                >
                  <span className="eyebrow w-[62px] shrink-0 pt-[3px] text-[#ff6a2b]">{k}</span>
                  <span className="text-[0.875rem] leading-snug text-[#cfd3de]">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-5">
              {["Allow once", "Allow for workflow", "Deny", "Edit permission"].map((b, i) => (
                <span
                  key={b}
                  className={`rounded-full px-3 py-1.5 text-[0.8125rem] ${
                    i === 0
                      ? "bg-white font-medium text-black"
                      : "border border-[var(--color-line-strong)] text-[var(--color-dim)]"
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* principles */}
      <Reveal delay={60}>
        <div className="mt-16 border-t border-[var(--color-line)] pt-10">
          <h3 className="eyebrow text-[var(--color-dimmer)]">Security principles</h3>
          <ul className="mt-6 grid gap-x-10 gap-y-0 sm:grid-cols-2">
            {SECURITY_PRINCIPLES.map((p, i) => (
              <li
                key={p}
                className="flex items-start gap-3 border-b border-[var(--color-line)] py-3 text-[0.875rem] text-[#b9bece]"
              >
                <span className="mono-xs mt-[3px] text-[var(--color-dimmer)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <blockquote className="mt-14">
          <p className="serif max-w-[24ch] text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.02em]">
            Curve prefers <span className="italic text-[#ffc83d]">&ldquo;I could not verify this, so I
            stopped&rdquo;</span> over a confident, unverified success.
          </p>
          <footer className="mono-xs mt-5 text-[var(--color-dimmer)]">Reliability principle · §25</footer>
        </blockquote>
      </Reveal>
    </>
  );
}
