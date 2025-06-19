import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';

const updateProductSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim(),
  price: z.number(),
  stock: z.number(),
});

export type IUpdateProduct = z.infer<typeof updateProductSchema>;

export class UpdateProductSchemaValidator extends AbstractValidator {
  public static parse(input: any): IUpdateProduct {
    return this.safeParse(updateProductSchema, input);
  }
}
