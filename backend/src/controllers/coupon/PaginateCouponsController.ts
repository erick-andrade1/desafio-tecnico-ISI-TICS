import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { Controller, FilterPaginate, PaginateCouponsUseCase } from '../../core';

import { PaginateCouponSchemaValidator } from '../../external/validators';
import { createCouponList } from '../../factories';

@injectable()
export class PaginateCouponsController implements Controller {
  constructor(
    @inject(PaginateCouponsUseCase)
    readonly useCase: PaginateCouponsUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const { page, limit, ...filter } = PaginateCouponSchemaValidator.parse(
      req.query,
    );
    const result = await this.useCase.execute(
      new FilterPaginate(filter, page, limit),
    );
    return res.json({
      meta: result.meta,
      data: result.data.map(createCouponList),
    });
  }
}
