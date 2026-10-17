"use client";
// Tells the website to rebuild its pages right away after an admin change
export async function refreshLiveSite(sb) {
  try {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) return;
    await fetch("/api/revalidate", { method: "POST", headers: { Authorization: `Bearer ${session.access_token}` } });
  } catch {}
}
