import AppError from './AppError';
import { Errors } from '../core/shared';

export class AppObjectNotFoundError extends AppError {
  constructor(message: string = Errors.OBJECT_NOT_FOUND) {
    super(message, 404);
  }
}
