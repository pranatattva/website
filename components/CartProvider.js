"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { shipping } from "@/lib/site";

const CartContext = createContext(null);
const KEY = "pranatattva-cart-v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) setItems(saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) return prev.map((i) => (i.id === product.id ? { ...i, qty: Math.min(i.qty + qty, 20) } : i));
      return [...prev, { id: product.id, name: product.name, price: product.price, size: product.size, qty }];
    });
    setToast(`${product.name} added to your cart`);
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 20) } : i))));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const delivery = subtotal === 0 || subtotal >= shipping.freeAbove ? 0 : shipping.flatFee;
    return {
      items,
      ready,
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal,
      delivery,
      total: subtotal + delivery,
      add,
      setQty,
      clear,
    };
  }, [items, ready, add, setQty, clear]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && <div className="toast" role="status">{toast}</div>}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) return { items: [], count: 0, subtotal: 0, delivery: 0, total: 0, add() {}, setQty() {}, clear() {}, ready: false };
  return ctx;
}
