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
