import { readJson } from "../utils/jsonStore.js";
import { paths } from "../config/paths.js";
import { NotFoundError } from "../errors/index.error.js";

const normalize = (value = '') =>
  value.toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

/**
 * Tri : projets de la vitrine (champ "hero") dans leur ordre, puis mis en avant,
 * puis du plus récent au plus ancien
 */
const sortProjects = (a, b) =>
  (a.hero ?? 99) - (b.hero ?? 99)
  || Number(!!b.featured) - Number(!!a.featured)
  || (b.year || 0) - (a.year || 0)
  || (a.order ?? 99) - (b.order ?? 99);

const loadProjects = async () => {
  const projects = await readJson(paths.projects);
  return projects.filter((p) => p.published !== false).sort(sortProjects);
};

/**
 * Applique les filtres (catégorie, techno, recherche plein texte, mis en avant)
 */
export const filterProjects = (projects, { domain, category, tech, search, featured } = {}) => {
  const query = normalize(search);

  return projects.filter((project) => {
    if (domain && domain !== 'all' && project.domain !== domain) return false;
    if (category && category !== 'all' && project.category !== category) return false;
    if (tech && !project.technologies?.some((t) => normalize(t) === normalize(tech))) return false;
    if (featured === 'true' && !project.featured) return false;

    if (query) {
      const haystack = normalize([
        project.title,
        project.tagline,
        project.summary,
        ...(project.technologies || []),
      ].join(' '));
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
};

const findAll = async (filters) => {
  const projects = await loadProjects();
  // La liste n'expose pas le contenu détaillé (plus léger)
  // eslint-disable-next-line no-unused-vars
  return filterProjects(projects, filters).map(({ content, gallery, ...card }) => card);
};

const findBySlug = async (slug) => {
  const all = await loadProjects();
  const project = all.find((p) => p.slug === slug);
  if (!project) throw new NotFoundError('Project');

  // Navigation précédent / suivant au sein du même domaine (web ou jeu vidéo)
  const siblings = all.filter((p) => p.domain === project.domain);
  const index = siblings.indexOf(project);
  const toLink = (p) => (p ? { slug: p.slug, title: p.title } : null);

  return {
    project,
    previous: toLink(siblings[index - 1]),
    next: toLink(siblings[index + 1]),
  };
};

const getMeta = async () => {
  const projects = await loadProjects();
  const domains = {};
  const categories = {};
  const technologies = {};

  for (const project of projects) {
    domains[project.domain] = (domains[project.domain] || 0) + 1;
    categories[project.category] = (categories[project.category] || 0) + 1;
    for (const tech of project.technologies || []) {
      technologies[tech] = (technologies[tech] || 0) + 1;
    }
  }

  return {
    total: projects.length,
    domains,
    categories,
    technologies: Object.entries(technologies)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count })),
  };
};

export default {
  findAll,
  findBySlug,
  getMeta,
};
