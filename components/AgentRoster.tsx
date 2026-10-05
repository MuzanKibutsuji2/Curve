"use client";

import { useState } from "react";
import { DIALS, PERM_LABEL, ROSTER } from "@/lib/agents";
import { Sigil } from "./Sigil";
import { Dial, Spot } from "./motion";

export function AgentRoster() {
  const [open, setOpen] = useState<string | null>("forge");

  return (
    <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {ROSTER.map((a) => {
        const on = open === a.id;
        return (
            <Spot
            key={a.id}
            colour={a.colour}
            className="overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-ink-2)] transition-colors duration-300 hover:border-[var(--color-line-strong)]"
          >
            <button
              onClick={() => setOpen(on ? null : a.id)}
              aria-expanded={on}
              className="relative flex w-full flex-col p-6 text-left"
            >
              <div className="flex items-start gap-4">
                <Sigil seed={a.seed} colours={[a.colour]} size={52} animate={false} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="text-[1.125rem] font-semibold tracking-[-0.03em]">{a.name}</h3>
                    <span className="mono-xs text-[var(--color-dimmer)]">{a.handle}</span>
                  </div>
                  <div className="mono-xs mt-1" style={{ color: a.colour }}>
                    {a.role} · {a.version}
                  </div>
                </div>
                <span className="relative mt-2 h-3 w-3 shrink-0">
                  <span className="absolute top-1/2 left-0 h-px w-3 bg-[var(--color-dim)]" />
                  <span
                    className="absolute top-1/2 left-0 h-px w-3 bg-[var(--color-dim)] transition-transform duration-300"
                    style={{ transform: on ? "rotate(0deg)" : "rotate(90deg)" }}
                  />
                </span>
              </div>

              <p className="serif mt-4 text-[1.05rem] leading-[1.3] text-[#dfe2ea]">
                &ldquo;{a.persona}&rdquo;
              </p>

              <div
                className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <div className="mt-5 space-y-3.5 border-t border-[var(--color-line)] pt-4">
                    {DIALS.map((dial, i) => (
                      <Dial
                        key={dial.key}
                        value={a.disposition[dial.key]}
                        colour={a.colour}
                        low={dial.low}
                        high={dial.high}
                        delay={i * 70}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-[0.8125rem] leading-relaxed text-[#9aa0b2]">{a.instruction}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {a.tools.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="mono-xs rounded-[4px] px-1.5 py-1"
                    style={{ color: a.colour, background: `color-mix(in oklab, ${a.colour} 10%, transparent)` }}
                  >
                    {t}
                  </span>
                ))}
                {a.tools.length > 4 && (
                  <span className="mono-xs px-1 py-1 text-[var(--color-dimmer)]">
                    +{a.tools.length - 4}
                  </span>
                )}
              </div>

              <div className="mono-xs mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[var(--color-line)] pt-3.5 text-[var(--color-dimmer)]">
                <span>{PERM_LABEL[a.perm]}</span>
                <span>·</span>
                <span>{a.memory} memories</span>
                <span>·</span>
                <span>{a.workflows.length} workflows</span>
              </div>
            </button>
          </Spot>
        );
      })}
    </div>
  );
}
