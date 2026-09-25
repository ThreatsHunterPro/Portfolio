import express from 'express';
import cors from 'cors';
import { defineRoutes } from "../routes/index.js";
import { routesConfig } from "../routes/routes.js";
import errorMiddleware from "../middlewares/error.middleware.js";
import notFoundMiddleware from "../middlewares/notFound.middleware.js";

const app = express();

// --- Middlewares ---
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:8080',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));

// --- Routes Initialization ---
defineRoutes(app, routesConfig);

// --- Health Check ---
app.get('/', (req, res) => res.send('Portfolio API is running !'));

// --- Error Handling ---
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
