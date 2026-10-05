export function CurveMark({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="curve-mark-ramp" x1="2" y1="28" x2="30" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#cdff3e" />
          <stop offset="0.38" stopColor="#3be8c0" />
          <stop offset="0.68" stopColor="#6b5cff" />
          <stop offset="1" stopColor="#ff4d9e" />
        </linearGradient>
      </defs>
      {/* the curve: flat, then committed */}
      <path
        d="M3 27C3 27 9.5 26.6 15 20.5C20.5 14.4 21.8 5 29 5"
        stroke="url(#curve-mark-ramp)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* control node */}
      <circle cx="15" cy="20.5" r="2.6" fill="#08090c" stroke="url(#curve-mark-ramp)" strokeWidth="2" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <CurveMark />
      <span className="text-[1.05rem] font-semibold tracking-[-0.045em]">Curve</span>
    </span>
  );
}
