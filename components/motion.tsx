"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/* ─────────────── useInView ─────────────── */

export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    // if it is already on screen at mount, skip the observer entirely
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, seen };
}

/* ─────────────── Words: headline reveal ─────────────── */

/**
 * Splits children text into words and lifts them in on a stagger.
 * Accepts marked-up children by walking only top-level strings.
 */
export function Words({
  children,
  className = "",
  as: Tag = "span",
  stagger = 42,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  stagger?: number;
  delay?: number;
}) {
  const { ref, seen } = useInView<HTMLElement>();
  let i = 0;

  // The reveal is driven by one class on the wrapper (`.words.in`) rather than
  // per-word state, so nested markup inside the headline animates too.
  const walk = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      return node.split(/(\s+)/).map((chunk, k) => {
        if (!chunk.trim()) return chunk;
        const idx = i++;
        return (
          <span key={`${idx}-${k}`} className="word" style={{ animationDelay: `${delay + idx * stagger}ms` }}>
            {chunk}
          </span>
        );
      });
    }
    if (Array.isArray(node)) return node.map((n, k) => <span key={k}>{walk(n)}</span>);
    if (node && typeof node === "object" && "props" in (node as never)) {
      const el = node as React.ReactElement<{ children?: ReactNode }>;
      const kids = el.props?.children;
      if (kids !== undefined) {
        const Cloned = el.type as ElementType;
        const { children: _c, ...rest } = el.props as { children?: ReactNode; className?: string };
        // gradient text clips its background to the span itself — splitting it
        // into child spans would leave them transparent, so lift it as one unit
        if (typeof rest.className === "string" && rest.className.includes("ramp-text")) {
          const idx = i++;
          return (
            <span key={`ramp-${idx}`} className="word" style={{ animationDelay: `${delay + idx * stagger}ms` }}>
              <Cloned {...rest}>{kids}</Cloned>
            </span>
          );
        }
        return <Cloned {...rest}>{walk(kids)}</Cloned>;
      }
    }
    return node;
  };

  return (
    <Tag ref={ref} className={`words ${seen ? "in" : ""} ${className}`}>
      {walk(children)}
    </Tag>
  );
}

/* ─────────────── Spotlight card ─────────────── */

export function Spot({
  children,
  colour = "#6b5cff",
  className = "",
}: {
  children: ReactNode;
  colour?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`spot ${className}`}
      style={{ ["--spot" as string]: colour }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────── CountUp ─────────────── */

export function CountUp({
  to,
  duration = 1100,
  className = "",
  suffix = "",
}: {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
}) {
  const { ref, seen } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);

  return (
    <span ref={ref} className={className}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─────────────── Scroll progress ─────────────── */

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return (
    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-transparent">
      <div className="ramp-line h-full transition-[width] duration-150 ease-out" style={{ width: `${p}%` }} />
    </div>
  );
}

/* ─────────────── Dial (animated bar) ─────────────── */

export function Dial({
  value,
  colour,
  low,
  high,
  delay = 0,
}: {
  value: number;
  colour: string;
  low: string;
  high: string;
  delay?: number;
}) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="mono-xs flex items-center justify-between text-[var(--color-dimmer)]">
        <span>{low}</span>
        <span>{high}</span>
      </div>
      <div className="relative mt-1.5 h-[3px] rounded-full bg-[var(--color-line)]">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-[900ms] ease-out"
          style={{
            width: seen ? `${value}%` : "0%",
            background: colour,
            transitionDelay: `${delay}ms`,
          }}
        />
        <span
          className="absolute top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-ink)] transition-[left] duration-[900ms] ease-out"
          style={{ left: seen ? `${value}%` : "0%", background: colour, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}
