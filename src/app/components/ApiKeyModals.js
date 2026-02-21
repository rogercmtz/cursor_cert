"use client";

export default function ApiKeyModals({
  modal,
  formName,
  formType,
  actionLoading,
  onClose,
  onFormNameChange,
  onFormTypeChange,
  onCreateSubmit,
  onUpdateSubmit,
  onDeleteConfirm,
}) {
  return (
    <>
      {/* Create modal */}
      {modal === "create" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Create API key
            </h2>
            <form onSubmit={onCreateSubmit} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="create-name"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Name
                </label>
                <input
                  id="create-name"
                  type="text"
                  value={formName}
                  onChange={(e) => onFormNameChange(e.target.value)}
                  placeholder="e.g. default"
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
                />
              </div>
              <div>
                <label
                  htmlFor="create-type"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Type
                </label>
                <select
                  id="create-type"
                  value={formType}
                  onChange={(e) => onFormTypeChange(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                >
                  <option value="dev">dev</option>
                  <option value="prod">prod</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {actionLoading ? "Creating…" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {modal?.type === "edit" && modal?.key && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Edit API key
            </h2>
            <form onSubmit={onUpdateSubmit} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="edit-name"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  value={formName}
                  onChange={(e) => onFormNameChange(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                />
              </div>
              <div>
                <label
                  htmlFor="edit-type"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Type
                </label>
                <select
                  id="edit-type"
                  value={formType}
                  onChange={(e) => onFormTypeChange(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                >
                  <option value="dev">dev</option>
                  <option value="prod">prod</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {actionLoading ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {modal?.type === "delete" && modal?.key && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Delete API key
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Are you sure you want to delete &quot;{modal.key.name}&quot;? This
              cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onDeleteConfirm}
                disabled={actionLoading}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 dark:bg-red-500 dark:hover:bg-red-600"
              >
                {actionLoading ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
