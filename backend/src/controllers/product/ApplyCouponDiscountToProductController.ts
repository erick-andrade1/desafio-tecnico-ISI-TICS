import { Response, Request } from 'express';
import { Controller, ApplyCouponDiscountToProductUseCase } from '../../core';

import { inject, injectable } from 'inversify';
import { ApplyCouponDiscountToProductSchemaValidator } from '../../external/validators';

@injectable()
export class ApplyCouponDiscountToProductController implements Controller {
  constructor(
    @inject(ApplyCouponDiscountToProductUseCase)
    readonly useCase: ApplyCouponDiscountToProductUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const data = ApplyCouponDiscountToProductSchemaValidator.parse(req.body);
    await this.useCase.execute({
      ...data,
      id: Number(req.params.id),
    });
    return res.status(200);
  }
}
