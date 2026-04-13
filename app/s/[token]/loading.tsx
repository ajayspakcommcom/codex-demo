export default function SharedNoteLoading() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-4 rounded-3xl border border-(--border) bg-(--surface) p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--accent)">
        Public Share Loading State
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-(--foreground)">
        Loading shared note scaffold
      </h2>
      <p className="text-sm leading-6 text-(--foreground-muted)">
        Placeholder loading state for the future token-resolution route.
      </p>
      <div className="space-y-3 pt-2">
        <div className="h-8 w-56 animate-pulse rounded-full bg-(--surface-soft)" />
        <div className="h-4 w-full animate-pulse rounded-full bg-(--surface-soft)" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-(--surface-soft)" />
        <div className="h-48 animate-pulse rounded-2xl border border-(--border) bg-(--surface-soft)" />
      </div>
    </section>
  );
}
