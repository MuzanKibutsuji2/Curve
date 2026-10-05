"use client";

import { useId, useMemo } from "react";
import { hash } from "@/lib/agents";

/**
 * A procedural avatar. Every agent gets a unique knot of curves derived from
 * its name — on brand, deterministic, and it changes live as you rename.
 */

function rng(seed: number) {
  let s = seed || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function Sigil({
  seed,
  colours,
  size = 56,
  strokes = 3,
  animate = true,
  className = "",
}: {
  seed: string;
  colours: string[];
  size?: number;
  strokes?: number;
  animate?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const paths = useMemo(() => {
    const r = rng(hash(seed));
    return Array.from({ length: strokes }, (_, i) => {
      const y0 = 14 + r() * 36;
      const y1 = 14 + r() * 36;
      const c1x = 8 + r() * 22;
      const c1y = 4 + r() * 56;
      const c2x = 34 + r() * 22;
      const c2y = 4 + r() * 56;
      return {
        d: `M6 ${y0.toFixed(1)} C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, 58 ${y1.toFixed(1)}`,
        knot: { x: 22 + r() * 20, y: 16 + r() * 32 },
        w: 2 + r() * 1.6,
        i,
      };
    });
  }, [seed, strokes]);

  return (
    <svg
      key={seed}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sg-${uid}`} x1="4" y1="60" x2="60" y2="4" gradientUnits="userSpaceOnUse">
          {colours.length === 1 ? (
            <>
              <stop stopColor={colours[0]} stopOpacity="0.55" />
              <stop offset="1" stopColor={colours[0]} />
            </>
          ) : (
            colours.map((c, i) => (
              <stop key={i} offset={i / (colours.length - 1)} stopColor={c} />
            ))
          )}
        </linearGradient>
        <clipPath id={`cp-${uid}`}>
          <rect width="64" height="64" rx="15" />
        </clipPath>
      </defs>

      <g clipPath={`url(#cp-${uid})`}>
        <rect width="64" height="64" rx="15" fill="#0d0f14" />
        <rect width="64" height="64" rx="15" fill={colours[0]} fillOpacity="0.07" />
        {paths.map((p) => (
          <g key={p.i}>
            <path
              d={p.d}
              stroke={`url(#sg-${uid})`}
              strokeWidth={p.w}
              strokeLinecap="round"
              strokeOpacity={1 - p.i * 0.22}
              pathLength={100}
              strokeDasharray={animate ? "100 100" : undefined}
              style={
                animate
                  ? {
                      animation: `sigil-draw 900ms cubic-bezier(0.22,0.9,0.3,1) ${p.i * 110}ms forwards`,
                    }
                  : undefined
              }
            />
            <circle
              cx={p.knot.x}
              cy={p.knot.y}
              r={2.1 - p.i * 0.35}
              fill={colours[p.i % colours.length]}
              style={
                animate
                  ? { animation: `sigil-pop 420ms ease-out ${500 + p.i * 110}ms both` }
                  : undefined
              }
            />
          </g>
        ))}
      </g>
      <rect
        width="63"
        height="63"
        x="0.5"
        y="0.5"
        rx="14.5"
        stroke={colours[0]}
        strokeOpacity="0.3"
      />
    </svg>
  );
}
