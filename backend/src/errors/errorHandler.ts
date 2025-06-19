import { NextFunction, Request, Response } from 'express';

import AppError from './AppError';
import logger from '../logger';
import { AppValidationError } from './AppValidationError';

export const errorHandler = (
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  logger.error(err);
  if (err instanceof AppValidationError) {
    return response
      .status(err.statusCode)
      .json({ message: err.message, details: err.details });
  } else if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }
  return response.status(500).json({
    status: 'Error',
    message: `Internal server error: ${err.message}`,
  });
};
