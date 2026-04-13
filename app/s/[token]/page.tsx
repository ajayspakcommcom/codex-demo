type SharedNotePageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function SharedNotePage({ params }: SharedNotePageProps) {
  const { token } = await params;

  return (
    <section className="mx-auto w-full max-w-4xl space-y-6 text-(--foreground)">
      <header className="rounded-3xl border border-(--border) bg-(--surface) p-8 shadow-xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--accent)">
          Public Share Route
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Shared note</h1>
        <p className="mt-3 text-sm leading-6 text-(--foreground-muted)">
          The future implementation will resolve the public token server-side, validate share
          status, and render sanitized HTML. This scaffold only echoes the token in explanatory
          copy:
          <span className="px-1 text-(--foreground)">{token}</span>
        </p>
      </header>

      <article className="rounded-3xl border border-dashed border-(--border) bg-(--surface-soft)/50 p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-(--foreground)">
          Sanitized HTML output placeholder
        </h2>
        <p className="mt-2 text-sm leading-6 text-(--foreground-muted)">
          The content below is static sample markup showing where server-rendered, sanitized note
          output will appear.
        </p>
        <div className="note-editor-content mt-6 rounded-2xl border border-(--border) bg-(--surface) p-6">
          <h3>Shared content preview</h3>
          <p>
            Public note rendering will eventually support formatted paragraphs, links, lists, and
            code blocks after server-side sanitization.
          </p>
          <blockquote>Static placeholder copy for the public share layout.</blockquote>
          <ul>
            <li>No token lookup is performed in this phase.</li>
            <li>No note data is fetched from the database.</li>
            <li>No 404 logic is active on this scaffold route yet.</li>
          </ul>
        </div>
      </article>
    </section>
  );
}
