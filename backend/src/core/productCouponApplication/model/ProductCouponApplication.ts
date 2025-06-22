import { Entity, EntityProps } from '../../shared';

export interface ProductCouponApplicationProps extends EntityProps {
  product_id: number;
  coupon_id: number;
  applied_at: Date;
  removed_at?: Date | null;
}

export class ProductCouponApplication extends Entity<ProductCouponApplicationProps> {
  readonly product_id: number;
  readonly coupon_id: number;
  readonly applied_at: Date;
  readonly removed_at?: Date | null;

  constructor(props: ProductCouponApplicationProps) {
    super(props);
    this.product_id = props.product_id;
    this.coupon_id = props.coupon_id;
    this.applied_at = props.applied_at;
    this.removed_at = props.removed_at;
  }

  copyWith(props: Partial<ProductCouponApplicationProps>) {
    const application = new ProductCouponApplication({
      id: props.id ?? this.id,
      product_id: props.product_id ?? this.product_id,
      coupon_id: props.coupon_id ?? this.coupon_id,
      applied_at: props.applied_at ?? this.applied_at,
      removed_at: props.removed_at ?? this.removed_at,
      createdAt: props.createdAt ?? this.createdAt,
      updatedAt: props.updatedAt ?? this.updatedAt,
      deletedAt: props.deletedAt ?? this.deletedAt,
    });

    return application;
  }
}
