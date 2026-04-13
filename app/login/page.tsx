import Link from "next/link";
import { AuthPageShell } from "@/src/components/auth/auth-page-shell";

export default function LoginPage() {
  return (
    <AuthPageShell>
      <article className="rounded-3xl border border-(--border) bg-(--surface) p-8 shadow-xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--accent)">
          Public Route
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-(--foreground)">Login</h1>
        <p className="mt-3 text-sm leading-6 text-(--foreground-muted)">
          This placeholder reserves the future credentials sign-in form. The fields are visible for
          layout and accessibility validation only.
        </p>

        <form className="mt-8 space-y-5">
          <fieldset disabled className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-sm font-medium text-(--foreground)">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-2xl border border-(--border) bg-(--background-elevated) px-4 py-3 text-sm text-(--foreground-muted) outline-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="login-password" className="text-sm font-medium text-(--foreground)">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="Disabled for scaffold phase"
                className="w-full rounded-2xl border border-(--border) bg-(--background-elevated) px-4 py-3 text-sm text-(--foreground-muted) outline-none"
              />
            </div>
            <button
              type="submit"
              disabled
              className="inline-flex rounded-2xl bg-(--accent) px-4 py-3 text-sm font-semibold text-slate-950 opacity-60"
            >
              Login
            </button>
          </fieldset>
        </form>

        <p className="mt-6 text-sm text-(--foreground-muted)">
          Need an account?{" "}
          <Link href="/register" className="text-(--accent) underline underline-offset-4">
            Open the register page
          </Link>
          .
        </p>
      </article>
    </AuthPageShell>
  );
}
