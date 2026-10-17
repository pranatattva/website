"use client";
import { useRef, useState } from "react";
import Carousel from "@/components/Carousel";
import { Close } from "@/components/Icons";

// 9:16 screenshot testimonials. Shows labelled placeholders until real ones are added.
export default function TestimonialSlider({ items, placeholders }) {
  const dlg = useRef(null);
  const [current, setCurrent] = useState(null);
  const list = items.length ? items : placeholders.map((c, i) => ({ id: `ph-${i}`, category: c, placeholder: true }));

  return (
    <>
      <Carousel label="Testimonials">
        {list.map((t) => (
          <figure key={t.id} className="t-card">
            {t.placeholder ? (
              <div className="t-frame t-frame--empty" aria-hidden="true">
                <span>Testimonial screenshot</span>
                <small>9:16</small>
              </div>
            ) : (
              <button type="button" className="t-frame" onClick={() => { setCurrent(t); dlg.current?.showModal(); }} aria-label={`Open testimonial${t.category ? ` for ${t.category}` : ""}`}>
                <img src={t.image_url} alt={`Client message${t.category ? `, ${t.category}` : ""}`} loading="lazy" />
              </button>
            )}
            <figcaption>
              {t.category && <span className="t-cat">{t.category}</span>}
              {t.name && <span className="t-name">{t.name}</span>}
            </figcaption>
          </figure>
        ))}
      </Carousel>
      <dialog ref={dlg} className="lightbox" onClose={() => setCurrent(null)} onClick={(e) => e.target === dlg.current && dlg.current.close()}>
        {current && (
          <figure>
            <img src={current.image_url} alt="" />
            {current.category && <figcaption>{current.category}</figcaption>}
          </figure>
        )}
        <button type="button" className="lb-btn lb-close" aria-label="Close" onClick={() => dlg.current.close()}><Close /></button>
      </dialog>
    </>
  );
}
