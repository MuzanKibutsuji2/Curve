"use client";

import { useState } from "react";

export function CopyCmd({ cmd, tint = "#cdff3e" }: { cmd: string; tint?: string }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(cmd);
    } catch {
      /* clipboard unavailable — the command is still visible */
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 1600);
  }

  return (
    <button
      onClick={copy}
      className="group flex w-full items-center gap-3 rounded-[8px] border border-[var(--color-line)] bg-[#06070a] px-3 py-2.5 text-left transition-colors hover:border-[var(--color-line-strong)]"
      aria-label={`Copy command: ${cmd}`}
    >
      <span className="font-mono text-[0.6875rem] select-none" style={{ color: tint }}>
        $
      </span>
      <code className="scroll-thin min-w-0 flex-1 overflow-x-auto font-mono text-[0.6875rem] whitespace-nowrap text-[#9aa0b2]">
        {cmd}
      </code>
      <span className="mono-xs shrink-0 text-[var(--color-dimmer)] transition-colors group-hover:text-[var(--color-dim)]">
        {done ? "copied" : "copy"}
      </span>
    </button>
  );
}
