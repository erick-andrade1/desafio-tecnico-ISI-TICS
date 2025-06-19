import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { limitQuery, optionalString, pageQuery } from '../shared';

const paginateProductSchema = z.object({
  page: pageQuery(),
  limit: limitQuery(),
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

export type IPaginateProduct = z.infer<typeof paginateProductSchema>;

export class PaginateProductSchemaValidator extends AbstractValidator {
  public static parse(input: any): IPaginateProduct {
    return this.safeParse(paginateProductSchema, input);
  }
}
