import { Link } from "react-router-dom";

/**
 * Bouton polymorphe : <Link> si `to`, <a> si `href`, sinon <button>
 */
export default function Button({
  type = "button",
  label,
  ariaLabel,
  onClick,
  to,
  href,
  icon: Icon,
  iconRight: IconRight,
  className = "",
  variant = "default",
  size = "md",
  fullWidth = false,
  disabled = false,
  children,
}) {
  const variantStyles = {
    default: "bg-logo text-night-950 shadow-lg shadow-brand-500/20 hover:brightness-110 hover:shadow-brand-400/40",
    dark: "bg-night-700 text-ink border border-line hover:bg-night-600",
    outlined: "bg-night-900/60 border border-line text-ink hover:border-brand-400/50 hover:text-brand-300",
    ghost: "bg-transparent text-ink-soft hover:bg-night-700 hover:text-ink",
    text: "bg-transparent text-brand-400 hover:text-brand-300 px-0",
  };

  const sizeStyles = {
    sm: "text-sm px-4 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2",
  };

  const classes = [
    "group inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 active:scale-[0.98]",
    sizeStyles[size],
    variantStyles[variant],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden />}
      {children || label}
      {IconRight && <IconRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />}
    </>
  );

  if (to) {
    return <Link to={to} className={classes} aria-label={ariaLabel}>{content}</Link>;
  }

  // Ancre interne à la page
  if (href?.startsWith("#")) {
    return <a href={href} className={classes} aria-label={ariaLabel}>{content}</a>;
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
