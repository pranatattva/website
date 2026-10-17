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
    // Once Supabase is connected, never show sample content on the live site
    console.error("[data] Supabase query failed:", err.message);
    return [];
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
        .eq("is_past", false)
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
        .eq("is_past", false)
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
    ...c.map((x) => ({ ...x, kind: "Course", date: x.start_date })),
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
      [...sample.posts, ...sample.newPosts]
        .sort((a, b) => (a.published_at < b.published_at ? 1 : -1))
        .slice(0, limit || undefined)
  );
}

export async function getPost(slug) {
  const rows = await run(
    (sb) => sb.from("posts").select("*").eq("slug", slug).eq("is_published", true).limit(1),
    () => [...sample.posts, ...sample.newPosts].filter((p) => p.slug === slug)
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

// ---------- Past classes and events (for the "Past" tab) ----------
export function getPastClasses({ limit = 24 } = {}) {
  return run(
    (sb) => {
      const t = todayISO();
      return sb
        .from("classes")
        .select("*")
        .eq("is_published", true)
        .or(`is_past.eq.true,and(start_date.lt.${t},or(end_date.is.null,end_date.lt.${t}))`)
        .order("start_date", { ascending: false })
        .limit(limit);
    },
    () =>
      sample.pastClasses
        .filter((c) => !isUpcoming(c.start_date, c.end_date))
        .slice(0, limit)
  );
}

export function getPastEvents({ limit = 24 } = {}) {
  return run(
    (sb) =>
      sb
        .from("events")
        .select("*")
        .eq("is_published", true)
        .or(`is_past.eq.true,event_date.lt.${todayISO()}`)
        .order("event_date", { ascending: false })
        .limit(limit),
    () => sample.pastEvents.filter((e) => !isUpcoming(e.event_date)).slice(0, limit)
  );
}

// ---------- Gallery ----------
export function getGallery({ limit } = {}) {
  return run(
    (sb) => {
      let q = sb
        .from("gallery")
        .select("id,image_url,caption,album,taken_on")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("taken_on", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      if (limit) q = q.limit(limit);
      return q;
    },
    () => []
  );
}

// ---------- Testimonials ----------
export function getTestimonials() {
  return run(
    (sb) => sb.from("testimonials").select("id,image_url,category,name").eq("is_published", true).order("sort_order").order("created_at", { ascending: false }),
    () => []
  );
}
