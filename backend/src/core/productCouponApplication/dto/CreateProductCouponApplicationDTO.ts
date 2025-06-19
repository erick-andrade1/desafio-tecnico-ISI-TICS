export interface CreateProductCouponApplication {
  product_id: number;
  coupon_id: number;
  applied_at: string;
  removed_at?: string | null;
}
