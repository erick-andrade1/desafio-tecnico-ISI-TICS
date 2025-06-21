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
      .put(`${baseURL}/${data.id}`, data)
      .then((response) => response.data);
  }

  async delete(id: string) {
    return api.delete(`${baseURL}/${id}`).then((response) => response.data);
  }

  async getById(id: string): Promise<IGetProduct> {
    return api.get(`${baseURL}/${id}`).then((response) => response.data);
  }

  async paginate(
    page = 1,
    params = {},
  ): Promise<IPaginateResponse<IGetProduct>> {
    const stringParams = queryString.stringify(
      { page, limit: 15, ...params },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );
    return api
      .get(`${baseURL}/paginate/?${stringParams}`)
      .then((response) => response.data);
  }
}

export const productService = new ProductService();
