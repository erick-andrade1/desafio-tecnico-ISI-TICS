import { injectable } from 'inversify';
import { FilterPaginate, ResultPaginate } from '../../shared';
import { FilterProduct } from '../filter';
import { Product } from '../model/Product';
import { ProductCouponApplication } from '../../productCouponApplication';
import { Coupon } from '../../coupon';

@injectable()
export abstract class ProductRepository {
  abstract findAll(filter?: FilterProduct): Promise<Product[]>;
  abstract paginate(
    filter: FilterPaginate<FilterProduct>,
  ): Promise<ResultPaginate<Product>>;
  abstract findById(id: number): Promise<Product | null>;
  abstract create(product: Product): Promise<Product>;
  abstract update(product: Product): Promise<void>;
  abstract deactivate(id: number): Promise<void>;
  abstract activate(id: number): Promise<void>;
  abstract findOneByFilter(filter: FilterProduct): Promise<Product | null>;
  abstract exists(filter: FilterProduct): Promise<boolean>;
  abstract removeProductDiscountWithCoupon(id: number): Promise<Product>;
  abstract removeProductDiscount(id: number): Promise<Product>;
  abstract addCouponToProduct(
    product: Product,
    application: ProductCouponApplication,
    coupon: Coupon,
  ): Promise<Product>;
}
