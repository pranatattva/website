// Soft background ornaments: blurred aura orbs plus faint gold line art
// drawn from the logo (sun-ray ring, lotus petals, dotted halos).
// Drop <Decor preset="a" /> as the first child of any .section.

const RAYS = Array.from({ length: 48 }, (_, i) => i * 7.5);
const PETALS = Array.from({ length: 8 }, (_, i) => i * 45);

export function Mandala({ className = "" }) {
  return (
    <svg className={`orn ${className}`} viewBox="-200 -200 400 400" aria-hidden="true">
      <g fill="none" stroke="currentColor">
        <circle r="196" strokeWidth="0.6" />
        <circle r="186" strokeWidth="0.6" strokeDasharray="1 6" strokeLinecap="round" />
        {RAYS.map((d, i) => (
          <line key={d} x1="0" y1={i % 2 ? -150 : -142} x2="0" y2="-178" strokeWidth={i % 2 ? 0.5 : 0.9} transform={`rotate(${d})`} />
        ))}
        <circle r="138" strokeWidth="0.8" />
        {PETALS.map((d) => (
          <path key={d} d="M0 -40 C 26 -64, 26 -104, 0 -128 C -26 -104, -26 -64, 0 -40 Z" strokeWidth="0.8" transform={`rotate(${d})`} />
        ))}
        {PETALS.map((d) => (
          <path key={`s${d}`} d="M0 -46 C 14 -64, 14 -88, 0 -104 C -14 -88, -14 -64, 0 -46 Z" strokeWidth="0.5" transform={`rotate(${d + 22.5})`} />
        ))}
        <circle r="38" strokeWidth="0.8" />
        <circle r="18" strokeWidth="0.6" strokeDasharray="1 4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Lotus({ className = "" }) {
  return (
    <svg className={`orn ${className}`} viewBox="0 0 240 150" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round">
        <path d="M120 128 C 98 100, 98 52, 120 18 C 142 52, 142 100, 120 128 Z" />
        <path d="M120 128 C 88 112, 66 80, 70 40 C 100 54, 118 90, 120 128 Z" />
        <path d="M120 128 C 152 112, 174 80, 170 40 C 140 54, 122 90, 120 128 Z" />
        <path d="M120 128 C 80 126, 40 104, 22 72 C 60 70, 98 92, 120 128 Z" />
        <path d="M120 128 C 160 126, 200 104, 218 72 C 180 70, 142 92, 120 128 Z" />
        <path d="M30 136 C 80 142, 160 142, 210 136" strokeDasharray="1 5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function RayArc({ className = "" }) {
  return (
    <svg className={`orn ${className}`} viewBox="-200 -200 400 200" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M-160 0 A160 160 0 0 1 160 0" strokeWidth="0.9" />
        <path d="M-120 0 A120 120 0 0 1 120 0" strokeWidth="0.6" strokeDasharray="1 6" />
        {Array.from({ length: 19 }, (_, i) => -90 + i * 10).map((d) => (
          <line key={d} x1="0" y1="-168" x2="0" y2="-192" strokeWidth="0.9" transform={`rotate(${d})`} />
        ))}
      </g>
    </svg>
  );
}

// Only soft colour glows: no line art (per brief)
const PRESETS = {
  hero: (
    <>
      <span className="orb orb--lav orb--xl" style={{ left: "-12%", top: "8%" }} />
      <span className="orb orb--blue orb--lg" style={{ right: "-8%", top: "-6%" }} />
      <span className="orb orb--gold orb--lg" style={{ right: "6%", bottom: "-18%" }} />
    </>
  ),
  a: <span className="orb orb--lav orb--lg" style={{ left: "-10%", bottom: "-20%" }} />,
  b: (
    <>
      <span className="orb orb--gold orb--md" style={{ right: "-6%", top: "-10%" }} />
      <span className="orb orb--blue orb--md" style={{ left: "-8%", bottom: "-6%" }} />
    </>
  ),
  c: <span className="orb orb--blue orb--lg" style={{ left: "-12%", top: "-14%" }} />,
  d: <span className="orb orb--lav orb--lg" style={{ right: "-10%", top: "10%" }} />,
  page: (
    <>
      <span className="orb orb--lav orb--lg" style={{ left: "-8%", top: "-30%" }} />
      <span className="orb orb--gold orb--md" style={{ right: "18%", bottom: "-40%" }} />
    </>
  ),
};

export default function Decor({ preset = "a" }) {
  return (
    <div className="decor" aria-hidden="true">
      {PRESETS[preset]}
    </div>
  );
}
