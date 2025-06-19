import AppError from './AppError';
import { Errors } from '../core';

export class UnauthorizedError extends AppError {
  constructor(message: string = Errors.UNAUTHORIZED) {
    super(message, 401);
  }
}
