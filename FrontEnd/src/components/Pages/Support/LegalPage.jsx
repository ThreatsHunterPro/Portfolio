import PageLayout from "../../Layouts/PageLayout";
import PageHeader from "../../Layouts/PageHeader";
import { useProfile } from "../../../hooks/profile/useProfile";

function LegalBlock({ title, children }) {
  return (
    <div className="border-b border-line pb-8">
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

export default function LegalPage() {
  const { fullName, profile } = useProfile();

  return (
    <PageLayout title="Mentions légales">
      <PageHeader eyebrow="Informations" title="Mentions légales" />

      <section className="container-page max-w-3xl py-16 space-y-8">
        <LegalBlock title="Éditeur du site">
          <p>Ce site est un portfolio personnel édité par {fullName || "son auteur"}{profile?.email ? `, joignable à l'adresse ${profile.email}` : ""}.</p>
        </LegalBlock>

        <LegalBlock title="Hébergement">
          <p>À compléter selon votre hébergeur (ex. : Vercel Inc. pour le front-end, Render pour l'API).</p>
        </LegalBlock>

        <LegalBlock title="Propriété intellectuelle">
          <p>
            Les projets, textes, images et vidéos présentés sur ce site sont la propriété de leur auteur ou des équipes
            et studios avec lesquels ils ont été réalisés. Toute reproduction sans autorisation est interdite.
          </p>
        </LegalBlock>

        <LegalBlock title="Données personnelles">
          <p>
            Les informations transmises via le formulaire de contact (nom, email, message) sont uniquement utilisées
            pour répondre à votre demande. Elles ne sont ni cédées ni utilisées à des fins commerciales.
          </p>
          <p>
            Conformément au RGPD, vous pouvez demander l'accès, la rectification ou la suppression de vos données
            en me contactant directement.
          </p>
        </LegalBlock>

        <LegalBlock title="Cookies">
          <p>Ce site n'utilise aucun cookie de suivi ni outil de mesure d'audience.</p>
        </LegalBlock>
      </section>
    </PageLayout>
  );
}
