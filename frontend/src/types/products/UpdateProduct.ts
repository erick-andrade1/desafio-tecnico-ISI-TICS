import type { ICreateProduct } from './CreateProduct';

export interface IUpdateProduct extends ICreateProduct {
  id: number;
}
