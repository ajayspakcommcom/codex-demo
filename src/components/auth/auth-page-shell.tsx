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
          Public entry-point scaffold
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-(--foreground-muted)">
          These pages reserve space for the future Better Auth credential flow. Inputs and actions
          are intentionally disabled until real authentication behavior is wired in.
        </p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-(--border) bg-(--surface-soft)/60 p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-(--accent)">
              Future behavior
            </dt>
            <dd className="mt-2 text-sm text-(--foreground-muted)">
              Register and login will submit credentials and establish a session cookie.
            </dd>
          </div>
          <div className="rounded-2xl border border-(--border) bg-(--surface-soft)/60 p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-(--accent)">
              Current phase
            </dt>
            <dd className="mt-2 text-sm text-(--foreground-muted)">
              Route shells, labels, and layout structure only.
            </dd>
          </div>
        </dl>
      </aside>
      <div>{children}</div>
    </section>
  );
}
