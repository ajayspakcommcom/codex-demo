import Link from "next/link";

export default function NotesLayout({ children }: LayoutProps<"/notes">) {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-lg shadow-black/10">
        <nav
          aria-label="Notes breadcrumb"
          className="flex items-center gap-2 text-sm text-(--foreground-muted)"
        >
          <span>App</span>
          <span className="text-(--border)">/</span>
          <span className="text-(--foreground)">Notes</span>
        </nav>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-(--foreground)">
              Notes layout scaffold
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-(--foreground-muted)">
              This shared layout provides the future notes-area chrome for the index, create, and
              note detail routes. Everything inside remains static dummy content for now.
            </p>
          </div>
          <nav
            aria-label="Notes navigation"
            className="flex flex-wrap items-center gap-3 text-sm font-medium"
          >
            <Link
              href="/notes"
              className="rounded-full border border-(--border) px-4 py-2 text-(--foreground-muted) transition-colors hover:border-(--accent) hover:text-(--accent)"
            >
              All notes
            </Link>
            <Link
              href="/notes/new"
              className="rounded-full border border-(--border) px-4 py-2 text-(--foreground-muted) transition-colors hover:border-(--accent) hover:text-(--accent)"
            >
              Create note
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </section>
  );
}
