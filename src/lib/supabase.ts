import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Normalised in next.config.mjs from SUPABASE_PUBLISHABLE_KEY / *_ANON_KEY variants.
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabaseEnabled = Boolean(url && key);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseEnabled || typeof window === "undefined") return null;
  if (!client) {
    client = createClient(url as string, key as string, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "implicit" },
    });
  }
  return client;
}
