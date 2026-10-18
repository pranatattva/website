// The Pranatattva mark, built from the final logo artwork (public/brand).
// Static: the original PNG. Animated: the same artwork split into layers
// (rays, disc, petals, centre) so it can move without changing its design.

const C = 430; // centre of the 860 x 860 artwork

// Water ripple: the centre circle with a very gentle wave
function softRing(r = 30, amp = 0.32, waves = 6, steps = 120) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const rr = r + amp * Math.sin(waves * t);
    d += `${i ? "L" : "M"}${(C + rr * Math.cos(t)).toFixed(2)} ${(C + rr * Math.sin(t)).toFixed(2)}`;
  }
  return d + "Z";
}
const RING = softRing();

export default function LogoMark({ size = 48, animated = false, className = "", title = "Pranatattva" }) {
  if (!animated) {
    return (
      <img
        className={`logomark ${className}`}
        src={size > 100 ? "/brand/logo-mark-512.png" : "/brand/logo-mark-192.png"}
        width={size}
        height={size}
        alt={title}
        aria-hidden={title ? undefined : true}
        decoding="async"
      />
    );
  }

  return (
    <svg className={`logomark is-animated ${className}`} width={size} height={size} viewBox="0 0 860 860" role="img" aria-label={title}>
      <defs>
        <radialGradient id="lm-glow-g" cx={C} cy={C} r="400" gradientUnits="userSpaceOnUse">
          <stop offset="0.7" stopColor="#F4C85C" stopOpacity="0.5" />
          <stop offset="1" stopColor="#F4C85C" stopOpacity="0" />
        </radialGradient>
        <clipPath id="lm-clip">
          <circle cx={C} cy={C} r="296" />
        </clipPath>
      </defs>

      {/* soft glow and gentle outer ripples */}
      <circle cx={C} cy={C} r="420" fill="url(#lm-glow-g)" className="lm-glow" />
      <circle cx={C} cy={C} r="398" className="lm-ripple" style={{ "--d": "0s" }} />
      <circle cx={C} cy={C} r="398" className="lm-ripple" style={{ "--d": "3.5s" }} />

      {/* the artwork, layer by layer */}
      <image href="/brand/logo-rays.webp" x="0" y="0" width="860" height="860" className="lm-rays" />
      <image href="/brand/logo-disc.webp" x="0" y="0" width="860" height="860" />

      {/* water ripples travel from the centre circle to the inner gold ring */}
      <g clipPath="url(#lm-clip)" aria-hidden="true">
        {[0, 1.6, 3.2].map((d) => (
          <path key={d} d={RING} className="lm-water" style={{ "--d": `${d}s` }} fill="none" stroke="#F4C85C" strokeWidth="2.6" vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      <image href="/brand/logo-petals.webp" x="0" y="0" width="860" height="860" className="lm-petals" />
      <image href="/brand/logo-center.webp" x="0" y="0" width="860" height="860" />
    </svg>
  );
}
