import { ProductCouponApplication } from '../../core';
import { ProductCouponApplication as ProductCouponApplicationDb } from '../../generated/prisma';

export class ProductCouponApplicationConverter {
  static fromDb(
    application: ProductCouponApplicationDb,
  ): ProductCouponApplication {
    return new ProductCouponApplication({
      id: application.id,
      product_id: application.product_id,
      coupon_id: application.coupon_id,
      applied_at: application.applied_at,
      removed_at: application.removed_at,
      createdAt: application.created_at,
      updatedAt: application.updated_at,
    });
  }

  static toDb(
    application: ProductCouponApplication,
  ): Omit<ProductCouponApplicationDb, 'id'> & { id?: number } {
    return {
      id: application.id ? Number(application.id) : undefined,
      product_id: application.product_id,
      coupon_id: application.coupon_id,
      applied_at: application.applied_at,
      created_at: application.createdAt,
      removed_at: application.removed_at
        ? new Date(application.removed_at)
        : null,
      updated_at: application.updatedAt
        ? new Date(application.updatedAt)
        : new Date(),
    };
  }
}
