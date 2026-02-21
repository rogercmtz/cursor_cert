"use client";

import Icon from "./Icon.js";
import { maskKey } from "../../lib/api-keys.js";

export default function ApiKeysTable({
  keys,
  revealedId,
  onRevealToggle,
  onCopy,
  onEdit,
  onDelete,
  onAddKey,
}) {
  function displayKey(item) {
    if (revealedId === item.id) return item.key;
    return maskKey(item.key, item.type || "dev");
  }

  if (keys.length === 0) {
    return (
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            API Keys
          </h2>
          <button
            type="button"
            onClick={onAddKey}
            className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Icon name="plus" className="h-4 w-4" />
            Add key
          </button>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">
            No API keys yet. Create one to get started.
          </p>
          <button
            type="button"
            onClick={onAddKey}
            className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Create your first key
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          API Keys
        </h2>
        <button
          type="button"
          onClick={onAddKey}
          className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <Icon name="plus" className="h-4 w-4" />
          Add key
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/80">
              <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                Name
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                Type
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                Usage
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                Key
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {keys.map((item) => (
              <tr
                key={item.id}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-700/50"
              >
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  {item.name}
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {item.type || "dev"}
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {item.usage ?? 0}
                </td>
                <td className="px-4 py-3 font-mono text-zinc-600 dark:text-zinc-400">
                  {displayKey(item)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onRevealToggle(item.id)}
                      className="rounded p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
                      title={revealedId === item.id ? "Hide key" : "Reveal key"}
                    >
                      <Icon
                        name={revealedId === item.id ? "eyeOff" : "eye"}
                        className="h-4 w-4"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => onCopy(item.key)}
                      className="rounded p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
                      title="Copy key"
                    >
                      <Icon name="copy" className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="rounded p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
                      title="Edit"
                    >
                      <Icon name="pencil" className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="rounded p-1.5 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                      title="Delete"
                    >
                      <Icon name="trash" className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
