import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';

const createProductSchema = z.object({
  name: z
    .string()
    .min(3, 'O tamanho mínimo do nome é de 3 caracteres')
    .max(100, 'O tamanho máximo do nome é de 100 caracteres'),
  description: z
    .string()
    .max(300, 'O tamanho máximo da descrição é de 300 caracteres'),
  price: z.number(),
  stock: z.number().min(0).max(999999),
});

export type ICreateProduct = z.infer<typeof createProductSchema>;

export class CreateProductSchemaValidator extends AbstractValidator {
  public static parse(input: any): ICreateProduct {
    return this.safeParse(createProductSchema, input);
  }
}
