import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";

import ProjectCover from "./ProjectCover";

/**
 * Visuel principal d'un projet : fait défiler teaser YouTube, couverture et galerie.
 * Flèches précédent / suivant au survol (toujours visibles sur écran tactile),
 * points de navigation et flèches du clavier.
 *
 * slides : [{ type: "youtube" | "image" | "video" | "generated", src?, youtubeId?, caption?, galleryIndex? }]
 */
export default function MediaCarousel({ project, slides, onExpand }) {
  const [[index, direction], setState] = useState([0, 0]);
  const count = slides.length;
  const slide = slides[index];

  const go = useCallback(
    (step) => setState(([i]) => [(i + step + count) % count, step]),
    [count]
  );

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const arrowClass =
    "absolute top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full " +
    "bg-night-950/70 text-ink backdrop-blur ring-1 ring-line transition-all duration-200 " +
    "hover:bg-logo hover:text-night-950 hover:ring-transparent " +
    "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100";

  return (
    <div
      className="group relative aspect-video overflow-hidden rounded-3xl border border-line bg-night-900 shadow-card outline-none"
      tabIndex={count > 1 ? 0 : -1}
      onKeyDown={onKeyDown}
      role="region"
      aria-roledescription="carrousel"
      aria-label={`Médias du projet ${project.title}`}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Slide slide={slide} project={project} />
        </motion.div>
      </AnimatePresence>

      {count > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} className={`${arrowClass} left-4`} aria-label="Média précédent">
            <FiChevronLeft className="h-6 w-6" />
          </button>
          <button type="button" onClick={() => go(1)} className={`${arrowClass} right-4`} aria-label="Média suivant">
            <FiChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Barre du bas : légende, points, agrandir (masquée sur le lecteur YouTube pour laisser ses contrôles) */}
      {slide.type !== "youtube" && slide.type !== "video" && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-night-950/90 via-night-950/40 to-transparent px-5 pb-4 pt-16">
          <div className="flex items-end justify-between gap-4">
            <p className="text-sm font-medium text-ink">{slide.caption}</p>
            {slide.galleryIndex !== undefined && (
              <button
                type="button"
                onClick={() => onExpand(slide.galleryIndex)}
                className="pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-night-950/70 text-ink ring-1 ring-line backdrop-blur hover:bg-logo hover:text-night-950"
                aria-label="Agrandir"
              >
                <FiMaximize2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {count > 1 && (
        <div className="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-night-950/60 px-3 py-2 backdrop-blur">
          {slides.map((s, i) => (
            <button
              key={`${s.src || s.youtubeId || s.type}-${i}`}
              type="button"
              onClick={() => setState(([cur]) => [i, i > cur ? 1 : -1])}
              aria-label={`Afficher le média ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-brand-300" : "w-2 bg-ink-muted/60 hover:bg-ink-soft"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Slide({ slide, project }) {
  if (slide.type === "youtube") {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${slide.youtubeId}?rel=0`}
        title={`Teaser — ${project.title}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }

  if (slide.type === "video") {
    return <video src={slide.src} controls playsInline className="h-full w-full bg-night-950 object-contain" />;
  }

  if (slide.type === "generated") {
    return <ProjectCover project={project} large />;
  }

  // Image : affichée en entier, sur un fond flouté de la même image
  return (
    <div className="relative h-full w-full">
      <img src={slide.src} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl" />
      <img src={slide.src} alt={slide.caption || project.title} className="relative h-full w-full object-contain" />
    </div>
  );
}
