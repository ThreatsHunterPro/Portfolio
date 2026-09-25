import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft, FiArrowRight, FiCalendar, FiCheck, FiClock, FiExternalLink,
  FiFileText, FiGithub, FiBriefcase, FiFlag, FiPlay, FiUser, FiUsers, FiMaximize2,
} from "react-icons/fi";
import { SiSteam } from "react-icons/si";

import PageLayout from "../../Layouts/PageLayout";
import Loader from "../../Shared/Loader";
import ErrorMessage from "../../Shared/ErrorMessage";
import Button from "../../Shared/Button";
import Reveal from "../../Shared/Reveal";
import Lightbox from "../../Shared/Lightbox";
import ProjectCover from "../../Shared/ProjectCover";
import CategoryBadge from "../../Shared/Badges/CategoryBadge";
import StatusBadge from "../../Shared/Badges/StatusBadge";
import TechBadge from "../../Shared/Badges/TechBadge";
import ContextBadge from "../../Shared/Badges/ContextBadge";
import CallToActionSection from "../../Sections/CallToActionSection";
import { getDomain } from "../../../utils/domains";
import NotFoundPage from "./NotFoundPage";
import { useProject } from "../../../hooks/projects/useProject";

const LINKS = [
  { key: "steam", label: "Page Steam", icon: SiSteam, variant: "default" },
  { key: "demo", label: "Voir la démo", icon: FiExternalLink, variant: "default" },
  { key: "article", label: "Annonce officielle", icon: FiFileText, variant: "outlined" },
  { key: "github", label: "Code source", icon: FiGithub, variant: "dark" },
  { key: "video", label: "Vidéo", icon: FiPlay, variant: "outlined" },
  { key: "docs", label: "Documentation", icon: FiFileText, variant: "outlined" },
];

