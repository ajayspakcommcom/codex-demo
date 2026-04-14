import Link from "next/link";
import { NoteEditorForm } from "@/src/components/notes/note-editor-form";
import { createEmptyNoteContent } from "@/src/lib/notes/validation";
import { requireSessionOrRedirect } from "@/src/lib/session";

export default async function NewNotePage() {
  await requireSessionOrRedirect();

  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-(--foreground)">Create note</h1>
          <p className="mt-1 text-sm text-(--foreground-muted)">
            Start with a blank note, then keep editing after the first save.
          </p>
        </div>
        <Link
          href="/notes"
          className="rounded-full border border-(--border) px-4 py-2 text-sm font-medium text-(--foreground-muted) transition-colors hover:border-(--accent) hover:text-(--accent)"
        >
          Back to notes
        </Link>
      </header>

      <NoteEditorForm mode="create" initialTitle="" initialContent={createEmptyNoteContent()} />
    </section>
  );
}
