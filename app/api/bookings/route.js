// Free bookings (discovery calls). Paid bookings go through /api/checkout.
import { createServiceClient } from "@/lib/supabase/server";
import { bookingError, cleanBooking, json } from "@/lib/validate";
import { site } from "@/lib/site";

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return json({ error: "Invalid request." }, 400); }
  if (body?.booking?.company) return json({ ok: true });

  const booking = cleanBooking(body.booking);
  const err = bookingError(booking);
  if (err) return json({ error: err }, 400);

  const sb = createServiceClient();
  if (!sb) return json({ error: `Online booking isn't connected yet. Please call or email ${site.email}.` }, 503);

  const { data: service, error: sErr } = await sb
    .from("services").select("id,name,price,is_active").eq("id", body.serviceId).maybeSingle();
  if (sErr || !service || !service.is_active) return json({ error: "This service is no longer available." }, 404);
  if (service.price !== 0) return json({ error: "This service can't be requested for free. Please use the Book now button or message us." }, 400);

  const { error } = await sb.from("bookings").insert({
    ...booking, service_id: service.id, service_name: service.name, amount: 0, status: "pending",
  });
  if (error) {
    console.error("[bookings]", error);
    return json({ error: "Your request couldn't be saved. Please try again." }, 500);
  }
  return json({ ok: true });
}
