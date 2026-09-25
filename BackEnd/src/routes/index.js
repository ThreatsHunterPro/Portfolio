import { controllers } from '../controllers/index.js';

export function defineRoutes(app, routes) {
    const API_PREFIX = '/api';

    for (const [method, routePath, handlerName, middlewares = [], controllerName] of routes) {
        const url = `${API_PREFIX}/${routePath}`;
        const httpMethod = method.toLowerCase();

        try {
            if (typeof app[httpMethod] !== 'function') throw new Error(`Invalid Method: ${method}`);

            const controller = controllers[controllerName];
            if (!controller) throw new Error(`Controller ${controllerName} not found`);

            const handler = controller[handlerName];
            if (!handler) throw new Error(`Handler ${handlerName} not found in ${controllerName}`);

            const middlewareList = Array.isArray(middlewares) ? middlewares : [middlewares];

            // Register route in Express
            app[httpMethod](url, ...middlewareList, handler);

        } catch (err) {
            console.error(`❌ Registration Error [${method}] ${url}:`, err.message);
        }
    }
}
