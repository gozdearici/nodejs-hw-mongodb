import createHttpError from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  console.warn('⚠️ Unknown route:', req.originalUrl);
  next(createHttpError(404, 'Route not found'));
};
