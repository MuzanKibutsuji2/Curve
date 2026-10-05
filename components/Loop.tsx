"use client";

import { useEffect, useState } from "react";
import { HEX, LOOP } from "@/lib/content";

/* Catmull-Rom → cubic bezier so the nodes sit exactly on the curve. */
function spline(pts: [number, number][]) {
  const p = [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const [x3, y3] = p[i + 2];
    d += ` C${x1 + (x2 - x0) / 6} ${y1 + (y2 - y0) / 6}, ${x2 - (x3 - x1) / 6} ${y2 - (y3 - y1) / 6}, ${x2} ${y2}`;
  }
  return d;
}

const NODES: [number, number][] = [
  [46, 206],
  [268, 186],
  [490, 152],
  [712, 108],
  [934, 66],
  [1154, 34],
];

const PATH = spline(NODES);

export function Loop() {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (hold) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % LOOP.length), 3800);
    return () => window.clearInterval(id);
  }, [hold]);

  const stage = LOOP[active];
  const colour = HEX[stage.color];
  const pct = (active / (LOOP.length - 1)) * 100;

  return (
    <div onMouseLeave={() => setHold(false)}>
      {/* ── curve (md+) ── */}
      <div className="relative mt-14 hidden md:block">
        <svg viewBox="0 0 1200 250" className="w-full overflow-visible" fill="none">
          <defs>
            <linearGradient id="loop-ramp" x1="0" y1="250" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#cdff3e" />
              <stop offset="0.22" stopColor="#3be8c0" />
              <stop offset="0.46" stopColor="#6b5cff" />
              <stop offset="0.68" stopColor="#ff4d9e" />
              <stop offset="0.86" stopColor="#ff6a2b" />
              <stop offset="1" stopColor="#ffc83d" />
            </linearGradient>
          </defs>

          {/* rail */}
          <path d={PATH} stroke="rgba(255,255,255,0.11)" strokeWidth="1.5" />
          {/* progress */}
          <path
            d={PATH}
            pathLength={100}
            stroke="url(#loop-ramp)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${pct} 100`}
            className="transition-[stroke-dasharray] duration-700 ease-out"
          />

          {NODES.map(([x, y], i) => {
            const c = HEX[LOOP[i].color];
            const on = i === active;
            const past = i <= active;
            return (
              <g
                key={LOOP[i].key}
                onMouseEnter={() => {
                  setActive(i);
                  setHold(true);
                }}
                onClick={() => {
                  setActive(i);
                  setHold(true);
                }}
                className="cursor-pointer"
              >
                {/* hit area */}
                <rect x={x - 54} y={y - 44} width="108" height="92" fill="transparent" />
                {on && <circle cx={x} cy={y} r="17" fill={c} opacity="0.16" />}
                <circle
                  cx={x}
                  cy={y}
                  r={on ? 8 : 5.5}
                  fill={past ? c : "#14171e"}
                  stroke={past ? c : "rgba(255,255,255,0.22)"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                <text
                  x={x}
                  y={y + 34}
                  textAnchor="middle"
                  className="font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-300"
                  fill={on ? c : "#5d6273"}
                >
                  {LOOP[i].label}
                </text>
                <text
                  x={x}
                  y={y - 22}
                  textAnchor="middle"
                  className="font-mono text-[10px]"
                  fill={on ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.18)"}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── detail ── */}
      <div className="mt-10 grid gap-8 border-t border-[var(--color-line)] pt-8 md:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div key={stage.key}>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full" style={{ background: colour }} />
            <span className="eyebrow" style={{ color: colour }}>
              {String(active + 1).padStart(2, "0")} · {stage.label}
            </span>
          </div>
          <p className="h-title mt-4 max-w-[20ch] text-balance">{stage.line}</p>
        </div>
        <p className="max-w-[52ch] self-end text-[1.0625rem] leading-[1.62] text-[#b9bece]">{stage.detail}</p>
      </div>

      {/* ── mobile selector ── */}
      <div className="mt-8 flex flex-wrap gap-2 md:hidden">
        {LOOP.map((s, i) => (
          <button
            key={s.key}
            onClick={() => {
              setActive(i);
              setHold(true);
            }}
            className="rounded-full border px-3 py-1.5 transition-colors"
            style={{
              borderColor: i === active ? HEX[s.color] : "var(--color-line-strong)",
              color: i === active ? HEX[s.color] : "var(--color-dim)",
              background: i === active ? `color-mix(in oklab, ${HEX[s.color]} 12%, transparent)` : "transparent",
            }}
          >
            <span className="mono-xs">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
