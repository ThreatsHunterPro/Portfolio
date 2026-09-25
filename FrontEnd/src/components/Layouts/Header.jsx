import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

import { useProfile } from "../../hooks/profile/useProfile";
import { DOMAINS } from "../../utils/domains";
import Button from "../Shared/Button";

const NAV_LINKS = [
  { to: DOMAINS.game.path, label: "Jeu vidéo" },
  { to: DOMAINS.web.path, label: "Web" },
  { to: "/projects", label: "Projets" },
  { to: "/about", label: "À propos" },
];

export default function Header() {
  const { profile, fullName } = useProfile();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Ferme le menu mobile au changement de page
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive ? "text-brand-200 bg-brand-400/10" : "text-ink-soft hover:text-ink hover:bg-night-800"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled || open ? "bg-night-950/80 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-page h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Retour à l'accueil">
          <img src="/logo.png" alt="" className="h-10 w-10 rounded-xl transition-transform group-hover:rotate-[-6deg]" />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display font-bold text-ink">{fullName || "Portfolio"}</span>
            <span className="text-xs text-ink-muted">{profile?.title}</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/contact" label="Demander un devis" size="sm" className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2.5 rounded-full text-ink hover:bg-night-800"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-line"
            aria-label="Navigation mobile"
          >
            <div className="container-page py-4 flex flex-col gap-1">
              {[{ to: "/", label: "Accueil", end: true }, ...NAV_LINKS, { to: "/contact", label: "Contact" }].map((link) => (
                <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
