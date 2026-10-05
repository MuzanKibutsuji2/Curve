import { RUNNER_DUTIES, TOOLS } from "@/lib/content";
import { Reveal } from "./Reveal";

const CHAIN = [
  { label: "Web UI", c: "#8b90a0" },
  { label: "Curve orchestrator", c: "#6b5cff" },
  { label: "authenticated channel", c: "#8b90a0" },
  { label: "local policy engine", c: "#ff6a2b" },
  { label: "tool executor", c: "#3be8c0" },
  { label: "result stream", c: "#cdff3e" },
];

export function Runner() {
  return (
    <>
      {/* architecture chain */}
      <Reveal>
        <div className="scroll-thin flex items-center gap-2 overflow-x-auto pb-2">
          {CHAIN.map((s, i) => (
            <span key={s.label} className="flex shrink-0 items-center gap-2">
              <span
                className="mono-xs rounded-full border px-3 py-1.5 whitespace-nowrap"
                style={{ borderColor: `color-mix(in oklab, ${s.c} 42%, transparent)`, color: s.c }}
              >
                {s.label}
              </span>
              {i < CHAIN.length - 1 && <span className="font-mono text-xs text-[var(--color-dimmer)]">→</span>}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-16">
        {/* left: duties + boundary */}
        <div>
          <Reveal>
            <h3 className="eyebrow text-[var(--color-dimmer)]">Runner responsibilities</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-1">
              {RUNNER_DUTIES.map((d, i) => (
                <li
                  key={d}
                  className="flex items-start gap-3 border-b border-[var(--color-line)] py-3 text-[0.875rem] leading-snug text-[#b9bece]"
                >
                  <span className="mono-xs mt-[3px] text-[var(--color-dimmer)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 rounded-[10px] border border-[#cdff3e]/30 bg-[#cdff3e]/[0.045] p-5">
              <div className="eyebrow text-[#cdff3e]">The boundary</div>
              <p className="mt-3 text-[0.9375rem] leading-[1.6] text-[#dfe2ea]">
                By default Curve operates only inside the project directory you selected. Everything outside it
                is denied unless explicitly allowlisted, and network access is disabled for commands that do not
                need it.
              </p>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-[#9aa0b2]">
                The model never owns your computer. The Runner is the enforcement boundary, and it makes the
                final call on every request.
              </p>
            </div>
          </Reveal>
        </div>

        {/* right: tool contract + wire format */}
        <div>
          <Reveal delay={60}>
            <h3 className="eyebrow text-[var(--color-dimmer)]">Initial tool contract</h3>
            <div className="scroll-thin mt-5 overflow-x-auto">
              <table className="w-full min-w-[460px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--color-line-strong)]">
                    <th className="mono-xs pb-2.5 font-medium text-[var(--color-dimmer)]">TOOL</th>
                    <th className="mono-xs pb-2.5 font-medium text-[var(--color-dimmer)]">INPUT</th>
                    <th className="mono-xs pb-2.5 font-medium text-[var(--color-dimmer)]">OUTPUT</th>
                  </tr>
                </thead>
                <tbody>
                  {TOOLS.map((t) => (
                    <tr key={t.tool} className="group border-b border-[var(--color-line)]">
                      <td className="py-2.5 pr-4 font-mono text-[0.75rem] whitespace-nowrap text-[#3be8c0]">
                        {t.tool}
                        {t.gate && (
                          <span className="ml-2 rounded-[3px] bg-[#ff6a2b]/15 px-1.5 py-0.5 text-[0.625rem] tracking-wide text-[#ff6a2b]">
                            APPROVAL
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 pr-4 text-[0.8125rem] text-[#9aa0b2]">{t.input}</td>
                      <td className="py-2.5 text-[0.8125rem] text-[#9aa0b2]">{t.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <CodeBlock
                label="runner request"
                tint="#6b5cff"
                code={`{
  "id": "step_123",
  "tool": "run_command",
  "project_id": "proj_abc",
  "cwd": ".",
  "command": "npm test",
  "timeout_ms": 120000,
  "permission_scope": "project.execute"
}`}
              />
              <CodeBlock
                label="runner response"
                tint="#cdff3e"
                code={`{
  "id": "step_123",
  "status": "completed",
  "exit_code": 0,
  "stdout": "48 passed",
  "stderr": "",
  "duration_ms": 18422
}`}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

function CodeBlock({ label, code, tint }: { label: string; code: string; tint: string }) {
  return (
    <figure className="overflow-hidden rounded-[10px] border border-[var(--color-line)] bg-[#06070a]">
      <figcaption
        className="mono-xs border-b border-[var(--color-line)] px-3 py-2"
        style={{ color: tint }}
      >
        {label}
      </figcaption>
      <pre className="scroll-thin overflow-x-auto p-3.5 font-mono text-[0.6875rem] leading-[1.7] text-[#9aa0b2]">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
