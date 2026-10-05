"use client";

import { useMemo, useState } from "react";
import { DIALS, PERM_LABEL, PERM_ORDER, type DialKey, type Disposition, type Perm } from "@/lib/agents";
import { Sigil } from "./Sigil";

const SWATCH = ["#cdff3e", "#3be8c0", "#6b5cff", "#ff4d9e", "#ff6a2b", "#ffc83d"];

const ARCHETYPES = [
  { id: "planner", label: "Planner", d: { autonomy: 32, tone: 58, risk: 24, rigour: 78, scope: 70 }, perm: "read" as Perm },
  { id: "coder", label: "Coder", d: { autonomy: 64, tone: 28, risk: 46, rigour: 82, scope: 34 }, perm: "exec" as Perm },
  { id: "researcher", label: "Researcher", d: { autonomy: 48, tone: 74, risk: 30, rigour: 66, scope: 92 }, perm: "network" as Perm },
  { id: "reviewer", label: "Reviewer", d: { autonomy: 22, tone: 44, risk: 12, rigour: 96, scope: 28 }, perm: "read" as Perm },
  { id: "writer", label: "Writer", d: { autonomy: 56, tone: 88, risk: 38, rigour: 54, scope: 62 }, perm: "write" as Perm },
  { id: "analyst", label: "Data Analyst", d: { autonomy: 52, tone: 50, risk: 26, rigour: 90, scope: 44 }, perm: "exec" as Perm },
];

const TOOL_POOL = [
  "read_file",
  "write_file",
  "apply_edit",
  "search_files",
  "list_files",
  "run_command",
  "git_status",
  "git_diff",
  "create_commit",
  "browse",
];

/** Turn five numbers into a sentence a human can judge. */
function describe(d: Disposition) {
  const out: string[] = [];
  out.push(d.autonomy > 60 ? "Acts, then reports." : d.autonomy > 35 ? "Checks in at the risky steps." : "Asks before it moves.");
  out.push(d.tone > 65 ? "Explains its reasoning." : d.tone > 35 ? "Brief, but shows its work." : "Says the minimum.");
  out.push(d.risk > 60 ? "Decisive when the call is close." : d.risk > 30 ? "Weighs reversibility." : "Refuses anything it cannot undo.");
  out.push(d.rigour > 70 ? "Exhaustive about verification." : d.rigour > 40 ? "Verifies the parts that matter." : "Optimises for speed.");
  out.push(d.scope > 65 ? "Wanders usefully." : d.scope > 35 ? "Follows the thread one step out." : "Stays strictly in its lane.");
  return out;
}

