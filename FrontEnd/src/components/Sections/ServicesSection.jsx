import { FiCheck } from "react-icons/fi";
import Reveal from "../Shared/Reveal";

/**
 * Liste des offres d'un domaine (issues de profile.services)
 */
export default function ServicesSection({ service }) {
  if (!service?.offers?.length) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {service.offers.map((offer, i) => (
        <Reveal key={offer.title} delay={i * 0.08}>
          <div className="group h-full rounded-3xl border border-line bg-night-900 p-7 transition-all duration-300 hover:border-brand-400/40 hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-brand-400">0{i + 1}</span>
              <span className="h-px flex-1 bg-line" aria-hidden />
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-400/10 text-brand-300 transition-colors group-hover:bg-logo group-hover:text-night-950">
                <FiCheck className="h-4 w-4" />
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-ink">{offer.title}</h3>
            <p className="mt-2 leading-relaxed text-ink-soft">{offer.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
