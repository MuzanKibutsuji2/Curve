import Link from "next/link";

export function CTA() {
  return (
    <section className="noise relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="drift absolute -bottom-[34%] left-[6%] h-[46vw] w-[46vw] rounded-full opacity-[0.3] blur-[120px]"
          style={{ background: "radial-gradient(circle, #6b5cff 0%, transparent 68%)" }}
        />
        <div
          className="drift absolute -bottom-[38%] left-1/2 h-[50vw] w-[50vw] -translate-x-1/2 rounded-full opacity-[0.26] blur-[120px]"
          style={{ background: "radial-gradient(circle, #ff4d9e 0%, transparent 68%)", animationDelay: "-7s" }}
        />
        <div
          className="drift absolute -bottom-[32%] right-[4%] h-[42vw] w-[42vw] rounded-full opacity-[0.22] blur-[120px]"
          style={{ background: "radial-gradient(circle, #3be8c0 0%, transparent 68%)", animationDelay: "-13s" }}
        />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[var(--color-ink)] via-[var(--color-ink)]/70 to-transparent" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 520" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="cta-ramp" x1="0" y1="520" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#cdff3e" stopOpacity="0" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.28" />
              <stop offset="1" stopColor="#ff4d9e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-60 560 C 320 520, 560 340, 820 220 S 1240 40, 1520 -20" stroke="url(#cta-ramp)" strokeWidth="1.4" />
          <path d="M-60 620 C 360 580, 620 400, 900 270 S 1300 80, 1520 40" stroke="url(#cta-ramp)" strokeWidth="1" strokeDasharray="2 10" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5 py-28 text-center sm:px-8 sm:py-36">
        <h2 className="h-mega mx-auto max-w-[13ch] text-balance">
          Give Curve something <span className="serif italic">real</span> to do.
        </h2>
        <p className="mx-auto mt-7 max-w-[52ch] text-[1.0625rem] leading-[1.6] text-[#b9bece]">
          Install the Runner, point Curve at one folder, and ask for an outcome. You will see the plan before
          anything happens, and the receipts after it does.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/download"
            className="group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full bg-white px-7 text-[0.9375rem] font-medium text-black"
          >
            <span className="relative z-10">Download Curve</span>
            <span className="ramp-line absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
          </Link>
          <Link
            href="#what"
            className="inline-flex h-12 items-center rounded-full border border-[var(--color-line-strong)] bg-black/20 px-7 text-[0.9375rem] text-[#dfe2ea] backdrop-blur transition-colors hover:border-white/45"
          >
            Read the thesis
          </Link>
        </div>

        <p className="mono-xs mt-8 text-[var(--color-dimmer)]">
          macOS · Windows · Linux · free tier · your files never leave your machine
        </p>
      </div>
    </section>
  );
}
