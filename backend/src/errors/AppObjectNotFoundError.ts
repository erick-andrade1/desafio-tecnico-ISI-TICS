import AppError from './AppError';

export class AppObjectNotFoundError extends AppError {
  constructor(message: string = 'Entidade não encontrada') {
    super(message, 404);
  }
}
