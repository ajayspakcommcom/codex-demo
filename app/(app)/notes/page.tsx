import Link from "next/link";

const placeholderNotes = [
  {
    title: "Quarterly planning",
    description: "Static card representing how note previews will appear in the main list.",
  },
  {
    title: "Untitled note",
    description: "Blank titles will eventually fall back to a generated label in the real app.",
  },
] as const;

export default function NotesListPage() {
  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-(--foreground)">Your notes</h1>
          <p className="mt-1 text-sm text-(--foreground-muted)">
            The final route will list the current user&apos;s notes sorted by
            <span className="px-1 text-(--foreground)">updated_at DESC</span>. This version renders
            sample cards and the required empty state as static placeholders.
          </p>
        </div>
        <Link
          href="/notes/new"
          className="rounded-full bg-(--accent) px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-(--accent-strong)"
        >
          Open create note scaffold
        </Link>
      </header>

      <section
        aria-labelledby="sample-notes-heading"
        className="rounded-3xl border border-(--border) bg-(--surface) p-6"
      >
        <h2
          id="sample-notes-heading"
          className="text-xl font-semibold tracking-tight text-(--foreground)"
        >
          Sample note list
        </h2>
        <p className="mt-2 text-sm leading-6 text-(--foreground-muted)">
          These cards are static examples of the future list layout and not backed by stored note
          data.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {placeholderNotes.map((note) => (
            <article
              key={note.title}
              className="rounded-2xl border border-(--border) bg-(--surface-soft)/60 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-medium text-(--foreground)">{note.title}</h3>
                <span className="rounded-full border border-(--border) px-3 py-1 text-xs uppercase tracking-[0.18em] text-(--foreground-muted)">
                  Placeholder
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-(--foreground-muted)">{note.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="empty-state-heading"
        className="rounded-3xl border border-dashed border-(--border) bg-(--surface-soft)/50 p-6"
      >
        <h2
          id="empty-state-heading"
          className="text-xl font-semibold tracking-tight text-(--foreground)"
        >
          Empty state placeholder
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-(--foreground-muted)">
          The real app will show an empty-state prompt when the user has no notes yet. This static
          panel is included now because the spec explicitly requires that state to exist.
        </p>
        <Link
          href="/notes/new"
          className="mt-4 inline-flex items-center text-sm font-semibold text-(--accent) underline underline-offset-4"
        >
          Preview the create note route
        </Link>
      </section>
    </section>
  );
}
