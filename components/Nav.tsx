"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "./CurveMark";

const LINKS = [
  { href: "/#loop", label: "How it works" },
  { href: "/#runner", label: "Runner" },
  { href: "/#agents", label: "Agents" },
  { href: "/#workflows", label: "Workflows" },
  { href: "/#trust", label: "Permissions" },
  { href: "/#pricing", label: "Pricing" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid
            ? "border-b border-[var(--color-line)] bg-[rgba(8,9,12,0.78)] backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1320px] items-center gap-8 px-5 sm:px-8">
          <Link href="/" className="shrink-0" aria-label="Curve home">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[0.8125rem] text-[var(--color-dim)] transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-3">
            <span className="mono-xs hidden text-[var(--color-dimmer)] sm:inline">v0.3.1 · beta</span>
            <Link
              href="/download"
              className="group relative inline-flex h-9 items-center gap-2 overflow-hidden rounded-full bg-white px-4 text-[0.8125rem] font-medium text-black transition-transform duration-200 hover:scale-[1.03]"
            >
              Download
              <span className="ramp-line absolute inset-x-0 bottom-0 h-[2px] translate-y-full transition-transform duration-200 group-hover:translate-y-0" />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line-strong)] lg:hidden"
            >
              <span className="relative block h-[9px] w-[15px]">
                <span
                  className={`absolute left-0 block h-[1.5px] w-full bg-white transition-transform duration-300 ${
                    open ? "top-[4px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-full bg-white transition-transform duration-300 ${
                    open ? "top-[4px] -rotate-45" : "top-[7.5px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* mobile sheet */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--color-ink)] transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 pt-24 pb-10">
          <ul className="space-y-1">
            {LINKS.map((l, i) => (
              <li key={l.href} className="border-b border-[var(--color-line)]">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 text-[1.6rem] font-medium tracking-[-0.03em]"
                >
                  <span className="mono-xs text-[var(--color-dimmer)]">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/download"
            onClick={() => setOpen(false)}
            className="flex h-14 items-center justify-center rounded-full bg-white text-base font-medium text-black"
          >
            Download Curve
          </Link>
        </div>
      </div>
    </>
  );
}
