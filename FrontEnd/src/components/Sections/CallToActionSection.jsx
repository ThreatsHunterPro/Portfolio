import { FiArrowRight } from "react-icons/fi";
import Button from "../Shared/Button";
import Reveal from "../Shared/Reveal";
import HexagonMark from "../Shared/HexagonMark";

export default function CallToActionSection({
  title = "Un projet, une mission, une question ?",
  description = "Jeu vidéo ou web, décrivez-moi votre besoin : je reviens vers vous rapidement avec une première estimation.",
  requestType,
}) {
  const contactLink = requestType ? `/contact?type=${requestType}` : "/contact";

  return (
    <section className="py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-brand-400/20 bg-gradient-to-br from-night-800 via-night-900 to-night-950 px-6 py-16 text-center sm:px-16">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-400/25 blur-3xl" aria-hidden />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-700/30 blur-3xl" aria-hidden />
          <HexagonMark className="absolute right-6 top-1/2 hidden h-72 w-72 -translate-y-1/2 text-brand-400/10 md:block" strokeWidth={2.5} />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">{description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to={contactLink} size="lg" iconRight={FiArrowRight} label="Demander un devis" />
              <Button to="/projects" size="lg" variant="ghost" label="Parcourir les projets" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
