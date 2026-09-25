export default function TechBadge({ label, active = false, onClick, count, size = "sm" }) {
  const sizes = {
    xs: "text-[11px] px-2 py-0.5",
    sm: "text-xs px-2.5 py-1",
  };

  const classes = [
    "inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ring-inset transition-colors",
    sizes[size],
    active
      ? "bg-brand-500 text-night-950 ring-brand-600"
      : "bg-night-900 text-ink-soft ring-line",
    onClick ? "cursor-pointer hover:ring-brand-400 hover:text-brand-300" : "",
    onClick && active ? "hover:text-white" : "",
  ].join(" ");

  const content = (
    <>
      {label}
      {count !== undefined && (
        <span className={`text-[10px] ${active ? "text-brand-100" : "text-ink-muted"}`}>{count}</span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes} aria-pressed={active}>
        {content}
      </button>
    );
  }
  return <span className={classes}>{content}</span>;
}
