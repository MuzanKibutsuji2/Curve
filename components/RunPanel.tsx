"use client";

import { useEffect, useMemo, useState } from "react";

/* ───────────────────────── script ───────────────────────── */

type Risk = "low" | "project_write" | "project_execute" | "external_write";

type Action =
  | { k: "state"; v: string; d: number }
  | { k: "step"; id: string; desc: string; tool: string; risk: Risk; d: number }
  | { k: "mark"; id: string; v: "run" | "ok" | "gate"; d: number }
  | { k: "log"; v: string; tone?: "dim" | "ok" | "warn" | "hot"; d: number }
  | { k: "approval"; d: number }
  | { k: "approved"; d: number }
  | { k: "artifact"; name: string; meta: string; d: number };

const GOAL = "Fix the login bug, run the tests, and show me what changed.";

const SCRIPT: Action[] = [
  { k: "state", v: "PLANNING", d: 620 },
  { k: "log", v: "intake · classified as coding task", tone: "dim", d: 420 },
  { k: "log", v: "context · loaded 6 files, 2 memory items", tone: "dim", d: 520 },
  { k: "step", id: "1", desc: "Inspect auth code", tool: "search_files", risk: "low", d: 230 },
  { k: "step", id: "2", desc: "Reproduce the failure", tool: "run_command", risk: "project_execute", d: 230 },
  { k: "step", id: "3", desc: "Apply minimal fix", tool: "apply_edit", risk: "project_write", d: 230 },
  { k: "step", id: "4", desc: "Run test suite", tool: "run_command", risk: "project_execute", d: 230 },
  { k: "step", id: "5", desc: "Review diff", tool: "git_diff", risk: "low", d: 230 },
  { k: "step", id: "6", desc: "Create commit", tool: "create_commit", risk: "external_write", d: 480 },

  { k: "state", v: "EXECUTING", d: 420 },
  { k: "mark", id: "1", v: "run", d: 540 },
  { k: "log", v: "search_files  'session|token|signIn'  → 4 matches", d: 620 },
  { k: "mark", id: "1", v: "ok", d: 180 },

  { k: "mark", id: "2", v: "run", d: 420 },
  { k: "log", v: "$ npm test -- auth.spec.ts", d: 760 },
  { k: "log", v: "✗ 1 failing — expected 200, received 401", tone: "hot", d: 560 },
  { k: "mark", id: "2", v: "ok", d: 220 },

  { k: "mark", id: "3", v: "run", d: 380 },
  { k: "log", v: "apply_edit  src/auth/session.ts  (+6 −3)", d: 700 },
  { k: "mark", id: "3", v: "ok", d: 200 },

  { k: "mark", id: "4", v: "run", d: 380 },
  { k: "log", v: "$ npm test", d: 820 },
  { k: "log", v: "✓ 48 passed · 0 failed · 11.4s", tone: "ok", d: 560 },
  { k: "mark", id: "4", v: "ok", d: 220 },

  { k: "state", v: "VERIFYING", d: 480 },
  { k: "mark", id: "5", v: "run", d: 420 },
  { k: "log", v: "verifier · expected outcome matches observed state", tone: "ok", d: 620 },
  { k: "mark", id: "5", v: "ok", d: 240 },

  { k: "state", v: "WAITING_APPROVAL", d: 260 },
  { k: "mark", id: "6", v: "gate", d: 200 },
  { k: "approval", d: 2600 },
  { k: "approved", d: 420 },
  { k: "log", v: "create_commit  a3f91c2  'fix(auth): refresh expired session token'", tone: "ok", d: 700 },
  { k: "mark", id: "6", v: "ok", d: 260 },

  { k: "state", v: "COMPLETED", d: 300 },
  { k: "artifact", name: "src/auth/session.ts", meta: "+6 −3", d: 220 },
  { k: "artifact", name: "run-2041.diff", meta: "1.2 KB", d: 220 },
  { k: "artifact", name: "test-report.json", meta: "48 passed", d: 3400 },
];

