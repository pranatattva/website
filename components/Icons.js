const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", "aria-hidden": true };

export const Chevron = (p) => (<svg {...base} className="chev" {...p}><path d="M6 9l6 6 6-6" /></svg>);
export const Menu = (p) => (<svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h10" /></svg>);
export const Close = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const Bag = (p) => (<svg {...base} {...p}><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>);
export const Pin = (p) => (<svg {...base} {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const Clock = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>);
export const User = (p) => (<svg {...base} {...p}><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>);
export const Wave = (p) => (<svg {...base} {...p}><path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" /></svg>);
export const Phone = (p) => (<svg {...base} {...p}><path d="M6.5 3.5h3l1.5 4-2 1.3a11 11 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" /></svg>);
export const Mail = (p) => (<svg {...base} {...p}><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" /><path d="M4 7l8 6 8-6" /></svg>);
export const Instagram = (p) => (<svg {...base} {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></svg>);
export const WhatsApp = (p) => (<svg {...base} {...p}><path d="M4 20l1.3-4A8.5 8.5 0 1 1 8.4 19L4 20z" /><path d="M9 8.5c0 3.5 2.6 6.5 6.5 6.5l1-1.6-2-1-1 .8a4.5 4.5 0 0 1-2.2-2.2l.8-1-1-2L9 8.5z" /></svg>);
export const Tick = (p) => (<svg {...base} strokeWidth={2} {...p}><path d="M5 12.5l4.2 4L19 7" /></svg>);
export const Rupee = (p) => (<svg {...base} {...p}><path d="M7 5h10M7 9.5h10M10 5c4 0 4 9 0 9H7l7 6" /></svg>);

// Small gold ray mark, from the sun ring in the logo
export const GoldRule = ({ className = "gold-rule" }) => (
  <svg className={className} viewBox="0 0 64 10" aria-hidden="true">
    <path d="M2 5h22M40 5h22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="32" cy="5" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

// Glyphs for the three intentions
export const HealGlyph = () => (
  <svg className="intention-glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M24 40s-13-8.2-13-18a7.5 7.5 0 0 1 13-5 7.5 7.5 0 0 1 13 5c0 9.8-13 18-13 18z" />
    <path d="M24 10V5M14 12l-3-3M34 12l3-3" strokeLinecap="round" />
  </svg>
);
export const TransformGlyph = () => (
  <svg className="intention-glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M24 8c6 6 6 14 0 20-6-6-6-14 0-20z" />
    <path d="M24 28c-7 0-13-4-15-11 7 0 13 4 15 11zM24 28c7 0 13-4 15-11-7 0-13 4-15 11z" />
    <path d="M24 28v12" strokeLinecap="round" />
  </svg>
);
export const AlignGlyph = () => (
  <svg className="intention-glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="24" cy="9" r="3" /><circle cx="24" cy="19" r="3" /><circle cx="24" cy="29" r="3" /><circle cx="24" cy="39" r="3" />
    <path d="M12 24h6M30 24h6" strokeLinecap="round" />
  </svg>
);

// Line icons used inside gold-ringed medallions
const ic = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 32 32", "aria-hidden": true };
export const IcHands = () => (<svg {...ic}><path d="M9 21V12a2 2 0 0 1 4 0v5M13 17V9a2 2 0 0 1 4 0v8M17 15v-4a2 2 0 0 1 4 0v8a8 8 0 0 1-8 8h-1a7 7 0 0 1-6-3.5L4 20a2 2 0 0 1 3.4-2L9 21" /><path d="M24 5v3M28 9h-3M21 4l1 2" /></svg>);
export const IcBook = () => (<svg {...ic}><path d="M16 9c-3-2-7-2.5-11-2v17c4-.5 8 0 11 2 3-2 7-2.5 11-2V7c-4-.5-8 0-11 2z" /><path d="M16 9v17" /></svg>);
export const IcDrop = () => (<svg {...ic}><path d="M16 4s8 9 8 15a8 8 0 0 1-16 0c0-6 8-15 8-15z" /><path d="M12.5 20a3.5 3.5 0 0 0 3.5 3.5" /></svg>);
export const IcMind = () => (<svg {...ic}><circle cx="16" cy="16" r="11" /><path d="M10 17c2 2.5 4 3.5 6 3.5s4-1 6-3.5M11.5 12.5h.01M20.5 12.5h.01" /></svg>);
export const IcSun = () => (<svg {...ic}><circle cx="16" cy="16" r="5" /><path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.8 6.8l2.1 2.1M23.1 23.1l2.1 2.1M6.8 25.2l2.1-2.1M23.1 8.9l2.1-2.1" /></svg>);
export const IcMoon = () => (<svg {...ic}><path d="M24 20.5A10 10 0 0 1 11.5 8a10 10 0 1 0 12.5 12.5z" /><path d="M22 6l.8 1.8L24.5 8.5l-1.7.7L22 11l-.8-1.8-1.7-.7 1.7-.7z" /></svg>);
export const IcHeart = () => (<svg {...ic}><path d="M16 27S4 20 4 12a6 6 0 0 1 12-1 6 6 0 0 1 12 1c0 8-12 15-12 15z" /></svg>);
export const IcLeaf = () => (<svg {...ic}><path d="M6 26C6 13 14 6 27 5c-1 13-8 21-21 21z" /><path d="M6 26C11 19 15 15 21 11" /></svg>);
export const IcHome = () => (<svg {...ic}><path d="M5 15L16 6l11 9" /><path d="M8 13v13h16V13" /><path d="M14 26v-6h4v6" /></svg>);
export const IcLink = () => (<svg {...ic}><circle cx="12" cy="16" r="7" /><circle cx="20" cy="16" r="7" /></svg>);
export const IcSpark = () => (<svg {...ic}><path d="M16 4l2.4 7.6L26 14l-7.6 2.4L16 24l-2.4-7.6L6 14l7.6-2.4z" /></svg>);
export const IcEye = () => (<svg {...ic}><path d="M3 16s5-8 13-8 13 8 13 8-5 8-13 8S3 16 3 16z" /><circle cx="16" cy="16" r="3.5" /></svg>);
export const IcBroom = () => (<svg {...ic}><path d="M20 4l-6 12" /><path d="M9 16h10l2 12H7z" /><path d="M11 22v6M15 22v6" /></svg>);
export const IcStar = () => (<svg {...ic}><path d="M16 5l3 7 7 .6-5.4 4.6 1.7 7.3L16 20.6 9.7 24.5l1.7-7.3L6 12.6l7-.6z" /></svg>);

export function Medal({ children, size = "" }) {
  return <span className={`medal ${size}`}>{children}</span>;
}
export const IcBriefcase = () => (<svg {...ic}><rect x="4" y="10" width="24" height="16" rx="3" /><path d="M12 10V7.5A1.5 1.5 0 0 1 13.5 6h5A1.5 1.5 0 0 1 20 7.5V10M4 17h24" /></svg>);
export const IcChart = () => (<svg {...ic}><path d="M5 26h22" /><path d="M8 22v-5M14 22v-9M20 22v-6M26 22V8" /><path d="M7 13l7-5 6 4 6-6" /></svg>);
export const IcCell = () => (<svg {...ic}><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="4" /><circle cx="9.5" cy="11" r="1" /><circle cx="22" cy="10.5" r="1.2" /><circle cx="21.5" cy="21.5" r="1" /><circle cx="10" cy="21" r="1.3" /></svg>);
export const IcTree = () => (<svg {...ic}><circle cx="16" cy="7" r="3" /><circle cx="8" cy="20" r="3" /><circle cx="24" cy="20" r="3" /><path d="M16 10v5M16 15H8v2M16 15h8v2M8 23v3M24 23v3" /></svg>);
export const IcFace = () => (<svg {...ic}><path d="M16 4c-6 0-9 4.5-9 10.5S10.5 28 16 28s9-7.5 9-13.5S22 4 16 4z" /><path d="M12.5 14h.01M19.5 14h.01M13 20c1.8 1.6 4.2 1.6 6 0" /><path d="M24 5l.7 1.6 1.6.7-1.6.7L24 9.6l-.7-1.6-1.6-.7 1.6-.7z" /></svg>);
export const IcFigure = () => (<svg {...ic}><circle cx="16" cy="6" r="2.6" /><path d="M11 13c3 1.2 7 1.2 10 0M16 13.6v6M16 19.6l-4 7M16 19.6l4 7" /><path d="M7 10c2 4 2 9 0 13M25 10c-2 4-2 9 0 13" strokeDasharray="1 3" /></svg>);
export const IcCalendar = () => (<svg {...ic}><rect x="5" y="7" width="22" height="20" rx="3" /><path d="M5 13h22M11 4v5M21 4v5" /></svg>);
export const IcQuote = () => (<svg {...ic}><path d="M6 20c0-5 2-8 6-10M18 20c0-5 2-8 6-10" /><circle cx="9" cy="21" r="3" /><circle cx="21" cy="21" r="3" /></svg>);

const MAP = { leaf: IcLeaf, mind: IcMind, link: IcLink, briefcase: IcBriefcase, chart: IcChart, home: IcHome, cell: IcCell, tree: IcTree, face: IcFace, figure: IcFigure };
export function HealIcon({ name }) {
  const C = MAP[name] || IcSpark;
  return <C />;
}
