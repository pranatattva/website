// The Pranatattva mark, redrawn as SVG so it can breathe.
// animated: petals open and close, the disc and centre pulse, the sun ring
// shimmers and slowly turns, and soft ripples travel outward.

const PETAL =
  "M -15 -5 C -26 -2 -42 -1 -50 -8 C -58 -18 -44 -26 -52 -36 C -58 -46 -46 -58 -36 -52 C -26 -44 -18 -58 -8 -50 C -1 -42 -2 -26 -5 -15 C -3 -8 -8 -3 -15 -5 Z";

const RAYS = Array.from({ length: 24 }, (_, i) => i * 15);

export default function LogoMark({ size = 48, animated = false, className = "", title = "Pranatattva" }) {
  const id = animated ? "lm-a" : "lm-s";
  return (
    <svg
      className={`logomark ${animated ? "is-animated" : ""} ${className}`}
      width={size}
      height={size}
      viewBox="-200 -200 400 400"
      role="img"
      aria-label={title}
    >
      <defs>
        <radialGradient id={`${id}-disc`} cx="0" cy="0" r="118" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4766CF" />
          <stop offset="0.55" stopColor="#4A4FB8" />
          <stop offset="1" stopColor="#5A2C91" />
        </radialGradient>
        <linearGradient id={`${id}-petal`} x1="-50" y1="-50" x2="-8" y2="-8" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5872D6" />
          <stop offset="1" stopColor="#6F8AE6" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0" cy="0" r="160" gradientUnits="userSpaceOnUse">
          <stop offset="0.6" stopColor="#E8C877" stopOpacity="0.55" />
          <stop offset="1" stopColor="#E8C877" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <circle r="117" />
        </clipPath>
      </defs>

      {animated && (
        <g className="lm-ripples" aria-hidden="true">
          <circle r="150" className="lm-ripple" style={{ "--d": "0s" }} />
          <circle r="150" className="lm-ripple" style={{ "--d": "3.5s" }} />
        </g>
      )}

      {animated && <circle r="170" fill={`url(#${id}-glow)`} className="lm-glow" />}

      <g className="lm-ring-breathe">
        <g className="lm-ring-spin">
          <circle r="150" fill="none" stroke="#D7AE4F" strokeWidth="6" />
          {RAYS.map((deg, i) => (
            <line
              key={deg}
              x1="0"
              y1="-132"
              x2="0"
              y2="-178"
              stroke="#D7AE4F"
              strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(${deg})`}
              className="lm-ray"
              style={{ "--i": i }}
            />
          ))}
        </g>
      </g>

      <g className="lm-disc">
        <circle r="118" fill={`url(#${id}-disc)`} />
        <circle r="118" fill="none" stroke="#E2C27A" strokeOpacity="0.55" strokeWidth="1.5" />
        {animated && (
          <circle
            r="100"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.18"
            strokeWidth="1.2"
            strokeDasharray="2 9"
            className="lm-inner-spin"
          />
        )}
      </g>

      {animated && (
        <g clipPath={`url(#${id}-clip)`} aria-hidden="true">
          {[0, 1.6, 3.2].map((d) => (
            <circle key={d} r="16" className="lm-water" style={{ "--d": `${d}s` }} fill="none" stroke="#E2B95A" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      )}

      <g className="lm-flower" transform="scale(0.95)">
        {[0, 90, 180, 270].map((r) => (
          <g key={r} transform={`rotate(${r})`}>
            <g className="lm-petal">
              <path
                d={PETAL}
                fill={`url(#${id}-petal)`}
                stroke="#E2B95A"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />
            </g>
          </g>
        ))}
        <g>
          <circle r="16" fill="#6F8AE6" stroke="#E2B95A" strokeWidth="3.2" />
          <circle r="8" fill="#9CB2F2" stroke="#E2B95A" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}
