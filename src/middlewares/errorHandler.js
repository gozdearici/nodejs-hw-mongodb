import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      message: err.message,
      status: err.status,
      code: err.statusCode,
      data: err.data || null,
    });
  } else {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      data: err.message,
    });
  }
};
