import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiFilter, FiGrid, FiX } from "react-icons/fi";

import PageLayout from "../../Layouts/PageLayout";
import PageHeader from "../../Layouts/PageHeader";
import ProjectCard from "../../Shared/Cards/ProjectCard";
import SearchBar from "../../Shared/SearchBar";
import TechBadge from "../../Shared/Badges/TechBadge";
import Button from "../../Shared/Button";
import ErrorMessage from "../../Shared/ErrorMessage";
import { CardSkeleton } from "../../Shared/Loader";
import { useProjects } from "../../../hooks/projects/useProjects";
import { useProjectFilters } from "../../../hooks/projects/useProjectFilters";
import { CATEGORIES } from "../../../utils/categories";
import { DOMAINS } from "../../../utils/domains";

const VISIBLE_TECHS = 12;

const DOMAIN_TABS = [
  { key: "all", label: "Tout", icon: FiGrid },
  ...Object.values(DOMAINS).map(({ key, label, icon }) => ({ key, label, icon })),
];

/** Compte les occurrences d'une clé dans une liste de projets */
const countBy = (projects, getKeys) => {
  const counts = {};
  for (const project of projects) {
    for (const key of [].concat(getKeys(project) || [])) counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
};

export default function ProjectsPage() {
  const { projects, loading, error, reload } = useProjects();
  const {
    domain, category, tech, search, inDomain, filtered, hasFilters,
    setDomain, setCategory, setTech, setSearch, resetFilters,
  } = useProjectFilters(projects);
  const [showAllTechs, setShowAllTechs] = useState(false);

  const domainCounts = useMemo(() => countBy(projects, (p) => p.domain), [projects]);
  const categoryCounts = useMemo(() => countBy(inDomain, (p) => p.category), [inDomain]);
  const technologies = useMemo(
    () => Object.entries(countBy(inDomain, (p) => p.technologies))
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count })),
    [inDomain]
  );

  const categoryKeys = Object.keys(CATEGORIES).filter((key) => categoryCounts[key]);
  const techs = showAllTechs ? technologies : technologies.slice(0, VISIBLE_TECHS);

  return (
    <PageLayout title="Projets">
      <PageHeader
        eyebrow="Réalisations"
        title="Tous mes projets"
        description="Prestations, projets studio et projets personnels, en jeu vidéo comme en web. Filtrez par domaine, catégorie ou technologie."
      />

      <section className="container-page py-12">
        {/* --- Filtres --- */}
        <div className="sticky top-16 sm:top-20 z-30 -mx-4 px-4 py-4 bg-night-950/85 backdrop-blur-md border-b border-line sm:mx-0 sm:px-0">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="inline-flex self-start rounded-full border border-line bg-night-900 p-1" role="tablist" aria-label="Domaines">
              {DOMAIN_TABS.map(({ key, label, icon: Icon }) => {
                const active = domain === key;
                const count = key === "all" ? projects.length : domainCounts[key] || 0;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setDomain(key)}
                    className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      active ? "text-night-950" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span layoutId="domain-pill" className="absolute inset-0 rounded-full bg-logo" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                    )}
                    <Icon className="relative w-4 h-4" />
                    <span className="relative">{label}</span>
                    <span className={`relative text-xs ${active ? "text-night-800" : "text-ink-muted"}`}>{count}</span>
                  </button>
                );
              })}
            </div>
            <div className="lg:w-80">
              <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un projet, un client, une techno..." />
            </div>
          </div>

          {categoryKeys.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto [scrollbar-width:none]" aria-label="Catégories">
              {["all", ...categoryKeys].map((key) => {
                const { label, icon: Icon } = CATEGORIES[key];
                const active = category === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key)}
                    aria-pressed={active}
                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset transition-colors ${
                      active ? "bg-brand-400/15 text-brand-200 ring-brand-400/40" : "text-ink-soft ring-line hover:ring-brand-400/30"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                    <span className="text-ink-muted">{key === "all" ? inDomain.length : categoryCounts[key]}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 mr-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">
            <FiFilter className="w-3.5 h-3.5" /> Technos
          </span>
          {techs.map(({ name, count }) => (
            <TechBadge key={name} label={name} count={count} active={tech === name} onClick={() => setTech(name)} />
          ))}
          {technologies.length > VISIBLE_TECHS && (
            <button
              type="button"
              onClick={() => setShowAllTechs(!showAllTechs)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-400 hover:text-brand-300 px-2"
            >
              {showAllTechs ? "Moins" : `+${technologies.length - VISIBLE_TECHS}`}
              <FiChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllTechs ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>

        <div className="mt-8 mb-6 flex items-center justify-between text-sm text-ink-muted">
          <span>
            <strong className="text-ink">{filtered.length}</strong> projet{filtered.length > 1 ? "s" : ""}
          </span>
          {hasFilters && (
            <Button variant="ghost" size="sm" icon={FiX} onClick={resetFilters} label="Réinitialiser les filtres" />
          )}
        </div>

        {/* --- Résultats --- */}
        {error && <ErrorMessage message={error.message} onRetry={reload} />}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-2xl font-bold text-ink">Aucun projet trouvé</p>
            <p className="mt-2 text-ink-muted">Essayez une autre recherche ou retirez des filtres.</p>
            <Button variant="outlined" onClick={resetFilters} label="Voir tous les projets" className="mt-6" />
          </div>
        )}
      </section>
    </PageLayout>
  );
}
