import { notFound } from "next/navigation";
import { PublicNoteContent } from "@/src/components/notes/public-note-content";
import { getSharedNoteByTokenHash } from "@/src/lib/notes/repository";
import { hashShareToken, isValidShareToken } from "@/src/lib/notes/sharing";

export const dynamic = "force-dynamic";

type SharedNotePageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function SharedNotePage({ params }: SharedNotePageProps) {
  const { token } = await params;

  if (!isValidShareToken(token)) {
    notFound();
  }

  const note = getSharedNoteByTokenHash(hashShareToken(token));

  if (!note) {
    notFound();
  }

  const displayTitle = note.title.trim() || "Untitled note";

  return (
    <section className="mx-auto w-full max-w-4xl space-y-6 text-(--foreground)">
      <header className="rounded-3xl border border-(--border) bg-(--surface) p-8 shadow-xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--accent)">
          Shared note
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">{displayTitle}</h1>
        <p className="mt-3 text-sm leading-6 text-(--foreground-muted)">
          This note was shared publicly. Only the note owner can edit or revoke access.
        </p>
      </header>

      <article className="rounded-3xl border border-(--border) bg-(--surface-soft)/50 p-8">
        <PublicNoteContent contentJson={note.contentJson} />
      </article>
    </section>
  );
}
