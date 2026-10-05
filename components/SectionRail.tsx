"use client";

import { useEffect, useState } from "react";

/**
 * A fixed dot-rail so the whole page is reachable in one click instead of
 * thirty seconds of scrolling. Hidden below xl and for short viewports.
 */
export function SectionRail({ items }: { items: { id: string; label: string; colour: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => Boolean(e));
    if (!els.length) return;

    const onScroll = () => {
      const mid = window.innerHeight * 0.38;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= mid) current = el.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="pointer-events-auto flex flex-col items-end gap-1">
        {items.map((it) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className="group flex items-center justify-end gap-2.5 py-1"
                aria-current={on ? "true" : undefined}
              >
                <span
                  className="mono-xs translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  style={{ color: on ? it.colour : "var(--color-dim)" }}
                >
                  {it.label}
                </span>
                <span
                  className="block h-[2px] rounded-full transition-all duration-300 group-hover:w-6"
                  style={{
                    width: on ? "22px" : "10px",
                    background: on ? it.colour : "var(--color-dimmer)",
                    opacity: on ? 1 : 0.55,
                  }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
