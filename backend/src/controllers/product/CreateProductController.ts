import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller, CreateProductUseCase } from '../../core';

import { CreateProductSchemaValidator } from '../../external/validators';

@injectable()
export class CreateProductController implements Controller {
  constructor(
    @inject(CreateProductUseCase)
    readonly useCase: CreateProductUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const data = CreateProductSchemaValidator.parse(req.body);

    const result = await this.useCase.execute(data);
    return res.json(result);
  }
}
