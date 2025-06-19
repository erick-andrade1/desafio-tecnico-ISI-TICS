import { Entity, EntityProps } from '../../shared';

export interface ProductDiscount {
  type: string;
  value: number;
  applied_at: string;
}

export interface ProductProps extends EntityProps {
  name: string;
  description: string;
  price: number;
  stock: number;
  discount?: ProductDiscount;
}

export class Product extends Entity<ProductProps> {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly finalPrice?: number;
  readonly discount?: ProductDiscount;
  readonly hasCouponApplied?: boolean;

  constructor(data: ProductProps) {
    super(data);
    this.name = data.name;
    this.description = data.description;
    this.stock = data.stock;
    this.price = data.price;
    this.discount = data.discount;
  }
}
