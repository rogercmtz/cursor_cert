"use client";

import Link from "next/link";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboards", icon: "home" },
  { label: "API Playground", href: "/playground", icon: "code" },
  { label: "Use Cases", href: "#", icon: "plus" },
  { label: "Billing", href: "#", icon: "card" },
  { label: "Settings", href: "#", icon: "gear" },
  { label: "Documentation", href: "#", icon: "doc", external: true },
];

function NavIcon({ name, className = "h-4 w-4" }) {
  const c = className;
  switch (name) {
    case "home":
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case "code":
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "plus":
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      );
    case "card":
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case "gear":
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "doc":
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "external":
      return (
        <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ isOpen, onToggle }) {
  return (
    <aside
      className={`flex shrink-0 flex-col border-r border-zinc-200 bg-white transition-[width] duration-200 ease-in-out dark:border-zinc-700 dark:bg-zinc-800 ${
        isOpen ? "w-56" : "w-14"
      }`}
    >
      {/* Header with logo and toggle */}
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-3 dark:border-zinc-700">
        {isOpen ? (
          <>
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              dandi
            </span>
            <button
              type="button"
              onClick={onToggle}
              className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
              aria-label="Collapse sidebar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onToggle}
            className="flex w-full items-center justify-center rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
            aria-label="Expand sidebar"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <>
          <div className="border-b border-zinc-200 px-3 py-3 dark:border-zinc-700">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
              Personal
              <svg className="h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-hidden px-3 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                  item.href === "/dashboards"
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                }`}
              >
                <NavIcon name={item.icon} className="h-4 w-4 shrink-0" />
                {item.label}
                {item.external && <NavIcon name="external" className="ml-auto h-3.5 w-3.5" />}
              </Link>
            ))}
          </nav>
          <div className="border-t border-zinc-200 p-3 dark:border-zinc-700">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-700 dark:bg-zinc-600 dark:text-zinc-200">
                RO
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  rogelico@amdocs.com
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