const RISK_COLOR: Record<Risk, string> = {
  low: "#3be8c0",
  project_write: "#ffc83d",
  project_execute: "#6b5cff",
  external_write: "#ff6a2b",
};

const STATE_COLOR: Record<string, string> = {
  QUEUED: "#5d6273",
  PLANNING: "#3be8c0",
  EXECUTING: "#6b5cff",
  VERIFYING: "#ffc83d",
  WAITING_APPROVAL: "#ff6a2b",
  COMPLETED: "#cdff3e",
};

/* ───────────────────────── derive ───────────────────────── */

function derive(upTo: number) {
  const steps: { id: string; desc: string; tool: string; risk: Risk; mark: "idle" | "run" | "ok" | "gate" }[] = [];
  const logs: { v: string; tone?: string }[] = [];
  const artifacts: { name: string; meta: string }[] = [];
  let state = "QUEUED";
  let approval = false;
  let approved = false;

  for (let i = 0; i < upTo; i++) {
    const a = SCRIPT[i];
    if (!a) break;
    switch (a.k) {
      case "state":
        state = a.v;
        break;
      case "step":
        steps.push({ id: a.id, desc: a.desc, tool: a.tool, risk: a.risk, mark: "idle" });
        break;
      case "mark": {
        const s = steps.find((x) => x.id === a.id);
        if (s) s.mark = a.v;
        break;
      }
      case "log":
        logs.push({ v: a.v, tone: a.tone });
        break;
      case "approval":
        approval = true;
        break;
      case "approved":
        approval = false;
        approved = true;
        break;
      case "artifact":
        artifacts.push({ name: a.name, meta: a.meta });
        break;
    }
  }
  return { steps, logs, artifacts, state, approval, approved };
}

/* ───────────────────────── component ───────────────────────── */

