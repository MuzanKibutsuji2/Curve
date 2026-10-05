/** Layered SVG splines + colour blooms. Purely decorative. */
export function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* colour blooms */}
      <div
        className="drift absolute -top-[18%] -left-[12%] h-[52vw] w-[52vw] rounded-full opacity-[0.22] blur-[110px]"
        style={{ background: "radial-gradient(circle, #6b5cff 0%, transparent 68%)" }}
      />
      <div
        className="drift absolute top-[6%] right-[-16%] h-[46vw] w-[46vw] rounded-full opacity-[0.18] blur-[120px]"
        style={{ background: "radial-gradient(circle, #ff4d9e 0%, transparent 68%)", animationDelay: "-6s" }}
      />
      <div
        className="drift absolute bottom-[-24%] left-[26%] h-[40vw] w-[40vw] rounded-full opacity-[0.16] blur-[110px]"
        style={{ background: "radial-gradient(circle, #3be8c0 0%, transparent 68%)", animationDelay: "-12s" }}
      />

      {/* splines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="bd-ramp" x1="0" y1="900" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#cdff3e" stopOpacity="0" />
            <stop offset="0.2" stopColor="#cdff3e" stopOpacity="0.55" />
            <stop offset="0.45" stopColor="#3be8c0" stopOpacity="0.5" />
            <stop offset="0.7" stopColor="#6b5cff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ff4d9e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bd-faint" x1="0" y1="900" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.09" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4, 5].map((n) => (
          <path
            key={n}
            d={`M-120 ${980 + n * 26} C 300 ${930 + n * 20}, 520 ${700 - n * 34}, 760 ${520 - n * 40} S 1180 ${200 - n * 30}, 1560 ${60 - n * 26}`}
            stroke="url(#bd-faint)"
            strokeWidth="1"
          />
        ))}

        <path
          d="M-120 980 C 300 930, 520 700, 760 520 S 1180 200, 1560 60"
          stroke="url(#bd-ramp)"
          strokeWidth="1.6"
        />
        <path
          d="M-120 1030 C 340 980, 560 760, 820 570 S 1240 240, 1560 110"
          stroke="url(#bd-ramp)"
          strokeWidth="1"
          strokeOpacity="0.6"
          strokeDasharray="3 9"
        />
      </svg>

      {/* fade to page */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-[var(--color-ink)]" />
    </div>
  );
}
