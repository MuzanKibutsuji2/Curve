import type { Metadata } from "next";
import Link from "next/link";
import { DownloadBlock } from "@/components/DownloadBlock";
import { CopyCmd } from "@/components/CopyCmd";
import { Reveal } from "@/components/Reveal";
import { Shell, SectionHead } from "@/components/Section";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Install Curve Runner for macOS, Windows or Linux. Free tier, local execution, project-scoped permissions.",
};

const STEPS = [
  {
    n: "01",
    title: "Install the Runner",
    body: "A small local program — not a kernel extension, not a background agent with root. It authenticates to Curve and nothing else talks to your disk.",
    c: "#cdff3e",
  },
  {
    n: "02",
    title: "Pick one folder",
    body: "Point Curve at a single project directory. That path becomes the boundary. Anything outside it is denied until you explicitly allowlist it.",
    c: "#3be8c0",
  },
  {
    n: "03",
    title: "Set the permission ladder",
    body: "Read-only by default. Decide whether Curve may write, run commands, reach the network, or push. You can tighten it per project at any time.",
    c: "#6b5cff",
  },
  {
    n: "04",
    title: "Give it an outcome",
    body: "“Create hello.txt containing Hello Curve” is a fine first task. Watch the plan appear, approve what needs approving, and inspect the artifact.",
    c: "#ff4d9e",
  },
];

const REQS = [
  ["macOS", "13 Ventura or later · Apple silicon or Intel", "Node 18+ optional, for JS projects"],
  ["Windows", "Windows 11 / 10 21H2+ · x64 or ARM64", "WSL2 recommended but not required"],
  ["Linux", "glibc 2.31+ · x86_64 or aarch64", "AppImage, .deb and .rpm available"],
  ["Shared", "~120 MB disk · 250 MB RAM idle", "Outbound HTTPS to the Curve orchestrator"],
];

const CHANGELOG = [
  {
    v: "0.3.1",
    date: "28 Sep 2026",
    tag: "beta",
    c: "#cdff3e",
    items: [
      "One-click Runner installer for all three platforms",
      "Permission editor: per-project ladders with expiry",
      "Clearer failure explanations when a command exits non-zero",
      "Consent-based telemetry, off by default",
    ],
  },
  {
    v: "0.3.0",
    date: "11 Sep 2026",
    tag: "beta",
    c: "#3be8c0",
    items: [
      "Workflow library with parameter binding",
      "Polished onboarding and first-run project wizard",
      "Privacy-preserving crash reporting",
    ],
  },
  {
    v: "0.2.4",
    date: "19 Aug 2026",
    tag: "preview",
    c: "#6b5cff",
    items: [
      "Run cancellation and resume",
      "Retry budgets with bounded correction loops",
      "Encrypted local secrets in SQLite state",
      "GitHub repository import / export",
    ],
  },
  {
    v: "0.2.0",
    date: "02 Aug 2026",
    tag: "preview",
    c: "#ff4d9e",
    items: [
      "Agent roles and role switching",
      "Controlled browser research behind an allowlist",
      "Project-level environment configuration",
    ],
  },
];

