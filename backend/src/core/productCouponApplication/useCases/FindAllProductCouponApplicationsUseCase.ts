import { inject, injectable } from 'inversify';
import { UseCase } from '../../shared/UseCase';

import { ProductCouponApplication } from '../model';
import { FilterProductCouponApplication } from '../filter';
import { FindAllApplicationsService } from '../service';

@injectable()
export class FindAllProductCouponApplicationsUseCase
  implements
    UseCase<
      FilterProductCouponApplication | undefined,
      ProductCouponApplication[]
    >
{
  constructor(
    @inject(FindAllApplicationsService)
    private readonly service: FindAllApplicationsService,
  ) {}

  execute(
    filter?: FilterProductCouponApplication,
  ): Promise<ProductCouponApplication[]> {
    return this.service.execute(filter);
  }
}
