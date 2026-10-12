import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anon && !url.includes("YOUR-PROJECT"));

// Read-only client for public pages (row level security applies).
export function createPublicClient() {
  if (!isSupabaseConfigured) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}

// Privileged client for API routes only. Never import into client components.
export function createServiceClient() {
  if (!isSupabaseConfigured || !service) return null;
  return createClient(url, service, { auth: { persistSession: false } });
}
