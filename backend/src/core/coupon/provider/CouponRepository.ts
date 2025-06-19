import { injectable } from 'inversify';
import { FilterPaginate, ResultPaginate } from '../../shared';
import { FilterCoupon } from '../filter';
import { Coupon } from '../model';

@injectable()
export abstract class CouponRepository {
  abstract findAll(filter?: FilterCoupon): Promise<Coupon[]>;
  abstract paginate(
    filter: FilterPaginate<FilterCoupon>,
  ): Promise<ResultPaginate<Coupon>>;
  abstract findByCode(code: string): Promise<Coupon | null>;
  abstract create(permission: Coupon): Promise<Coupon>;
  abstract update(permission: Coupon): Promise<void>;
  abstract delete(code: string): Promise<void>;
  abstract findOneByFilter(filter: FilterCoupon): Promise<Coupon | null>;
  abstract exists(filter: FilterCoupon): Promise<boolean>;
}
