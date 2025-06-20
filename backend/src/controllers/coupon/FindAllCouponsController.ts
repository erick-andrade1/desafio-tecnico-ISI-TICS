import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { Controller, FindAllCouponsUseCase } from '../../core';

import { FindAllCouponsSchemaValidator } from '../../external/validators';
import { createCouponList } from '../../factories';

@injectable()
export class FindAllCouponsController implements Controller {
  constructor(
    @inject(FindAllCouponsUseCase)
    readonly useCase: FindAllCouponsUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const filter = FindAllCouponsSchemaValidator.parse(req.query);
    const result = await this.useCase.execute(filter);
    return res.json(result.map(createCouponList));
  }
}
