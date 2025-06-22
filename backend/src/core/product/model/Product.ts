import { Entity, EntityProps, Errors } from '../../shared';
import { ProductName, ProductPrice } from '../vo';
import { CouponType } from '../../coupon';
import { AppConflictError, AppValidationError } from '../../../errors';

export interface ProductDiscount {
  type: string;
  value: number;
  applied_at: Date;
}

export interface ProductProps extends EntityProps {
  name: string;
  description: string | null;
  price: number;
  stock: number;
  discount?: ProductDiscount;
  hasCouponApplied: boolean;
}

export class Product extends Entity<ProductProps> {
  readonly name: ProductName;
  readonly description: string | null;
  readonly price: ProductPrice;
  readonly stock: number;
  readonly discount?: ProductDiscount;
  readonly hasCouponApplied: boolean;

  constructor(data: ProductProps) {
    super(data);
    this.name = ProductName.create(data.name);
    this.description = data.description;
    this.stock = data.stock;
    this.price = ProductPrice.create(data.price);
    this.discount = data.discount;
    this.hasCouponApplied = data.hasCouponApplied;
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

  public validateDiscountApplyance(
    discountValue: number,
    discountType: string,
    isCoupon: boolean = false,
  ): Product {
    if (this.discount?.value) {
      throw new AppConflictError(Errors.DISCOUNT_ALREADY_APPLIED);
    }

    if (!CouponType.values.includes(discountType)) {
      throw new AppValidationError(Errors.PRODUCT_DISCOUNT_INVALID);
    }

    const originalPrice = this.price.getPrice();
    let finalPrice = originalPrice;

    if (isCoupon) {
      if (discountType === CouponType.FIXED) {
        finalPrice = originalPrice - discountValue;
      } else if (discountType === CouponType.PERCENT) {
        finalPrice = originalPrice - (originalPrice * discountValue) / 100;
      }

      if (finalPrice < 0.01) {
        throw new AppValidationError(Errors.PRODUCT_FORBIDDEN_FINAL_PRICE);
      }

      return this.copyWith({
        discount: {
          applied_at: new Date(),
          value: discountValue,
          type: discountType,
        },
        hasCouponApplied: true,
      });
    }

    if (discountType === CouponType.PERCENT) {
      if (discountValue < 1 || discountValue > 80) {
        throw new AppValidationError(Errors.PRODUCT_FORBIDDEN_DISCOUNT_PERCENT);
      }

      return this.copyWith({
        discount: {
          applied_at: new Date(),
          value: discountValue,
          type: discountType,
        },
      });
    }

    throw new AppValidationError(Errors.PRODUCT_DISCOUNT_INVALID);
  }

  copyWith(props: Partial<ProductProps>) {
    const product = new Product({
      id: props.id ?? this.id,
      name: props.name ?? this.name.getName(),
      description: props.description ?? this.description,
      price: props.price ?? this.price.getPrice(),
      stock: props.stock ?? this.stock,
      discount: props.discount ?? this.discount,
      hasCouponApplied: props.hasCouponApplied ?? this.hasCouponApplied,
      createdAt: props.createdAt ?? this.createdAt,
      updatedAt: props.updatedAt ?? this.updatedAt,
      deletedAt: props.deletedAt ?? this.deletedAt,
    });

    return product;
  }
}
