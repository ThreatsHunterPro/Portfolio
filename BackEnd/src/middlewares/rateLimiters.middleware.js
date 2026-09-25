import rateLimit from 'express-rate-limit';

const createRateLimiter = ({ windowMs, max, errorMessage }) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    skip: () => process.env.NODE_ENV === 'test',
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        error: {
          name: 'RATE_LIMIT_EXCEEDED',
          message: errorMessage,
        },
      });
    },
  });
};

export const contactLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  errorMessage: 'Trop de messages envoyés. Réessayez dans 15 minutes.',
});
