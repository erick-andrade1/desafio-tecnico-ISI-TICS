import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import {
  limitQuery,
  optionalBooleanString,
  optionalNumberString,
  optionalString,
  pageQuery,
} from '../shared';

const paginateProductSchema = z.object({
  page: pageQuery(),
  limit: limitQuery(),
  search: optionalString(),
  minPrice: optionalNumberString(),
  maxPrice: optionalNumberString(),
  hasDiscount: optionalBooleanString(),
  sortBy: optionalString(),
  sortOrder: z.enum(['asc', 'desc']).optional().nullable(),
  includeDeleted: optionalBooleanString(),
  onlyOutOfStock: optionalBooleanString(),
  withCouponApplied: optionalBooleanString(),
});

export type IPaginateProduct = z.infer<typeof paginateProductSchema>;

export class PaginateProductSchemaValidator extends AbstractValidator {
  public static parse(input: any): IPaginateProduct {
    return this.safeParse(paginateProductSchema, input);
  }
}
