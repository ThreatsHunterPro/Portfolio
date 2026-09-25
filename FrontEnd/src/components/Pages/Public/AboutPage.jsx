import { FiDownload, FiMail } from "react-icons/fi";

import PageLayout from "../../Layouts/PageLayout";
import PageHeader from "../../Layouts/PageHeader";
import SkillsSection from "../../Sections/SkillsSection";
import TimelineSection from "../../Sections/TimelineSection";
import CallToActionSection from "../../Sections/CallToActionSection";
import TeachingSection from "../../Sections/TeachingSection";
import Title from "../../Shared/Title";
import Button from "../../Shared/Button";
import Reveal from "../../Shared/Reveal";
import Loader from "../../Shared/Loader";
import ErrorMessage from "../../Shared/ErrorMessage";
import SocialLinks from "../../Shared/SocialLinks";
import { useProfile } from "../../../hooks/profile/useProfile";

export default function AboutPage() {
  const { profile, fullName, loading, error, reload } = useProfile();

  return (
    <PageLayout title="À propos">
      <PageHeader
        eyebrow="À propos"
        title={profile ? `${profile.title}` : "À propos"}
        description={profile?.tagline}
      />

      {loading && <Loader />}
      {error && <div className="container-page py-16"><ErrorMessage message={error.message} onRetry={reload} /></div>}

      {profile && (
        <>
          <section className="container-page grid gap-12 py-20 lg:grid-cols-[320px_1fr]">
            <Reveal className="lg:sticky lg:top-28 self-start">
              <div className="rounded-3xl border border-line bg-night-800 p-6 shadow-card text-center">
                <div className="mx-auto h-36 w-36 overflow-hidden rounded-full bg-gradient-to-br from-brand-300 to-brand-700 p-1">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={fullName} className="h-full w-full rounded-full object-cover bg-night-800" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-night-800 font-display text-4xl font-bold text-brand-300">
                      {profile.firstName[0]}{profile.lastName[0]}
                    </div>
                  )}
                </div>
                <p className="mt-5 font-display text-xl font-bold text-ink">{fullName}</p>
                <p className="text-sm text-ink-muted">{profile.location}</p>
                <SocialLinks socials={profile.socials} email={profile.email} className="mt-4 justify-center" />
                <div className="mt-5 flex flex-col gap-2">
                  {profile.cv && <Button href={profile.cv} icon={FiDownload} label="Télécharger mon CV" fullWidth />}
                  <Button to="/contact" variant="outlined" icon={FiMail} label="Me contacter" fullWidth />
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <Title level={2}>Mon parcours</Title>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
                  {profile.about?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                </div>
              </Reveal>

              <div className="mt-16">
                <Reveal><Title level={3} className="mb-8 text-2xl">Expériences & formation</Title></Reveal>
                <TimelineSection />
              </div>
            </div>
          </section>

          <section className="bg-surface border-y border-line py-20">
            <div className="container-page">
              <Reveal><Title level={2} className="mb-10">Compétences</Title></Reveal>
              <SkillsSection withBanner={false} />
            </div>
          </section>

          <TeachingSection className="pt-20" />

          <CallToActionSection />
        </>
      )}
    </PageLayout>
  );
}
