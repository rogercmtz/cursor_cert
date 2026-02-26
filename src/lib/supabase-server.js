import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for use in API routes (e.g. NextAuth callbacks).
 * Uses same env vars as client; use SUPABASE_SERVICE_ROLE_KEY for stricter RLS if needed.
 */
function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/**
 * Upsert a user by email. Inserts on first login, updates name/image on subsequent logins.
 * @returns {{ ok: boolean, error?: string }}
 */
export async function upsertUser({ email, name, image, providerId }) {
  const supabase = getServerSupabase();
  if (!supabase) {
    return { ok: false, error: "Supabase not configured (missing URL or key)" };
  }
  if (!email) {
    return { ok: false, error: "Missing email" };
  }

  const { data, error } = await supabase
    .from("users")
    .upsert(
      {
        email: email.trim().toLowerCase(),
        name: name ?? null,
        image: image ?? null,
        provider_id: providerId ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    )
    .select();

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, data };
}
