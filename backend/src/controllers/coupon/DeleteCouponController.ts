import { Response, Request } from 'express';
import { Controller, DeleteCouponUseCase } from '../../core';

import { inject, injectable } from 'inversify';

@injectable()
export class DeleteCouponController implements Controller {
  constructor(
    @inject(DeleteCouponUseCase) readonly useCase: DeleteCouponUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const result = await this.useCase.execute(req.params.code);
    return res.json(result);
  }
}
