import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

import { useProfile } from "../../hooks/profile/useProfile";
import { useProjects } from "../../hooks/projects/useProjects";
import Button from "../Shared/Button";
import SocialLinks from "../Shared/SocialLinks";
import ProjectCover from "../Shared/ProjectCover";
import HexagonMark from "../Shared/HexagonMark";
import { fadeUp, stagger } from "../../utils/motion";

// Position des vignettes empilées à droite du hero
const STACK = [
  "top-0 right-6 w-[78%] rotate-[3deg] z-10",
  "top-[34%] left-0 w-[70%] -rotate-[4deg] z-20",
  "bottom-0 right-0 w-[62%] rotate-[2deg] z-30",
];

export default function HeroSection() {
  const { profile } = useProfile();
  const { projects } = useProjects();

  // Vitrine : projets marqués "hero" dans projects.json (1, 2, 3)
  const showcase = projects.filter((p) => p.hero).sort((a, b) => a.hero - b.hero).slice(0, 3);

  return (
    <section className="relative overflow-hidden">
      {/* Décor */}
      <div className="absolute inset-0 bg-grid bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" aria-hidden />
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-brand-500/20 blur-3xl" aria-hidden />
      <div className="absolute top-72 -left-40 h-[420px] w-[420px] rounded-full bg-brand-800/30 blur-3xl" aria-hidden />
      <HexagonMark className="absolute -left-24 top-10 w-[420px] h-[420px] text-brand-400/[0.05]" strokeWidth={2} />

      <div className="relative container-page grid items-center gap-16 pt-12 pb-24 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pb-32">
        <motion.div variants={stagger(0.1)} initial="hidden" animate="visible">
          {profile?.availability && (
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-3 py-1 text-xs font-semibold text-brand-200"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-300" />
              </span>
              {profile.availability}
            </motion.span>
          )}

          <motion.h1 variants={fadeUp} className="mt-6 font-display text-5xl font-bold leading-[1.04] text-ink sm:text-6xl lg:text-7xl">
            Je donne vie à vos <span className="text-gradient">jeux</span> et à vos <span className="text-gradient">applications web</span>.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {profile && <>Moi c'est <strong className="text-ink">{profile.firstName}</strong>, {profile.title.toLowerCase()}. </>}
            {profile?.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <Button to="/contact" size="lg" iconRight={FiArrowRight} label="Parlons de votre projet" />
            <Button to="/projects" size="lg" variant="outlined" label="Voir les réalisations" />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4 text-sm text-ink-muted">
            {profile?.location && (
              <span className="inline-flex items-center gap-1.5">
                <FiMapPin className="w-4 h-4" /> {profile.location}
              </span>
            )}
            <SocialLinks socials={profile?.socials} email={profile?.email} className="-ml-2" />
          </motion.div>
        </motion.div>

        {/* Vitrine : vignettes des projets phares */}
        <div className="relative hidden lg:block h-[480px]" aria-label="Projets à la une">
          {showcase.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute ${STACK[i]}`}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="block aspect-video overflow-hidden rounded-2xl border border-line ring-4 ring-night-950 bg-night-800 shadow-2xl shadow-black/50"
              >
                <ProjectCover project={project} />
              </Link>
              <span className={`absolute ${i === 0 ? "-top-3 right-4" : "-bottom-3 left-4"} rounded-full bg-logo px-3 py-1 text-xs font-semibold text-night-950 shadow-lg`}>
                {project.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
