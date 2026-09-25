import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiStar } from "react-icons/fi";

import ProjectCover from "../ProjectCover";
import CategoryBadge from "../Badges/CategoryBadge";
import TechBadge from "../Badges/TechBadge";

const MAX_TECHS = 4;

export default function ProjectCard({ project, priority = false }) {
  const extraTechs = (project.technologies?.length || 0) - MAX_TECHS;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-3xl border border-line bg-night-900 shadow-card overflow-hidden transition-all duration-300 hover:border-brand-400/40 hover:shadow-lift"
    >
      <div className="relative aspect-video overflow-hidden bg-night-700">
        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
          <ProjectCover project={project} />
        </div>
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {(project.context === "Prestation" || project.context === "Studio") && (
            <span className="inline-flex items-center gap-1 rounded-full bg-night-950/80 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-brand-200 ring-1 ring-brand-400/30">
              {project.context}{project.client ? ` · ${project.client}` : ""}
            </span>
          )}
          {project.featured && priority && (
            <span className="inline-flex items-center gap-1 rounded-full bg-night-950/80 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-ink">
              <FiStar className="w-3 h-3 text-brand-300 fill-brand-300" /> À la une
            </span>
          )}
        </div>
        <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-logo text-night-950 shadow-md opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <FiArrowUpRight className="w-4 h-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <CategoryBadge category={project.category} />
          <span className="font-mono text-xs text-ink-muted">{project.year}</span>
        </div>

        <h3 className="font-display text-xl font-bold text-ink leading-snug">
          {/* Le lien couvre toute la carte */}
          <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-brand-300">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-3">{project.summary}</p>

        <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
          {project.technologies?.slice(0, MAX_TECHS).map((tech) => (
            <TechBadge key={tech} label={tech} size="xs" />
          ))}
          {extraTechs > 0 && <TechBadge label={`+${extraTechs}`} size="xs" />}
        </div>
      </div>
    </motion.article>
  );
}
