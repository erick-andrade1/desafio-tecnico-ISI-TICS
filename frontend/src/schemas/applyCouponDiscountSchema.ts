import { z } from 'zod';

export const applyCouponDiscountSchema = z.object({
  code: z.string({
    required_error: 'Insira o código do cupom',
    invalid_type_error: 'Insira o código do cupom',
  }),
});

export type ApplyCouponDiscountSchemaSchema = z.infer<
  typeof applyCouponDiscountSchema
>;
