import Link from "next/link";
import { notFound } from "next/navigation";
import { NoteEditorForm } from "@/src/components/notes/note-editor-form";
import { getNoteByIdForUser } from "@/src/lib/notes/repository";
import { requireSessionOrRedirect } from "@/src/lib/session";

type NoteDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const [{ id }, session] = await Promise.all([params, requireSessionOrRedirect()]);
  const note = getNoteByIdForUser(id, session.user.id);

  if (!note) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-(--foreground)">Edit note</h1>
          <p className="mt-1 text-sm text-(--foreground-muted)">
            Changes autosave after a short delay. You can also save manually, delete the note, or
            manage its share link from this page.
          </p>
        </div>
        <Link
          href="/notes"
          className="rounded-full border border-(--border) px-4 py-2 text-sm font-medium text-(--foreground-muted) transition-colors hover:border-(--accent) hover:text-(--accent)"
        >
          Back to notes
        </Link>
      </header>

      <NoteEditorForm
        mode="edit"
        noteId={note.id}
        initialTitle={note.title}
        initialContent={note.contentJson}
        initialShareEnabled={note.shareEnabled}
      />
    </section>
  );
}
