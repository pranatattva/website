// Grants admin access to the account whose email matches adminEmail in site.config.js.
// Called by the dashboard after sign-in, so no SQL is needed to set up the admin.
import { createServiceClient } from "@/lib/supabase/server";
import { json } from "@/lib/validate";
import config from "@/site.config";

export async function POST(req) {
  const sb = createServiceClient();
  if (!sb) return json({ error: "Supabase isn't configured." }, 503);

  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Not signed in." }, 401);

  const { data, error } = await sb.auth.getUser(token);
  const user = data?.user;
  if (error || !user) return json({ error: "Not signed in." }, 401);

  const allowed = String(config.adminEmail || "").trim().toLowerCase();
  if (!allowed || (user.email || "").toLowerCase() !== allowed) return json({ error: "This email isn't the admin email." }, 403);
  if (!user.email_confirmed_at) return json({ error: "Please confirm this email address first." }, 403);

  const { error: upErr } = await sb.from("admins").upsert({ user_id: user.id }, { onConflict: "user_id" });
  if (upErr) return json({ error: upErr.message }, 500);
  return json({ ok: true });
}
