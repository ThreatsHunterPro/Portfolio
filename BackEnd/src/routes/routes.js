import { projectRoutes } from './projects.route.js';
import { profileRoutes } from './profile.route.js';
import { contactRoutes } from './contact.route.js';

export const routesConfig = [
    ...projectRoutes,
    ...profileRoutes,
    ...contactRoutes,
];
