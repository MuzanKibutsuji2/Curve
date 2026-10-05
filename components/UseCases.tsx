"use client";

import { useState } from "react";

const CASES = [
  {
    tag: "A",
    name: "Coding",
    color: "#cdff3e",
    prompt: "Fix the broken dashboard and make sure the tests pass.",
    chain: ["inspect", "identify", "edit", "test", "diff", "verify", "report"],
    body:
      "The flagship loop. Curve reads the repository before touching it, makes the smallest change it can defend, runs the checks, and shows you the diff instead of a paragraph describing the diff.",
  },
  {
    tag: "B",
    name: "Research",
    color: "#3be8c0",
    prompt: "Compare these four vendors and tell me which one to pick.",
    chain: ["gather", "structure", "draft", "review", "save artifact"],
    body:
      "Researcher collects sources, Analyst structures the comparison, Writer produces the document, Reviewer checks it. One artifact lands in the project with its sources attached.",
  },
  {
    tag: "C",
    name: "Repetitive work",
    color: "#6b5cff",
    prompt: "Clean this CSV the way we did last month and rebuild the report.",
    chain: ["load workflow", "bind inputs", "execute", "verify", "export"],
    body:
      "You did it once with Curve watching. Curve saved it. Now the procedure is fixed and only the inputs change — which is the difference between an agent and a system.",
  },
  {
    tag: "D",
    name: "Project assistant",
    color: "#ff4d9e",
    prompt: "Continue where we left off.",
    chain: ["load state", "read memory", "list open threads", "propose next"],
    body:
      "Curve reloads project state, memory and unfinished tasks, then proposes the next steps rather than asking you to re-explain a project you already explained.",
  },
  {
    tag: "E",
    name: "Multi-agent",
    color: "#ff6a2b",
    prompt: "Turn this idea into a technical proposal.",
    chain: ["Planner", "Researcher", "Architect", "Writer", "Reviewer"],
    body:
      "Five roles, one objective, one permission policy, one verification loop. The coordination is the product; the individual agents are just staffing.",
  },
  {
    tag: "F",
    name: "Cross-device",
    color: "#ffc83d",
    prompt: "Keep going while I'm on the train.",
    chain: ["desktop executes", "phone monitors", "cloud continues"],
    body:
      "Later: the desktop handles code, the phone monitors status, and cloud execution picks up the job if you have enabled it. Cloud stays a choice you make, never a default you discover.",
  },
];

export function UseCases() {
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <div className="mt-14 grid gap-px overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-line)] lg:grid-cols-[262px_minmax(0,1fr)]">
      {/* selector */}
      <div className="bg-[var(--color-ink-2)] p-2 sm:p-3">
        <div className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible scroll-thin">
          {CASES.map((x, i) => (
            <button
              key={x.tag}
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center gap-3 rounded-[7px] px-3 py-2.5 text-left transition-colors lg:w-full ${
                i === active ? "bg-[var(--color-ink-3)]" : "hover:bg-white/[0.03]"
              }`}
            >
              <span
                className="font-mono text-[0.6875rem]"
                style={{ color: i === active ? x.color : "var(--color-dimmer)" }}
              >
                {x.tag}
              </span>
              <span
                className={`text-[0.875rem] whitespace-nowrap ${
                  i === active ? "text-white" : "text-[var(--color-dim)]"
                }`}
              >
                {x.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* panel */}
      <div key={c.tag} className="bg-[var(--color-ink-2)] p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="mono-xs mt-[5px] shrink-0 text-[var(--color-dimmer)]">YOU</span>
          <p className="h-title text-[1.25rem] leading-[1.25] sm:text-[1.6rem]">&ldquo;{c.prompt}&rdquo;</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 border-y border-[var(--color-line)] py-4">
          {c.chain.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="mono-xs text-[#cfd3de]">{s}</span>
              {i < c.chain.length - 1 && (
                <span className="font-mono text-[0.625rem]" style={{ color: c.color }}>
                  →
                </span>
              )}
            </span>
          ))}
        </div>

        <p className="mt-5 max-w-[62ch] text-[0.9375rem] leading-[1.68] text-[#9aa0b2]">{c.body}</p>
      </div>
    </div>
  );
}
