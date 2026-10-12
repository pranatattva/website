// Regenerates supabase/seed.sql from lib/sample-data.js
import { writeFileSync, readFileSync, mkdirSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";

mkdirSync(".tmp", { recursive: true });
writeFileSync(".tmp/sample.mjs", readFileSync("lib/sample-data.js", "utf8"));
const data = await import(pathToFileURL(".tmp/sample.mjs").href);
rmSync(".tmp", { recursive: true, force: true });

const q = (v) => {
  if (v === null || v === undefined || v === "") return "null";
  if (typeof v === "boolean" || typeof v === "number") return String(v);
  if (Array.isArray(v)) return `array[${v.map(q).join(", ")}]::text[]`;
  return `'${String(v).replace(/'/g, "''")}'`;
};
const rows = (table, list, cols) =>
  `insert into public.${table} (${cols.join(", ")}) values\n` +
  list.map((r) => `  (${cols.map((c) => q(r[c])).join(", ")})`).join(",\n") +
  ";\n";

const sql = [
  "-- Sample content. Run after schema.sql. Safe to edit or delete later from the admin dashboard.\n",
  rows("classes", data.classes, ["title","level","description","start_date","end_date","time_text","mode","venue","instructor","fee","seats","registration_url","image_url","is_published"]),
  rows("events", data.events, ["title","description","event_date","time_text","venue","mode","fee","registration_url","image_url","is_published"]),
  rows("services", data.services, ["name","slug","category","description","duration","sessions","price","features","is_active","sort_order"]),
  rows("products", data.products, ["name","slug","category","description","size","price","stock","image_url","is_active","sort_order"]),
  rows("posts", data.posts, ["title","slug","excerpt","content","category","author","cover_url","published_at","is_published"]),
].join("\n");

writeFileSync("supabase/seed.sql", sql);
console.log("Wrote supabase/seed.sql");
