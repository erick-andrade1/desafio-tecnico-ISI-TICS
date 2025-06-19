import { Entity, EntityProps } from '../../shared';

export interface ProductProps extends EntityProps {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export class Product extends Entity<ProductProps> {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;

  constructor(data: ProductProps) {
    super(data);
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.stock = data.stock;
  }
}
