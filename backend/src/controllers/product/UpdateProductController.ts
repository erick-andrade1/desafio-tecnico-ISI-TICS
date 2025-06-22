import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller, UpdateProductUseCase } from '../../core';

import { UpdateProductSchemaValidator } from '../../external/validators';
import { createProductList } from '../../factories';

@injectable()
export class UpdateProductController implements Controller {
  constructor(
    @inject(UpdateProductUseCase)
    readonly useCase: UpdateProductUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const data = UpdateProductSchemaValidator.parse(req.body);

    const result = await this.useCase.execute({
      ...data,
      id: Number(req.params.id),
    });

    return res.json(createProductList(result));
  }
}
