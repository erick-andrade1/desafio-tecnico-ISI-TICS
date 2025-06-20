import { Coupon } from '../../core/coupon/model/Coupon';
import { Coupon as CouponDb } from '../../generated/prisma';

export class CouponConverter {
  static fromDb(coupon: CouponDb): Coupon {
    return new Coupon({
      id: coupon.id,
      code: coupon.code,
      max_uses: coupon.max_uses,
      one_shot: coupon.one_shot,
      type: coupon.type,
      uses_count: coupon.uses_count,
      valid_from: coupon.valid_from,
      valid_until: coupon.valid_until,
      value: coupon.value,
      createdAt: coupon.created_at,
      updatedAt: coupon.updated_at,
      deletedAt: coupon.deleted_at,
    });
  }

  static toDb(coupon: Coupon): Omit<CouponDb, 'id'> & { id?: number } {
    return {
      id: coupon.id ? Number(coupon.id) : undefined,
      code: coupon.code.getValue(),
      max_uses: coupon.max_uses,
      one_shot: coupon.one_shot,
      type: coupon.type.value,
      uses_count: coupon.uses_count,
      valid_from: coupon.valid_from,
      valid_until: coupon.valid_until,
      value: coupon.value.getValue(),
      created_at: coupon.createdAt,
      updated_at: coupon.updatedAt ? new Date(coupon.updatedAt) : new Date(),
      deleted_at: coupon.deletedAt ? new Date(coupon.deletedAt) : null,
    };
  }
}
