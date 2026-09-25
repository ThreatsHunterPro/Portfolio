export default function Eyebrow({ children, className = "" }) {
  return (
    <p className={`inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-400 ${className}`}>
      <span className="h-px w-6 bg-brand-500" aria-hidden />
      {children}
    </p>
  );
}
