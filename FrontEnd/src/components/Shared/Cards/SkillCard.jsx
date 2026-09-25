import { FiCode, FiCpu, FiGlobe, FiTool } from "react-icons/fi";

const ICONS = [FiCode, FiCpu, FiGlobe, FiTool];

export default function SkillCard({ group, items, index = 0 }) {
  const Icon = ICONS[index % ICONS.length];

  return (
    <div className="h-full rounded-3xl border border-line bg-night-800 p-6 shadow-card transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-400/10 text-brand-400">
        <Icon className="w-5 h-5" aria-hidden />
      </div>
      <h3 className="font-display text-lg font-bold text-ink mb-4">{group}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-lg bg-night-900 px-2.5 py-1 text-sm text-ink-soft ring-1 ring-inset ring-line">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
