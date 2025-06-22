import { CouponType } from './CouponType';
import { AppValidationError } from '../../../errors';
import { Errors } from '../../shared';

export class CouponValue {
  private readonly value: number;

  constructor(type: CouponType, value: number) {
    this.validate(type, value);
    this.value = value;
  }

  private validate(type: CouponType, value: number): void {
    if (type.value === CouponType.PERCENT) {
      if (value < 1 || value > 80) {
        throw new AppValidationError(Errors.PRODUCT_FORBIDDEN_DISCOUNT_PERCENT);
      }
    } else if (type.value === CouponType.FIXED) {
      if (value <= 0) {
        throw new AppValidationError(Errors.INVALID_COUPON_FIXED_DISCOUNT);
      }
    } else {
      throw new AppValidationError(`Tipo de cupom desconhecido: ${type.value}`);
    }
  }

  public getValue(): number {
    return this.value;
  }
}
