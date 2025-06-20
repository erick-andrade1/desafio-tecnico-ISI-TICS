export interface IGetProduct {
  id: number;
  name: string;
  description: string;
  stock: number;
  category: string;
  is_out_of_stock: boolean;
  price: number;
  finalPrice: number;
  discount: {
    type: string;
    value: number;
    applied_at: string;
  };
  hasCouponApplied: boolean;
  createdAt: Date;
  updatedAt: Date;
}
