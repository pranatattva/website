"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Close } from "@/components/Icons";

export default function GalleryGrid({ photos, showFilters = true }) {
  const albums = useMemo(() => ["All", ...Array.from(new Set(photos.map((p) => p.album).filter(Boolean)))], [photos]);
  const [album, setAlbum] = useState("All");
  const [index, setIndex] = useState(-1);
  const dlg = useRef(null);
  const shown = album === "All" ? photos : photos.filter((p) => p.album === album);

  const open = (i) => { setIndex(i); dlg.current?.showModal(); };
  const step = useCallback((d) => setIndex((i) => (i + d + shown.length) % shown.length), [shown.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (!dlg.current?.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const current = shown[index];

  return (
    <>
      {showFilters && albums.length > 2 && (
        <div className="capsule-bar" style={{ position: "static" }}>
          <div className="capsules" role="group" aria-label="Filter by album" style={{ flexWrap: "wrap", justifyContent: "center", borderRadius: 28 }}>
            {albums.map((a) => (
              <button key={a} type="button" aria-pressed={album === a} onClick={() => setAlbum(a)}>{a}</button>
            ))}
          </div>
        </div>
      )}
      <ul className="gallery">
        {shown.map((p, i) => (
          <li key={p.id}>
            <button type="button" className="gallery-item" onClick={() => open(i)} aria-label={`Open photo${p.caption ? `: ${p.caption}` : ""}`}>
              <img src={p.image_url} alt={p.caption || "Pranatattva moment"} loading="lazy" />
              {p.caption && <span className="gallery-cap">{p.caption}</span>}
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={dlg} className="lightbox" onClose={() => setIndex(-1)} onClick={(e) => e.target === dlg.current && dlg.current.close()}>
        {current && (
          <figure>
            <img src={current.image_url} alt={current.caption || ""} />
            {(current.caption || current.album) && (
              <figcaption>{current.caption}{current.caption && current.album ? ", " : ""}<span>{current.album}</span></figcaption>
            )}
          </figure>
        )}
        <button type="button" className="lb-btn lb-close" aria-label="Close" onClick={() => dlg.current.close()}><Close /></button>
        {shown.length > 1 && (
          <>
            <button type="button" className="lb-btn lb-prev" aria-label="Previous photo" onClick={() => step(-1)}>‹</button>
            <button type="button" className="lb-btn lb-next" aria-label="Next photo" onClick={() => step(1)}>›</button>
          </>
        )}
      </dialog>
    </>
  );
}