/** Extrait l'identifiant d'une URL YouTube (youtu.be/ID, watch?v=ID, embed/ID) */
const getYouTubeId = (url) => url?.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1] || null;

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-line last:border-0">
      <Icon className="mt-0.5 w-4 h-4 text-ink-muted shrink-0" aria-hidden />
      <div className="flex-1 flex justify-between gap-4 text-sm">
        <span className="text-ink-muted">{label}</span>
        <span className="font-medium text-ink text-right">{value}</span>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { project, previous, next, loading, error, notFound, reload } = useProject(slug);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (notFound) return <NotFoundPage message="Ce projet n'existe pas ou n'est plus publié." />;

  if (loading || error || !project) {
    return (
      <PageLayout title="Projet">
        <div className="container-page py-24">
          {error ? <ErrorMessage message={error.message} onRetry={reload} /> : <Loader label="Chargement du projet..." />}
        </div>
      </PageLayout>
    );
  }

  const domain = getDomain(project.domain);
  const teaserId = getYouTubeId(project.teaser);
  const links = LINKS.filter(({ key }) => project.links?.[key]);
  const gallery = project.gallery || [];

  return (
    <PageLayout title={project.title}>
      {/* --- En-tête --- */}
      <section className="relative overflow-hidden bg-surface/60 border-b border-line">
        <div className="absolute inset-0 bg-grid bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />
        <div className="relative container-page pt-10 pb-14">
          <Link to={domain?.path || "/projects"} className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-brand-300">
            <FiArrowLeft className="w-4 h-4" /> {domain ? `Réalisations ${domain.label.toLowerCase()}` : "Tous les projets"}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CategoryBadge category={project.category} />
            <ContextBadge context={project.context} client={project.client} />
            <StatusBadge status={project.status} />
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-6xl">{project.title}</h1>
          <p className="mt-3 text-xl font-medium text-brand-300">{project.tagline}</p>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">{project.summary}</p>

          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map(({ key, label, icon, variant }) => (
                <Button key={key} href={project.links[key]} icon={icon} variant={variant} label={label} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- Teaser vidéo (YouTube) ou couverture --- */}
      <div className="container-page -mt-px pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className={`${teaserId ? "aspect-video" : "aspect-[16/9] sm:aspect-[21/9]"} overflow-hidden rounded-3xl border border-line bg-night-700 shadow-card`}
        >
          {teaserId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${teaserId}?rel=0`}
              title={`Teaser — ${project.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
            />
          ) : (
            <ProjectCover project={project} large />
          )}
        </motion.div>
      </div>

      {/* --- Contenu --- */}
      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 space-y-12">
          {project.highlights?.length > 0 && (
            <Reveal className="rounded-3xl border border-brand-400/20 bg-brand-400/5 p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-ink">Points clés</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-night-950">
                      <FiCheck className="w-3 h-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {project.content?.map((block) => (
            <Reveal key={block.heading}>
              <h2 className="font-display text-2xl font-bold text-ink">{block.heading}</h2>
              {block.paragraphs?.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed text-ink-soft">{p}</p>
              ))}
              {block.list?.length > 0 && (
                <ul className="mt-4 space-y-2.5">
                  {block.list.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}

          {gallery.length > 0 && (
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-ink">Galerie</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {gallery.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="group relative overflow-hidden rounded-2xl border border-line bg-night-900 text-left"
                  >
                    <div className="aspect-video">
                      {item.type === "video" ? (
                        <video src={item.src} muted loop playsInline preload="metadata"
                          onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                          onMouseLeave={(e) => e.currentTarget.pause()}
                          className="h-full w-full object-cover" />
                      ) : (
                        <img src={item.src} alt={item.caption || ""} loading="lazy" className="h-full w-full object-cover bg-night-800 transition-transform duration-500 group-hover:scale-105" />
                      )}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-night-950/90 to-transparent p-4 pt-10">
                      <span className="text-sm font-medium text-white">{item.caption}</span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
                        {item.type === "video" ? <FiPlay className="w-3.5 h-3.5" /> : <FiMaximize2 className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Reveal>
          )}
        </article>

        {/* --- Fiche technique --- */}
        <aside className="lg:sticky lg:top-28 self-start space-y-6">
          <div className="rounded-3xl border border-line bg-night-900 p-6 shadow-card">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-muted">Fiche projet</h2>
            <div className="mt-3">
              <InfoRow icon={FiBriefcase} label="Contexte" value={project.context} />
              <InfoRow icon={FiFlag} label="Client / studio" value={project.client} />
              <InfoRow icon={FiCalendar} label="Année" value={project.year} />
              <InfoRow icon={FiClock} label="Durée" value={project.duration} />
              <InfoRow icon={FiUser} label="Rôle" value={project.role} />
              <InfoRow icon={FiUsers} label="Équipe" value={project.team} />
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-night-900 p-6 shadow-card">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-muted">Technologies</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies?.map((tech) => (
                <Link key={tech} to={`/projects?tech=${encodeURIComponent(tech)}`} title={`Projets utilisant ${tech}`} className="rounded-full transition-transform hover:-translate-y-0.5">
                  <TechBadge label={tech} />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* --- Navigation entre projets --- */}
      <nav className="border-t border-line bg-surface" aria-label="Projets voisins">
        <div className="container-page grid gap-4 py-10 sm:grid-cols-2">
          {previous ? (
            <Link to={`/projects/${previous.slug}`} className="group rounded-2xl border border-line bg-night-900 p-5 hover:border-brand-400/50 transition-colors">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted"><FiArrowLeft className="w-3.5 h-3.5" /> Précédent</span>
              <p className="mt-1 font-display text-lg font-bold text-ink group-hover:text-brand-300">{previous.title}</p>
            </Link>
          ) : <span />}
          {next && (
            <Link to={`/projects/${next.slug}`} className="group rounded-2xl border border-line bg-night-900 p-5 text-right hover:border-brand-400/50 transition-colors">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">Suivant <FiArrowRight className="w-3.5 h-3.5" /></span>
              <p className="mt-1 font-display text-lg font-bold text-ink group-hover:text-brand-300">{next.title}</p>
            </Link>
          )}
        </div>
      </nav>

      <CallToActionSection
        requestType={project.domain}
        title="Un projet similaire en tête ?"
        description="Parlons de votre besoin : je vous réponds rapidement avec une première estimation."
      />

      <Lightbox items={gallery} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />
    </PageLayout>
  );
}
