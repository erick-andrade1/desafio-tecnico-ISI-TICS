import api from './api';
import queryString from 'query-string';
import type { IPaginateResponse, IGetCoupon } from '@/types';

const baseURL = '/coupons';

class CouponService {
  async findAll() {
    return api.get(baseURL).then((res) => res.data);
  }

  async paginate(
    page = 1,
    limit = 10,
    params = {},
  ): Promise<IPaginateResponse<IGetCoupon>> {
    const stringParams = queryString.stringify(
      { page, limit, ...params },
      { skipEmptyString: true, skipNull: true },
    );
    return api
      .get(`${baseURL}/paginate?${stringParams}`)
      .then((res) => res.data);
  }

  async getByCode(code: string): Promise<IGetCoupon> {
    return api.get(`${baseURL}/${code}`).then((res) => res.data);
  }

  async delete(code: string): Promise<void> {
    return api.delete(`${baseURL}/${code}`).then((res) => res.data);
  }
}

export const couponService = new CouponService();
