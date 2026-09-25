import { contactLimiter } from "../middlewares/rateLimiters.middleware.js";

export const contactRoutes = [
    ['POST', 'contact', 'sendMessage', [contactLimiter], 'contactController'],
];
