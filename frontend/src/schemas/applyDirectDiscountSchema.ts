import { z } from 'zod';

export const applyDirectDiscountSchema = z.object({
  discountValue: z.coerce
    .number({
      invalid_type_error: 'Insira o valor do desconto',
      required_error: 'Insira o valor do desconto',
    })
    .min(1, 'O valor mínimo do desconto é de 1%')
    .max(80, 'O valor máximo do desconto é de 80%'),
});

export type ApplyDirectDiscountSchemaSchema = z.infer<
  typeof applyDirectDiscountSchema
>;
