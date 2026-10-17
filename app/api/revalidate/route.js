// Refreshes every page as soon as the admin saves a change, instead of waiting.
import { revalidatePath } from "next/cache";
import { createPublicClient } from "@/lib/supabase/server";
import { json } from "@/lib/validate";
import config from "@/site.config";

export async function POST(req) {
  const sb = createPublicClient();
  if (!sb) return json({ error: "Supabase isn't configured." }, 503);
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const { data } = await sb.auth.getUser(token);
  if (!data?.user || (data.user.email || "").toLowerCase() !== String(config.adminEmail).toLowerCase()) {
    return json({ error: "Not allowed." }, 403);
  }
  revalidatePath("/", "layout");
  return json({ ok: true, refreshed: true });
}
