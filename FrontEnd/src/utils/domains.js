import { IoGameControllerOutline } from "react-icons/io5";
import { FiCode } from "react-icons/fi";

/**
 * Les deux activités proposées en prestation.
 * `path` : page dédiée, `requestType` : valeur envoyée au formulaire de contact.
 */
export const DOMAINS = {
  game: {
    key: "game",
    label: "Jeu vidéo",
    path: "/jeux-video",
    icon: IoGameControllerOutline,
    eyebrow: "Prestations jeu vidéo",
    headline: "Des systèmes gameplay solides, du prototype au packaging.",
    gradient: "from-brand-400 via-brand-600 to-night-800",
  },
  web: {
    key: "web",
    label: "Web",
    path: "/web",
    icon: FiCode,
    eyebrow: "Prestations web",
    headline: "Des applications web rapides, sécurisées et faciles à faire évoluer.",
    gradient: "from-sky-300 via-brand-500 to-night-800",
  },
};

export const DOMAIN_KEYS = Object.keys(DOMAINS);

export const getDomain = (key) => DOMAINS[key] || null;

/** Contexte de réalisation d'un projet */
export const CONTEXTS = {
  Prestation: "bg-brand-400/15 text-brand-200 ring-brand-400/30",
  Studio: "bg-violet-400/10 text-violet-200 ring-violet-400/25",
  Personnel: "bg-night-700 text-ink-soft ring-line",
  Formation: "bg-night-700 text-ink-soft ring-line",
};
