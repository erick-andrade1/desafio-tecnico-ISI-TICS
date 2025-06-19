import AppError from './AppError';

export class AppValidationError extends AppError {
  details: any;

  constructor(message: string, statusCode: number = 422, details?: any) {
    super(message, statusCode);
    this.details = details;
  }
}