export function AgentStudio() {
  const [name, setName] = useState("Nova");
  const [arch, setArch] = useState(1);
  const [colour, setColour] = useState(SWATCH[2]);
  const [reroll, setReroll] = useState(0);
  const [perm, setPerm] = useState<Perm>("exec");
  const [tools, setTools] = useState<string[]>(["read_file", "apply_edit", "run_command", "git_diff"]);
  const [d, setD] = useState<Disposition>(ARCHETYPES[1].d);

  const seed = `${name.trim().toLowerCase() || "unnamed"}-${ARCHETYPES[arch].id}-${reroll}`;
  const handle = "@" + (name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "unnamed");
  const traits = useMemo(() => describe(d), [d]);

  const card = useMemo(
    () =>
      JSON.stringify(
        {
          agent: name.trim() || "Unnamed",
          handle,
          role: ARCHETYPES[arch].label,
          permission_ceiling: `project.${perm}`,
          tools,
          disposition: d,
          memory_scope: "project",
          verification: d.rigour > 70 ? "strict" : d.rigour > 40 ? "standard" : "light",
          version: "v1",
        },
        null,
        2,
      ),
    [name, handle, arch, perm, tools, d],
  );

  return (
    <div className="grid gap-px overflow-hidden rounded-[14px] border border-[var(--color-line)] bg-[var(--color-line)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
      {/* ── controls ── */}
      <div className="bg-[var(--color-ink-2)] p-6 sm:p-8">
        <div className="eyebrow text-[var(--color-dimmer)]">Define</div>

        {/* name */}
        <label className="mt-6 block">
          <span className="mono-xs text-[var(--color-dimmer)]">NAME</span>
          <div className="mt-2 flex items-center gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 18))}
              placeholder="Name your agent"
              className="h-11 min-w-0 flex-1 rounded-[8px] border border-[var(--color-line-strong)] bg-[#06070a] px-3.5 text-[1rem] font-medium tracking-[-0.02em] text-white placeholder:text-[var(--color-dimmer)] focus:border-white/40 focus:outline-none"
            />
            <button
              onClick={() => setReroll((r) => r + 1)}
              className="flex h-11 shrink-0 items-center gap-2 rounded-[8px] border border-[var(--color-line-strong)] px-3.5 text-[0.8125rem] text-[var(--color-dim)] transition-colors hover:border-white/40 hover:text-white"
              title="Generate a different sigil"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M12 7a5 5 0 1 1-1.5-3.6M12 1v3.2H8.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sigil
            </button>
          </div>
          <span className="mono-xs mt-2 block text-[var(--color-dimmer)]">
            handle {handle} · the sigil is derived from the name, so it changes as you type
          </span>
        </label>

        {/* archetype */}
        <div className="mt-7">
          <span className="mono-xs text-[var(--color-dimmer)]">START FROM</span>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {ARCHETYPES.map((a, i) => (
              <button
                key={a.id}
                onClick={() => {
                  setArch(i);
                  setD(a.d);
                  setPerm(a.perm);
                }}
                className="rounded-full border px-3 py-1.5 text-[0.8125rem] transition-colors"
                style={{
                  borderColor: i === arch ? colour : "var(--color-line-strong)",
                  color: i === arch ? colour : "var(--color-dim)",
                  background: i === arch ? `color-mix(in oklab, ${colour} 12%, transparent)` : "transparent",
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* colour */}
        <div className="mt-7">
          <span className="mono-xs text-[var(--color-dimmer)]">ACCENT</span>
          <div className="mt-2.5 flex gap-2">
            {SWATCH.map((c) => (
              <button
                key={c}
                onClick={() => setColour(c)}
                aria-label={`Accent ${c}`}
                className="h-7 w-7 rounded-full transition-transform hover:scale-110"
                style={{
                  background: c,
                  boxShadow: c === colour ? `0 0 0 2px var(--color-ink), 0 0 0 3.5px ${c}` : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* dials */}
        <div className="mt-8">
          <span className="mono-xs text-[var(--color-dimmer)]">DISPOSITION</span>
          <div className="mt-4 space-y-5">
            {DIALS.map((dial) => (
              <div key={dial.key}>
                <div className="mono-xs flex items-center justify-between">
                  <span className="text-[var(--color-dim)]">{dial.low}</span>
                  <span style={{ color: colour }}>{d[dial.key as DialKey]}</span>
                  <span className="text-[var(--color-dim)]">{dial.high}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={d[dial.key as DialKey]}
                  onChange={(e) => setD({ ...d, [dial.key]: Number(e.target.value) })}
                  className="dial mt-2"
                  aria-label={`${dial.low} to ${dial.high}`}
                  style={{
                    ["--c" as string]: colour,
                    background: `linear-gradient(to right, ${colour} ${d[dial.key as DialKey]}%, var(--color-line) ${d[dial.key as DialKey]}%)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* tools */}
        <div className="mt-8">
          <span className="mono-xs text-[var(--color-dimmer)]">ALLOWED TOOLS · {tools.length}</span>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {TOOL_POOL.map((t) => {
              const on = tools.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => setTools(on ? tools.filter((x) => x !== t) : [...tools, t])}
                  className="mono-xs rounded-[5px] border px-2 py-1.5 transition-colors"
                  style={{
                    borderColor: on ? `color-mix(in oklab, ${colour} 45%, transparent)` : "var(--color-line)",
                    color: on ? colour : "var(--color-dimmer)",
                    background: on ? `color-mix(in oklab, ${colour} 10%, transparent)` : "transparent",
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* permission */}
        <div className="mt-8">
          <span className="mono-xs text-[var(--color-dimmer)]">PERMISSION CEILING</span>
          <div className="mt-2.5 grid grid-cols-5 gap-px overflow-hidden rounded-[8px] border border-[var(--color-line-strong)] bg-[var(--color-line)]">
            {PERM_ORDER.map((p) => (
              <button
                key={p}
                onClick={() => setPerm(p)}
                className="bg-[var(--color-ink-2)] px-1 py-2.5 text-center transition-colors"
                style={{ color: p === perm ? colour : "var(--color-dimmer)" }}
              >
                <span className="mono-xs">{p}</span>
              </button>
            ))}
          </div>
          <p className="mono-xs mt-2 text-[var(--color-dimmer)]">
            {PERM_LABEL[perm]} — the Runner still enforces it per call.
          </p>
        </div>
      </div>

      {/* ── live preview ── */}
      <div className="bg-[var(--color-ink-2)] p-6 sm:p-8">
        <div className="eyebrow text-[var(--color-dimmer)]">Live preview</div>

        <div
          className="mt-6 rounded-[12px] border p-5 transition-colors duration-300"
          style={{
            borderColor: `color-mix(in oklab, ${colour} 32%, transparent)`,
            background: `color-mix(in oklab, ${colour} 5%, transparent)`,
          }}
        >
          <div className="flex items-start gap-4">
            <Sigil seed={seed} colours={[colour]} size={62} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2.5">
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.03em]">
                  {name.trim() || "Unnamed"}
                </h3>
                <span className="mono-xs text-[var(--color-dimmer)]">{handle}</span>
              </div>
              <div className="mono-xs mt-1" style={{ color: colour }}>
                {ARCHETYPES[arch].label} · {PERM_LABEL[perm].toLowerCase()} · v1
              </div>
            </div>
          </div>

          <ul className="mt-5 space-y-1.5 border-t border-[var(--color-line)] pt-4">
            {traits.map((t) => (
              <li key={t} className="flex gap-2.5 text-[0.875rem] leading-snug text-[#cfd3de]">
                <span className="mt-[8px] h-[3px] w-[3px] shrink-0 rounded-full" style={{ background: colour }} />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[var(--color-line)] pt-4">
            {tools.length === 0 ? (
              <span className="mono-xs text-[var(--color-dimmer)]">no tools — this agent can only think</span>
            ) : (
              tools.map((t) => (
                <span
                  key={t}
                  className="mono-xs rounded-[4px] px-1.5 py-1"
                  style={{ color: colour, background: `color-mix(in oklab, ${colour} 11%, transparent)` }}
                >
                  {t}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="mono-xs mt-6 mb-2 text-[var(--color-dimmer)]">AGENT CARD · saved as structured data</div>
        <pre className="scroll-thin max-h-[420px] overflow-auto rounded-[10px] border border-[var(--color-line)] bg-[#06070a] p-4 font-mono text-[0.6875rem] leading-[1.7] text-[#9aa0b2]">
          <code>{card}</code>
        </pre>

        <p className="mt-4 text-[0.8125rem] leading-relaxed text-[var(--color-dimmer)]">
          Agents are versioned records, not prompts in a text box. Change one, and every workflow that
          references it shows the diff before it runs.
        </p>
      </div>
    </div>
  );
}
