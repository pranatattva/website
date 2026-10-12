"use client";
import { useState } from "react";
import AddToCart from "@/components/AddToCart";
import { ProductArt } from "@/components/Art";
import { formatINR } from "@/lib/format";

export default function ProductGrid({ products }) {
  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <>
      <div className="filter-row" role="group" aria-label="Filter products">
        {cats.map((c) => (
          <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="products">
        {shown.map((p) => (
          <article key={p.id} className="product">
            <div className={`product-media ${p.category === "Salts" ? "is-salt" : ""}`}>
              {p.image_url ? <img src={p.image_url} alt={p.name} loading="lazy" /> : <ProductArt category={p.category} />}
            </div>
            <div className="product-body">
              <span className="cat">{p.category}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="product-foot">
                <div>
                  <span className="price">{formatINR(p.price)}</span>
                  {p.size && <span className="size">{p.size}</span>}
                </div>
                <AddToCart product={p} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
