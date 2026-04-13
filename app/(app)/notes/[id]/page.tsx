import Link from "next/link";

type NoteDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { id } = await params;

  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-(--foreground)">
            Note workspace
          </h1>
          <p className="mt-1 text-sm text-(--foreground-muted)">
            This route is reserved for viewing and editing note
            <span className="px-1 text-(--foreground)">{id}</span>
            once real note loading, autosave, and sharing logic exists.
          </p>
        </div>
        <Link
          href="/notes"
          className="rounded-full border border-(--border) px-4 py-2 text-sm font-medium text-(--foreground-muted) transition-colors hover:border-(--accent) hover:text-(--accent)"
        >
          Back to notes
        </Link>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-(--border) bg-(--surface) p-6">
            <div className="space-y-2">
              <label htmlFor="note-title" className="text-sm font-medium text-(--foreground)">
                Title
              </label>
              <input
                id="note-title"
                type="text"
                disabled
                defaultValue={`Placeholder title for ${id}`}
                className="w-full rounded-2xl border border-(--border) bg-(--background-elevated) px-4 py-3 text-sm text-(--foreground-muted) outline-none"
              />
            </div>
          </section>

          <section className="rounded-3xl border border-dashed border-(--border) bg-(--surface-soft)/50 p-6">
            <h2 className="text-xl font-semibold tracking-tight text-(--foreground)">
              Editor placeholder
            </h2>
            <p className="mt-2 text-sm leading-6 text-(--foreground-muted)">
              The real implementation will mount the note editor here and keep it in sync with
              server actions. No note data is loaded in this scaffold phase.
            </p>
            <div className="mt-5 rounded-2xl border border-(--border) bg-(--surface) p-5">
              <p className="text-sm leading-6 text-(--foreground-muted)">
                Rich-text content area placeholder. No saved content is loaded in this scaffold
                phase.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-(--border) bg-(--surface) p-6">
            <h2 className="text-xl font-semibold tracking-tight text-(--foreground)">
              Note status placeholder
            </h2>
            <p className="mt-2 text-sm leading-6 text-(--foreground-muted)">
              Save state, timestamps, and mutation feedback will appear here once the editor starts
              talking to server actions.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-(--foreground-muted)">
              <span className="rounded-full border border-(--border) px-3 py-1">Saved</span>
              <span className="rounded-full border border-(--border) px-3 py-1">
                Updated timestamp placeholder
              </span>
            </div>
          </section>
        </div>

        <aside className="rounded-3xl border border-dashed border-(--border) bg-(--surface-soft)/50 p-6">
          <h2 className="text-xl font-semibold tracking-tight text-(--foreground)">
            Share controls placeholder
          </h2>
          <p className="mt-2 text-sm leading-6 text-(--foreground-muted)">
            Future share enable, disable, and copy-link controls will live in this panel. The
            current scaffold exposes disabled placeholders only.
          </p>
          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <label htmlFor="share-url" className="text-sm font-medium text-(--foreground)">
                Share URL
              </label>
              <input
                id="share-url"
                type="url"
                disabled
                defaultValue="https://example.com/s/example-token"
                className="w-full rounded-2xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-(--foreground-muted) outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled
                className="rounded-full bg-(--accent) px-4 py-2 text-sm font-semibold text-slate-950 opacity-60"
              >
                Enable sharing
              </button>
              <button
                type="button"
                disabled
                className="rounded-full border border-(--border) px-4 py-2 text-sm font-medium text-(--foreground-muted) opacity-60"
              >
                Disable sharing
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
