"use client";
import { createBrowserClient } from "@supabase/ssr";

let client;
export function getBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  if (!client) client = createBrowserClient(url, anon);
  return client;
}
