export default function Title({ children, level = 1, className = "", toCenter = false }) {

  const alignment = toCenter ? "text-center" : "text-left";
  const baseClassName = `font-display font-bold text-ink break-words ${alignment}`;

  const headingMap = {
    1: { tag: "h1", className: `text-4xl sm:text-5xl lg:text-6xl leading-[1.05] ${baseClassName}` },
    2: { tag: "h2", className: `text-3xl sm:text-4xl leading-tight ${baseClassName}` },
    3: { tag: "h3", className: `text-xl leading-snug ${baseClassName}` },
  };

  const { tag: Tag, className: levelClassName } = headingMap[level] || headingMap[1];

  return <Tag className={`${levelClassName} ${className}`}>{children}</Tag>;
}
