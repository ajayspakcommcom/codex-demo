"use client";

type NotesErrorProps = {
  reset: () => void;
};

export default function NotesError({ reset }: NotesErrorProps) {
  return (
    <section className="rounded-3xl border border-red-300/25 bg-red-400/10 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-100">
        Notes Error State
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-red-100">
        Unable to render the notes scaffold
      </h2>
      <p className="mt-2 text-sm leading-6 text-red-200/90">
        This route-level placeholder keeps the notes area aligned with the final app structure
        while returning only generic copy.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-full border border-red-200/35 px-4 py-2 text-sm font-semibold text-red-100 transition-colors hover:bg-red-300/10"
      >
        Try again
      </button>
    </section>
  );
}
