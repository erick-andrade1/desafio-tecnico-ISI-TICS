import { CouponType } from './CouponType';
import { AppValidationError } from '../../../errors';

export class CouponValue {
  private readonly value: number;

  constructor(type: CouponType, value: number) {
    this.validate(type, value);
    this.value = value;
  }

  private validate(type: CouponType, value: number): void {
    if (type.value === CouponType.PERCENT) {
      if (value < 1 || value > 80) {
        throw new AppValidationError(
          'Desconto percentual deve estar entre 1% e 80%.',
        );
      }
    } else if (type.value === CouponType.FIXED) {
      if (value <= 0) {
        throw new AppValidationError('Desconto fixo deve ser maior que zero.');
      }
    } else {
      throw new AppValidationError(`Tipo de cupom desconhecido: ${type.value}`);
    }
  }

  public getValue(): number {
    return this.value;
  }
}
