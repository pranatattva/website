"use client";
import { useEffect, useState } from "react";

// Capsule links that highlight whichever section is on screen
export default function JumpCapsules({ items }) {
  const [active, setActive] = useState(items[0].id);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [items]);
  return (
    <div className="capsule-bar">
      <nav className="capsules" aria-label="Jump to section">
        {items.map((i) => (
          <a key={i.id} href={`#${i.id}`} aria-pressed={active === i.id} onClick={() => setActive(i.id)}>{i.label}</a>
        ))}
      </nav>
    </div>
  );
}
