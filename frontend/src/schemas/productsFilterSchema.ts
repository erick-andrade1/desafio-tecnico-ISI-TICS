import { z } from 'zod';

export const productsFilterSchema = z
  .object({
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    search: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.minPrice! > data.maxPrice!) {
      ctx.addIssue({
        code: 'custom',
        path: ['minPrice'],
        message: 'O valor mínimo não pode maior que o valor máximo',
      });
    }
  });

export type ProductsFilterSchema = z.infer<typeof productsFilterSchema>;
