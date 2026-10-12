// Drawn placeholders used until real photos are uploaded.

export function Portrait({ initials, src, alt }) {
  if (src) return <div className="portrait"><img src={src} alt={alt} /></div>;
  return (
    <div className="portrait" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <radialGradient id={`pg-${initials}`} cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#e4daf2" />
            <stop offset="1" stopColor="#c9b8e6" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill={`url(#pg-${initials})`} />
        <circle cx="100" cy="100" r="84" fill="none" stroke="#d2a649" strokeWidth="1.2" strokeDasharray="1 7" strokeLinecap="round" />
        <text x="100" y="116" textAnchor="middle" fontFamily="Marcellus, Georgia, serif" fontSize="52" fill="#43286f">{initials}</text>
      </svg>
    </div>
  );
}

export function ProductArt({ category }) {
  if (category === "Salts") {
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M30 52h60l-6 46a8 8 0 0 1-8 7H44a8 8 0 0 1-8-7l-6-46z" fill="#fff" stroke="#c9a14a" strokeWidth="2" />
        <path d="M26 44h68v8H26z" fill="#f3e6c8" stroke="#c9a14a" strokeWidth="2" strokeLinejoin="round" />
        {[[50, 30], [62, 24], [72, 34], [56, 38], [44, 36]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="6" height="6" rx="1.5" transform={`rotate(${i * 23} ${x + 3} ${y + 3})`} fill="#f6d9df" stroke="#c9a14a" strokeWidth="1" />
        ))}
        <path d="M44 72h32" stroke="#e4daf2" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <rect x="50" y="14" width="20" height="14" rx="3" fill="#5e3c99" />
      <path d="M46 28h28v10l8 10v50a8 8 0 0 1-8 8H46a8 8 0 0 1-8-8V48l8-10V28z" fill="#fff" stroke="#5e3c99" strokeWidth="2" strokeLinejoin="round" />
      <rect x="44" y="58" width="32" height="28" rx="4" fill="#f0ebf8" stroke="#d2a649" strokeWidth="1.5" />
      <circle cx="60" cy="72" r="6" fill="none" stroke="#d2a649" strokeWidth="1.5" />
    </svg>
  );
}
