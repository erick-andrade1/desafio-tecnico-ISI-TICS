import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';

const appyDiscountToProductSchema = z.object({
  discountValue: z
    .number()
    .min(1, 'O valor mínimo do desconto é de 1%')
    .max(80, 'O valor máximo do desconto é de 80%'),
});

export type IApplyDiscountToProduct = z.infer<
  typeof appyDiscountToProductSchema
>;

export class ApplyDiscountToProductSchemaValidator extends AbstractValidator {
  public static parse(input: any): IApplyDiscountToProduct {
    return this.safeParse(appyDiscountToProductSchema, input);
  }
}
