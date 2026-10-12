"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatINR } from "@/lib/format";
import { payWithRazorpay } from "@/lib/razorpay-client";
import { shipping } from "@/lib/site";
import LogoMark from "@/components/LogoMark";

export default function CartView() {
  const { items, ready, subtotal, delivery, total, setQty, clear } = useCart();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  if (!ready) return <p className="muted">Loading your cart…</p>;

  if (status === "done") {
    return (
      <div className="empty" role="status">
        <LogoMark size={96} animated />
        <h3>Thank you, your order is confirmed</h3>
        <p>We'll send dispatch details to your email and phone within two working days.</p>
        <Link href="/shop/products" className="btn">Continue shopping</Link>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="empty">
        <h3>Your cart is empty</h3>
        <p>Browse our cleansing oils and salts, or book a healing session.</p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link href="/shop/products" className="btn">Shop products</Link>
          <Link href="/shop/services" className="btn btn--ghost">Book a session</Link>
        </div>
      </div>
    );
  }

  async function checkout(e) {
    e.preventDefault();
    setError("");
    setStatus("busy");
    const customer = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      await payWithRazorpay(
        { kind: "product", items: items.map((i) => ({ id: i.id, qty: i.qty })), customer },
        { description: `${items.length} item${items.length > 1 ? "s" : ""}` }
      );
      clear();
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  const toFree = shipping.freeAbove - subtotal;

  return (
    <div className="cart-layout">
      <div>
        <h2 style={{ fontSize: "1.5rem" }}>Items</h2>
        <ul className="cart-lines">
          {items.map((i) => (
            <li key={i.id} className="cart-line">
              <div>
                <h3>{i.name}</h3>
                <span className="size">{i.size}{i.size ? ", " : ""}{formatINR(i.price)} each</span>
                <div><button type="button" className="remove" onClick={() => setQty(i.id, 0)}>Remove</button></div>
              </div>
              <div className="qty" role="group" aria-label={`Quantity of ${i.name}`}>
                <button type="button" aria-label="Decrease" onClick={() => setQty(i.id, i.qty - 1)}>−</button>
                <span aria-live="polite">{i.qty}</span>
                <button type="button" aria-label="Increase" onClick={() => setQty(i.id, i.qty + 1)}>+</button>
              </div>
              <strong className="line-total">{formatINR(i.price * i.qty)}</strong>
            </li>
          ))}
        </ul>

        <h2 style={{ fontSize: "1.5rem" }}>Delivery details</h2>
        <form id="checkout" className="form" onSubmit={checkout}>
          <div className="form-grid">
            <div className="field"><label htmlFor="k-name">Full name</label><input id="k-name" name="name" className="input" required autoComplete="name" /></div>
            <div className="field"><label htmlFor="k-phone">Mobile number</label><input id="k-phone" name="phone" type="tel" className="input" required autoComplete="tel" inputMode="tel" pattern="[0-9+\s\-]{10,15}" /></div>
          </div>
          <div className="field"><label htmlFor="k-email">Email</label><input id="k-email" name="email" type="email" className="input" required autoComplete="email" /></div>
          <div className="field"><label htmlFor="k-addr">Address</label><textarea id="k-addr" name="address" className="textarea" rows={2} required autoComplete="street-address" style={{ minHeight: 80 }} /></div>
          <div className="form-grid">
            <div className="field"><label htmlFor="k-city">City</label><input id="k-city" name="city" className="input" required autoComplete="address-level2" /></div>
            <div className="field"><label htmlFor="k-pin">PIN code</label><input id="k-pin" name="pincode" className="input" required inputMode="numeric" pattern="\d{6}" maxLength={6} autoComplete="postal-code" /></div>
          </div>
          <label className="check">
            <input type="checkbox" required />
            <span>I agree to the <Link href="/policies/terms" target="_blank">terms</Link> and <Link href="/policies/refund" target="_blank">refund policy</Link>.</span>
          </label>
        </form>
      </div>

      <aside className="summary" aria-label="Order summary">
        <h2 style={{ fontSize: "1.4rem" }}>Summary</h2>
        <dl>
          <dt>Subtotal</dt><dd>{formatINR(subtotal)}</dd>
          <dt>Delivery</dt><dd>{delivery ? formatINR(delivery) : "Free"}</dd>
          <dt className="total">Total</dt><dd className="total">{formatINR(total)}</dd>
        </dl>
        {toFree > 0 && <p className="small muted">Add {formatINR(toFree)} more for free delivery.</p>}
        {error && <p className="form-msg form-msg--err" role="alert">{error}</p>}
        <button type="submit" form="checkout" className="btn btn--block" disabled={status === "busy"}>
          {status === "busy" ? "Please wait…" : `Pay ${formatINR(total)}`}
        </button>
        <p className="small muted center" style={{ margin: "12px 0 0" }}>Secure payment by Razorpay. UPI, cards and netbanking accepted.</p>
      </aside>
    </div>
  );
}
