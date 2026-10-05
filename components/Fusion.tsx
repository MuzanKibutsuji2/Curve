"use client";

import { useEffect, useMemo, useState } from "react";
import { DIALS, PERM_LABEL, ROSTER, fuse, type Agent } from "@/lib/agents";
import { Sigil } from "./Sigil";
import { CountUp, Dial } from "./motion";

type Phase = "pick" | "fusing" | "done";

export function Fusion() {
  const [picked, setPicked] = useState<string[]>(["forge", "beacon"]);
  const [phase, setPhase] = useState<Phase>("pick");
  const [renamed, setRenamed] = useState<string | null>(null);

  const parents = useMemo(
    () => picked.map((id) => ROSTER.find((a) => a.id === id)!).filter(Boolean),
    [picked],
  );
  const result = useMemo(() => (parents.length >= 2 ? fuse(parents) : null), [parents]);

  useEffect(() => {
    if (phase !== "fusing") return;
    const t = window.setTimeout(() => setPhase("done"), 980);
    return () => window.clearTimeout(t);
  }, [phase]);

  function toggle(id: string) {
    if (phase !== "pick") return;
    setPicked((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : p.length >= 3 ? [...p.slice(1), id] : [...p, id],
    );
  }

  const canFuse = parents.length >= 2;

  return (
    <div className="overflow-hidden rounded-[14px] border border-[var(--color-line)] bg-[var(--color-ink-2)]">
      {/* ── roster ── */}
      <div className="border-b border-[var(--color-line)] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="eyebrow text-[var(--color-dimmer)]">
            Select two or three · {parents.length} chosen
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPhase("pick");
                setRenamed(null);
              }}
              className="mono-xs rounded-full border border-[var(--color-line-strong)] px-3 py-1.5 text-[var(--color-dim)] transition-colors hover:border-white/40 hover:text-white"
              disabled={phase === "pick"}
              style={{ opacity: phase === "pick" ? 0.35 : 1 }}
            >
              unfuse
            </button>
            <button
              onClick={() => canFuse && setPhase("fusing")}
              disabled={!canFuse || phase !== "pick"}
              className="group relative inline-flex h-9 items-center gap-2 overflow-hidden rounded-full px-5 text-[0.8125rem] font-medium transition-opacity"
              style={{
                background: canFuse && phase === "pick" ? "#fff" : "var(--color-ink-3)",
                color: canFuse && phase === "pick" ? "#000" : "var(--color-dimmer)",
              }}
            >
              <span className="relative z-10">Fuse agents</span>
              {canFuse && phase === "pick" && (
                <span className="ramp-line absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-6">
          {ROSTER.map((a) => {
            const on = picked.includes(a.id);
            return (
              <button
                key={a.id}
                onClick={() => toggle(a.id)}
                className="group flex items-center gap-2.5 rounded-[9px] border p-2.5 text-left transition-all duration-300"
                style={{
                  borderColor: on ? `color-mix(in oklab, ${a.colour} 55%, transparent)` : "var(--color-line)",
                  background: on ? `color-mix(in oklab, ${a.colour} 9%, transparent)` : "transparent",
                  opacity: phase !== "pick" && !on ? 0.3 : 1,
                }}
              >
                <Sigil seed={a.seed} colours={[a.colour]} size={30} animate={false} />
                <span className="min-w-0">
                  <span className="block truncate text-[0.8125rem] font-medium">{a.name}</span>
                  <span className="mono-xs block truncate text-[var(--color-dimmer)]">{a.role}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── stage ── */}
      <div className="relative min-h-[150px] overflow-hidden px-5 py-9 sm:px-6">
        <div className="relative flex items-center justify-center gap-7 sm:gap-12">
          {parents.map((a, i) => {
            const centre = (parents.length - 1) / 2;
            const dx = (centre - i) * (parents.length === 2 ? 70 : 96);
            const moving = phase !== "pick";
            return (
              <div
                key={a.id}
                className="flex flex-col items-center transition-all duration-[760ms]"
                style={{
                  transform: moving ? `translateX(${dx}px) scale(0.5)` : "none",
                  opacity: moving ? 0 : 1,
                  transitionTimingFunction: "cubic-bezier(0.6,0,0.2,1)",
                }}
              >
                <Sigil seed={a.seed} colours={[a.colour]} size={54} animate={false} />
                <span className="mt-2 text-[0.8125rem] font-medium">{a.name}</span>
                <span className="mono-xs text-[var(--color-dimmer)]">{a.role}</span>
              </div>
            );
          })}

          {parents.length < 2 && (
            <p className="mono-xs text-[var(--color-dimmer)]">pick at least two agents to fuse</p>
          )}
        </div>

        {phase === "pick" && parents.length >= 2 && (
          <p className="mono-xs mt-7 text-center text-[var(--color-dimmer)]">
            {parents.map((a) => a.name).join(" + ")} &rarr; press{" "}
            <span className="text-white">Fuse agents</span>
          </p>
        )}

        {/* burst */}
        {phase === "fusing" && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="fuse-ring absolute h-20 w-20 rounded-full border-2"
              style={{ borderColor: result?.colours[0] ?? "#fff" }}
            />
            <span
              className="fuse-ring absolute h-20 w-20 rounded-full border-2"
              style={{ borderColor: result?.colours[1] ?? "#fff", animationDelay: "140ms" }}
            />
            {Array.from({ length: 14 }).map((_, i) => {
              const ang = (i / 14) * Math.PI * 2;
              return (
                <span
                  key={i}
                  className="spark absolute h-[5px] w-[5px] rounded-full"
                  style={{
                    background: (result?.colours ?? ["#fff"])[i % (result?.colours.length ?? 1)],
                    ["--dx" as string]: `${Math.cos(ang) * 120}px`,
                    ["--dy" as string]: `${Math.sin(ang) * 80}px`,
                    animationDelay: `${i * 18}ms`,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* composite head */}
        {phase === "done" && result && (
          <div className="fuse-in absolute inset-0 flex flex-col items-center justify-center">
            <Sigil seed={result.seed} colours={result.colours} size={66} strokes={result.parents.length + 1} />
            <div className="mt-3 flex items-center gap-2">
              <input
                value={renamed ?? result.name}
                onChange={(e) => setRenamed(e.target.value.slice(0, 18))}
                className="w-[9ch] border-b border-dashed border-[var(--color-line-strong)] bg-transparent text-center text-[1.15rem] font-semibold tracking-[-0.03em] focus:border-white focus:outline-none"
                aria-label="Rename the composite agent"
              />
              <span className="mono-xs text-[var(--color-dimmer)]">editable</span>
            </div>
            <span className="mono-xs mt-1 text-[var(--color-dimmer)]">
              {result.parents.map((p) => p.name).join(" + ")}
            </span>
          </div>
        )}
      </div>

      {/* ── merge report ── */}
      {phase === "done" && result && (
        <div className="fuse-in grid gap-px border-t border-[var(--color-line)] bg-[var(--color-line)] lg:grid-cols-3">
          {/* abilities */}
          <div className="bg-[var(--color-ink-2)] p-5 sm:p-6">
            <div className="eyebrow text-[var(--color-dimmer)]">Abilities · union</div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {result.tools.map((t) => (
                <span
                  key={t.tool}
                  className="mono-xs flex items-center gap-1.5 rounded-[5px] border border-[var(--color-line)] px-2 py-1.5 text-[#cfd3de]"
                  title={`from ${t.from.join(", ")}`}
                >
                  {t.tool}
                  <span className="flex gap-[3px]">
                    {t.from.map((f) => {
                      const p = result.parents.find((x) => x.name === f)!;
                      return (
                        <span key={f} className="h-[5px] w-[5px] rounded-full" style={{ background: p.colour }} />
                      );
                    })}
                  </span>
                </span>
              ))}
            </div>
            <p className="mono-xs mt-4 text-[var(--color-dimmer)]">
              dots show which parent contributed each tool
            </p>

            <div className="mt-6 border-t border-[var(--color-line)] pt-4">
              <div className="eyebrow text-[var(--color-dimmer)]">Permission ceiling</div>
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full bg-[#ff6a2b]/14 px-3 py-1 text-[0.8125rem] text-[#ff6a2b]">
                  {PERM_LABEL[result.perm]}
                </span>
                <span className="mono-xs text-[var(--color-dimmer)]">{result.permReason}</span>
              </div>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-[#9aa0b2]">
                Fusion never escalates privilege. The composite inherits the{" "}
                <strong className="font-medium text-white">most restrictive</strong> parent ceiling until
                you widen it on purpose.
              </p>
            </div>
          </div>

          {/* memory + workflows */}
          <div className="bg-[var(--color-ink-2)] p-5 sm:p-6">
            <div className="eyebrow text-[var(--color-dimmer)]">Memory · reconciled</div>
            <div className="mt-4 flex items-end gap-2">
              <CountUp to={result.memory} className="text-[2.4rem] leading-none font-semibold tracking-[-0.045em]" />
              <span className="mono-xs pb-1.5 text-[var(--color-dimmer)]">items</span>
            </div>
            <div className="mono-xs mt-2 text-[var(--color-dimmer)]">
              {result.parents.map((p) => `${p.name} ${p.memory}`).join(" + ")} −{" "}
              <span className="text-[#ffc83d]">{result.memoryOverlap} duplicates</span>
            </div>
            <div className="mt-4 flex h-[6px] overflow-hidden rounded-full">
              {result.parents.map((p) => (
                <span
                  key={p.id}
                  style={{
                    background: p.colour,
                    width: `${(p.memory / result.parents.reduce((s, x) => s + x.memory, 0)) * 100}%`,
                  }}
                />
              ))}
            </div>

            <div className="mt-6 border-t border-[var(--color-line)] pt-4">
              <div className="eyebrow text-[var(--color-dimmer)]">
                Workflows · {result.workflows.length} inherited
              </div>
              <ul className="mt-3 space-y-0">
                {result.workflows.map((w) => {
                  const p = result.parents.find((x) => x.name === w.from)!;
                  return (
                    <li
                      key={w.name}
                      className="flex items-center gap-2.5 border-b border-[var(--color-line)] py-2 last:border-0"
                    >
                      <span className="h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: p.colour }} />
                      <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-[#cfd3de]">{w.name}</span>
                      <span className="mono-xs shrink-0 text-[var(--color-dimmer)]">{w.from}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* disposition + conflicts */}
          <div className="bg-[var(--color-ink-2)] p-5 sm:p-6">
            <div className="eyebrow text-[var(--color-dimmer)]">Disposition · blended</div>
            <div className="mt-4 space-y-4">
              {DIALS.map((dial, i) => (
                <Dial
                  key={dial.key}
                  value={result.disposition[dial.key]}
                  colour={result.colours[i % result.colours.length]}
                  low={dial.low}
                  high={dial.high}
                  delay={i * 90}
                />
              ))}
            </div>

            <div className="mt-6 border-t border-[var(--color-line)] pt-4">
              <div className="eyebrow text-[var(--color-dimmer)]">Reconciliation</div>
              <ul className="mt-3 space-y-3">
                {result.conflicts.map((c) => (
                  <li key={c.field}>
                    <span className="mono-xs text-[#ffc83d]">{c.field}</span>
                    <p className="mt-1 text-[0.8125rem] leading-snug text-[#9aa0b2]">{c.detail}</p>
                  </li>
                ))}
                <li>
                  <span className="mono-xs text-[#3be8c0]">Lineage kept</span>
                  <p className="mt-1 text-[0.8125rem] leading-snug text-[#9aa0b2]">
                    Parents stay intact and versioned. Unfuse at any time, or fork the composite and keep
                    both.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
