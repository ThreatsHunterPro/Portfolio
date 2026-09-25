import { FiGlobe, FiCpu, FiTool, FiGrid } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";

/**
 * Catégories de projets : libellé, icône et couleurs associées.
 * Ajouter une catégorie ici suffit pour qu'elle apparaisse dans les filtres.
 */
export const CATEGORIES = {
  all: {
    label: "Tous",
    icon: FiGrid,
    badge: "bg-night-700 text-ink-soft ring-line",
    gradient: "from-night-600 to-night-900",
  },
  web: {
    label: "Application web",
    icon: FiGlobe,
    badge: "bg-sky-400/10 text-sky-200 ring-sky-400/25",
    gradient: "from-sky-400 via-brand-600 to-night-900",
  },
  game: {
    label: "Jeu vidéo",
    icon: IoGameControllerOutline,
    badge: "bg-brand-400/10 text-brand-200 ring-brand-400/25",
    gradient: "from-brand-300 via-brand-700 to-night-950",
  },
  engine: {
    label: "Moteur & graphisme",
    icon: FiCpu,
    badge: "bg-indigo-400/10 text-indigo-200 ring-indigo-400/25",
    gradient: "from-indigo-400 via-brand-800 to-night-950",
  },
  tool: {
    label: "Outil",
    icon: FiTool,
    badge: "bg-teal-400/10 text-teal-200 ring-teal-400/25",
    gradient: "from-teal-300 via-brand-700 to-night-950",
  },
};

export const getCategory = (key) => CATEGORIES[key] || CATEGORIES.all;
