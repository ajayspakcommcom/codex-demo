export type AuthPageShellProps = {
  children: React.ReactNode;
};

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-14rem)] w-full max-w-5xl gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
      <aside className="rounded-3xl border border-(--border) bg-(--surface)/90 p-8 shadow-xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--accent)">
          Credentials Routes
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-(--foreground)">
          Private notes, simple sharing
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-(--foreground-muted)">
          Sign in to create and edit private notes. Each note can optionally be shared through an
          unguessable public link that you can disable later.
        </p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-(--border) bg-(--surface-soft)/60 p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-(--accent)">
              Authentication
            </dt>
            <dd className="mt-2 text-sm text-(--foreground-muted)">
              Email and password only. Successful sign-in redirects directly to your notes.
            </dd>
          </div>
          <div className="rounded-2xl border border-(--border) bg-(--surface-soft)/60 p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-(--accent)">
              Sharing
            </dt>
            <dd className="mt-2 text-sm text-(--foreground-muted)">
              Shared notes are read-only and can be regenerated or revoked at any time.
            </dd>
          </div>
        </dl>
      </aside>
      <div>{children}</div>
    </section>
  );
}
