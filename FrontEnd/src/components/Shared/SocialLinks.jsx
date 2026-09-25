import { FiGithub, FiLinkedin, FiYoutube, FiMail } from "react-icons/fi";
import { SiItchdotio } from "react-icons/si";
import { Link } from "react-router-dom";

const NETWORKS = {
  github: { label: "GitHub", icon: FiGithub },
  linkedin: { label: "LinkedIn", icon: FiLinkedin },
  itchio: { label: "itch.io", icon: SiItchdotio },
  youtube: { label: "YouTube", icon: FiYoutube },
};

/**
 * Affiche uniquement les réseaux renseignés dans le profil
 */
export default function SocialLinks({ socials = {}, email, className = "", tone = "light" }) {
  const itemClass = tone === "dark"
    ? "text-ink-muted hover:text-brand-300 hover:bg-brand-400/10"
    : "text-ink-soft hover:text-brand-300 hover:bg-brand-400/10";

  const links = Object.entries(NETWORKS).filter(([key]) => socials[key]);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {links.map(([key, { label, icon: Icon }]) => (
        <a
          key={key}
          href={socials[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`p-2.5 rounded-full transition-colors ${itemClass}`}
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
      {/* L'enveloppe mène au formulaire de contact */}
      {email && (
        <Link to="/contact" aria-label="Me contacter" title="Me contacter" className={`p-2.5 rounded-full transition-colors ${itemClass}`}>
          <FiMail className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
}
