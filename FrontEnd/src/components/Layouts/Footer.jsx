import { Link } from "react-router-dom";
import { FiArrowUp } from "react-icons/fi";

import { useProfile } from "../../hooks/profile/useProfile";
import { DOMAINS } from "../../utils/domains";
import SocialLinks from "../Shared/SocialLinks";

export default function Footer() {
  const { profile, fullName } = useProfile();

  return (
    <footer className="border-t border-line bg-night-950 text-ink-muted">
      <div className="container-page py-12 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-9 w-9 rounded-lg" />
            <p className="font-display text-lg font-bold text-ink">{fullName || "Portfolio"}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed">{profile?.tagline}</p>
          <SocialLinks socials={profile?.socials} email={profile?.email} className="mt-4 -ml-2.5" />
        </div>

        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-muted/70">Prestations</span>
            {Object.values(DOMAINS).map((domain) => (
              <Link key={domain.key} to={domain.path} className="hover:text-brand-300">{domain.label}</Link>
            ))}
            <Link to="/contact" className="hover:text-brand-300">Demander un devis</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-muted/70">Navigation</span>
            <Link to="/projects" className="hover:text-brand-300">Projets</Link>
            <Link to="/about" className="hover:text-brand-300">À propos</Link>
            <Link to="/contact" className="hover:text-brand-300">Contact</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-muted/70">Infos</span>
            <Link to="/legal" className="hover:text-brand-300">Mentions légales</Link>
            {profile?.cv && (
              <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="hover:text-brand-300">CV (PDF)</a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page py-5 flex items-center justify-between text-xs">
          <span>© {new Date().getFullYear()} {fullName}. Tous droits réservés.</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 hover:text-brand-300"
          >
            Haut de page <FiArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
