import { useProfile } from "../../hooks/profile/useProfile";
import SectionBanner from "../Layouts/SectionBanner";
import SkillCard from "../Shared/Cards/SkillCard";
import Reveal from "../Shared/Reveal";

export default function SkillsSection({ withBanner = true }) {
  const { profile } = useProfile();

  if (!profile?.skills?.length) return null;

  return (
    <section className={withBanner ? "py-24 sm:py-32 bg-surface border-y border-line" : ""}>
      <div className={withBanner ? "container-page" : ""}>
        {withBanner && (
          <SectionBanner
            eyebrow="Compétences"
            title="Ma boîte à outils"
            description="Du C++ bas niveau à l'interface React, les technologies que j'utilise au quotidien."
            moreLink="/about"
            moreLabel="En savoir plus"
          />
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profile.skills.map((skill, i) => (
            <Reveal key={skill.group} delay={i * 0.08}>
              <SkillCard group={skill.group} items={skill.items} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
