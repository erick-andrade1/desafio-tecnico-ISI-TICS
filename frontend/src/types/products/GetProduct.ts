import type { IProductDiscount } from './ProductDiscount';

export interface IGetProduct {
  id: number;
  name: string;
  description: string;
  stock: number;
  is_out_of_stock: boolean;
  price: number;
  finalPrice: number;
  discount?: IProductDiscount;
  hasCouponApplied: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
