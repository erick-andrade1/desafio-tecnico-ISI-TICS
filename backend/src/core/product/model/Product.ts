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
  category: string;
  discount?: ProductDiscount;
}

export class Product extends Entity<ProductProps> {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly category: string;
  readonly discount?: ProductDiscount;

  constructor(data: ProductProps) {
    super(data);
    this.name = data.name;
    this.description = data.description;
    this.stock = data.stock;
    this.category = data.category;
    this.price = data.price;
    this.discount = data.discount;
  }
}
