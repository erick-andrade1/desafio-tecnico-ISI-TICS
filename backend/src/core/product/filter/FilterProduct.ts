export interface FilterProduct {
  search?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  hasDiscount?: boolean | null;
  sortBy?: string | null;
  sortOrder?: 'asc' | 'desc' | null;
  includeDeleted?: boolean | null;
  onlyOutOfStock?: boolean | null;
  withCouponApplied?: boolean | null;
}
