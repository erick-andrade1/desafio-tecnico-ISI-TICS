import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import {
  Controller,
  FilterPaginate,
  PaginateProductsUseCase,
} from '../../core';

import { PaginateProductSchemaValidator } from '../../external/validators';

@injectable()
export class PaginateProductsController implements Controller {
  constructor(
    @inject(PaginateProductsUseCase)
    readonly useCase: PaginateProductsUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const { page, limit, ...filter } = PaginateProductSchemaValidator.parse(
      req.query,
    );
    const result = await this.useCase.execute(
      new FilterPaginate(filter, page, limit),
    );
    return res.json(result);
  }
}
