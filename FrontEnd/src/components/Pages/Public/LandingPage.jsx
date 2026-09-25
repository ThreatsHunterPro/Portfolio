import PageLayout from "../../Layouts/PageLayout";
import HeroSection from "../../Sections/HeroSection";
import DomainsSection from "../../Sections/DomainsSection";
import FeaturedProjectsSection from "../../Sections/FeaturedProjectsSection";
import SkillsSection from "../../Sections/SkillsSection";
import CallToActionSection from "../../Sections/CallToActionSection";

export default function LandingPage() {
  return (
    <PageLayout>
      <HeroSection />
      <DomainsSection />
      <FeaturedProjectsSection
        domain="game"
        eyebrow="Jeu vidéo"
        title="Réalisations jeu vidéo"
        description="Prestations pour des studios, projets portés en interne et moteurs faits maison."
      />
      <FeaturedProjectsSection
        domain="web"
        eyebrow="Web"
        title="Réalisations web"
        description="Applications full-stack, de l'API sécurisée à l'interface."
        className="bg-surface/60 border-y border-line"
      />
      <SkillsSection />
      <CallToActionSection />
    </PageLayout>
  );
}
