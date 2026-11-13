// Shown only in `npm run dev`, never in production builds.
export default function DevBanner({ missing }: { missing: string[] }) {
  if (process.env.NODE_ENV !== "development" || missing.length === 0) return null;
  return (
    <aside className="fixed bottom-4 right-4 z-[95] max-h-[40vh] max-w-sm overflow-auto rounded-lg bg-ink/95 p-4 text-xs text-cream shadow-xl">
      <p className="mb-2 font-semibold text-gold">Dev only — {missing.length} asset(s) not added yet</p>
      <ul className="space-y-1 font-mono text-[11px] opacity-80">
        {missing.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <p className="mt-3 opacity-60">Missing items are left out of the site. Run `npm run assets` for the full list.</p>
    </aside>
  );
}
