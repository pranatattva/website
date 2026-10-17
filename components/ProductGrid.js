"use client";
import { useState } from "react";
import AddToCart from "@/components/AddToCart";
import { ProductArt } from "@/components/Art";
import { effectivePrice, formatINR } from "@/lib/format";
import { waLink } from "@/lib/site";
import { WhatsApp } from "@/components/Icons";

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
                  {p.price === null || p.price === undefined ? (
                    <span className="price price--ask">Price on request</span>
                  ) : effectivePrice(p) < p.price ? (
                    <span className="price-wrap">
                      <span className="price">{formatINR(effectivePrice(p))}</span>
                      <s className="price-old">{formatINR(p.price)}</s>
                      <span className="price-off">{Math.round((1 - effectivePrice(p) / p.price) * 100)}% off</span>
                    </span>
                  ) : (
                    <span className="price">{formatINR(p.price)}</span>
                  )}
                  {p.size && <span className="size">{p.size}</span>}
                </div>
                {p.price === null || p.price === undefined ? (
                  <a className="btn btn--sm btn--wa" href={waLink(`Hi Pranatattva, I'd like to order ${p.name}.`)} target="_blank" rel="noopener noreferrer"><WhatsApp width={15} height={15} />Ask</a>
                ) : (
                  <AddToCart product={{ ...p, price: effectivePrice(p) }} />
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
