import Link from "next/link";

const routePreviews = [
  {
    href: "/login",
    title: "Login scaffold",
    description: "Disabled credential form shell for future sign-in.",
  },
  {
    href: "/register",
    title: "Register scaffold",
    description: "Disabled credential form shell for future account creation.",
  },
  {
    href: "/notes",
    title: "Notes area scaffold",
    description: "Shared authenticated route chrome with dummy notes content.",
  },
  {
    href: "/s/example-shared-token",
    title: "Public share scaffold",
    description: "Static shared-note page that displays a token in placeholder copy only.",
  },
] as const;

export default function LandingPage() {
  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-(--border) bg-(--surface)/90 p-8 shadow-xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--accent)">
          Public Route
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-(--foreground)">
          Route overview
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-(--foreground-muted)">
          The final product will redirect authenticated users to
          <span className="px-1 text-(--foreground)">/notes</span>
          and everyone else to
          <span className="px-1 text-(--foreground)">/login</span>.
          This phase stops at route scaffolding, so the landing page acts as a map of the planned
          entry points instead of performing redirects.
        </p>
      </header>

      <section aria-labelledby="route-preview-heading" className="space-y-4">
        <div>
          <h2
            id="route-preview-heading"
            className="text-2xl font-semibold tracking-tight text-(--foreground)"
          >
            Scaffold entry points
          </h2>
          <p className="mt-1 text-sm text-(--foreground-muted)">
            Each link opens a static page or layout shell with dummy content only.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {routePreviews.map((route) => (
            <article
              key={route.href}
              className="rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-lg shadow-black/10"
            >
              <h3 className="text-lg font-semibold text-(--foreground)">{route.title}</h3>
              <p className="mt-2 text-sm leading-6 text-(--foreground-muted)">
                {route.description}
              </p>
              <Link
                href={route.href}
                className="mt-4 inline-flex items-center text-sm font-semibold text-(--accent) underline decoration-(--accent)/50 underline-offset-4 transition-colors hover:text-(--accent-strong)"
              >
                Open route
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-(--border) bg-(--surface-soft)/60 p-6">
        <h2 className="text-xl font-semibold text-(--foreground)">Implementation limits</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-(--foreground-muted)">
          <li>No redirects or session checks are active.</li>
          <li>No editor, autosave, sharing, or database reads are wired to these routes.</li>
          <li>Placeholder controls are labeled and disabled where real UI will exist later.</li>
        </ul>
      </section>
    </section>
  );
}
