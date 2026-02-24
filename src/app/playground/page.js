"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "../components/Sidebar.js";

const PLAYGROUND_KEY_STORAGE = "dandi_playground_api_key";

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const key = apiKey.trim();
    if (!key) return;
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(PLAYGROUND_KEY_STORAGE, key);
    }
    router.push("/protected");
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
      <div className="flex flex-1 flex-col min-h-screen">
        <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Pages / API Playground
              </p>
              <h1 className="mt-0.5 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                API Playground
              </h1>
            </div>
            <Link
              href="/dashboards"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              ← Overview
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-auto px-6 py-8">
          <div className="mx-auto max-w-md">
            <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
              Enter your API key to access the protected area.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="playground-api-key"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  API Key
                </label>
                <input
                  id="playground-api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="dandi-dev-..."
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Submit &amp; go to protected
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
