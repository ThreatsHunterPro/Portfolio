// Order matters : "projects/meta" must be declared before "projects/:slug"
export const projectRoutes = [
    ['GET', 'projects', 'getProjects', [], 'projectsController'],
    ['GET', 'projects/meta', 'getProjectsMeta', [], 'projectsController'],
    ['GET', 'projects/:slug', 'getProjectBySlug', [], 'projectsController'],
];
