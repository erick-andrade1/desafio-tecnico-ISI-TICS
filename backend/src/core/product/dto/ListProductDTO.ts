import { ProductDiscount } from '../model';

export interface ListProductDTO {
  id: number;
  name: string;
  description: string | null;
  stock: number;
  is_out_of_stock: boolean;
  price: number;
  finalPrice: number;
  discount?: ProductDiscount;
  hasCouponApplied: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
