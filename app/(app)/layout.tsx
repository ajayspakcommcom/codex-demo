import { LogoutButton } from "@/src/components/auth/logout-button";
import { requireSessionOrRedirect } from "@/src/lib/session";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  const session = await requireSessionOrRedirect();
  const userLabel = session.user.name?.trim() || session.user.email;

  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-(--border) bg-linear-to-r from-(--surface) via-(--surface) to-(--surface-soft) p-8 shadow-xl shadow-black/20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--accent)">
              Authenticated Area
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-(--foreground)">
              Your workspace
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-(--foreground-muted)">
              Signed in as <span className="text-(--foreground)">{userLabel}</span>. Your notes are
              private by default, and public sharing is opt-in per note.
            </p>
          </div>
          <LogoutButton />
        </div>
      </header>
      <div>{children}</div>
    </section>
  );
}
