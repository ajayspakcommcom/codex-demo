export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-(--border) bg-linear-to-r from-(--surface) via-(--surface) to-(--surface-soft) p-8 shadow-xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--accent)">
          Authenticated Area Layout
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-(--foreground)">
          Protected route scaffold
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-(--foreground-muted)">
          The final app will enforce a valid session before rendering these routes. This phase only
          establishes the shared shell and descriptive placeholder copy for the authenticated area.
        </p>
      </header>
      <div>{children}</div>
    </section>
  );
}
