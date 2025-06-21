import AppError from './AppError';

export class AppConflictError extends AppError {
  details: any;

  constructor(message: string, statusCode: number = 409, details?: any) {
    super(message, statusCode);
    this.details = details;
  }
}
