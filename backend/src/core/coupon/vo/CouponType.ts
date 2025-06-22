import { AppValidationError } from '../../../errors';

export class CouponType {
  static PERCENT = 'percent';
  static FIXED = 'fixed';

  static readonly values = [CouponType.FIXED, CouponType.PERCENT];

  constructor(readonly value: string) {
    if (!CouponType.values.includes(value)) {
      throw new AppValidationError(`O tipo de cupom '${value}' é inválido!`);
    }
  }
}
