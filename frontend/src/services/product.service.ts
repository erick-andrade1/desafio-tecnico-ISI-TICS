import api from './api';
import queryString from 'query-string';
import type {
  ICreateProduct,
  IGetProduct,
  IPaginateResponse,
  IUpdateProduct,
} from '@/types';

const baseURL = '/products';

class ProductService {
  async create(data: ICreateProduct) {
    return api.post(baseURL, data).then((response) => response.data);
  }

  async update(data: IUpdateProduct) {
    return api
      .patch(`${baseURL}/${data.id}`, data)
      .then((response) => response.data);
  }

  async delete(id: number) {
    return api.delete(`${baseURL}/${id}`).then((response) => response.data);
  }

  async getById(id: number): Promise<IGetProduct> {
    return api.get(`${baseURL}/${id}`).then((response) => response.data);
  }

  async paginate(
    page = 1,
    limit = 10,
    params = {},
  ): Promise<IPaginateResponse<IGetProduct>> {
    const stringParams = queryString.stringify(
      { page, limit, ...params },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );
    return api
      .get(`${baseURL}/?${stringParams}`)
      .then((response) => response.data);
  }

  async restore(id: number) {
    return api.post(`${baseURL}/${id}/restore`).then((res) => res.data);
  }

  async applyPercentDiscount({
    id,
    discountValue,
  }: {
    id: number;
    discountValue: number;
  }) {
    return api
      .post(`${baseURL}/${id}/discount/percent`, { discountValue })
      .then((res) => res.data);
  }

  async applyCouponDiscount({ id, code }: { id: number; code: string }) {
    return api
      .post(`${baseURL}/${id}/discount/coupon`, { code })
      .then((res) => res.data);
  }

  async removeDiscount(id: number) {
    return api.delete(`${baseURL}/${id}/discount`).then((res) => res.data);
  }
}

export const productService = new ProductService();
