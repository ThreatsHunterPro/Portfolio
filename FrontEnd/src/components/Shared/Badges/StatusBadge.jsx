const STATUS_STYLES = {
  "Terminé": "bg-slate-400",
  "En cours": "bg-emerald-500 animate-pulse",
  "Prototype": "bg-amber-500",
};

export default function StatusBadge({ status }) {
  if (!status) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft">
      <span className={`h-2 w-2 rounded-full ${STATUS_STYLES[status] || "bg-slate-400"}`} aria-hidden />
      {status}
    </span>
  );
}