export default function DownloadPage() {
  return (
    <>
      {/* header */}
      <section className="noise relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="drift absolute -top-[30%] left-[12%] h-[46vw] w-[46vw] rounded-full opacity-[0.2] blur-[120px]"
            style={{ background: "radial-gradient(circle, #3be8c0 0%, transparent 68%)" }}
          />
          <div
            className="drift absolute -top-[20%] right-[4%] h-[40vw] w-[40vw] rounded-full opacity-[0.18] blur-[120px]"
            style={{ background: "radial-gradient(circle, #6b5cff 0%, transparent 68%)", animationDelay: "-8s" }}
          />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-5 pt-32 pb-20 sm:px-8 sm:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow text-[var(--color-dimmer)]">Download</span>
              <span className="h-px w-10 bg-[var(--color-line)]" />
              <span className="mono-xs text-[var(--color-dimmer)]">Curve Runner 0.3.1 · 28 Sep 2026</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="h-mega mt-7 max-w-[15ch]">
              Put Curve on <span className="serif ramp-text italic">your machine.</span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-8 max-w-[58ch] text-[1.0625rem] leading-[1.62] text-[#b9bece]">
              Curve Runner is the only piece that touches your computer. It is small, it is scoped to one
              folder, and it refuses anything your permission ladder does not allow — including requests from
              the model that planned the work.
            </p>
          </Reveal>

          <DownloadBlock />

          <Reveal delay={200}>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="mono-xs text-[var(--color-dimmer)]">
                Free tier · no card · local execution unmetered
              </span>
              <Link href="#changelog" className="mono-xs text-[var(--color-dim)] underline underline-offset-4 hover:text-white">
                release notes
              </Link>
              <Link href="/#trust" className="mono-xs text-[var(--color-dim)] underline underline-offset-4 hover:text-white">
                permission model
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* setup */}
      <Shell id="setup">
        <SectionHead
          n="01"
          eyebrow="First run"
          align="split"
          title={
            <>
              Four steps, then give it something{" "}
              <span className="serif italic text-[#cdff3e]">small.</span>
            </>
          }
          lede="The fastest way to decide whether you trust Curve is to hand it a task you could do yourself in ten minutes, and watch exactly how it goes about it."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <div className="h-full bg-[var(--color-ink-2)] p-6">
                <span className="font-mono text-[0.6875rem]" style={{ color: s.c }}>
                  {s.n}
                </span>
                <h3 className="mt-3 text-[1.0625rem] font-medium tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2.5 text-[0.875rem] leading-[1.6] text-[#9aa0b2]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[12px] border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6">
              <h3 className="eyebrow text-[var(--color-dimmer)]">Connect the Runner</h3>
              <div className="mt-4 space-y-2.5">
                <CopyCmd cmd="curve runner login" tint="#3be8c0" />
                <CopyCmd cmd="curve project init ~/dev/atlas --scope read,write,exec" tint="#6b5cff" />
                <CopyCmd cmd='curve run "create hello.txt containing Hello Curve"' tint="#cdff3e" />
              </div>
              <p className="mt-4 text-[0.8125rem] leading-relaxed text-[#9aa0b2]">
                Everything here is also available in the web app — the CLI just gets you to the first verified
                run faster.
              </p>
            </div>

            <div className="rounded-[12px] border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6">
              <h3 className="eyebrow text-[var(--color-dimmer)]">Verify the download</h3>
              <div className="mt-4 space-y-2.5">
                <CopyCmd cmd="shasum -a 256 Curve-Runner-0.3.1-universal.dmg" tint="#ffc83d" />
                <CopyCmd cmd="curve runner doctor" tint="#ff6a2b" />
              </div>
              <dl className="mt-5 space-y-2 border-t border-[var(--color-line)] pt-4">
                {[
                  ["macOS", "9f2c…a41e"],
                  ["Windows", "4b70…c0d9"],
                  ["Linux", "e18a…77bf"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between">
                    <dt className="mono-xs text-[var(--color-dimmer)]">{k} sha256</dt>
                    <dd className="mono-xs text-[#9aa0b2]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </Shell>

      {/* requirements */}
      <Shell className="border-t border-[var(--color-line)] bg-[var(--color-ink-2)]">
        <SectionHead
          n="02"
          eyebrow="Requirements"
          align="split"
          title={
            <>
              Modest, because the work is{" "}
              <span className="serif italic text-[#6b5cff]">already on your disk.</span>
            </>
          }
          lede="Curve does not stream your filesystem anywhere. The Runner reads what a step needs, executes what you approved, and returns structured results."
        />

        <Reveal>
          <div className="scroll-thin mt-12 overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--color-line-strong)]">
                  <th className="mono-xs pb-2.5 font-medium text-[var(--color-dimmer)]">PLATFORM</th>
                  <th className="mono-xs pb-2.5 font-medium text-[var(--color-dimmer)]">MINIMUM</th>
                  <th className="mono-xs pb-2.5 font-medium text-[var(--color-dimmer)]">NOTES</th>
                </tr>
              </thead>
              <tbody>
                {REQS.map((r) => (
                  <tr key={r[0]} className="border-b border-[var(--color-line)]">
                    <td className="py-3.5 pr-6 text-[0.875rem] font-medium whitespace-nowrap">{r[0]}</td>
                    <td className="py-3.5 pr-6 text-[0.875rem] text-[#b9bece]">{r[1]}</td>
                    <td className="py-3.5 text-[0.875rem] text-[#8b90a0]">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <div className="rounded-[12px] border border-[#cdff3e]/28 bg-[#cdff3e]/[0.04] p-6">
              <h3 className="eyebrow text-[#cdff3e]">The Runner will</h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Read, write and edit files inside the project scope",
                  "Run approved commands with timeouts and captured output",
                  "Inspect git status and diff",
                  "Return structured results and artifacts",
                ].map((x) => (
                  <li key={x} className="text-[0.875rem] leading-snug text-[#dfe2ea]">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[12px] border border-[#ff4d9e]/28 bg-[#ff4d9e]/[0.04] p-6">
              <h3 className="eyebrow text-[#ff4d9e]">The Runner will not</h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Reach outside the project directory without an allowlist entry",
                  "Push, publish or send anything without explicit approval",
                  "Touch personal folders or credential stores",
                  "Put secrets into prompts, logs or artifacts",
                ].map((x) => (
                  <li key={x} className="text-[0.875rem] leading-snug text-[#dfe2ea]">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Shell>

      {/* changelog */}
      <Shell id="changelog" className="border-t border-[var(--color-line)]">
        <SectionHead
          n="03"
          eyebrow="Release notes"
          align="split"
          title={
            <>
              What changed, and <span className="serif italic text-[#ff6a2b]">when.</span>
            </>
          }
          lede="Curve is in beta. Releases are small, frequent and focused on reliability of the execution loop rather than surface area."
        />

        <div className="mt-14 space-y-0">
          {CHANGELOG.map((r, i) => (
            <Reveal key={r.v} delay={i * 70}>
              <article className="grid gap-5 border-t border-[var(--color-line)] py-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
                <div className="flex items-baseline gap-3 lg:block">
                  <h3 className="text-[1.5rem] font-semibold tracking-[-0.035em]" style={{ color: r.c }}>
                    {r.v}
                  </h3>
                  <div className="mono-xs text-[var(--color-dimmer)] lg:mt-2">
                    {r.date} · {r.tag}
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {r.items.map((x) => (
                    <li key={x} className="flex gap-3 text-[0.9375rem] leading-snug text-[#b9bece]">
                      <span
                        className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full"
                        style={{ background: r.c }}
                      />
                      {x}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-[var(--color-line)] pt-10">
            <Link
              href="/#pricing"
              className="inline-flex h-11 items-center rounded-full border border-[var(--color-line-strong)] px-6 text-[0.875rem] text-[#dfe2ea] transition-colors hover:border-white/45 hover:bg-white/[0.04]"
            >
              Compare plans
            </Link>
            <Link
              href="/#faq"
              className="inline-flex h-11 items-center rounded-full border border-[var(--color-line-strong)] px-6 text-[0.875rem] text-[#dfe2ea] transition-colors hover:border-white/45 hover:bg-white/[0.04]"
            >
              Read the FAQ
            </Link>
            <span className="mono-xs text-[var(--color-dimmer)]">
              Older builds are archived but unsupported.
            </span>
          </div>
        </Reveal>
      </Shell>
    </>
  );
}
