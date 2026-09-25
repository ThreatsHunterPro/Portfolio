import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import { useProfile } from "../../hooks/profile/useProfile";
import { useProjects } from "../../hooks/projects/useProjects";
import { DOMAINS } from "../../utils/domains";
import Reveal from "../Shared/Reveal";
import HexagonMark from "../Shared/HexagonMark";
import SectionBanner from "../Layouts/SectionBanner";

/**
 * Les deux portes d'entrée du site : Jeu vidéo / Web
 */
export default function DomainsSection() {
  const { profile } = useProfile();
  const { meta } = useProjects();

  return (
    <section className="py-24 sm:py-28">
      <div className="container-page">
        <SectionBanner
          eyebrow="Prestations"
          title="Deux métiers, un seul interlocuteur"
          description="Que vous soyez un studio qui cherche un renfort gameplay ou une entreprise qui a besoin d'une application web, je vous accompagne de la conception à la livraison."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {Object.values(DOMAINS).map((domain, i) => {
            const service = profile?.services?.[domain.key];
            const Icon = domain.icon;
            const count = meta.domains?.[domain.key] || 0;

            return (
              <Reveal key={domain.key} delay={i * 0.1}>
                <Link
                  to={domain.path}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-night-900 p-8 transition-all duration-300 hover:border-brand-400/40 hover:shadow-lift sm:p-10"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${domain.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.12]`} aria-hidden />
                  <HexagonMark className="absolute -right-16 -bottom-16 h-64 w-64 text-brand-400/10 transition-transform duration-700 group-hover:rotate-12" strokeWidth={3} />

                  <div className="relative flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-logo text-night-950 shadow-glow">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="font-mono text-xs text-ink-muted">{count} projet{count > 1 ? "s" : ""}</span>
                  </div>

                  <h3 className="relative mt-8 font-display text-3xl font-bold text-ink">{service?.title || domain.label}</h3>
                  <p className="relative mt-3 max-w-md leading-relaxed text-ink-soft">{service?.pitch}</p>

                  {service?.stack && (
                    <ul className="relative mt-6 flex flex-wrap gap-2">
                      {service.stack.slice(0, 5).map((tech) => (
                        <li key={tech} className="rounded-lg bg-night-800 px-2.5 py-1 text-xs text-ink-soft ring-1 ring-inset ring-line">{tech}</li>
                      ))}
                    </ul>
                  )}

                  <span className="relative mt-auto pt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-300">
                    Découvrir l'offre {domain.label.toLowerCase()}
                    <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
