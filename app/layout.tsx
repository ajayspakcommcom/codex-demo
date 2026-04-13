import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TinyNotes",
  description: "TinyNotes route and layout scaffolding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="min-h-screen bg-(--background)">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(90,213,202,0.2),_transparent_60%)]"
          />
          <header className="relative border-b border-(--border) bg-(--background-elevated)/90">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
              <Link href="/" className="text-lg font-semibold tracking-tight text-(--foreground)">
                TinyNotes
              </Link>
              <p className="text-sm font-medium text-(--foreground-muted)">Spec route scaffold</p>
            </div>
          </header>
          <main className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="border-t border-(--border) bg-(--background-elevated)/70">
            <div className="mx-auto w-full max-w-6xl px-4 py-4 text-sm text-(--foreground-muted) sm:px-6 lg:px-8">
              Static scaffolding only. No auth, data, editor, or share logic is enabled in this
              phase.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
