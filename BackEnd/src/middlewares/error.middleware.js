/**
 * Centralized Error Handling Middleware
 * Captures all application errors to return a clean response
 */
// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  const status = err.statusCode || err.status || 500;
  const message = status === 500 && process.env.NODE_ENV === 'production'
    ? 'Internal Server Error'
    : err.message || 'Internal Server Error';

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    console.error(`[${err.name || 'Error'}] : ${err.message}`);
    if (status === 500 && err.stack) console.error(err.stack);
  }

  res.status(status).json({
    success: false,
    error: {
      name: err.name || 'Error',
      message,
    },
  });
}

export default errorMiddleware;
