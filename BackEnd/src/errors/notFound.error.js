import AppError from "./app.error.js";

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found.`, 404);
  }
}

export default NotFoundError;
