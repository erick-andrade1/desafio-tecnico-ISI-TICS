import { ProductDiscount } from '../model';
import { CreateProductDTO } from './CreateProductDTO';

export interface UpdateProductDTO extends CreateProductDTO {
  id: number;
  discount?: ProductDiscount;
}
