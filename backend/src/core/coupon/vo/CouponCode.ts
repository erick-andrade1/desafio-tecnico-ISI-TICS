import { AppValidationError } from '../../../errors';

const RESERVED_CODES = ['admin', 'auth', 'null', 'undefined'];
export class CouponCode {
  private readonly value: string;

  constructor(code: string) {
    const normalized = this.normalize(code);

    if (normalized.length < 4 || normalized.length > 20) {
      throw new AppValidationError(
        'O código do cupom deve ter entre 4 e 20 caracteres.',
      );
    }

    if (!/^[a-z0-9]+$/.test(normalized)) {
      throw new AppValidationError(
        'O código do cupom deve conter apenas caracteres alfanuméricos.',
      );
    }

    if (RESERVED_CODES.includes(normalized)) {
      throw new AppValidationError(
        `O código "${normalized}" é reservado e não pode ser usado.`,
      );
    }

    this.value = normalized;
  }

  private normalize(code: string): string {
    return code
      .normalize('NFD') // Decompõe caracteres com acento
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/\s+/g, '') // Remove espaços
      .toLowerCase(); // Transforma em minúsculas
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: CouponCode): boolean {
    return this.value === other.getValue();
  }
}
