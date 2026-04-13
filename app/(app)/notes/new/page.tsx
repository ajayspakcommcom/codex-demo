import Link from "next/link";

export default function NewNotePage() {
  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-(--foreground)">Create note</h1>
          <p className="mt-1 text-sm text-(--foreground-muted)">
            This scaffold reserves the future note-creation workspace. Inputs and actions are
            visible for layout validation only and do not submit or persist anything.
          </p>
        </div>
        <Link
          href="/notes"
          className="rounded-full border border-(--border) px-4 py-2 text-sm font-medium text-(--foreground-muted) transition-colors hover:border-(--accent) hover:text-(--accent)"
        >
          Back to notes
        </Link>
      </header>

      <form className="space-y-6">
        <fieldset disabled className="space-y-6">
          <section className="rounded-3xl border border-(--border) bg-(--surface) p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="flex-1 space-y-2">
                <label htmlFor="new-note-title" className="text-sm font-medium text-(--foreground)">
                  Title
                </label>
                <input
                  id="new-note-title"
                  type="text"
                  placeholder="Untitled note"
                  className="w-full rounded-2xl border border-(--border) bg-(--background-elevated) px-4 py-3 text-sm text-(--foreground-muted) outline-none"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-medium text-(--foreground-muted)">Unsaved changes</p>
                <button
                  type="button"
                  disabled
                  className="rounded-full border border-(--border) px-4 py-2 text-sm font-medium text-(--foreground-muted) opacity-60"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled
                  className="rounded-full bg-(--accent) px-4 py-2 text-sm font-semibold text-slate-950 opacity-60"
                >
                  Save
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-dashed border-(--border) bg-(--surface-soft)/50 p-6">
            <h2 className="text-xl font-semibold tracking-tight text-(--foreground)">
              Editor placeholder
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-(--foreground-muted)">
              A TipTap editor, autosave status, and server actions will be wired into this region
              later. For now it exists only as an accessible, non-interactive placeholder panel.
            </p>
            <div className="mt-5 rounded-2xl border border-(--border) bg-(--surface) p-5">
              <p className="text-sm leading-6 text-(--foreground-muted)">
                Rich-text canvas placeholder. No toolbar, formatting actions, or persistence logic
                is active in this phase.
              </p>
            </div>
          </section>
        </fieldset>
      </form>
    </section>
  );
}
