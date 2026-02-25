import { createClient } from "@supabase/supabase-js";

/**
 * Validates the given API key against the api_keys table in Supabase.
 * Returns { valid, message, error? }.
 */
export async function validateApiKey(apiKey) {
  const key = (apiKey ?? "").trim();
  if (!key) {
    return { valid: false, error: "Missing apiKey." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return { valid: false, error: "Server not configured for validation." };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    // Validate against Supabase api_keys table (same keys created in the dashboard)
    const { data, error } = await supabase
      .from("api_keys")
      .select("id")
      .eq("key", key)
      .maybeSingle();

    if (error) {
      return { valid: false, error: error.message };
    }

    return {
      valid: !!data,
      message: data ? "Valid API key." : "API key is invalid.",
    };
  } catch (err) {
    const msg = err?.message ?? String(err);
    // Often caused by corporate proxy / self-signed cert; suggest NODE_TLS_REJECT_UNAUTHORIZED=0
    if (msg.includes("fetch failed") || msg.includes("certificate") || msg.includes("UNABLE_TO_VERIFY")) {
      return {
        valid: false,
        error: "Network error talking to Supabase (often TLS/proxy). Try running with: NODE_TLS_REJECT_UNAUTHORIZED=0",
      };
    }
    return { valid: false, error: msg };
  }
}
