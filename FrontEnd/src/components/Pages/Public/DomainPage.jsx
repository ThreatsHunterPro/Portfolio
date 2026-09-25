import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import PageLayout from "../../Layouts/PageLayout";
import PageHeader from "../../Layouts/PageHeader";
import ServicesSection from "../../Sections/ServicesSection";
import CallToActionSection from "../../Sections/CallToActionSection";
import TeachingSection from "../../Sections/TeachingSection";
import ProjectCard from "../../Shared/Cards/ProjectCard";
import Button from "../../Shared/Button";
import Title from "../../Shared/Title";
import Reveal from "../../Shared/Reveal";
import ErrorMessage from "../../Shared/ErrorMessage";
import { CardSkeleton } from "../../Shared/Loader";
import { useProfile } from "../../../hooks/profile/useProfile";
import { useProjects } from "../../../hooks/projects/useProjects";
import { DOMAINS } from "../../../utils/domains";
import { CATEGORIES } from "../../../utils/categories";

/**
 * Page d'une activité : offres de prestation + réalisations du domaine
 */
export default function DomainPage({ domain }) {
  const config = DOMAINS[domain];
  const { profile } = useProfile();
  const { projects, loading, error, reload } = useProjects();
  const [category, setCategory] = useState("all");

  const service = profile?.services?.[domain];
  const ofDomain = useMemo(() => projects.filter((p) => p.domain === domain), [projects, domain]);
  const categories = ["all", ...new Set(ofDomain.map((p) => p.category))];
  const list = category === "all" ? ofDomain : ofDomain.filter((p) => p.category === category);

  return (
    <PageLayout title={service?.title || config.label}>
      <PageHeader eyebrow={config.eyebrow} title={config.headline} description={service?.pitch}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to={`/contact?type=${domain}`} size="lg" iconRight={FiArrowRight} label="Demander un devis" />
          <Button href="#realisations" variant="outlined" size="lg" label="Voir les réalisations" />
        </div>
        {service?.stack && (
          <ul className="mt-10 flex flex-wrap gap-2">
            {service.stack.map((tech) => (
              <li key={tech} className="rounded-full bg-night-800/80 px-3 py-1 text-xs font-medium text-ink-soft ring-1 ring-inset ring-line">{tech}</li>
            ))}
          </ul>
        )}
      </PageHeader>

      {/* --- Offres --- */}
      <section className="container-page py-20">
        <Reveal className="mb-10 max-w-2xl">
          <Title level={2}>Ce que je propose</Title>
          <p className="mt-4 text-ink-soft">Des interventions ponctuelles ou sur la durée, en régie ou au forfait, intégrées à votre équipe et à vos outils.</p>
        </Reveal>
        <ServicesSection service={service} />
      </section>

      {/* --- Réalisations --- */}
      <section id="realisations" className="scroll-mt-24 border-y border-line bg-surface/60 py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <Title level={2}>Réalisations {config.label.toLowerCase()}</Title>
              <p className="mt-3 text-ink-soft">{ofDomain.length} projet{ofDomain.length > 1 ? "s" : ""}, du prototype à la production.</p>
            </Reveal>

            {categories.length > 2 && (
              <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]" role="tablist" aria-label="Catégories">
                {categories.map((key) => {
                  const { label, icon: Icon } = CATEGORIES[key] || CATEGORIES.all;
                  const active = category === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setCategory(key)}
                      className={`relative shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        active ? "text-night-950" : "text-ink-soft hover:bg-night-800"
                      }`}
                    >
                      {active && <motion.span layoutId={`${domain}-category-pill`} className="absolute inset-0 rounded-full bg-logo" />}
                      <Icon className="relative w-4 h-4" />
                      <span className="relative">{label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {error && <ErrorMessage message={error.message} onRetry={reload} />}

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {list.map((project) => <ProjectCard key={project.slug} project={project} priority />)}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {domain === "game" && <TeachingSection className="pt-20" />}

      <CallToActionSection
        requestType={domain}
        title={domain === "game" ? "Besoin d'un renfort gameplay ?" : "Un site ou une application à créer ?"}
        description={domain === "game"
          ? "Systèmes, outils, multijoueur ou optimisation : parlons de votre production."
          : "Décrivez-moi votre projet, je vous propose une solution et un chiffrage."}
      />
    </PageLayout>
  );
}
