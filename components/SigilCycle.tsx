"use client";

import { useEffect, useState } from "react";
import { DIALS, PERM_LABEL, ROSTER } from "@/lib/agents";
import { Sigil } from "./Sigil";
import { useInView } from "./motion";

/** Hero portrait: cycles the roster so you see what an agent *is* before reading about it. */
export function SigilCycle() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    const t = setInterval(() => setN((v) => v + 1), 2600);
    return () => clearInterval(t);
  }, [seen]);

  const a = ROSTER[n % ROSTER.length];

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[14px] border border-[var(--color-line)] bg-[var(--color-ink-2)]"
    >
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-30 blur-[70px] transition-[background] duration-700"
        style={{ background: `radial-gradient(circle, ${a.colour} 0%, transparent 70%)` }}
        aria-hidden
      />

      <div className="mono-xs flex items-center justify-between border-b border-[var(--color-line)] px-4 py-2.5">
        <span className="text-[var(--color-dimmer)]">agent card</span>
        <span className="flex gap-1" aria-hidden>
          {ROSTER.map((r, i) => (
            <span
              key={r.id}
              className="h-[3px] w-4 rounded-full transition-colors duration-500"
              style={{ background: i === n % ROSTER.length ? r.colour : "rgba(255,255,255,0.14)" }}
            />
          ))}
        </span>
      </div>

      <div className="relative px-6 py-8">
        <div key={a.id} className="fuse-in flex items-center gap-5">
          <Sigil seed={a.seed} colours={[a.colour]} size={76} strokes={4} />
          <div className="min-w-0">
            <div className="text-[1.5rem] leading-none font-semibold tracking-[-0.04em]">{a.name}</div>
            <div className="mono-xs mt-2" style={{ color: a.colour }}>
              {a.handle} · {a.role}
            </div>
          </div>
        </div>

        <p key={`${a.id}-p`} className="fuse-in serif mt-6 text-[1.25rem] leading-[1.3] text-[#dfe2ea]">
          &ldquo;{a.persona}&rdquo;
        </p>

        <div key={`${a.id}-d`} className="fuse-in mt-6 grid gap-2">
          {DIALS.map((d) => (
            <div key={d.key} className="flex items-center gap-3">
              <span className="mono-xs w-[4.5rem] shrink-0 text-right text-[var(--color-dimmer)]">
                {d.key}
              </span>
              <span className="relative h-[3px] flex-1 rounded-full bg-white/10">
                <span
                  className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out"
                  style={{ width: `${a.disposition[d.key]}%`, background: a.colour }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mono-xs flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[var(--color-line)] px-4 py-3 text-[var(--color-dimmer)]">
        <span>{PERM_LABEL[a.perm]}</span>
        <span>·</span>
        <span>{a.tools.length} tools</span>
        <span>·</span>
        <span>{a.memory} memories</span>
        <span>·</span>
        <span>{a.version}</span>
      </div>
    </div>
  );
}
