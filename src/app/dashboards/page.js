"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Sidebar from "../components/Sidebar.js";
import { NotificationsProvider, useNotifications } from "../components/Notifications.js";
import { useApiKeys } from "../hooks/useApiKeys.js";
import ApiKeysTable from "../components/ApiKeysTable.js";
import ApiKeyModals from "../components/ApiKeyModals.js";

function DashboardsPage() {
  const {
    keys,
    loading,
    error,
    actionLoading,
    fetchKeys,
    createKey,
    updateKey,
    deleteKey,
  } = useApiKeys();
  const { showToast } = useNotifications();
  const { data: session } = useSession();

  const [modal, setModal] = useState(null);
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState("dev");
  const [revealedId, setRevealedId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const openCreate = () => {
    setModal("create");
    setFormName("");
    setFormType("dev");
  };

  const openEdit = (item) => {
    setModal({ type: "edit", key: item });
    setFormName(item.name);
    setFormType(item.type || "dev");
  };

  const openDelete = (item) => {
    setModal({ type: "delete", key: item });
  };

  const closeModal = () => setModal(null);

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await createKey({
      name: formName.trim() || "default",
      type: formType,
    });
    if (res?.ok) {
      showToast("API key created");
      closeModal();
      setFormName("");
      setFormType("dev");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!modal?.key) return;
    const res = await updateKey({
      id: modal.key.id,
      name: formName.trim() || modal.key.name,
      type: formType,
    });
    if (res?.ok) {
      showToast("API key updated");
      closeModal();
      setFormName("");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!modal?.key) return;
    const id = modal.key.id;
    const res = await deleteKey(id);
    if (res?.ok) {
      showToast("API key deleted", "danger");
      closeModal();
    }
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    showToast("Copied API Key to clipboard");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  const errorBanner = error && (
    <div className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
      <span>{error}</span>
      <button
        type="button"
        onClick={() => {
          fetchKeys();
        }}
        className="shrink-0 rounded px-2 py-1 font-medium hover:bg-red-100 dark:hover:bg-red-900/40"
      >
        Retry
      </button>
    </div>
  );

  const totalUsage = keys.reduce((s, k) => s + (k.usage ?? 0), 0);

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />

      <div className="flex flex-1 flex-col min-h-screen">
        <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Pages / Overview
              </p>
              <h1 className="mt-0.5 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Overview
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {session?.user && (
                <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 pl-2 pr-3 py-1.5 dark:border-zinc-600 dark:bg-zinc-700/50">
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt=""
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    {session.user.name ?? session.user.email}
                  </span>
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                  >
                    Sign out
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Operational
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a href="#" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400" aria-label="GitHub">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400" aria-label="Twitter">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400" aria-label="Email">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
              </div>
              <button
                type="button"
                onClick={() => setDarkMode((d) => !d)}
                className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
                aria-label="Toggle dark mode"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto px-6 py-6">
          {errorBanner}
          <div className="mb-6 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
            Official Dandi API dashboard — manage API keys and usage from one place.
          </div>

          <section className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Current plan
                </p>
                <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Developer
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
              >
                Manage Plan
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">API Usage</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {totalUsage} / 1,000 Credits
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div
                  className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100"
                  style={{ width: `${Math.min(100, (totalUsage / 1000) * 100)}%` }}
                />
              </div>
            </div>
          </section>

          <ApiKeysTable
            keys={keys}
            revealedId={revealedId}
            onRevealToggle={(id) => setRevealedId((r) => (r === id ? null : id))}
            onCopy={handleCopyKey}
            onEdit={openEdit}
            onDelete={openDelete}
            onAddKey={openCreate}
          />
        </main>
      </div>

      <ApiKeyModals
        modal={modal}
        formName={formName}
        formType={formType}
        actionLoading={actionLoading}
        onClose={closeModal}
        onFormNameChange={setFormName}
        onFormTypeChange={setFormType}
        onCreateSubmit={handleCreate}
        onUpdateSubmit={handleUpdate}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

function DashboardsPageWithNotifications() {
  return (
    <NotificationsProvider>
      <DashboardsPage />
    </NotificationsProvider>
  );
}

export default DashboardsPageWithNotifications;
