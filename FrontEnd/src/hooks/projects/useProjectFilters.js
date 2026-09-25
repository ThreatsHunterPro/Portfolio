import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const normalize = (value = '') =>
  value.toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

/**
 * Filtres de la page projets, synchronisés avec l'URL (?domain=&category=&tech=&q=)
 * pour pouvoir partager un lien filtré.
 */
export function useProjectFilters(projects) {
  const [searchParams, setSearchParams] = useSearchParams();

  const domain = searchParams.get('domain') || 'all';
  const category = searchParams.get('category') || 'all';
  const tech = searchParams.get('tech') || '';
  const search = searchParams.get('q') || '';

  const updateParams = (changes) => {
    setSearchParams((params) => {
      const next = new URLSearchParams(params);
      for (const [key, value] of Object.entries(changes)) {
        if (!value || value === 'all') next.delete(key);
        else next.set(key, value);
      }
      return next;
    }, { replace: true });
  };

  // Projets du domaine sélectionné : sert aussi à calculer les catégories disponibles
  const inDomain = useMemo(
    () => (domain === 'all' ? projects : projects.filter((p) => p.domain === domain)),
    [projects, domain]
  );

  const filtered = useMemo(() => {
    const query = normalize(search);

    return inDomain.filter((project) => {
      if (category !== 'all' && project.category !== category) return false;
      if (tech && !project.technologies?.includes(tech)) return false;
      if (!query) return true;

      return normalize([project.title, project.tagline, project.summary, project.client, ...(project.technologies || [])].join(' '))
        .includes(query);
    });
  }, [inDomain, category, tech, search]);

  return {
    domain,
    category,
    tech,
    search,
    inDomain,
    filtered,
    hasFilters: domain !== 'all' || category !== 'all' || !!tech || !!search,
    // Changer de domaine réinitialise la catégorie (elles diffèrent d'un domaine à l'autre)
    setDomain: (value) => updateParams({ domain: value, category: '' }),
    setCategory: (value) => updateParams({ category: value }),
    setTech: (value) => updateParams({ tech: value === tech ? '' : value }),
    setSearch: (value) => updateParams({ q: value }),
    resetFilters: () => setSearchParams({}, { replace: true }),
  };
}
