import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl rounded-3xl border border-(--border) bg-(--surface) p-10 text-(--foreground) shadow-xl shadow-black/20">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--accent)">
        Custom 404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">404 - Resource Not Found</h1>
      <p className="mt-3 text-sm leading-6 text-(--foreground-muted)">
        The requested page or resource does not exist. This shared placeholder will back both
        missing routes and future missing-resource states once real data handling is wired up.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center text-sm font-semibold text-(--accent) underline underline-offset-4"
      >
        Return to the route overview
      </Link>
    </section>
  );
}
