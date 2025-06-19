import { injectable } from 'inversify';
import { FilterPaginate, ResultPaginate } from '../../shared';
import { FilterProduct } from '../filter';
import { Product } from '../model/Product';

@injectable()
export abstract class ProductRepository {
  abstract findAll(filter?: FilterProduct): Promise<Product[]>;
  abstract paginate(
    filter: FilterPaginate<FilterProduct>,
  ): Promise<ResultPaginate<Product>>;
  abstract findById(id: number): Promise<Product | null>;
  abstract create(permission: Product): Promise<Product>;
  abstract update(permission: Product): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract findOneByFilter(filter: FilterProduct): Promise<Product | null>;
  abstract exists(filter: FilterProduct): Promise<boolean>;
}
