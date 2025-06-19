export interface CreateCouponDTO {
  code: string;
  type: string;
  value: number;
  one_shot: boolean;
  max_uses: number;
  uses_count: number;
  valid_from: Date;
  valid_until: Date;
}
