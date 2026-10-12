"use client";
import { useCart } from "@/components/CartProvider";

export default function AddToCart({ product }) {
  const { add } = useCart();
  const out = product.stock !== undefined && product.stock !== null && product.stock <= 0;
  return (
    <button type="button" className="btn btn--sm" onClick={() => add(product)} disabled={out}>
      {out ? "Out of stock" : "Add to cart"}
    </button>
  );
}
