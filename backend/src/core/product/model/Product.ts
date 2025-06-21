import { Entity, EntityProps } from '../../shared';
import { ProductName, ProductPrice } from '../vo';
import { CouponType } from '../../coupon';

export interface ProductDiscount {
  type: string;
  value: number;
  applied_at: string;
}

export interface ProductProps extends EntityProps {
  name: string;
  description: string | null;
  price: number;
  stock: number;
  discount?: ProductDiscount;
}

export class Product extends Entity<ProductProps> {
  readonly name: ProductName;
  readonly description: string | null;
  readonly price: ProductPrice;
  readonly stock: number;
  readonly discount?: ProductDiscount;

  constructor(data: ProductProps) {
    super(data);
    this.name = ProductName.create(data.name);
    this.description = data.description;
    this.stock = data.stock;
    this.price = ProductPrice.create(data.price);
    this.discount = data.discount;
  }

  public calculateDiscount(): number {
    let finalPrice = this.price.getPrice();

    if (this.discount) {
      if (this.discount.type === CouponType.FIXED) {
        finalPrice = finalPrice - this.discount.value;
      } else if (this.discount.type === CouponType.PERCENT) {
        finalPrice = finalPrice - (finalPrice * this.discount.value) / 100;
      }
    }

    return finalPrice;
  }
}
