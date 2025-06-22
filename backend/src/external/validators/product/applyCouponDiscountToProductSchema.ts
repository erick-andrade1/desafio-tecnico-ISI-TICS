import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';

const appyCouponDiscountToProductSchema = z.object({
  code: z.string(),
});

export type IApplyCouponDiscountToProduct = z.infer<
  typeof appyCouponDiscountToProductSchema
>;

export class ApplyCouponDiscountToProductSchemaValidator extends AbstractValidator {
  public static parse(input: any): IApplyCouponDiscountToProduct {
    return this.safeParse(appyCouponDiscountToProductSchema, input);
  }
}
