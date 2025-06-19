export interface CreateProductCouponApplication {
  product_id: number;
  coupon_id: number;
  applied_at: Date;
  removed_at?: Date | null;
}
