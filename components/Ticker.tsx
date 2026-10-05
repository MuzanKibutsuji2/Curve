const STAGES = [
  "Intent",
  "Understand",
  "Plan",
  "Permission check",
  "Execute",
  "Observe",
  "Verify",
  "Report",
  "Remember",
  "Reuse",
];

const RAMP_HEX = ["#cdff3e", "#3be8c0", "#6b5cff", "#ff4d9e", "#ff6a2b", "#ffc83d"];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {STAGES.map((s, i) => (
        <span key={s} className="flex items-center">
          <span className="eyebrow px-5 text-[#cfd3de] whitespace-nowrap">{s}</span>
          <span style={{ color: RAMP_HEX[i % RAMP_HEX.length] }} className="font-mono text-xs">
            →
          </span>
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-ink-2)] py-3.5">
      <div className="marquee-track flex w-max">
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-ink-2)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-ink-2)] to-transparent" />
    </div>
  );
}
