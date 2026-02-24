"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar.js";
import { NotificationsProvider, useNotifications } from "../components/Notifications.js";
import { supabase } from "../../lib/supabase.js";

const PLAYGROUND_KEY_STORAGE = "dandi_playground_api_key";

function ProtectedContent() {
  const { showToast } = useNotifications();
  const [validated, setValidated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const didValidateRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || didValidateRef.current) return;
    didValidateRef.current = true;
    const key = window.sessionStorage.getItem(PLAYGROUND_KEY_STORAGE);
    window.sessionStorage.removeItem(PLAYGROUND_KEY_STORAGE);

    if (!key || !key.trim()) {
      showToast("No API key provided. Go to Playground to submit one.", "danger");
      setValidated(true);
      return;
    }

    async function validate() {
      if (!supabase) {
        showToast("API key validation is not available. Configure Supabase.", "danger");
        setValidated(true);
        return;
      }
      const { data, error } = await supabase
        .from("api_keys")
        .select("id")
        .eq("key", key.trim())
        .maybeSingle();

      if (error) {
        showToast("API key is invalid", "danger");
        setValidated(true);
        return;
      }
      if (data) {
        showToast("Valid API key, /protected can be accessed", "success");
      } else {
        showToast("API key is invalid", "danger");
      }
      setValidated(true);
    }

    validate();
  }, [showToast]);

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
      <div className="flex flex-1 flex-col min-h-screen">
        <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Pages / Protected
              </p>
              <h1 className="mt-0.5 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Protected
              </h1>
            </div>
            <Link
              href="/playground"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              ← Back to Playground
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-auto px-6 py-8">
          <div className="mx-auto max-w-md">
            {validated ? (
              <p className="text-zinc-600 dark:text-zinc-400">
                This page is protected. Check the notification above for API key validation result.
              </p>
            ) : (
              <p className="text-zinc-500 dark:text-zinc-400">
                Validating API key...
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ProtectedPage() {
  return (
    <NotificationsProvider>
      <ProtectedContent />
    </NotificationsProvider>
  );
}
