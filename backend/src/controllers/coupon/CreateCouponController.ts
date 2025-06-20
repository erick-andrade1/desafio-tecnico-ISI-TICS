import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller, CreateCouponUseCase } from '../../core';

import { CreateCouponSchemaValidator } from '../../external/validators';
import { createCouponList } from '../../factories';

@injectable()
export class CreateCouponController implements Controller {
  constructor(
    @inject(CreateCouponUseCase)
    readonly useCase: CreateCouponUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const data = CreateCouponSchemaValidator.parse(req.body);

    const result = await this.useCase.execute(data);
    return res.json(createCouponList(result));
  }
}
