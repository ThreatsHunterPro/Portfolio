import { FiBookOpen, FiLock } from "react-icons/fi";

import { useProfile } from "../../hooks/profile/useProfile";
import Reveal from "../Shared/Reveal";
import HexagonMark from "../Shared/HexagonMark";

/**
 * Projets réalisés en tant que formateur : mentionnés sans être exposés
 */
export default function TeachingSection({ className = "" }) {
  const { profile } = useProfile();
  const teaching = profile?.teaching;

  if (!teaching) return null;

  return (
    <section className={`container-page ${className}`}>
      <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-night-900 p-8 sm:p-12">
        <HexagonMark className="absolute -right-16 -top-16 h-72 w-72 text-brand-400/10" strokeWidth={2.5} />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-logo text-night-950 shadow-glow">
              <FiBookOpen className="h-6 w-6" />
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold text-ink">{teaching.title}</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{teaching.intro}</p>
          </div>

          <div>
            <ul className="flex flex-wrap gap-3">
              {teaching.projects.map((name) => (
                <li
                  key={name}
                  className="rounded-2xl border border-brand-400/20 bg-brand-400/5 px-4 py-3 font-display font-semibold text-brand-100"
                >
                  {name}
                </li>
              ))}
            </ul>
            {teaching.note && (
              <p className="mt-6 flex gap-3 text-sm leading-relaxed text-ink-muted">
                <FiLock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden />
                {teaching.note}
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
