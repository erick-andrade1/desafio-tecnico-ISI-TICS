import { z } from 'zod';

export const optionalString = (arg: z.ZodString = z.string()) =>
  arg
    .trim()
    .nullish()
    .transform((val) => {
      if (!val) return val;
      const trimmed = val.trim();
      return trimmed === '' ? null : trimmed;
    });
