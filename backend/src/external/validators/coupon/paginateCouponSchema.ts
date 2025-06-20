import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { limitQuery, optionalString, pageQuery } from '../shared';

const paginateCouponSchema = z.object({
  page: pageQuery(),
  limit: limitQuery(),
  type: optionalString(),
  code: optionalString(),
});

export type IPaginateCoupon = z.infer<typeof paginateCouponSchema>;

export class PaginateCouponSchemaValidator extends AbstractValidator {
  public static parse(input: any): IPaginateCoupon {
    return this.safeParse(paginateCouponSchema, input);
  }
}
