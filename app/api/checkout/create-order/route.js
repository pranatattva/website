import { createServiceClient } from "@/lib/supabase/server";
import { bookingError, clean, cleanBooking, isEmail, isPhone, json } from "@/lib/validate";
import { shipping } from "@/lib/site";
import { effectivePrice } from "@/lib/format";

const KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const SECRET = process.env.RAZORPAY_KEY_SECRET;

async function createRazorpayOrder(amountPaise, receipt, notes) {
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(`${KEY_ID}:${SECRET}`).toString("base64"),
    },
    body: JSON.stringify({ amount: amountPaise, currency: "INR", receipt, notes }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.description || "Razorpay order failed");
  return data;
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return json({ error: "Invalid request." }, 400); }

  const sb = createServiceClient();
  if (!sb || !KEY_ID || !SECRET) {
    return json({ error: "Online payments aren't switched on yet. Please contact us to book or order." }, 503);
  }

  try {
    // ----- Paid healing service -----
    if (body.kind === "service") {
      if (body?.booking?.company) return json({ error: "Invalid request." }, 400);
      const booking = cleanBooking(body.booking);
      const err = bookingError(booking);
      if (err) return json({ error: err }, 400);

      const { data: service } = await sb
        .from("services").select("id,name,price,is_active").eq("id", body.serviceId).maybeSingle();
      if (!service || !service.is_active) return json({ error: "This service is no longer available." }, 404);
      if (service.price === null || service.price === undefined) return json({ error: "Please message us on WhatsApp to book this service." }, 400);
      if (service.price === 0) return json({ error: "This service is free. Please use the request form." }, 400);

      const amount = service.price * 100;
      const { data: b, error: bErr } = await sb.from("bookings").insert({
        ...booking, service_id: service.id, service_name: service.name, amount: service.price, status: "awaiting_payment",
      }).select("id").single();
      if (bErr) throw bErr;

      const rzp = await createRazorpayOrder(amount, `bk_${b.id.slice(0, 30)}`, { booking_id: b.id, service: service.name });
      const { error: oErr } = await sb.from("orders").insert({
        kind: "service", razorpay_order_id: rzp.id, amount, status: "created",
        customer_name: booking.name, customer_email: booking.email, customer_phone: booking.phone,
        items: [{ id: service.id, name: service.name, price: service.price, qty: 1 }], booking_id: b.id,
      });
      if (oErr) throw oErr;

      return json({ orderId: rzp.id, amount, currency: "INR", keyId: KEY_ID,
        prefill: { name: booking.name, email: booking.email, contact: booking.phone } });
    }

    // ----- Products -----
    if (body.kind === "product") {
      const c = body.customer || {};
      const customer = {
        name: clean(c.name, 120), email: clean(c.email, 160).toLowerCase(), phone: clean(c.phone, 20),
        address: clean(c.address, 400), city: clean(c.city, 80), pincode: clean(c.pincode, 10),
      };
      if (!customer.name || !isEmail(customer.email) || !isPhone(customer.phone))
        return json({ error: "Please check your name, email and mobile number." }, 400);
      if (!customer.address || !customer.city || !/^\d{6}$/.test(customer.pincode))
        return json({ error: "Please enter a full delivery address with a 6-digit PIN code." }, 400);

      const wanted = (Array.isArray(body.items) ? body.items : [])
        .map((i) => ({ id: String(i.id), qty: Math.max(1, Math.min(20, parseInt(i.qty, 10) || 1)) }))
        .slice(0, 30);
      if (!wanted.length) return json({ error: "Your cart is empty." }, 400);

      const { data: products, error: pErr } = await sb
        .from("products").select("id,name,price,sale_price,size,stock,is_active").in("id", wanted.map((w) => w.id));
      if (pErr) throw pErr;

      const lines = [];
      for (const w of wanted) {
        const p = products.find((x) => x.id === w.id);
        if (!p || !p.is_active) return json({ error: "An item in your cart is no longer available. Please remove it and try again." }, 409);
        if (p.stock !== null && p.stock < w.qty) return json({ error: `Only ${p.stock} of ${p.name} left in stock.` }, 409);
        const price = effectivePrice(p);
        if (price === null) return json({ error: `${p.name} is available on request. Please message us on WhatsApp.` }, 409);
        lines.push({ id: p.id, name: p.name, size: p.size, price, qty: w.qty });
      }
      const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
      const delivery = subtotal >= shipping.freeAbove ? 0 : shipping.flatFee;
      const amount = (subtotal + delivery) * 100;

      const rzp = await createRazorpayOrder(amount, `pr_${Date.now()}`, { customer: customer.name });
      const { error: oErr } = await sb.from("orders").insert({
        kind: "product", razorpay_order_id: rzp.id, amount, status: "created",
        customer_name: customer.name, customer_email: customer.email, customer_phone: customer.phone,
        shipping_address: `${customer.address}, ${customer.city} – ${customer.pincode}`,
        items: [...lines, ...(delivery ? [{ id: "delivery", name: "Delivery", price: delivery, qty: 1 }] : [])],
      });
      if (oErr) throw oErr;

      return json({ orderId: rzp.id, amount, currency: "INR", keyId: KEY_ID,
        prefill: { name: customer.name, email: customer.email, contact: customer.phone } });
    }

    return json({ error: "Unknown order type." }, 400);
  } catch (e) {
    console.error("[create-order]", e);
    return json({ error: "Couldn't start the payment. Please try again in a moment." }, 500);
  }
}
