import { Response, Request } from 'express';
import { Controller, FindCouponByCodeUseCase } from '../../core';

import { inject, injectable } from 'inversify';
import { createCouponList } from '../../factories';

@injectable()
export class FindCouponByIdController implements Controller {
  constructor(
    @inject(FindCouponByCodeUseCase)
    readonly useCase: FindCouponByCodeUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const result = await this.useCase.execute(req.params.code);
    return res.json(createCouponList(result));
  }
}
