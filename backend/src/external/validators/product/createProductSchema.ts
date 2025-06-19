import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';

const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  category: z.string().trim(),
});

export type ICreateProduct = z.infer<typeof createProductSchema>;

export class CreateProductSchemaValidator extends AbstractValidator {
  public static parse(input: any): ICreateProduct {
    return this.safeParse(createProductSchema, input);
  }
}
