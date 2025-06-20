import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';
import { optionalString } from '../shared';

const findCouponSchema = z.object({
  type: optionalString(),
  code: optionalString(),
});

export type IFindCoupon = z.infer<typeof findCouponSchema>;

export class FindAllCouponsSchemaValidator extends AbstractValidator {
  public static parse(input: any): IFindCoupon {
    return this.safeParse(findCouponSchema, input);
  }
}
