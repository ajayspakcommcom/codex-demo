import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TinyNotes",
  description: "Private notes with public sharing",
};

const headerLinks = [
  {
    href: "/login",
    label: "Login",
  },
  {
    href: "/register",
    label: "Register",
  },
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-(--background)">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(90,213,202,0.2),_transparent_60%)]"
          />
          <header className="relative border-b border-(--border) bg-(--background-elevated)/90">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
              <Link href="/" className="text-lg font-semibold text-(--foreground)">
                TinyNotes
              </Link>
              <nav aria-label="Primary navigation" className="flex items-center gap-2">
                {headerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-(--foreground-muted) transition-colors hover:bg-(--surface-soft) hover:text-(--foreground)"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
