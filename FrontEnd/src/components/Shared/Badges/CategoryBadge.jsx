import { getCategory } from "../../../utils/categories";

export default function CategoryBadge({ category, className = "" }) {
  const { label, icon: Icon, badge } = getCategory(category);

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${badge} ${className}`}>
      <Icon className="w-3.5 h-3.5" aria-hidden />
      {label}
    </span>
  );
}
