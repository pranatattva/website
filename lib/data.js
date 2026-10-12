import { createPublicClient } from "@/lib/supabase/server";
import * as sample from "@/lib/sample-data";
import { todayISO } from "@/lib/format";

async function run(queryFn, fallback) {
  const sb = createPublicClient();
  if (!sb) return fallback();
  try {
    const { data, error } = await queryFn(sb);
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error("[data] Supabase query failed, showing sample content:", err.message);
    return fallback();
  }
}

const isUpcoming = (start, end) => (end || start) >= todayISO();

export function getClasses({ limit } = {}) {
  return run(
    (sb) => {
      const t = todayISO();
      let q = sb
        .from("classes")
        .select("*")
        .eq("is_published", true)
        .or(`end_date.gte.${t},start_date.gte.${t}`)
        .order("start_date", { ascending: true });
      if (limit) q = q.limit(limit);
      return q;
    },
    () =>
      sample.classes
        .filter((c) => isUpcoming(c.start_date, c.end_date))
        .slice(0, limit || undefined)
  );
}

export function getEvents({ limit } = {}) {
  return run(
    (sb) => {
      let q = sb
        .from("events")
        .select("*")
        .eq("is_published", true)
        .gte("event_date", todayISO())
        .order("event_date", { ascending: true });
      if (limit) q = q.limit(limit);
      return q;
    },
    () => sample.events.filter((e) => isUpcoming(e.event_date)).slice(0, limit || undefined)
  );
}

export async function getUpcoming(limit = 4) {
  const [c, e] = await Promise.all([getClasses(), getEvents()]);
  return [
    ...c.map((x) => ({ ...x, kind: "Class", date: x.start_date })),
    ...e.map((x) => ({ ...x, kind: "Event", date: x.event_date })),
  ]
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .slice(0, limit);
}

export function getPosts({ limit } = {}) {
  return run(
    (sb) => {
      let q = sb
        .from("posts")
        .select("id,title,slug,excerpt,category,author,cover_url,published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (limit) q = q.limit(limit);
      return q;
    },
    () =>
      [...sample.posts]
        .sort((a, b) => (a.published_at < b.published_at ? 1 : -1))
        .slice(0, limit || undefined)
  );
}

export async function getPost(slug) {
  const rows = await run(
    (sb) => sb.from("posts").select("*").eq("slug", slug).eq("is_published", true).limit(1),
    () => sample.posts.filter((p) => p.slug === slug)
  );
  return rows[0] || null;
}

export function getServices() {
  return run(
    (sb) => sb.from("services").select("*").eq("is_active", true).order("sort_order"),
    () => sample.services
  );
}

export function getProducts() {
  return run(
    (sb) => sb.from("products").select("*").eq("is_active", true).order("sort_order"),
    () => sample.products
  );
}
