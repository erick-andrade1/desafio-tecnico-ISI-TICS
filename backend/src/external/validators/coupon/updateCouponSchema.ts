import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';

const updateCouponSchema = z.object({
  type: z.string().trim(),
  value: z.number(),
  one_shot: z.boolean(),
  max_uses: z.number(),
  uses_count: z.number(),
  valid_from: z.string().transform((value) => {
    return new Date(value);
  }),
  valid_until: z.string().transform((value) => {
    return new Date(value);
  }),
});

export type IUpdateCoupon = z.infer<typeof updateCouponSchema>;

export class UpdateCouponSchemaValidator extends AbstractValidator {
  public static parse(input: any): IUpdateCoupon {
    return this.safeParse(updateCouponSchema, input);
  }
}
