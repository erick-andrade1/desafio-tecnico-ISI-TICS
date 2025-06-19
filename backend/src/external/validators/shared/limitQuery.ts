import { z } from 'zod';

export const limitQuery = () =>
  z
    .string()
    .transform(Number)
    .optional()
    .default('10')
    .transform((val) => Math.max(1, Math.floor(val)));
