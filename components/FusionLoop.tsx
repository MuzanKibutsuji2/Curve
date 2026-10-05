"use client";

import { useEffect, useMemo, useState } from "react";
import { ROSTER, fuse } from "@/lib/agents";
import { Sigil } from "./Sigil";
import { useInView } from "./motion";

const PAIRS = [
  ["forge", "beacon"],
  ["atlas", "ledger"],
  ["prism", "quill"],
  ["beacon", "quill", "ledger"],
];

type Phase = "show" | "fusing" | "done";
const DUR: Record<Phase, number> = { show: 1700, fusing: 980, done: 3000 };

export function FusionLoop() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("show");

  const parents = useMemo(
    () => PAIRS[idx].map((id) => ROSTER.find((a) => a.id === id)!),
    [idx],
  );
  const result = useMemo(() => fuse(parents), [parents]);

  useEffect(() => {
    if (!seen) return;
    const t = window.setTimeout(() => {
      if (phase === "show") setPhase("fusing");
      else if (phase === "fusing") setPhase("done");
      else {
        setIdx((i) => (i + 1) % PAIRS.length);
        setPhase("show");
      }
    }, DUR[phase]);
    return () => window.clearTimeout(t);
  }, [phase, seen]);

  const moving = phase !== "show";

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[14px] border border-[var(--color-line)] bg-[var(--color-ink-2)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--color-line)] px-4 py-2.5">
        <span className="mono-xs text-[var(--color-dimmer)]">fusion · live</span>
        <span className="flex gap-1">
          {PAIRS.map((_, i) => (
            <span
              key={i}
              className="h-[3px] w-5 rounded-full transition-colors duration-300"
              style={{ background: i === idx ? result.colours[0] : "var(--color-line-strong)" }}
            />
          ))}
        </span>
      </div>

      <div className="relative flex min-h-[188px] items-center justify-center px-5 py-8">
        {/* parents */}
        <div className="flex items-center gap-8 sm:gap-12">
          {parents.map((a, i) => {
            const centre = (parents.length - 1) / 2;
            const dx = (centre - i) * (parents.length === 2 ? 68 : 92);
            return (
              <div
                key={a.id}
                className="flex flex-col items-center transition-all duration-[760ms]"
                style={{
                  transform: moving ? `translateX(${dx}px) scale(0.45)` : "none",
                  opacity: moving ? 0 : 1,
                  transitionTimingFunction: "cubic-bezier(0.6,0,0.2,1)",
                }}
              >
                <Sigil seed={a.seed} colours={[a.colour]} size={50} animate={false} />
                <span className="mt-2 text-[0.8125rem] font-medium">{a.name}</span>
                <span className="mono-xs text-[var(--color-dimmer)]">{a.role}</span>
              </div>
            );
          })}
        </div>

        {phase === "fusing" && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="fuse-ring absolute h-16 w-16 rounded-full border-2"
              style={{ borderColor: result.colours[0] }}
            />
            <span
              className="fuse-ring absolute h-16 w-16 rounded-full border-2"
              style={{ borderColor: result.colours[1], animationDelay: "150ms" }}
            />
            {Array.from({ length: 12 }).map((_, i) => {
              const ang = (i / 12) * Math.PI * 2;
              return (
                <span
                  key={i}
                  className="spark absolute h-[4px] w-[4px] rounded-full"
                  style={{
                    background: result.colours[i % result.colours.length],
                    ["--dx" as string]: `${Math.cos(ang) * 105}px`,
                    ["--dy" as string]: `${Math.sin(ang) * 66}px`,
                    animationDelay: `${i * 20}ms`,
                  }}
                />
              );
            })}
          </div>
        )}

        {phase === "done" && (
          <div className="fuse-in absolute inset-0 flex flex-col items-center justify-center">
            <Sigil
              seed={result.seed}
              colours={result.colours}
              size={58}
              strokes={parents.length + 1}
            />
            <span className="mt-2.5 text-[1.1rem] font-semibold tracking-[-0.03em]">{result.name}</span>
            <span className="mono-xs text-[var(--color-dimmer)]">
              {parents.map((p) => p.name).join(" + ")}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-px border-t border-[var(--color-line)] bg-[var(--color-line)]">
        {[
          ["abilities", result.tools.length],
          ["memories", result.memory],
          ["workflows", result.workflows.length],
        ].map(([k, v], i) => (
          <div key={k as string} className="bg-[var(--color-ink-2)] px-4 py-3.5 text-center">
            <div
              className="text-[1.15rem] font-semibold tracking-[-0.03em] transition-colors duration-500"
              style={{ color: phase === "done" ? result.colours[i % result.colours.length] : "#4a4f5c" }}
            >
              {phase === "done" ? (v as number).toLocaleString() : "—"}
            </div>
            <div className="mono-xs mt-0.5 text-[var(--color-dimmer)]">{k as string}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
