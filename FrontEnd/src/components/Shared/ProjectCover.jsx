import { useState } from "react";
import { getCategory } from "../../utils/categories";
import HexagonMark from "./HexagonMark";

const GRID_STYLE = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.18) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

/**
 * Image de couverture d'un projet.
 * Sans image (ou si elle ne charge pas), génère une couverture typographique
 * aux couleurs de la catégorie.
 */
export default function ProjectCover({ project, className = "", large = false }) {
  const [failed, setFailed] = useState(false);
  const category = getCategory(project.category);
  const Icon = category.icon;

  if (project.cover && !failed) {
    return (
      <img
        src={project.cover}
        alt={`Aperçu du projet ${project.title}`}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${category.gradient} ${className}`} aria-hidden>
      <div className="absolute inset-0 opacity-40" style={GRID_STYLE} />
      <HexagonMark className={`absolute -right-8 -top-8 text-white/15 ${large ? "w-96 h-96" : "w-56 h-56"}`} strokeWidth={3} />
      <Icon className={`absolute right-6 top-6 text-white/70 ${large ? "w-10 h-10" : "w-6 h-6"}`} />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className={`font-display font-bold text-white drop-shadow-sm leading-none ${large ? "text-5xl sm:text-7xl" : "text-3xl"}`}>
          {project.title}
        </span>
        <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80">
          {project.technologies?.slice(0, 3).join(" · ")}
        </span>
      </div>
    </div>
  );
}
