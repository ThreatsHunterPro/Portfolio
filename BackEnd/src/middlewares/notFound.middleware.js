import { NotFoundError } from "../errors/index.error.js";

export default function notFoundMiddleware(req, res, next) {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl}`));
}
