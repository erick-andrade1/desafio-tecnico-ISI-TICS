import { CreateProductDTO } from './CreateProductDTO';

export interface UpdateProductDTO extends CreateProductDTO {
  id: number;
}
