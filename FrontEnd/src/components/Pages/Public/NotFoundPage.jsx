import { FiArrowLeft, FiGrid } from "react-icons/fi";
import PageLayout from "../../Layouts/PageLayout";
import Button from "../../Shared/Button";

export default function NotFoundPage({ message = "La page que vous cherchez n'existe pas ou a été déplacée." }) {
  return (
    <PageLayout title="Page introuvable">
      <section className="container-page flex flex-col items-center py-32 text-center">
        <p className="font-mono text-sm font-medium text-brand-400">Erreur 404</p>
        <h1 className="mt-4 font-display text-[7rem] font-bold leading-none text-gradient sm:text-[10rem]">404</h1>
        <p className="mt-4 max-w-md text-lg text-ink-soft">{message}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/" icon={FiArrowLeft} label="Retour à l'accueil" />
          <Button to="/projects" variant="outlined" icon={FiGrid} label="Voir les projets" />
        </div>
      </section>
    </PageLayout>
  );
}
