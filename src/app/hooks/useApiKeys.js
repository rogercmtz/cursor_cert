"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase.js";
import { generateApiKey, rowToKey } from "../../lib/api-keys.js";

export function useApiKeys() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchKeys = useCallback(async () => {
    setLoading(true);
    if (!supabase) {
      setError(
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
      );
      setKeys([]);
      setLoading(false);
      return;
    }
    setError(null);
    const { data, error: err } = await supabase
      .from("api_keys")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) {
      setError(err.message);
      setKeys([]);
    } else {
      setKeys((data ?? []).map(rowToKey));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  const createKey = useCallback(
    async (payload) => {
      if (!supabase) return { ok: false };
      setActionLoading(true);
      setError(null);
      const name = (payload.name ?? "").trim() || "default";
      const type = payload.type ?? "dev";
      const keyValue = generateApiKey(type);
      const { data, error: err } = await supabase
        .from("api_keys")
        .insert({ name, type, key: keyValue, usage: 0 })
        .select()
        .single();
      setActionLoading(false);
      if (err) {
        setError(err.message);
        return { ok: false };
      }
      setKeys((prev) => [rowToKey(data), ...prev]);
      return { ok: true };
    },
    []
  );

  const updateKey = useCallback(
    async (payload) => {
      if (!supabase || !payload?.id) return { ok: false };
      setActionLoading(true);
      setError(null);
      const { id, name, type } = payload;
      const { data, error: err } = await supabase
        .from("api_keys")
        .update({ name: (name ?? "").trim() || "default", type: type ?? "dev" })
        .eq("id", id)
        .select()
        .single();
      setActionLoading(false);
      if (err) {
        setError(err.message);
        return { ok: false };
      }
      setKeys((prev) => prev.map((k) => (k.id === id ? rowToKey(data) : k)));
      return { ok: true };
    },
    []
  );

  const deleteKey = useCallback(async (id) => {
    if (!supabase) return { ok: false };
    setActionLoading(true);
    setError(null);
    const { error: err } = await supabase.from("api_keys").delete().eq("id", id);
    setActionLoading(false);
    if (err) {
      setError(err.message);
      return { ok: false };
    }
    setKeys((prev) => prev.filter((k) => k.id !== id));
    return { ok: true };
  }, []);

  return {
    keys,
    loading,
    error,
    actionLoading,
    fetchKeys,
    createKey,
    updateKey,
    deleteKey,
  };
}
