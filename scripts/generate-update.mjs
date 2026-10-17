// Builds supabase/update-oct-2026.sql (schema changes + the two new blog posts)
import { writeFileSync, readFileSync, mkdirSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
mkdirSync(".tmp", { recursive: true });
writeFileSync(".tmp/sample.mjs", readFileSync("lib/sample-data.js", "utf8"));
const data = await import(pathToFileURL(".tmp/sample.mjs").href);
rmSync(".tmp", { recursive: true, force: true });
const q = (v) => (v === null || v === undefined || v === "" ? "null" : typeof v === "boolean" || typeof v === "number" ? String(v) : `'${String(v).replace(/'/g, "''")}'`);
const cols = ["title","slug","excerpt","content","category","author","cover_url","published_at","is_published"];
const posts = data.newPosts.map((r) => `  (${cols.map((c) => q(r[c])).join(", ")})`).join(",\n");

const sql = `-- ================================================================
--  Pranatattva update (October 2026). Run ONCE in Supabase > SQL Editor.
--  Safe to run again: it only adds what is missing.
-- ================================================================

-- Prices are optional now (empty = "Message us on WhatsApp")
alter table public.services alter column price drop not null;
alter table public.products alter column price drop not null;

-- Discounted price for products
alter table public.products add column if not exists sale_price integer;

-- "Past" switch for courses and events
alter table public.classes add column if not exists is_past boolean not null default false;
alter table public.events  add column if not exists is_past boolean not null default false;

-- Gallery (in case it wasn't created yet)
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  album text,
  taken_on date,
  sort_order integer default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.gallery enable row level security;
drop policy if exists "public read gallery" on public.gallery;
create policy "public read gallery" on public.gallery for select using (is_published or public.is_admin());
drop policy if exists "admin write gallery" on public.gallery;
create policy "admin write gallery" on public.gallery for all using (public.is_admin()) with check (public.is_admin());

-- Testimonials (9:16 screenshots)
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  category text,
  name text,
  sort_order integer default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.testimonials enable row level security;
drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials for select using (is_published or public.is_admin());
drop policy if exists "admin write testimonials" on public.testimonials;
create policy "admin write testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());

-- New blog posts: Pranic Facial and Body Sculpting
insert into public.posts (${cols.join(", ")}) values
${posts}
on conflict (slug) do nothing;
`;
writeFileSync("supabase/update-oct-2026.sql", sql);
console.log("Wrote supabase/update-oct-2026.sql");
