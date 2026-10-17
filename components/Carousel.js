"use client";
import { useEffect, useRef, useState } from "react";

// Horizontal swipe row with arrow buttons (desktop and mobile)
export default function Carousel({ children, label, className = "" }) {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const go = (dir) => {
    const el = track.current;
    el.scrollBy({ left: dir * Math.max(260, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel-track" ref={track} role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <div className="carousel-nav">
        <button type="button" className="carousel-btn" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous">‹</button>
        <button type="button" className="carousel-btn" onClick={() => go(1)} disabled={edge.end} aria-label="Next">›</button>
      </div>
    </div>
  );
}
