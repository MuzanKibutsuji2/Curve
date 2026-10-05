import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Words } from "./motion";

export function SectionHead({
  n,
  eyebrow,
  title,
  lede,
  light = false,
  align = "left",
}: {
  n: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  light?: boolean;
  align?: "left" | "split";
}) {
  const dim = light ? "text-[#6f6a5e]" : "text-[var(--color-dimmer)]";
  const body = light ? "text-[#45413a]" : "text-[#b9bece]";

  return (
    <Reveal>
      <div className={`flex items-center gap-3 ${light ? "border-[#08090c]/15" : ""}`}>
        <span className={`mono-xs ${dim}`}>{n}</span>
        <span className={`h-px flex-1 ${light ? "bg-[#08090c]/15" : "bg-[var(--color-line)]"}`} />
        <span className={`eyebrow ${dim}`}>{eyebrow}</span>
      </div>

      <div
        className={
          align === "split"
            ? "mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"
            : "mt-8"
        }
      >
        <Words as="h2" className="h-display block max-w-[18ch] text-balance" stagger={38}>
          {title}
        </Words>
        {lede && (
          <p className={`max-w-[54ch] text-[1.0625rem] leading-[1.62] ${body} ${align === "split" ? "" : "mt-5"}`}>
            {lede}
          </p>
        )}
      </div>
    </Reveal>
  );
}

export function Shell({
  id,
  children,
  light = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 ${light ? "bg-[var(--color-paper)] text-[#08090c]" : ""} ${className}`}
    >
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28">{children}</div>
    </section>
  );
}
