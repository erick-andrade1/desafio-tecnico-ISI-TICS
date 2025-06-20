import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller, UpdateCouponUseCase } from '../../core';

import { UpdateCouponSchemaValidator } from '../../external/validators';
import { createCouponList } from '../../factories';

@injectable()
export class UpdateCouponController implements Controller {
  constructor(
    @inject(UpdateCouponUseCase)
    readonly useCase: UpdateCouponUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const data = UpdateCouponSchemaValidator.parse(req.body);

    const result = await this.useCase.execute({
      ...data,
      code: req.params.code,
    });

    return res.json(createCouponList(result));
  }
}
