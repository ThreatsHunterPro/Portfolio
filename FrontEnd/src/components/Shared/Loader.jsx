export default function Loader({ label = "Chargement..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-ink-muted" role="status">
      <span className="h-8 w-8 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-line bg-night-800 overflow-hidden animate-pulse">
      <div className="aspect-video bg-night-700" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-20 bg-night-700 rounded" />
        <div className="h-5 w-2/3 bg-night-700 rounded" />
        <div className="h-3 w-full bg-night-700 rounded" />
        <div className="h-3 w-4/5 bg-night-700 rounded" />
      </div>
    </div>
  );
}
