import { z } from 'zod';
import { AbstractValidator } from '../AbstractValidator';

const createCouponSchema = z.object({
  code: z.string().trim(),
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

export type ICreateCoupon = z.infer<typeof createCouponSchema>;

export class CreateCouponSchemaValidator extends AbstractValidator {
  public static parse(input: any): ICreateCoupon {
    return this.safeParse(createCouponSchema, input);
  }
}
