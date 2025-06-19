import { injectable } from 'inversify';
import { FilterPaginate, ResultPaginate } from '../../shared';
import { FilterProductCouponApplication } from '../filter';
import { ProductCouponApplication } from '../model';

@injectable()
export abstract class ProductCouponApplicationRepository {
  abstract findAll(
    filter?: FilterProductCouponApplication,
  ): Promise<ProductCouponApplication[]>;
  abstract paginate(
    filter: FilterPaginate<FilterProductCouponApplication>,
  ): Promise<ResultPaginate<ProductCouponApplication>>;
  abstract findById(id: number): Promise<ProductCouponApplication | null>;
  abstract create(
    permission: ProductCouponApplication,
  ): Promise<ProductCouponApplication>;
  abstract update(permission: ProductCouponApplication): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract findOneByFilter(
    filter: FilterProductCouponApplication,
  ): Promise<ProductCouponApplication | null>;
  abstract exists(filter: FilterProductCouponApplication): Promise<boolean>;
}
