export default function NotesLoading() {
  return (
    <section className="space-y-4 rounded-3xl border border-(--border) bg-(--surface) p-6">
      <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-(--border) bg-(--surface-soft)/40">
        <p className="text-center text-2xl font-semibold tracking-tight text-(--foreground)">
          Loding...
        </p>
      </div>
      <div className="space-y-3 pt-2">
        <div className="h-24 animate-pulse rounded-2xl border border-(--border) bg-(--surface-soft)" />
        <div className="h-24 animate-pulse rounded-2xl border border-(--border) bg-(--surface-soft)" />
        <div className="h-40 animate-pulse rounded-2xl border border-(--border) bg-(--surface-soft)" />
      </div>
    </section>
  );
}
