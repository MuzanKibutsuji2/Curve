import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Thesis } from "@/components/Thesis";
import { Loop } from "@/components/Loop";
import { Layers } from "@/components/Layers";
import { Capabilities } from "@/components/Capabilities";
import { Runner } from "@/components/Runner";
import { Agents } from "@/components/Agents";
import { UseCases } from "@/components/UseCases";
import { Workflows } from "@/components/Workflows";
import { Trust } from "@/components/Trust";
import { Roadmap } from "@/components/Roadmap";
import { Pricing } from "@/components/Pricing";
import { Metrics } from "@/components/Metrics";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { DownloadBlock } from "@/components/DownloadBlock";
import { Shell, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Thesis />

      {/* 02 — the loop */}
      <Shell id="loop">
        <SectionHead
          n="02"
          eyebrow="The core loop"
          align="split"
          title={
            <>
              Ten stages between a sentence and a{" "}
              <span className="serif italic text-[#3be8c0]">finished thing.</span>
            </>
          }
          lede={
            <>
              Intent, understand, plan, permission check, execute, observe, verify, report, remember, reuse.
              Nothing is hidden. The design rule is simple: never make the user wonder what Curve is doing.
            </>
          }
        />
        <Loop />
      </Shell>

      {/* 03 — layers */}
      <Shell id="layers" className="border-t border-[var(--color-line)]">
        <SectionHead
          n="03"
          eyebrow="Architecture"
          align="split"
          title={
            <>
              Three layers. The middle one is the{" "}
              <span className="serif italic text-[#6b5cff]">whole point.</span>
            </>
          }
          lede={
            <>
              Frontier labs own intelligence. Sandbox vendors own execution. Curve builds the orchestration
              layer in between — the part that decides what to do, who does it, whether it is allowed and
              whether it actually worked.
            </>
          }
        />
        <Layers />
      </Shell>

      {/* 04 — capabilities */}
      <Shell id="features" className="border-t border-[var(--color-line)]">
        <SectionHead
          n="04"
          eyebrow="Capabilities"
          align="split"
          title={
            <>
              Everything you need to hand over{" "}
              <span className="serif italic text-[#ffc83d]">real work.</span>
            </>
          }
          lede="Projects that persist, plans you can read, approvals you control, execution you can watch, and verification before anybody says the word done."
        />
        <Capabilities />

        <div className="mt-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="eyebrow text-[var(--color-dimmer)]">What you hand it</span>
              <span className="h-px flex-1 bg-[var(--color-line)]" />
            </div>
          </Reveal>
          <UseCases />
        </div>
      </Shell>

      {/* 05 — runner */}
      <Shell id="runner" className="border-t border-[var(--color-line)] bg-[var(--color-ink-2)]">
        <SectionHead
          n="05"
          eyebrow="Curve Runner"
          align="split"
          title={
            <>
              A small local program that can say{" "}
              <span className="serif italic text-[#ff6a2b]">no.</span>
            </>
          }
          lede={
            <>
              Curve separates the control plane from the execution plane. Planning, permissions and
              verification live in the orchestrator. Files, terminal and Git live on your machine, behind a
              policy engine that validates every single request before it runs.
            </>
          }
        />
        <Runner />
      </Shell>

      {/* 06 — agents */}
      <Shell id="agents" className="border-t border-[var(--color-line)]">
        <SectionHead
          n="06"
          eyebrow="Agents"
          align="split"
          title={
            <>
              Roles with scopes, not one{" "}
              <span className="serif italic text-[#ff4d9e]">enormous prompt.</span>
            </>
          }
          lede="Each agent declares its purpose, instructions, allowed tools, permission level, I/O schema, preferred model, memory scope and verification rules. Then it gets exactly that and nothing more."
        />
        <Agents />
      </Shell>

      <Workflows />

      {/* 07 — trust */}
      <Shell id="trust" className="border-t border-[var(--color-line)]">
        <SectionHead
          n="08"
          eyebrow="Permissions & trust"
          align="split"
          title={
            <>
              Least privilege, <span className="serif italic text-[#3be8c0]">out loud.</span>
            </>
          }
          lede="Curve can operate inside the project folder you chose. Everything else is denied until you say otherwise — and the Runner, not the model, makes the final call on every tool request."
        />
        <Trust />
      </Shell>

      {/* 08 — roadmap */}
      <Shell id="roadmap" className="border-t border-[var(--color-line)] bg-[var(--color-ink-2)]">
        <SectionHead
          n="09"
          eyebrow="Roadmap"
          align="split"
          title={
            <>
              Ship the loop first. Everything else is{" "}
              <span className="serif italic text-[#cdff3e]">earned.</span>
            </>
          }
          lede="No mobile app, no cloud fleet, no marketplace and no custom foundation model until the core loop is boringly reliable. If a feature does not help prove Curve can turn an outcome into verified work, it waits."
        />
        <Roadmap />
      </Shell>

      <Pricing />
      <Metrics />

      {/* 10 — download */}
      <Shell id="get" className="border-b border-[var(--color-line)]">
        <SectionHead
          n="11"
          eyebrow="Get Curve"
          align="split"
          title={
            <>
              One installer. One folder. <span className="serif italic text-[#3be8c0]">One hour to trust.</span>
            </>
          }
          lede={
            <>
              Install Curve Runner, authenticate it once, pick a project directory and give Curve a task you
              would otherwise do yourself. Full install notes and release history live on the{" "}
              <Link href="/download" className="text-white underline decoration-[var(--color-line-strong)] underline-offset-4 hover:decoration-white">
                download page
              </Link>
              .
            </>
          }
        />
        <DownloadBlock compact />
      </Shell>

      {/* 11 — faq */}
      <Shell id="faq">
        <SectionHead
          n="12"
          eyebrow="Questions"
          title={
            <>
              The ones that actually <span className="serif italic text-[#ffc83d]">matter.</span>
            </>
          }
        />
        <FAQ />
      </Shell>

      <CTA />
    </>
  );
}
