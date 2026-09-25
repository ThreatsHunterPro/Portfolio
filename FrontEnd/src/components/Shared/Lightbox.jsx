import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

/**
 * Visionneuse plein écran pour la galerie (images et vidéos).
 * Navigation clavier : ← → Échap
 */
export default function Lightbox({ items, index, onClose, onChange }) {
  const isOpen = index !== null && index >= 0;
  const item = isOpen ? items[index] : null;

  const go = useCallback(
    (step) => onChange((index + step + items.length) % items.length),
    [index, items.length, onChange]
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, go, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-night-950/95 backdrop-blur-sm p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.caption || "Aperçu"}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Fermer"
          >
            <FiX className="w-5 h-5" />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                className="absolute left-2 sm:left-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Précédent"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(1); }}
                className="absolute right-2 sm:right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Suivant"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <motion.figure
            key={item.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex max-h-full max-w-5xl flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === "video" ? (
              <video src={item.src} controls autoPlay className="max-h-[78vh] max-w-full rounded-xl" />
            ) : (
              <img src={item.src} alt={item.caption || ""} className="max-h-[78vh] max-w-full rounded-xl object-contain bg-night-800" />
            )}
            <figcaption className="text-center text-sm text-ink-soft">
              {item.caption} <span className="ml-2 font-mono text-ink-muted">{index + 1} / {items.length}</span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
