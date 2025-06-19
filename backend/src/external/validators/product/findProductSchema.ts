import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { optionalString } from '../shared';

const findProductSchema = z.object({
  search: optionalString(),
  minPrice: z.number().positive().optional().nullable(),
  maxPrice: z.number().positive().optional().nullable(),
  hasDiscount: z.boolean().optional().nullable(),
  sortBy: optionalString(),
  sortOrder: z.enum(['asc', 'desc']).optional().nullable(),
  includeDeleted: z.boolean().optional().nullable(),
  onlyOutOfStock: z.boolean().optional().nullable(),
  withCouponApplied: z.boolean().optional().nullable(),
});

export type IFindAllProduct = z.infer<typeof findProductSchema>;

export class FindAllProductsSchemaValidator extends AbstractValidator {
  public static parse(input: any): IFindAllProduct {
    return this.safeParse(findProductSchema, input);
  }
}
