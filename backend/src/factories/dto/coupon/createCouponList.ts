import { ListCouponDTO, Coupon } from '../../../core';

export function createCouponList(coupon: Coupon): ListCouponDTO {
  return {
    code: coupon.code.getValue(),
    type: coupon.type.value,
    value: coupon.value.getValue(),
    one_shot: coupon.one_shot,
    max_uses: coupon.max_uses,
    uses_count: coupon.uses_count,
    valid_from: coupon.valid_from,
    valid_until: coupon.valid_until,
    createdAt: coupon.createdAt,
    updatedAt: coupon.updatedAt,
  };
}
