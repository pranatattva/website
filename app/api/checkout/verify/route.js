import crypto from "node:crypto";
import { createServiceClient } from "@/lib/supabase/server";
import { json } from "@/lib/validate";

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return json({ error: "Invalid request." }, 400); }
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = body || {};
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const sb = createServiceClient();
  if (!secret || !sb) return json({ error: "Payments aren't configured." }, 503);
  if (!orderId || !paymentId || !signature) return json({ error: "Missing payment details." }, 400);

  const expected = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(String(signature));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    await sb.from("orders").update({ status: "failed" }).eq("razorpay_order_id", orderId);
    return json({ error: "Payment couldn't be verified. If money was deducted, it will be refunded automatically." }, 400);
  }

  const { data: order, error } = await sb
    .from("orders")
    .update({ status: "paid", razorpay_payment_id: paymentId })
    .eq("razorpay_order_id", orderId)
    .select("id,kind,booking_id,items")
    .single();
  if (error || !order) {
    console.error("[verify]", error);
    return json({ error: "Payment received, but we couldn't update your order. We'll contact you shortly." }, 500);
  }

  if (order.booking_id) {
    await sb.from("bookings").update({ status: "confirmed" }).eq("id", order.booking_id);
  }
  if (order.kind === "product") {
    // Reduce stock for each item (best effort)
    for (const item of order.items || []) {
      if (item.id === "delivery") continue;
      const { data: p } = await sb.from("products").select("stock").eq("id", item.id).maybeSingle();
      if (p && p.stock !== null) {
        await sb.from("products").update({ stock: Math.max(0, p.stock - item.qty) }).eq("id", item.id);
      }
    }
  }
  return json({ ok: true, orderId: order.id });
}
