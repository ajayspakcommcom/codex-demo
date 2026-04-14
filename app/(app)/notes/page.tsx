import Link from "next/link";
import { NotesList } from "@/src/components/notes/notes-list";
import { listNotesByUser } from "@/src/lib/notes/repository";
import { requireSessionOrRedirect } from "@/src/lib/session";

export default async function NotesListPage() {
  const session = await requireSessionOrRedirect();
  const notes = listNotesByUser(session.user.id);

  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-(--foreground)">Your notes</h1>
          <p className="mt-1 text-sm text-(--foreground-muted)">
            Notes are sorted by most recently updated first. Open any note to edit it or manage its
            public share link.
          </p>
        </div>
        <Link
          href="/notes/new"
          className="rounded-full bg-(--accent) px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-(--accent-strong)"
        >
          Create note
        </Link>
      </header>

      <NotesList notes={notes} />
    </section>
  );
}
