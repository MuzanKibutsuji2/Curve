"use client";

import { useState, type ReactNode } from "react";

export type Tab = { id: string; label: string; colour: string; node: ReactNode };

export function Tabs({ tabs, id }: { tabs: Tab[]; id?: string }) {
  const [active, setActive] = useState(0);
  const t = tabs[active];

  return (
    <div id={id}>
      {/* sticky so you can jump surfaces without scrolling back up */}
      <div className="sticky top-16 z-30 -mx-5 bg-[var(--color-ink-2)]/92 px-5 backdrop-blur-xl sm:mx-0 sm:px-0">
      <div
        role="tablist"
        aria-label="Platform areas"
        className="scroll-thin -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0"
      >
        {tabs.map((tab, i) => {
          const on = i === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className="group relative shrink-0 px-4 py-3 text-[0.875rem] whitespace-nowrap transition-colors"
              style={{ color: on ? "#fff" : "var(--color-dim)" }}
            >
              <span className="mono-xs mr-2" style={{ color: on ? tab.colour : "var(--color-dimmer)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {tab.label}
              <span
                className="absolute inset-x-2 bottom-0 h-[2px] rounded-full transition-transform duration-300 ease-out"
                style={{
                  background: tab.colour,
                  transform: on ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                }}
              />
            </button>
          );
        })}
      </div>

        <div className="h-px w-full bg-[var(--color-line)]" />
      </div>

      <div key={t.id} className="panel-in pt-10">
        {t.node}
      </div>
    </div>
  );
}
