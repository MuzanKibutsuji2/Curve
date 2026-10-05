import { BUILDS, HEX } from "@/lib/content";
import { CopyCmd } from "./CopyCmd";
import { Reveal } from "./Reveal";

function OSGlyph({ os, color }: { os: string; color: string }) {
  if (os === "macOS")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={color} aria-hidden>
        <path d="M16.4 12.7c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.6-1.9-1.5-.2-3 .9-3.7.9s-2-.9-3.2-.9c-1.7 0-3.2 1-4 2.5-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8s1.9.8 3.2.8 2.2-1.2 3-2.4c.9-1.3 1.3-2.6 1.3-2.7 0 0-2.4-1-2.4-3.8zM14.3 4.9c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" />
      </svg>
    );
  if (os === "Windows")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={color} aria-hidden>
        <path d="M3 5.6l7.4-1v7.1H3V5.6zm0 12.8l7.4 1v-7h-7.4v6zM11.3 19.6L21 21v-8.5h-9.7v7.1zm0-15.2v7.2H21V3l-9.7 1.4z" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 2c-1.9 0-3 1.6-3 3.6 0 1.3-.1 2.2-.6 3.1-.7 1.3-2.1 2.8-2.9 4.8-.7 1.8-.4 3.4.1 4.5.3.7.2 1.4-.1 2-.3.5-.1 1 .5 1.1 1 .2 2.2 0 2.7-.5.3-.3.8-.4 1.3-.2 1.3.4 2.7.4 4 0 .5-.2 1 0 1.3.2.5.5 1.7.7 2.7.5.6-.1.8-.6.5-1.1-.3-.6-.4-1.3-.1-2 .5-1.1.8-2.7.1-4.5-.8-2-2.2-3.5-2.9-4.8-.5-.9-.6-1.8-.6-3.1C15 3.6 13.9 2 12 2zm-1.4 4.2c.4 0 .7.4.7 1s-.3 1-.7 1-.7-.4-.7-1 .3-1 .7-1zm2.8 0c.4 0 .7.4.7 1s-.3 1-.7 1-.7-.4-.7-1 .3-1 .7-1zM12 9.3c.9 0 1.9.6 1.9 1.1 0 .3-.4.5-.9.8-.4.2-.7.5-1 .5s-.6-.3-1-.5c-.5-.3-.9-.5-.9-.8 0-.5 1-1.1 1.9-1.1z" />
    </svg>
  );
}

export function DownloadBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-px overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-line)] lg:grid-cols-3 ${compact ? "mt-12" : "mt-10"}`}>
      {BUILDS.map((b, i) => {
        const c = HEX[b.color];
        return (
          <Reveal key={b.os} delay={i * 80}>
            <div className="group relative flex h-full flex-col bg-[var(--color-ink-2)] p-6 transition-colors duration-300 hover:bg-[var(--color-ink-3)]">
              <div
                className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ background: c }}
              />
              <div className="relative flex items-center gap-2.5">
                <OSGlyph os={b.os} color={c} />
                <h3 className="text-[1.0625rem] font-medium tracking-[-0.02em]">{b.os}</h3>
                <span className="mono-xs ml-auto text-[var(--color-dimmer)]">{b.arch}</span>
              </div>

              <a
                href={`/releases/${b.file}`}
                className="relative mt-6 flex h-11 items-center justify-center gap-2 rounded-full bg-white text-[0.875rem] font-medium text-black transition-transform duration-200 hover:scale-[1.02]"
              >
                Download
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M7 1v9m0 0 3.6-3.6M7 10 3.4 6.4M1.5 12.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </a>

              <div className="mono-xs relative mt-3 flex items-center justify-between gap-2 text-[var(--color-dimmer)]">
                <span className="truncate">{b.file}</span>
                <span className="shrink-0">{b.size}</span>
              </div>

              <div className="relative mt-5 pt-5 border-t border-[var(--color-line)]">
                <div className="mono-xs mb-2 text-[var(--color-dimmer)]">or install from the terminal</div>
                <CopyCmd cmd={b.cmd} tint={c} />
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
