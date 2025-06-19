import { Entity, EntityProps } from '../../shared';

export interface ProductCouponApplicationProps extends EntityProps {
  product_id: number;
  coupon_id: number;
  applied_at: string;
  removed_at?: string | null;
}

export class ProductCouponApplication extends Entity<ProductCouponApplicationProps> {
  readonly product_id: number;
  readonly coupon_id: number;
  readonly applied_at: string;
  readonly removed_at?: string | null;

  constructor(props: ProductCouponApplicationProps) {
    super(props);
    this.product_id = props.product_id;
    this.coupon_id = props.coupon_id;
    this.applied_at = props.applied_at;
    this.removed_at = props.removed_at;
  }
}