export function RunPanel() {
  const [cycle, setCycle] = useState(0);
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
  }, []);

  /* type the goal, then run the script */
  useEffect(() => {
    if (reduced) {
      setTyped(GOAL);
      setI(SCRIPT.length);
      return;
    }
    setTyped("");
    setI(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setTyped(GOAL.slice(0, n));
      if (n >= GOAL.length) window.clearInterval(id);
    }, 26);
    return () => window.clearInterval(id);
  }, [cycle, reduced]);

  useEffect(() => {
    if (reduced) return;
    if (typed.length < GOAL.length) return;
    if (i >= SCRIPT.length) {
      const id = window.setTimeout(() => setCycle((c) => c + 1), 3200);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setI((v) => v + 1), SCRIPT[i].d);
    return () => window.clearTimeout(id);
  }, [i, typed, reduced]);

  const { steps, logs, artifacts, state, approval, approved } = useMemo(() => derive(i), [i]);
  const done = state === "COMPLETED";
  const progress = Math.min(100, Math.round((i / SCRIPT.length) * 100));

  return (
    <div className="relative overflow-hidden rounded-[14px] border border-[var(--color-line-strong)] bg-[var(--color-ink-2)] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
      {/* top ramp progress */}
      <div className="absolute inset-x-0 top-0 z-10 h-[2px] bg-[var(--color-line)]">
        <div className="ramp-line h-full transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* chrome */}
      <div className="flex items-center gap-3 border-b border-[var(--color-line)] px-4 py-2.5">
        <div className="flex gap-[6px]">
          <span className="h-[9px] w-[9px] rounded-full bg-[#30333c]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#30333c]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#30333c]" />
        </div>
        <span className="mono-xs truncate text-[var(--color-dimmer)]">
          curve · <span className="text-[var(--color-dim)]">atlas-dashboard</span> / run 2041
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="h-[6px] w-[6px] rounded-full bg-[#cdff3e]" />
          <span className="mono-xs hidden text-[var(--color-dim)] sm:inline">Runner connected</span>
        </span>
      </div>

      <div className="grid lg:grid-cols-[150px_minmax(0,1fr)_236px]">
        {/* left rail */}
        <aside className="hidden flex-col gap-0.5 border-r border-[var(--color-line)] p-3 lg:flex">
          {["Overview", "Files", "Runs", "Agents", "Workflows", "Settings"].map((x, n) => (
            <span
              key={x}
              className={`rounded-[5px] px-2.5 py-[7px] text-[0.75rem] ${
                n === 2 ? "bg-[var(--color-ink-3)] text-white" : "text-[var(--color-dimmer)]"
              }`}
            >
              {x}
            </span>
          ))}
          <div className="mt-auto space-y-2 pt-6">
            <div className="mono-xs text-[var(--color-dimmer)]">PROJECT SCOPE</div>
            <div className="mono-xs leading-relaxed text-[var(--color-dim)]">~/dev/atlas</div>
            <div className="mono-xs text-[#cdff3e]">read · write · exec</div>
          </div>
        </aside>

        {/* center: conversation + timeline */}
        <div className="min-w-0 border-[var(--color-line)] p-4 sm:p-5 lg:border-r">
          {/* goal */}
          <div className="flex gap-3">
            <span className="mono-xs mt-[3px] shrink-0 text-[var(--color-dimmer)]">YOU</span>
            <p className="text-[0.9375rem] leading-snug text-white">
              {typed}
              {typed.length < GOAL.length && <span className="blink">▍</span>}
            </p>
          </div>

          {/* state pill */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span
              className="mono-xs rounded-full px-2.5 py-1"
              style={{
                color: STATE_COLOR[state],
                background: `color-mix(in oklab, ${STATE_COLOR[state]} 14%, transparent)`,
                border: `1px solid color-mix(in oklab, ${STATE_COLOR[state]} 35%, transparent)`,
              }}
            >
              {state}
            </span>
            {steps.length > 0 && (
              <span className="mono-xs text-[var(--color-dimmer)]">
                {steps.filter((s) => s.mark === "ok").length}/{steps.length} steps
              </span>
            )}
            {done && <span className="mono-xs text-[#cdff3e]">verified · 41.8s</span>}
          </div>

          {/* plan steps */}
          <ol className="mt-4 space-y-px">
            {steps.map((s) => (
              <li
                key={s.id}
                className="flex items-center gap-3 border-b border-[var(--color-line)] py-2 last:border-0"
              >
                <StepDot mark={s.mark} />
                <span
                  className={`min-w-0 flex-1 truncate text-[0.8125rem] ${
                    s.mark === "idle" ? "text-[var(--color-dimmer)]" : "text-[#dfe2ea]"
                  }`}
                >
                  {s.desc}
                </span>
                <code
                  className="mono-xs hidden shrink-0 rounded-[4px] px-1.5 py-0.5 sm:block"
                  style={{
                    color: RISK_COLOR[s.risk],
                    background: `color-mix(in oklab, ${RISK_COLOR[s.risk]} 11%, transparent)`,
                  }}
                >
                  {s.tool}
                </code>
              </li>
            ))}
          </ol>

          {/* approval card */}
          <div
            className={`grid transition-all duration-500 ${
              approval ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="rounded-[10px] border border-[#ff6a2b]/45 bg-[#ff6a2b]/[0.07] p-3.5">
                <div className="mono-xs mb-2 text-[#ff6a2b]">APPROVAL REQUIRED · EXTERNAL WRITE</div>
                <p className="text-[0.8125rem] leading-snug text-[#f0e6df]">
                  Curve wants to <strong className="font-semibold text-white">create a commit</strong> in{" "}
                  <code className="font-mono text-[0.75rem] text-[#ffc8a8]">~/dev/atlas</code> on branch{" "}
                  <code className="font-mono text-[0.75rem] text-[#ffc8a8]">fix/session-expiry</code>.
                </p>
                <p className="mt-1.5 text-[0.75rem] text-[var(--color-dim)]">
                  Impact: 1 file, reversible with <span className="font-mono">git reset</span>. Nothing is pushed.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-[0.75rem] font-medium text-black">
                    Allow once
                  </span>
                  <span className="rounded-full border border-[var(--color-line-strong)] px-3 py-1 text-[0.75rem] text-[var(--color-dim)]">
                    Allow for workflow
                  </span>
                  <span className="rounded-full border border-[var(--color-line-strong)] px-3 py-1 text-[0.75rem] text-[var(--color-dim)]">
                    Deny
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* log stream */}
          <div className="scroll-thin mt-4 max-h-[132px] overflow-y-auto rounded-[8px] border border-[var(--color-line)] bg-[#06070a] p-3">
            {logs.length === 0 ? (
              <div className="mono-xs text-[var(--color-dimmer)]">waiting for runner…</div>
            ) : (
              logs.map((l, n) => (
                <div
                  key={n}
                  className="mono-xs py-[2px] leading-relaxed"
                  style={{
                    color:
                      l.tone === "ok"
                        ? "#cdff3e"
                        : l.tone === "hot"
                          ? "#ff6a7e"
                          : l.tone === "dim"
                            ? "#5d6273"
                            : "#9aa0b2",
                  }}
                >
                  {l.v}
                </div>
              ))
            )}
          </div>
        </div>

        {/* right: artifacts + runner */}
        <aside className="border-t border-[var(--color-line)] p-4 lg:border-t-0">
          <div className="mono-xs mb-2.5 text-[var(--color-dimmer)]">ARTIFACTS</div>
          {artifacts.length === 0 ? (
            <div className="mono-xs text-[var(--color-dimmer)]">none yet</div>
          ) : (
            <ul className="space-y-1.5">
              {artifacts.map((a) => (
                <li
                  key={a.name}
                  className="flex items-center justify-between gap-2 rounded-[6px] border border-[var(--color-line)] bg-[var(--color-ink-3)] px-2.5 py-2"
                >
                  <span className="mono-xs truncate text-[#dfe2ea]">{a.name}</span>
                  <span className="mono-xs shrink-0 text-[var(--color-dimmer)]">{a.meta}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mono-xs mt-6 mb-2.5 text-[var(--color-dimmer)]">DIFF</div>
          <pre className="scroll-thin overflow-x-auto rounded-[6px] border border-[var(--color-line)] bg-[#06070a] p-2.5 font-mono text-[0.6875rem] leading-[1.55]">
            {approved || done ? (
              <code>
                <span className="text-[#5d6273]">@@ session.ts</span>
                {"\n"}
                <span className="text-[#ff6a7e]">- if (exp &lt; now)</span>
                {"\n"}
                <span className="text-[#ff6a7e]">-   return null;</span>
                {"\n"}
                <span className="text-[#9cff6b]">+ if (exp &lt; now) {"{"}</span>
                {"\n"}
                <span className="text-[#9cff6b]">+   return refresh(t);</span>
                {"\n"}
                <span className="text-[#9cff6b]">+ {"}"}</span>
              </code>
            ) : (
              <code className="text-[#2f3440]">awaiting changes…</code>
            )}
          </pre>

          <div className="mt-6 space-y-1.5">
            <div className="mono-xs text-[var(--color-dimmer)]">RUNNER</div>
            <div className="mono-xs text-[var(--color-dim)]">local · macOS · 0.3.1</div>
            <div className="mono-xs text-[var(--color-dim)]">network: allowlist only</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepDot({ mark }: { mark: "idle" | "run" | "ok" | "gate" }) {
  if (mark === "ok")
    return (
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#cdff3e]">
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
          <path d="M1.6 5.2L3.9 7.4L8.4 2.6" stroke="#08090c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  if (mark === "run")
    return (
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <span className="absolute h-4 w-4 animate-ping rounded-full bg-[#6b5cff]/40" />
        <span className="h-[7px] w-[7px] rounded-full bg-[#6b5cff]" />
      </span>
    );
  if (mark === "gate")
    return (
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#ff6a2b]">
        <span className="h-[5px] w-[5px] rounded-full bg-[#ff6a2b]" />
      </span>
    );
  return <span className="h-4 w-4 shrink-0 rounded-full border border-[var(--color-line-strong)]" />;
}
