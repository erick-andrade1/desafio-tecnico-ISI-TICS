import { AppValidationError } from '../../../errors';

export class ProductName {
  readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  static create(name: string): ProductName {
    if (!name) throw new AppValidationError('O nome do produto é obrigatório.');

    const trimmed = name.trim();

    if (trimmed.length < 3) {
      throw new AppValidationError('O nome deve ter pelo menos 3 caracteres.');
    }

    if (trimmed.length > 100) {
      throw new AppValidationError('O nome deve ter no máximo 100 caracteres.');
    }

    const validRegex = /^[\p{L}0-9\s\-_,.]+$/u;
    if (!validRegex.test(trimmed)) {
      throw new AppValidationError(
        'O nome contém caracteres inválidos. Permitidos: letras, números, espaços, hífens, vírgulas, pontos e sublinhados.',
      );
    }

    const normalized = ProductName.normalize(trimmed);

    return new ProductName(normalized);
  }

  private static normalize(name: string): string {
    return name.replace(/\s+/g, ' ').trim();
  }

  public getName(): string {
    return this.name;
  }
}
