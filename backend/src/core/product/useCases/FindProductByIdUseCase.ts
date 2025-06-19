import { UseCase } from '../../shared/UseCase';
import { Product } from '../model/Product';
import { injectable, inject } from 'inversify';
import { FindProductByIdService } from '../service';

@injectable()
export class FindProductByIdUseCase implements UseCase<number, Product> {
  constructor(
    @inject(FindProductByIdService)
    private readonly findProductByIdService: FindProductByIdService,
  ) {}

  async execute(id: number): Promise<Product> {
    const product = await this.findProductByIdService.execute(id);
    return product;
  }
}
