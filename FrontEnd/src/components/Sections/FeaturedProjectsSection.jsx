import { useProjects } from "../../hooks/projects/useProjects";
import { DOMAINS } from "../../utils/domains";
import SectionBanner from "../Layouts/SectionBanner";
import ProjectCard from "../Shared/Cards/ProjectCard";
import { CardSkeleton } from "../Shared/Loader";
import ErrorMessage from "../Shared/ErrorMessage";

/**
 * Projets mis en avant d'un domaine (jeu vidéo ou web)
 */
export default function FeaturedProjectsSection({ domain, eyebrow, title, description, className = "" }) {
  const { projects, loading, error, reload } = useProjects();
  const { path, label } = DOMAINS[domain];

  const ofDomain = projects.filter((p) => p.domain === domain);
  const featured = ofDomain.filter((p) => p.featured);
  const list = (featured.length ? featured : ofDomain).slice(0, 3);

  return (
    <section className={`py-20 sm:py-24 ${className}`}>
      <div className="container-page">
        <SectionBanner
          eyebrow={eyebrow}
          title={title}
          description={description}
          moreLink={path}
          moreLabel={`Tout le ${label.toLowerCase()}`}
        />

        {error && <ErrorMessage message={error.message} onRetry={reload} />}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
            : list.map((project) => <ProjectCard key={project.slug} project={project} priority />)}
        </div>
      </div>
    </section>
  );
}
