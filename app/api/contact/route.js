import { createServiceClient } from "@/lib/supabase/server";
import { clean, isEmail, json } from "@/lib/validate";
import { site } from "@/lib/site";

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return json({ error: "Invalid request." }, 400); }
  if (body.company) return json({ ok: true }); // honeypot: quietly ignore bots

  const msg = {
    name: clean(body.name, 120),
    email: clean(body.email, 160).toLowerCase(),
    phone: clean(body.phone, 20),
    subject: clean(body.subject, 200),
    message: clean(body.message, 4000),
  };
  if (!msg.name || !isEmail(msg.email) || !msg.message) {
    return json({ error: "Please fill in your name, a valid email and a message." }, 400);
  }

  const sb = createServiceClient();
  if (!sb) return json({ error: `The contact form isn't connected yet. Please email ${site.email}.` }, 503);

  const { error } = await sb.from("messages").insert(msg);
  if (error) {
    console.error("[contact]", error);
    return json({ error: `Your message couldn't be saved. Please email ${site.email}.` }, 500);
  }
  return json({ ok: true });
}
